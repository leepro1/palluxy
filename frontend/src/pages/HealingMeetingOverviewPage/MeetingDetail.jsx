import React from 'react';
import ContentsLayout from '@layout/ContentsLayout';
import { useParams } from 'react-router-dom';

const MeetingDetail = () => {
  const { meetingId } = useParams();
  return (
    <ContentsLayout>
      <p>안녕안녕 {meetingId}</p>
    </ContentsLayout>
  );
};

export default MeetingDetail;
