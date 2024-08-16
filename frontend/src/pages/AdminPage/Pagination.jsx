import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({
  totalPage,
  paginate,
  paginatePrev,
  paginateNext,
  showingPage,
  showingPageMax,
  showingPageMin,
  pageIndexInt,
}) => {
  const pageNumbers = [];

  for (let i = showingPageMin; i <= showingPageMax; i++) {
    pageNumbers.push(i);
  }
  const handleClick = (number) => {
    // 기본 동작 방지
    paginate(number);
  };
  const handleClickPrev = (number, e) => {
    e.preventDefault();
    paginatePrev(number);
  };
  const handleClickNext = (number, e) => {
    e.preventDefault();
    paginateNext(number);
  };

  return (
    <nav>
      <ul className="pagination">
        {showingPageMin === 1 ? (
          <span className="material-symbols-outlined mt-2.5 text-gray-500">
            keyboard_double_arrow_left
          </span>
        ) : (
          <span
            onClick={(e) => handleClickPrev(showingPage, e)}
            className="material-symbols-outlined mt-2.5 cursor-pointer"
          >
            keyboard_double_arrow_left
          </span>
        )}
        {pageIndexInt !== 1 ? (
          <span
            onClick={(e) => handleClick(pageIndexInt - 1, e)}
            className="material-symbols-outlined mt-2.5 cursor-pointer"
          >
            keyboard_arrow_left
          </span>
        ) : (
          <span className="material-symbols-outlined mt-2.5 text-gray-500">
            keyboard_arrow_left
          </span>
        )}

        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={(e) => handleClick(number, e)}
            className={`font-sans relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle text-xs font-medium uppercase transition-all ${
              pageIndexInt === number
                ? 'hover:shadow-pal-purple-900 bg-pal-purple text-pal-lightwhite shadow-sm shadow-gray-900/10 hover:shadow-lg'
                : 'text-pal-lightwhite hover:bg-gray-900/10 active:bg-gray-900/20'
            } disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
            type="button"
          >
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
              {number}
            </span>
          </button>
        ))}
        {pageIndexInt !== totalPage ? (
          <span
            onClick={(e) => handleClick(pageIndexInt + 1, e)}
            className="material-symbols-outlined mt-2.5 cursor-pointer"
          >
            keyboard_arrow_right
          </span>
        ) : (
          <span className="material-symbols-outlined mt-2.5 text-gray-500">
            keyboard_arrow_right
          </span>
        )}
        {showingPageMax === totalPage ? (
          <span className="material-symbols-outlined mt-2.5 text-gray-500">
            keyboard_double_arrow_right
          </span>
        ) : (
          <span
            onClick={(e) => handleClickNext(showingPage, e)}
            className="material-symbols-outlined mt-2.5 cursor-pointer"
          >
            keyboard_double_arrow_right
          </span>
        )}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  totalPage: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
  paginatePrev: PropTypes.func.isRequired,
  paginateNext: PropTypes.func.isRequired,
  showingPage: PropTypes.number.isRequired,
  showingPageMax: PropTypes.number.isRequired,
  showingPageMin: PropTypes.number.isRequired,
  pageIndexInt: PropTypes.number.isRequired,
};

export default Pagination;
