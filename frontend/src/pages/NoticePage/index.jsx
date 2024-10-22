import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import ContentsLayout from '@layout/ContentsLayout';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { instance } from '@/utils/axios';
import Loading from '@components/Loading';
import Pagination from '@pages/HealingMeetingOverviewPage/Pagination';
import GlobalBtn from '@components/GlobalBtn';
import CreateNotice from '@pages/NoticePage/CreateNotice';

const fetchNotice = async ({ queryKey }) => {
  const [pageNumber] = queryKey[1];
  const response = await instance.get(`/api/notice/${pageNumber}`);
  return response.data.result;
};

const fetchUserByAccess = async () => {
  const access = sessionStorage.getItem('access');
  if (!access) return null;
  const res = await instance.get('/api/users/user-info');
  return res.data.result;
};

const NoticeBoard = () => {
  const queryClient = useQueryClient();
  const { data: userInfo } = useQuery({
    queryKey: ['userInfo'],
    queryFn: fetchUserByAccess,
    initialData: () => queryClient.getQueryData(['userInfo']),
  });

  const { pageNumber } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const itemsPerPage = 10;
  const [notification, setNotification] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  const showNotificationMessage = (message) => {
    setNotification(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 5000); // 5초 후에 알림 사라짐
  };

  useEffect(() => {
    if (location.pathname === '/noticeboard') {
      navigate('/noticeboard/0', { replace: true });
    }
  }, [location, navigate]);

  const currentPage = pageNumber ? parseInt(pageNumber, 10) + 1 : 1;

  const { data, isLoading } = useQuery({
    queryKey: ['notices', pageNumber || '0'],
    queryFn: fetchNotice,
    keepPreviousData: true,
  });

  const paginate = (pageNumber) => navigate(`/noticeboard/${pageNumber - 1}`);
  const paginatePrev = () =>
    navigate(`/noticeboard/${Math.max(currentPage - 2, 0)}`);
  const paginateNext = () =>
    navigate(
      `/noticeboard/${Math.min(currentPage, (data?.totalPages || 1) - 1)}`,
    );

  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    );

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const notices = data?.notices || [];
  const totalNoticeCount = data?.totalNoticeCount || 0;
  const totalPage = Math.ceil(totalNoticeCount / itemsPerPage);

  return (
    <ContentsLayout>
      <div className="flex h-full flex-col">
        <div className="mx-auto min-h-[600px] sm:w-[500px] md:w-[1000px]">
          <h1 className="mb-10 text-center font-jamsilBold text-xl text-white md:text-3xl">
            공지사항
          </h1>

          {userInfo?.isAdmin && (
            <div className="mr-0">
              <GlobalBtn
                onClick={openModal}
                className="bg-pal-purple font-jamsilRegular text-white"
                size={'md'}
                text={'공지사항 작성'}
              />
            </div>
          )}

          <div className="mt-2">
            <div className="flex w-full items-center rounded-t-md bg-pal-purple pl-2 font-jamsilRegular text-sm text-white md:text-base">
              <div className="w-[50px] py-3 sm:w-[80px] sm:pl-4 md:w-[150px] md:pl-10">
                <p>No.</p>
              </div>
              <div className="w-[150px] py-3 sm:w-[250px] sm:pl-4 md:w-[600px] md:pl-10">
                <p>제목</p>
              </div>
              <div className="w-[100px] py-3 sm:w-[150px] sm:pl-4 md:w-[300px] md:pl-10">
                <p>날짜</p>
              </div>
            </div>
          </div>
          <div className="mb-5 rounded-b-md bg-white bg-opacity-70">
            {notices.length > 0 ? (
              notices.map((notice) => (
                <div
                  key={notice.id}
                  className="border-y-1 flex w-full py-3 font-jamsilLight hover:bg-white hover:bg-opacity-40 hover:font-jamsilMedium"
                >
                  <Link to={`/noticeboard/detail/${notice.id}`}>
                    <div className="flex w-full items-center pl-2 text-sm md:text-base">
                      <div className="w-[50px] sm:w-[80px] sm:pl-4 md:w-[150px] md:pl-10">
                        {notice.id}
                      </div>
                      <div className="w-[150px] sm:w-[250px] sm:pl-4 md:w-[600px] md:pl-8">
                        {notice.title}
                      </div>
                      <div className="w-[100px] sm:w-[150px] sm:pl-4 md:w-[240px] md:pl-0">
                        {notice.createdAt}
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <p className="py-10 text-center font-jamsilLight text-xl">
                현재 등록된 공지사항이 없습니다.
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-center">
          <div className="text-pal-lightwhite">
            {notices.length > 0 && (
              <Pagination
                itemsPerPage={itemsPerPage}
                totalPage={totalPage}
                paginate={paginate}
                paginatePrev={paginatePrev}
                paginateNext={paginateNext}
                showingPage={currentPage}
                showingPageMax={Math.min(currentPage + 2, totalPage)}
                showingPageMin={Math.max(currentPage - 2, 1)}
                pageIndexInt={currentPage}
              />
            )}
          </div>
        </div>
      </div>
      {isModalOpen && (
        <CreateNotice
          removeModal={closeModal}
          onSessionCreated={showNotificationMessage}
        />
      )}
      {showNotification && (
        <div className="fixed bottom-0 left-0 right-0 mx-4 mb-4 w-full rounded-lg bg-pal-purple px-4 py-2 text-center text-pal-lightwhite shadow-lg">
          {notification}
        </div>
      )}
    </ContentsLayout>
  );
};

export default NoticeBoard;
