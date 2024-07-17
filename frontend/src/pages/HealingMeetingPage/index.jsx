import React, { useEffect, useState } from 'react';
import { OpenVidu } from 'openvidu-browser';
import HealingMeetingHeader from './HealingMeetingHeader';
import HealingMeetingFooter from './HealingMeetingFooter';
import VideoBox from './VideoBox';
import ContentsLayout from '@layout/ContentsLayout';

const OPENVIDU_SERVER_URL = 'http://localhost:4443';
const OPENVIDU_SERVER_SECRET = '7946132';

const HealingMeetingPage = () => {
  const [session, setSession] = useState(null);
  const [mainStreamManager, setMainStreamManager] = useState(null);
  const [subscribers, setSubscribers] = useState([]);

  const createSession = async () => {
    const response = await fetch(
      `${OPENVIDU_SERVER_URL}/openvidu/api/sessions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET)}`,
        },
        body: JSON.stringify({}),
      },
    );
    const data = await response.json();
    return data.id;
  };

  const getToken = async (sessionId) => {
    const response = await fetch(
      `${OPENVIDU_SERVER_URL}/openvidu/api/sessions/${sessionId}/connection`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET)}`,
        },
        body: JSON.stringify({}),
      },
    );
    const data = await response.json();
    return data.token;
  };

  useEffect(() => {
    const initSession = async () => {
      const openVidu = new OpenVidu();
      const mySession = openVidu.initSession();

      mySession.on('streamCreated', (event) => {
        const subscriber = mySession.subscribe(event.stream, undefined);
        setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber]);
      });

      mySession.on('streamDestroyed', (event) => {
        setSubscribers((prevSubscribers) =>
          prevSubscribers.filter((sub) => sub !== event.stream.streamManager),
        );
      });

      mySession.on('connectionDestroyed', async (event) => {
        // 재연결 로직 추가
        try {
          const sessionId = await createSession();
          const token = await getToken(sessionId);
          await mySession.connect(token, { clientData: 'User' });
        } catch (error) {
          console.error('Failed to reconnect:', error);
        }
      });

      setSession(mySession);

      try {
        const sessionId = await createSession();
        const token = await getToken(sessionId);
        await mySession.connect(token, { clientData: 'User' });

        const publisher = openVidu.initPublisher(undefined, {
          audioSource: undefined,
          videoSource: undefined,
          publishAudio: true,
          publishVideo: true,
          resolution: '640x480',
          frameRate: 30,
          insertMode: 'APPEND',
          mirror: false,
        });

        mySession.publish(publisher);
        setMainStreamManager(publisher);
      } catch (error) {
        console.error('Failed to initialize session:', error);
      }
    };

    initSession();

    return () => {
      if (session) session.disconnect();
    };
  }, [session]);

  return (
    <ContentsLayout>
      <div className="relative flex h-screen flex-col">
        <HealingMeetingHeader />
        <div className="flex grow bg-black opacity-70">
          <div className="flex grow flex-wrap p-4">
            <div className="w-1/2 p-2">
              <div className="h-full bg-gray-300">
                {mainStreamManager && (
                  <VideoBox streamManager={mainStreamManager} />
                )}
              </div>
            </div>
            {subscribers.map((subscriber, index) => (
              <div
                key={index}
                className="w-1/2 p-2"
              >
                <div className="h-full bg-gray-300">
                  <VideoBox streamManager={subscriber} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <HealingMeetingFooter />
      </div>
    </ContentsLayout>
  );
};

export default HealingMeetingPage;
