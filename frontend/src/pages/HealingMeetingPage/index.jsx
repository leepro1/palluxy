import React from 'react';
import HealingMeetingPageContents from '@pages/HealingMeetingPage/HealingMeetingPageContents.jsx';
import registerServiceWorker from '@pages/HealingMeetingPage/registerServiceWorker';

const HealingMeeting = () => {
  registerServiceWorker();
  return (
    <div>
      <HealingMeetingPageContents />
    </div>
  );
};
export default HealingMeeting;
