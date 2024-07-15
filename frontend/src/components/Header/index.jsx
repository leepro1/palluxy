import Logo from '@assets/images/logo/logo.svg';

import ContentsLayout from '@layout/ContentsLayout';
const Header = () => {
  return (
    <ContentsLayout>
      <div className="flex h-[120px] items-center">
        <div>
          <img
            src={Logo}
            alt="logo_image"
          />
        </div>
      </div>
    </ContentsLayout>
  );
};

export default Header;
