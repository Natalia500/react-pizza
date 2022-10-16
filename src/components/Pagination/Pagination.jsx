import React from 'react';

import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

const Pagination = ({ currentPage, onClickPage }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel="next >"
      onPageChange={(event) => onClickPage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage={currentPage - 1}
      previousLabel="< prev"
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
