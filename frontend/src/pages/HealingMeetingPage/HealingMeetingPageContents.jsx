import ChatBox from '@/pages/HealingMeetingPage/ChatBox';
import { useEffect, useCallback, useState, useRef } from 'react';
import axios from 'axios';
import '@/pages/HealingMeetingPage/HealingMeetingPageContents.css';
import UserVideoComponent from './UserVideoComponent';
import { OpenVidu } from 'openvidu-browser';
import ContentsLayout from '@/layout/ContentsLayout';

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
  const OV = useRef(null);
  const [isMike, setIsMike] = useState(true);
  const [isCamera, setIsCamera] = useState(true);
  const handleToggle = (kind) => {
    if (publisher) {
      switch (kind) {
        case 'camera':
          // setIsCamera(!isCamera);
          setIsCamera((prevState) => {
            const newState = !prevState;
            publisher.publishVideo(newState);
            console.log(newState);
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
      const token = await getToken();
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

  const getToken = async () => {
    const sessionId = await createSession(mySessionId);
    return await createToken(sessionId);
  };

  const createSession = async (sessionId) => {
    const response = await axios.post(
      APPLICATION_SERVER_URL + 'api/sessions',
      { customSessionId: sessionId },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );
    return response.data; // The sessionId
  };

  const createToken = async (sessionId) => {
    const response = await axios.post(
      APPLICATION_SERVER_URL + 'api/sessions/' + sessionId + '/connections',
      {},
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );
    return response.data; // The token
  };
  return (
    <div className="container mx-auto">
      {/* 사용자의 세션이 없을때(세션정보를 입력하기 전) */}
      {session === undefined ? (
        <div>
          <div
            id="join-dialog"
            className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md"
          >
            <h1 className="mb-4 text-2xl font-bold">사용자와 세션 정보 입력</h1>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                joinSession(e);
              }}
            >
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
                  세션id:
                </label>
                <input
                  className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                  type="text"
                  id="sessionId"
                  value={mySessionId}
                  onChange={handleChangeSessionId}
                  required
                />
              </div>
              <div className="flex items-center justify-center">
                <input
                  className="focus:shadow-outline rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700 focus:outline-none"
                  type="submit"
                  value="JOIN"
                />
              </div>
            </form>
          </div>
        </div>
      ) : null}
      {/* 사용자의 세션이 있을때(join한 후) */}
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
                    <div
                      className="relative w-1/2 border-2 border-solid border-gray-900 p-6"
                      onClick={() => handleMainVideoStream(publisher)}
                    >
                      <UserVideoComponent streamManager={publisher} />
                    </div>
                  ) : null}
                  {subscribers.map((sub, i) => (
                    <div
                      key={sub.id}
                      className="w-1/2 border-2 border-solid border-gray-900 p-6"
                      onClick={() => handleMainVideoStream(sub)}
                    >
                      <span>{sub.id}</span>
                      <UserVideoComponent streamManager={sub} />
                    </div>
                  ))}
                </div>
                {/* <ChatBox className="w-2/12" /> */}
              </div>
              {/* 푸터 */}
              <div className="flex h-20 w-full items-center justify-between bg-gray-800 px-4">
                <input
                  className="focus:shadow-outline rounded bg-gray-800 px-4 py-2 font-bold text-gray-800"
                  type="button"
                  id="buttonLeaveSession"
                  value="가나 다라마"
                />
                <div className="flex flex-1 items-center justify-center gap-x-10">
                  {isCamera === true ? (
                    <div className="flex flex-col items-center">
                      <span
                        className="material-symbols-outlined cursor-pointer text-5xl text-white"
                        id="buttonToggleCamera"
                        onClick={() => {
                          handleToggle('camera');
                        }}
                      >
                        hangout_video
                      </span>
                      <span className="text-sm text-white">비디오 켜짐</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <span
                        className="material-symbols-outlined cursor-pointer text-5xl text-red-500"
                        id="buttonToggleCamera"
                        onClick={() => {
                          handleToggle('camera');
                        }}
                      >
                        hangout_video_off
                      </span>
                      <span className="text-sm text-red-500">비디오 꺼짐</span>
                    </div>
                  )}
                  {isMike === true ? (
                    <div className="flex flex-col items-center">
                      <span
                        className="material-symbols-outlined cursor-pointer text-5xl text-white"
                        id="buttonToggleMike"
                        onClick={() => {
                          handleToggle('mike');
                        }}
                      >
                        mic
                      </span>
                      <span className="text-sm text-white">마이크 켜짐</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <span
                        className="material-symbols-outlined cursor-pointer text-5xl text-red-500"
                        id="buttonToggleMike"
                        onClick={() => {
                          handleToggle('mike');
                        }}
                      >
                        mic_off
                      </span>
                      <span className="text-sm text-red-500">마이크 꺼짐</span>
                    </div>
                  )}
                  <div className="flex flex-col items-center">
                    <span
                      className="material-symbols-outlined cursor-pointer text-5xl text-white"
                      id="buttonSwitchCamera"
                      onClick={() => {
                        switchCamera();
                      }}
                    >
                      party_mode
                    </span>
                    <span className="text-sm text-white">카메라 바꾸기</span>
                  </div>
                </div>
                <input
                  className="focus:shadow-outline rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700 focus:outline-none"
                  type="button"
                  id="buttonLeaveSession"
                  onClick={leaveSession}
                  value="세션 나가기"
                />
              </div>
            </div>
            <ChatBox className="h-auto w-2/12" />
          </div>
        </ContentsLayout>
      ) : null}
    </div>
  );
};

export default HealingMeetingPageContents;
