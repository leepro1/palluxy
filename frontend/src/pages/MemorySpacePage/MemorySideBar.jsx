import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const MemorySideBar = ({ userId }) => {
  const queryClient = useQueryClient();
  const currentConnetUserId = queryClient.getQueryData(['userInfo']);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === `/memoryspace/${userId}`) {
      navigate(`/memoryspace/${userId}/guestBox`, { replace: true });
    }
  }, [location.pathname, navigate, userId]);
  return (
    <div>
      <ul className="my-8 flex justify-center gap-x-5 px-4 text-white">
        {currentConnetUserId?.id === parseInt(userId) && (
          <li>
            <NavLink
              to={`${userId}/usage`}
              className={({ isActive }) =>
                isActive ? 'border-b-2 border-white pb-1' : undefined
              }
            >
              이용 TIP
            </NavLink>
          </li>
        )}
        <li>
          <NavLink
            to={`${userId}/guestBox`}
            className={({ isActive }) =>
              isActive ? 'border-b-2 border-white pb-1' : undefined
            }
          >
            방명록
          </NavLink>
        </li>
        {currentConnetUserId?.id === parseInt(userId) && (
          <li>
            <NavLink
              to={`${userId}/setting`}
              className={({ isActive }) =>
                isActive ? 'border-b-2 border-white pb-1' : undefined
              }
            >
              추억공간 설정
            </NavLink>
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
