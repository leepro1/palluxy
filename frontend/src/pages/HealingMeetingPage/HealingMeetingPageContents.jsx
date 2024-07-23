import React, { useEffect, useCallback, useState, useRef } from 'react';
import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';
import ContentsLayout from '@/layout/ContentsLayout';
import UserVideoComponent from './UserVideoComponent';
import ChatBox from '@/pages/HealingMeetingPage/ChatBox';
import ConfirmModal from './ConfirmModal'; // 모달 컴포넌트 추가
import defaultImage from '@assets/images/healingMeetingOverview/default.png';

const APPLICATION_SERVER_URL = 'http://localhost:5000/';

const HealingMeetingPageContents = () => {
  const [mySessionId, setMySessionId] = useState('SessionA');
  const [myUserName, setMyUserName] = useState(
    'Participant' + Math.floor(Math.random() * 100),
  );
  const [session, setSession] = useState(undefined);
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  const [currentVideoDevice, setCurrentVideoDevice] = useState(undefined);
  const [isMike, setIsMike] = useState(true);
  const [isCamera, setIsCamera] = useState(true);
  const [role, setRole] = useState('SUBSCRIBER');
  const OV = useRef(null);

  const [showModal, setShowModal] = useState(false); // 모달 상태
  const [targetSubscriber, setTargetSubscriber] = useState(null); // 강퇴 대상 상태

  const handleToggle = (kind) => {
    if (publisher) {
      switch (kind) {
        case 'camera':
          setIsCamera((prevState) => {
            const newState = !prevState;
            publisher.publishVideo(newState);
            return newState;
          });
          break;
        case 'mike':
          setIsMike((prevState) => {
            const newState = !prevState;
            publisher.publishAudio(newState);
            return newState;
          });
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      leaveSession();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleChangeSessionId = (e) => {
    setMySessionId(e.target.value);
  };

  const handleChangeUserName = (e) => {
    setMyUserName(e.target.value);
  };

  const handleMainVideoStream = (stream) => {
    if (mainStreamManager !== stream) {
      setMainStreamManager(stream);
    }
  };

  const deleteSubscriber = (streamManager) => {
    setSubscribers((prevSubscribers) =>
      prevSubscribers.filter((sub) => sub !== streamManager),
    );
  };

  const changeSession = (sessionId) => {
    setMySessionId(sessionId);
  };

  const confirmRemoveUser = (connectionId) => {
    setTargetSubscriber(connectionId);
    setShowModal(true); // 모달 표시
  };

  const handleRemoveUser = () => {
    if (targetSubscriber && session) {
      session
        .forceDisconnect({ connectionId: targetSubscriber })
        .then(() => {
          console.log(
            `User with connectionId ${targetSubscriber} disconnected`,
          );
          setShowModal(false); // 모달 숨기기
        })
        .catch((error) => console.error('Error disconnecting user:', error));
    }
  };

  const cancelRemoveUser = () => {
    setShowModal(false); // 모달 숨기기
    setTargetSubscriber(null);
  };

  const joinSession = async () => {
    OV.current = new OpenVidu();
    const newSession = OV.current.initSession();
    setSession(newSession);

    newSession.on('streamCreated', (event) => {
      const subscriber = newSession.subscribe(event.stream, undefined);
      setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber]);
    });

    newSession.on('streamDestroyed', (event) => {
      deleteSubscriber(event.stream.streamManager);
    });

    newSession.on('exception', (exception) => {
      console.warn(exception);
    });

    try {
      const token = await getToken(role);
      await newSession.connect(token, { clientData: myUserName });
      const newPublisher = await OV.current.initPublisherAsync(undefined, {
        audioSource: undefined,
        videoSource: undefined,
        publishAudio: true,
        publishVideo: true,
        resolution: '480x270',
        frameRate: 30,
        insertMode: 'APPEND',
        mirror: false,
      });

      newSession.publish(newPublisher);

      const devices = await OV.current.getDevices();
      const videoDevices = devices.filter(
        (device) => device.kind === 'videoinput',
      );
      const currentVideoDeviceId = newPublisher.stream
        .getMediaStream()
        .getVideoTracks()[0]
        .getSettings().deviceId;
      const currentVideoDevice = videoDevices.find(
        (device) => device.deviceId === currentVideoDeviceId,
      );

      setCurrentVideoDevice(currentVideoDevice);
      setMainStreamManager(newPublisher);
      setPublisher(newPublisher);
    } catch (error) {
      console.log(
        'There was an error connecting to the session:',
        error.code,
        error.message,
      );
    }
  };

  const leaveSession = useCallback(() => {
    if (session) {
      session.disconnect();
    }

    OV.current = null;
    setSession(undefined);
    setSubscribers([]);
    setMySessionId('SessionA');
    setMyUserName('Participant' + Math.floor(Math.random() * 100));
    setMainStreamManager(undefined);
    setPublisher(undefined);
    setIsMike(true);
    setIsCamera(true);
  }, [session]);

  const switchCamera = useCallback(async () => {
    try {
      const devices = await OV.current.getDevices();
      const videoDevices = devices.filter(
        (device) => device.kind === 'videoinput',
      );

      if (videoDevices && videoDevices.length > 1) {
        const newVideoDevice = videoDevices.find(
          (device) => device.deviceId !== currentVideoDevice.deviceId,
        );

        if (newVideoDevice) {
          const newPublisher = OV.current.initPublisher(undefined, {
            videoSource: newVideoDevice.deviceId,
            publishAudio: true,
            publishVideo: true,
            mirror: true,
          });

          await session.unpublish(mainStreamManager);
          await session.publish(newPublisher);

          setCurrentVideoDevice(newVideoDevice);
          setMainStreamManager(newPublisher);
          setPublisher(newPublisher);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, [session, mainStreamManager, currentVideoDevice]);

  const getToken = async (role) => {
    const sessionId = await createSession(mySessionId);
    return await createToken(sessionId, role);
  };

  const createSession = async (sessionId) => {
    const response = await axios.post(
      APPLICATION_SERVER_URL + 'api/sessions',
      { customSessionId: sessionId },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );
    return response.data;
  };

  const createToken = async (sessionId, role) => {
    const response = await axios.post(
      APPLICATION_SERVER_URL + 'api/sessions/' + sessionId + '/connections',
      { role },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );
    return response.data;
  };

  const data = Array.from({ length: 4 }, (_, index) => `dummydata${index + 1}`);

  return (
    <div className="container mx-auto">
      {session === undefined ? (
        <ContentsLayout>
          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700">
              사용자id:
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              type="text"
              id="userName"
              value={myUserName}
              onChange={handleChangeUserName}
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700">
              역할 선택:
            </label>
            <select
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="SUBSCRIBER">SUBSCRIBER</option>
              <option value="PUBLISHER">PUBLISHER</option>
              <option value="MODERATOR">MODERATOR</option>
            </select>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {data.map((item, index) => (
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();

                  joinSession();
                }}
                key={index}
              >
                <div className="w-9/12 rounded-lg bg-white shadow-lg">
                  <div className="relative">
                    <img
                      src={defaultImage}
                      alt="이미지"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="mb-2 text-xl font-bold">치유 모임 이름</h3>
                    <p className="text-gray-700">
                      모임 설명이 여기에
                      들어갑니다.asdfssssssssssssssssssssssssss
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      changeSession(item);
                    }}
                    className="focus:shadow-outline h-10 w-full rounded bg-pal-purple px-4 py-2 font-bold text-white hover:bg-violet-900 focus:outline-none"
                    type="submit"
                  >
                    모임 입장
                  </button>
                </div>
              </form>
            ))}
          </div>
        </ContentsLayout>
      ) : null}

      {session !== undefined ? (
        <ContentsLayout>
          <div className="flex flex-row">
            <div className="relative flex h-screen w-10/12 flex-col">
              {/* 헤더 */}
              <div className="flex h-16 w-full items-center justify-center bg-gray-900">
                <p className="text-2xl text-white">
                  치유모임 이름 {mySessionId}
                </p>
              </div>
              {/* 비디오 */}
              <div className="flex grow bg-black">
                <div className="flex grow flex-wrap">
                  {publisher !== undefined ? (
                    <div className="relative w-1/2 border-2 border-solid border-gray-900 p-8">
                      <UserVideoComponent streamManager={publisher} />
                    </div>
                  ) : null}
                  {subscribers.map((sub, i) => (
                    <div
                      key={sub.id}
                      className="group flex w-1/2 flex-col items-center border-2 border-solid border-gray-900 p-8"
                    >
                      <span>{sub.id}</span>
                      <UserVideoComponent streamManager={sub} />
                      <div className="items-center">
                        {role === 'MODERATOR' && (
                          <div className="mt-2 hidden flex-col items-center group-hover:flex">
                            <span
                              onClick={() =>
                                confirmRemoveUser(
                                  sub.stream.connection.connectionId,
                                )
                              }
                              className="material-symbols-outlined cursor-pointer text-red-500"
                            >
                              close
                            </span>
                            <span className="text-sm text-red-500">
                              내보내기
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* 푸터 */}
              <div className="flex h-20 w-full items-center justify-between bg-gray-800 px-4">
                <div className="flex items-center">
                  <button
                    className="focus:shadow-outline mr-2 h-10 w-10 rounded-full bg-gray-500 text-white focus:outline-none"
                    onClick={() => handleToggle('mike')}
                  >
                    {isMike ? (
                      <span className="material-symbols-outlined">mic</span>
                    ) : (
                      <span className="material-symbols-outlined">mic_off</span>
                    )}
                  </button>
                  <button
                    className="focus:shadow-outline mr-2 h-10 w-10 rounded-full bg-gray-500 text-white focus:outline-none"
                    onClick={() => handleToggle('camera')}
                  >
                    {isCamera ? (
                      <span className="material-symbols-outlined">
                        videocam
                      </span>
                    ) : (
                      <span className="material-symbols-outlined">
                        videocam_off
                      </span>
                    )}
                  </button>
                  <button
                    className="focus:shadow-outline mr-2 h-10 w-10 rounded-full bg-gray-500 text-white focus:outline-none"
                    onClick={switchCamera}
                  >
                    <span className="material-symbols-outlined">
                      switch_camera
                    </span>
                  </button>
                </div>
                <div>
                  <button
                    className="focus:shadow-outline rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700 focus:outline-none"
                    onClick={leaveSession}
                  >
                    방 나가기
                  </button>
                </div>
              </div>
            </div>
            <ChatBox className="h-auto w-2/12" />
          </div>
        </ContentsLayout>
      ) : null}

      {/* 확인 모달 */}
      <ConfirmModal
        show={showModal}
        message="정말로 내보내시겠습니까?"
        onConfirm={handleRemoveUser}
        onCancel={cancelRemoveUser}
      />
    </div>
  );
};

export default HealingMeetingPageContents;
