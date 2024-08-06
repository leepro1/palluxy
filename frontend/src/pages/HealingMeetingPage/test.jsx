import React, { useEffect, useCallback, useState, useRef } from 'react';
import { OpenVidu } from 'openvidu-browser';
import ContentsLayout from '@/layout/ContentsLayout';
import UserVideoComponent from './UserVideoComponent';
import ChatMessageBox from '@/components/Chat/ChatMessageBox';
import ConfirmModal from './ConfirmModal'; // 모달 컴포넌트 추가
import defaultImage from '@assets/images/healingMeetingOverview/default.png';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { instance } from '@/utils/axios';
import EntranceModal from './EntranceModal';

const formatDateRange = (startDate, endDate) => {
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  const start = new Date(startDate).toLocaleString('ko-KR', options);
  const end = new Date(endDate).toLocaleString('ko-KR', options);

  return `${start.replace(',', '')}~${end.split(' ')[3]}`;
};

const fetchGroupData = async (userId) => {
  const { data } = await instance.get(`api/group/my/${userId}/0`);
  return data.result.groups;
};

const HealingMeetingPageContents = () => {
  const queryClient = useQueryClient();
  const userInfo = queryClient.getQueryData('userInfo');

  const {
    data,
    isLoading: dataLoading,
    refetch,
  } = useQuery({
    queryKey: ['groupData', userInfo?.id],
    queryFn: () => fetchGroupData(userInfo.id),
    enabled: !!userInfo,
  });

  const [mySessionId, setMySessionId] = useState(null);
  const myUserName = userInfo?.nickname;
  const [session, setSession] = useState(undefined);
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  const [currentVideoDevice, setCurrentVideoDevice] = useState(undefined);
  const [isMike, setIsMike] = useState(true);
  const [isCamera, setIsCamera] = useState(true);
  const [role, setRole] = useState('PUBLISHER');
  const OV = useRef(null);
  const [activeSpeaker, setActiveSpeaker] = useState(null);

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const scrollRef = useRef(null);

  const [showModal, setShowModal] = useState(false); // 모달 상태
  const [entranceModal, setEntranceModal] = useState(false);
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

  const confirmEntrance = () => {
    setEntranceModal(true);
  };
  const handleEntrance = () => {
    setEntranceModal(false);
    joinSession();
  };
  const cancelEntrance = () => {
    setEntranceModal(false);
    setMySessionId(null);
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
      console.log(targetSubscriber);
      console.log(role);
      console.log(mySessionId);
      console.log(session);
      instance
        .post(`api/sessions/${mySessionId}/connection/${targetSubscriber}`)
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
    if (mySessionId === null) {
      return;
    }
    OV.current = new OpenVidu();
    const newSession = OV.current.initSession();
    setSession(newSession);
    console.log(newSession);
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
    newSession.on('publisherStartSpeaking', (event) => {
      setActiveSpeaker(event.connection.connectionId);
    });

    newSession.on('signal:my-chat', (event) => {
      if (event.from.connectionId !== newSession.connection.connectionId) {
        const newMessage = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    });

    try {
      const token = await getToken(role, mySessionId);
      console.log(token);
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
    setMySessionId(null);
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
            audioSource: undefined,
            publishAudio: isMike,
            publishVideo: isCamera,
            mirror: false,
          });

          await session.unpublish(publisher);
          await session.publish(newPublisher);

          setCurrentVideoDevice(newVideoDevice);
          setPublisher(newPublisher);
          setMainStreamManager(newPublisher);
        }
      }
    } catch (error) {
      console.error('Error switching camera:', error);
    }
  }, [currentVideoDevice, isMike, isCamera, publisher, session]);

  return (
    <ContentsLayout>
      {/* 여기에 추가적인 컴포넌트들을 배치하세요 */}
      <div>
        <h1>Healing Meeting Page</h1>
        <div>
          <input
            type="text"
            value={mySessionId || ''}
            onChange={handleChangeSessionId}
            placeholder="Session ID"
          />
          <button onClick={confirmEntrance}>Enter</button>
        </div>
        <div>
          {session && (
            <div>
              <UserVideoComponent streamManager={mainStreamManager} />
              <div>
                <button onClick={() => handleToggle('camera')}>
                  {isCamera ? 'Turn off Camera' : 'Turn on Camera'}
                </button>
                <button onClick={() => handleToggle('mike')}>
                  {isMike ? 'Mute' : 'Unmute'}
                </button>
                <button onClick={switchCamera}>Switch Camera</button>
                <button onClick={leaveSession}>Leave Session</button>
              </div>
            </div>
          )}
        </div>
        {showModal && (
          <ConfirmModal
            onConfirm={handleRemoveUser}
            onCancel={cancelRemoveUser}
          />
        )}
        {entranceModal && (
          <EntranceModal
            onConfirm={handleEntrance}
            onCancel={cancelEntrance}
          />
        )}
        <ChatMessageBox
          messages={messages}
          text={text}
          setText={setText}
          handleSendMessage={handleSendMessage}
          scrollRef={scrollRef}
        />
      </div>
    </ContentsLayout>
  );
};

export default HealingMeetingPageContents;
