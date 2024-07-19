import Logo from '@assets/images/logo/logo.svg';
import { NavLink } from 'react-router-dom';
import Button from '@components/Button';
import ContentsLayout from '@layout/ContentsLayout';

const Header = () => {
  return (
    <ContentsLayout>
      <div className="flex h-[120px] items-center">
        {/* 로고 */}
        <div>
          <img
            src={Logo}
            alt="logo_image"
          />
        </div>
        {/* nav item */}
        <div className="mx-7 grow">
          <ul className="flex gap-x-16 font-jamsilMedium text-xl text-white">
            <li>
              <NavLink to={'/'}>공지사항</NavLink>
            </li>
            <li>
              <NavLink to={'/healingmeeting'}>치유모임</NavLink>
            </li>
            <li>
              <NavLink to={'/memoryspace'}>추억공간</NavLink>
            </li>
            <li>
              <NavLink to={'/meetingoverview'}>치유모임 모아보기</NavLink>
            </li>
          </ul>
        </div>
        {/* 로그인 회원가입 버튼 */}
        <div className="flex gap-x-16 font-jamsilMedium text-white">
          <Button
            className="border-2 border-white"
            size={'sm'}
            text={'로그인'}
          />
          <Button
            className="bg-pal-purple"
            size={'sm'}
            text={'회원가입'}
          />
        </div>
      </div>
    </ContentsLayout>
  );
};

export default Header;
