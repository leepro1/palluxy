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
    await instance.post('/api/logout');
  };

  const userData = queryClient.getQueryData(['userInfo']);

  const { mutate: logoutMutate } = useMutation({
    mutationFn: userLogout,
    onSuccess: () => {
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
    <div className="flex">
      <div className="mx-auto my-0 w-[1380px]">
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
                <span>더보기</span>
                <div className="bg-pal- absolute -bottom-[208px] z-50 hidden w-full bg-pal-purple py-3 group-hover:block">
                  <ul className="flex flex-col gap-y-4">
                    <li>
                      <NavLink to={'/noticeboard'}>공지사항</NavLink>
                    </li>
                    <li>
                      <NavLink to={'/healingmeeting'}>치유모임</NavLink>
                    </li>
                    <li>
                      <NavLink to={'/meetingoverview/1'}>
                        치유모임 모아보기
                      </NavLink>
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
                      <NavLink to={'/memoryspaceoverview'}>
                        추억공간 탐방
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <ul className="hidden gap-x-16 font-jamsilMedium text-white md:flex md:text-base lg:text-xl">
              <li>
                <NavLink to={'/noticeboard'}>공지사항</NavLink>
              </li>
              <li>
                <NavLink to={'/healingmeeting'}>치유모임</NavLink>
              </li>
              <li>
                <NavLink to={'/meetingoverview/1'}>치유모임 모아보기</NavLink>
              </li>
              <li>
                <NavLink
                  to={userData ? `/memoryspace/${userData.id}` : `/memoryspace`}
                >
                  추억공간
                </NavLink>
              </li>
              <li>
                <NavLink to={'/memoryspaceoverview'}>추억공간 탐방</NavLink>
              </li>
            </ul>
          </div>
          {/* 로그인 회원가입 버튼 */}
          {userData ? (
            <div className="group relative flex flex-row items-center gap-20 pr-4 text-center font-semibold text-white">
              <span className="cursor-pointer">{userData.nickname} 님</span>
              <div className="absolute right-0 top-6 z-50 hidden w-[100px] flex-col gap-y-2 rounded-md bg-pal-purple py-2 group-hover:flex">
                <p
                  className="cursor-pointer"
                  onClick={() => {
                    navigate('/mypage');
                  }}
                >
                  마이 페이지
                </p>
                <p
                  className="cursor-pointer"
                  onClick={() => {
                    logoutMutate();
                  }}
                >
                  로그아웃
                </p>
              </div>
            </div>
          ) : (
            <div className="flex gap-x-16 font-jamsilMedium text-white">
              <NavLink
                to={'/signin'}
                className={'pr-2 md:pr-0'}
              >
                <GlobalBtn
                  className="border-2 border-white"
                  size={'sm'}
                  text={'로그인'}
                />
              </NavLink>
              <NavLink
                to={'/signup'}
                className={'hidden md:block'}
              >
                <GlobalBtn
                  className="bg-pal-purple"
                  size={'sm'}
                  text={'회원가입'}
                />
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
