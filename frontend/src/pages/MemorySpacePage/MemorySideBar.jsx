import { NavLink, Outlet } from 'react-router-dom';

const MemoerySideBar = () => {
  return (
    <div>
      <ul className="my-8 flex justify-center gap-x-5 px-4 text-white">
        <li>
          <NavLink to={'mailbox'}>편지함</NavLink>
        </li>
        <li>방명록</li>
        <li>
          <NavLink to={''}>추억공간 설정</NavLink>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

export default MemoerySideBar;
