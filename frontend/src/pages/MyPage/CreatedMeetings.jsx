import React, { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { instance } from '@/utils/axios';

const CreatedMeetings = () => {
  const queryClient = useQueryClient();
  const userInfo = queryClient.getQueryData(['userInfo']);
  const userId = userInfo.id;
  const [meetings, setMeetings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const showCreatedMeetings = async () => {
      try {
        //     const response = await instance.get('/api/group/accept/0');
        //     const allMeetings = response.data.result.groups;
        //     const userMeetings = allMeetings.filter(
        //       (meeting) => meeting.leaderId === userId,
        //     ); // leaderId가 userId와 같은 경우 필터링
        //     setMeetings(userMeetings);
        const allMeetings = [];
        let page = 0;
        let totalPages = 1;

        while (page < totalPages) {
          const response = await instance.get(`/api/group/accept/${page}`);
          const result = response.data.result;
          allMeetings.push(...result.groups);
          totalPages = Math.ceil(result.totalGroupCount / 9); // assuming 9 items per page
          page += 1;
        }

        const userMeetings = allMeetings.filter(
          (meeting) => meeting.leaderId === userId,
        ); // leaderId가 userId와 같은 경우 필터링
        setMeetings(userMeetings);
      } catch (error) {
        setError(error);
      }
    };

    if (userInfo) {
      showCreatedMeetings();
    }
  }, [userInfo, userId]);

  return (
    <div>
      <h2>내가 생성한 치유모임</h2>
      {meetings.length > 0 ? (
        meetings.map((meeting) => (
          <div key={meeting.id}>
            <h3>{meeting.title}</h3>
            <p>{meeting.description}</p>
          </div>
        ))
      ) : (
        <p>현재 생성한 모임이 없습니다.</p>
      )}
    </div>
  );
};

export default CreatedMeetings;
