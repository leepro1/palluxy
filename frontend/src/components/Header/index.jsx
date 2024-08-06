import Logo from '@assets/images/logo/logo.svg';
import { NavLink, useNavigate } from 'react-router-dom';
import GlobalBtn from '@components/GlobalBtn';
import ContentsLayout from '@layout/ContentsLayout';
import { instance } from '@/utils/axios';
import { useQueryClient, useMutation } from '@tanstack/react-query';

const Header = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const userLogout = async () => {
    console.log('userLogout 함수 시작');
    await instance.post('/api/logout');
  };

  const userData = queryClient.getQueryData(['userInfo']);

  const { mutate: logoutMutate } = useMutation({
    mutationFn: userLogout,
    onSuccess: () => {
      console.log('mutate logout 성공');
      sessionStorage.removeItem('access');
      queryClient.setQueryData(['userInfo'], null);
      navigate('/');
    },
    onError: (error) => {
      console.error('Logout failed: ', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
      }
    },
  });
  return (
    <ContentsLayout>
      <div className="flex h-[120px] items-center pl-4 lg:pl-0">
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
          <div className="block text-center md:hidden">
            <div className="group relative flex cursor-pointer items-center justify-center gap-x-2 font-jamsilMedium text-white">
              <span className="material-symbols-outlined">menu</span>
              <span>See More</span>
              <div className="bg-pal- absolute -bottom-[168px] z-50 hidden w-full bg-pal-purple py-3 group-hover:block">
                <ul className="flex flex-col gap-y-4">
                  <li>
                    <NavLink to={'/noticeboard'}>공지사항</NavLink>
                  </li>
                  <li>
                    <NavLink to={'/healingmeeting'}>치유모임</NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={
                        userData
                          ? `/memoryspace/${userData.id}`
                          : `/memoryspace`
                      }
                    >
                      추억공간
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={'/meetingoverview/1'}>
                      치유모임 모아보기
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <ul className="hidden gap-x-16 font-jamsilMedium text-sm text-white md:flex md:text-xl">
            <li>
              <NavLink to={'/noticeboard'}>공지사항</NavLink>
            </li>
            <li>
              <NavLink to={'/healingmeeting'}>치유모임</NavLink>
            </li>
            <li>
              <NavLink
                to={userData ? `/memoryspace/${userData.id}` : `/memoryspace`}
              >
                추억공간
              </NavLink>
            </li>
            <li>
              <NavLink to={'/meetingoverview/1'}>치유모임 모아보기</NavLink>
            </li>
          </ul>
        </div>
        {/* 로그인 회원가입 버튼 */}
        {userData ? (
          <div className="flex flex-row items-center gap-20 text-center text-white">
            <div className="cursor-pointer items-center pr-4 font-jamsilMedium text-white lg:pr-0">
              <p>{userData.nickname}님</p>
            </div>
            <div>
              <GlobalBtn
                className="border-2 border-white"
                size={'sm'}
                text={'로그아웃'}
                onClick={() => {
                  console.log('d');
                  logoutMutate();
                }}
              />
            </div>
          </div>
        ) : (
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
        )}
      </div>
    </ContentsLayout>
  );
};

export default Header;
