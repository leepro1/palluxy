// import React, { useState, useEffect } from 'react';
// import ContentsLayout from '@layout/ContentsLayout';
// import { Link } from 'react-router-dom';
// import { instance } from '@/utils/axios';
// import Pagination from '@pages/HealingMeetingOverviewPage/Pagination';
// import GlobalBtn from '@components/GlobalBtn';

// const NoticeBoard = () => {
//   const [error, setError] = useState(null);
//   const [notices, setNotices] = useState([]);
//   const [totalNoticeCount, setTotalNoticeCount] = useState(0);
//   const [totalPage, setTotalPage] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   const fetchNotice = async (pageNumber) => {
//     try {
//       const response = await instance.get(`/api/notice/${pageNumber}`);
//       const result = response.data.result;
//       // const sortedNotices = result.notices.sort((a, b) => b.id - a.id);
//       // setNotices(sortedNotices);
//       setNotices(result.notices);
//       setTotalNoticeCount(result.totalNoticeCount);
//       setTotalPage(Math.ceil(result.totalNoticeCount / itemsPerPage));
//     } catch (error) {
//       setError(error);
//     }
//   };

//   useEffect(() => {
//     fetchNotice(currentPage - 1);
//   }, [currentPage]);

//   // const paginate = (pageNumber) => setCurrentPage(pageNumber);
//   // const paginatePrev = (showingPage) =>
//   //   setCurrentPage(Math.max(showingPage - 1, 1));
//   // const paginateNext = (showingPage) =>
//   //   setCurrentPage(Math.min(showingPage + 1, totalPage));

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);
//   const paginatePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
//   const paginateNext = () =>
//     setCurrentPage((prev) => Math.min(prev + 1, totalPage));

//   return (
//     <ContentsLayout>
//       <div className="flex flex-col">
//         <div className="mx-auto sm:w-[500px] md:w-[1100px]">
//           <h1 className="mb-10 text-center font-jamsilBold text-3xl text-white">
//             공지사항
//           </h1>
//           <div className="mr-0">
//             <GlobalBtn
//               className="bg-pal-purple font-jamsilRegular text-white"
//               size={'md'}
//               text={'공지사항 작성'}
//             />
//           </div>
//           <div className="mt-2">
//             <div className="flex w-full flex-row border-b-2 border-white">
//               <div className="w-[100px] items-center justify-center bg-pal-purple py-2 pl-10 font-jamsilRegular text-white">
//                 No.
//               </div>
//               <div className="w-full items-center bg-pal-purple py-2 font-jamsilRegular text-white">
//                 제목
//               </div>
//             </div>
//           </div>
//           <div className="mb-5 bg-white bg-opacity-70">
//             {notices.length > 0 ? (
//               notices.map((notice) => (
//                 <div
//                   key={notice.id}
//                   className="border-y-1 flex w-full flex-row py-2 font-jamsilLight"
//                 >
//                   <div className="flex w-full flex-col">
//                     <div className="flex flex-row">
//                       <div className="w-[100px] pl-10">{notice.id}</div>
//                       <div className="">
//                         <Link to={`/noticeboard/detail/${notice.id}`}>
//                           {notice.title}
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p>현재 등록된 공지사항이 없습니다.</p>
//             )}
//           </div>
//         </div>
//         <div className="flex justify-center">
//           <div className="">
//             <Pagination
//               itemsPerPage={itemsPerPage}
//               totalPage={totalPage}
//               paginate={paginate}
//               paginatePrev={paginatePrev}
//               paginateNext={paginateNext}
//               showingPage={currentPage}
//               showingPageMax={Math.min(currentPage + 2, totalPage)}
//               showingPageMin={Math.max(currentPage - 2, 1)}
//               pageIndexInt={currentPage}
//             />
//           </div>
//         </div>
//       </div>
//     </ContentsLayout>
//   );
// };

// export default NoticeBoard;

import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import ContentsLayout from '@layout/ContentsLayout';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { instance } from '@/utils/axios';
import Pagination from '@pages/HealingMeetingOverviewPage/Pagination';
import GlobalBtn from '@components/GlobalBtn';

const fetchNotice = async ({ queryKey }) => {
  const [_, pageNumber] = queryKey;
  const response = await instance.get(`/api/notice/${pageNumber}`);
  return response.data.result;
};

const NoticeBoard = () => {
  const { pageNumber } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const itemsPerPage = 10;

  useEffect(() => {
    if (location.pathname === '/noticeboard') {
      navigate('/noticeboard/0', { replace: true });
    }
  }, [location, navigate]);

  const currentPage = pageNumber ? parseInt(pageNumber, 10) + 1 : 1;

  const { data, error, isLoading } = useQuery({
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  const notices = data?.notices || [];
  const totalNoticeCount = data?.totalNoticeCount || 0;
  const totalPage = Math.ceil(totalNoticeCount / itemsPerPage);

  return (
    <ContentsLayout>
      <div className="flex flex-col">
        <div className="mx-auto sm:w-[500px] md:w-[1100px]">
          <h1 className="mb-10 text-center font-jamsilBold text-3xl text-white">
            공지사항
          </h1>
          <div className="mr-0">
            <GlobalBtn
              className="bg-pal-purple font-jamsilRegular text-white"
              size={'md'}
              text={'공지사항 작성'}
            />
          </div>
          <div className="mt-2">
            <div className="flex w-full flex-row border-white">
              <div className="w-[100px] items-center justify-center bg-pal-purple py-2 pl-10 font-jamsilRegular text-white">
                No.
              </div>
              <div className="w-full items-center bg-pal-purple py-2 font-jamsilRegular text-white">
                제목
              </div>
            </div>
          </div>
          <div className="mb-5 bg-white bg-opacity-70">
            {notices.length > 0 ? (
              notices.map((notice) => (
                <div
                  key={notice.id}
                  className="border-y-1 flex w-full flex-row py-2 font-jamsilLight"
                >
                  <div className="flex w-full flex-col">
                    <div className="flex flex-row">
                      <div className="w-[100px] pl-10">{notice.id}</div>
                      <div className="">
                        <Link to={`/noticeboard/detail/${notice.id}`}>
                          {notice.title}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>현재 등록된 공지사항이 없습니다.</p>
            )}
          </div>
        </div>
        <div className="flex justify-center">
          <div className="">
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
          </div>
        </div>
      </div>
    </ContentsLayout>
  );
};

export default NoticeBoard;
