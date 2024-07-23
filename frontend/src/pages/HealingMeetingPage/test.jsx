import ChatBox from '@/pages/HealingMeetingPage/ChatBox';
import { useEffect, useCallback, useState, useRef } from 'react';
import axios from 'axios';
import '@/pages/HealingMeetingPage/HealingMeetingPageContents.css';
import UserVideoComponent from './UserVideoComponent';
import { OpenVidu } from 'openvidu-browser';
import ContentsLayout from '@/layout/ContentsLayout';

const APPLICATION_SERVER_URL = 'http://localhost:5000/';

const HealingMeetingPageContents = () => {
  const [mySessionId, setMySessionId] = useState('SessionA'); // 세션 ID 상태
  const [myUserName, setMyUserName] = useState(
    'Participant' + Math.floor(Math.random() * 100),
  ); // 랜덤한 사용자 이름 상태
  const [session, setSession] = useState(undefined); // 세션 상태
  const [mainStreamManager, setMainStreamManager] = useState(undefined); // 메인 스트림 관리자 상태
  const [publisher, setPublisher] = useState(undefined); // 발행자 상태
  const [subscribers, setSubscribers] = useState([]); // 구독자 리스트 상태
  const [currentVideoDevice, setCurrentVideoDevice] = useState(undefined); // 현재 비디오 장치 상태
  const OV = useRef(null); // OpenVidu 객체 참조
  const [isMike, setIsMike] = useState(true); // 마이크 상태
  const [isCamera, setIsCamera] = useState(true); // 카메라 상태
  const [role, setRole] = useState('SUBSCRIBER'); // 사용자 역할 상태, 기본은 SUBSCRIBER

  const handleToggle = (kind) => {
    if (publisher) {
      // 발행자가 있는 경우
      switch (kind) {
        case 'camera':
          setIsCamera((prevState) => {
            const newState = !prevState; // 카메라 상태를 반전
            publisher.publishVideo(newState); // 카메라 상태를 발행자에 반영
            return newState;
          });
          break;
        case 'mike':
          setIsMike((prevState) => {
            const newState = !prevState; // 마이크 상태를 반전
            publisher.publishAudio(newState); // 마이크 상태를 발행자에 반영
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
      leaveSession(); // 페이지를 떠날 때 세션을 떠남
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleChangeSessionId = (e) => {
    setMySessionId(e.target.value); // 세션 ID 변경 핸들러
  };

  const handleChangeUserName = (e) => {
    setMyUserName(e.target.value); // 사용자 이름 변경 핸들러
  };

  const handleMainVideoStream = (stream) => {
    if (mainStreamManager !== stream) {
      setMainStreamManager(stream); // 메인 비디오 스트림 설정
    }
  };

  const deleteSubscriber = (streamManager) => {
    setSubscribers(
      (prevSubscribers) =>
        prevSubscribers.filter((sub) => sub !== streamManager), // 구독자 리스트에서 스트림 삭제
    );
  };

  const joinSession = async () => {
    OV.current = new OpenVidu(); // OpenVidu 객체 생성
    const newSession = OV.current.initSession(); // 새 세션 초기화

    setSession(newSession); // 세션 상태 업데이트

    newSession.on('streamCreated', (event) => {
      const subscriber = newSession.subscribe(event.stream, undefined); // 새 스트림을 구독
      setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber]); // 구독자 리스트에 추가
    });

    newSession.on('streamDestroyed', (event) => {
      deleteSubscriber(event.stream.streamManager); // 스트림이 삭제될 때 구독자 리스트에서 제거
    });

    newSession.on('exception', (exception) => {
      console.warn(exception); // 예외 발생 시 경고
    });

    try {
      const token = await getToken(role); // 역할을 기반으로 토큰 생성
      await newSession.connect(token, { clientData: myUserName }); // 세션에 연결
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

      newSession.publish(newPublisher); // 발행자 세션에 발행

      const devices = await OV.current.getDevices(); // 장치 목록 가져오기
      const videoDevices = devices.filter(
        (device) => device.kind === 'videoinput',
      ); // 비디오 입력 장치 필터링
      const currentVideoDeviceId = newPublisher.stream
        .getMediaStream()
        .getVideoTracks()[0]
        .getSettings().deviceId;
      const currentVideoDevice = videoDevices.find(
        (device) => device.deviceId === currentVideoDeviceId,
      );

      setCurrentVideoDevice(currentVideoDevice); // 현재 비디오 장치 설정
      setMainStreamManager(newPublisher); // 메인 스트림 관리자 설정
      setPublisher(newPublisher); // 발행자 설정
    } catch (error) {
      console.log(
        'There was an error connecting to the session:',
        error.code,
        error.message,
      ); // 세션 연결 에러
    }
  };

  const leaveSession = useCallback(() => {
    if (session) {
      session.disconnect(); // 세션 연결 해제
    }

    OV.current = null;
    setSession(undefined); // 상태 초기화
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
      const devices = await OV.current.getDevices(); // 장치 목록 가져오기
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

          await session.unpublish(mainStreamManager); // 기존 발행자 취소
          await session.publish(newPublisher); // 새 발행자 설정

          setCurrentVideoDevice(newVideoDevice); // 현재 비디오 장치 업데이트
          setMainStreamManager(newPublisher); // 메인 스트림 관리자 업데이트
          setPublisher(newPublisher); // 발행자 업데이트
        }
      }
    } catch (e) {
      console.error(e); // 에러 처리
    }
  }, [session, mainStreamManager, currentVideoDevice]);

  const getToken = async (role) => {
    const sessionId = await createSession(mySessionId); // 세션 생성
    return await createToken(sessionId, role); // 역할 기반 토큰 생성
  };

  const createSession = async (sessionId) => {
    const response = await axios.post(
      APPLICATION_SERVER_URL + 'api/sessions',
      { customSessionId: sessionId },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );
    return response.data; // 세션 ID 반환
  };

  const createToken = async (sessionId, role) => {
    const response = await axios.post(
      APPLICATION_SERVER_URL + 'api/sessions/' + sessionId + '/connections',
      { role }, // 역할 전달
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );
    return response.data; // 토큰 반환
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
                e.preventDefault(); // 기본 폼 제출 동작 방지
                joinSession(); // 세션 참가
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
