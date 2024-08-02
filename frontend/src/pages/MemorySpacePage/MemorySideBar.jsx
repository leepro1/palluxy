import { NavLink, Outlet } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import PropTypes from 'prop-types';

const MemorySideBar = ({ userId }) => {
  const queryClient = useQueryClient();

  const currentConnetUserId = queryClient.getQueryData(['userInfo']).id;

  return (
    <div>
      <ul className="my-8 flex justify-center gap-x-5 px-4 text-white">
        {currentConnetUserId === parseInt(userId) && (
          <li>
            <NavLink to={`${userId}/mailbox`}>편지함</NavLink>
          </li>
        )}
        <li>
          <NavLink to={`${userId}`}>방명록</NavLink>
        </li>
        {currentConnetUserId === parseInt(userId) && (
          <li>
            <NavLink to={`${userId}/setting`}>추억공간 설정</NavLink>
          </li>
        )}
      </ul>
      <Outlet />
    </div>
  );
};

MemorySideBar.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default MemorySideBar;
