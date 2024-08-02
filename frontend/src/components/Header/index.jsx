import Logo from '@assets/images/logo/logo.svg';
import { NavLink } from 'react-router-dom';
import GlobalBtn from '@components/GlobalBtn';
import ContentsLayout from '@layout/ContentsLayout';

const Header = () => {
  return (
    <ContentsLayout>
      <div className="flex h-[120px] items-center">
        {/* 로고 */}
        <div className="flex-shrink-0">
          <NavLink to={'/'}>
            <img
              src={Logo}
              alt="logo_image"
            />
          </NavLink>
        </div>
        {/* nav item */}
        <div className="mx-7 grow">
          <ul className="flex gap-x-16 font-jamsilMedium text-xl text-white">
            <li>
              <NavLink to={'/noticeboard'}>공지사항</NavLink>
            </li>
            <li>
              <NavLink to={'/healingmeeting'}>치유모임</NavLink>
            </li>
            <li>
              <NavLink to={'/memoryspace'}>추억공간</NavLink>
            </li>
            <li>
              <NavLink to={'/meetingoverview/1'}>치유모임 모아보기</NavLink>
            </li>
          </ul>
        </div>
        {/* 로그인 회원가입 버튼 */}
        <div className="flex gap-x-16 font-jamsilMedium text-white">
          <NavLink to={'/signin'}>
            <GlobalBtn
              className="border-2 border-white"
              size={'sm'}
              text={'로그인'}
            />
          </NavLink>
          <NavLink to={'/signup'}>
            <GlobalBtn
              className="bg-pal-purple"
              size={'sm'}
              text={'회원가입'}
            />
          </NavLink>
        </div>
      </div>
    </ContentsLayout>
  );
};

export default Header;
