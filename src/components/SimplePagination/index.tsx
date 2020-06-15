import React from 'react'

type TProps = {
  pageNumber: number,
  maxPageNumber: number
  onPageChange: (newPageNumber: number) => void
}


const SimplePagination: React.FC<TProps> = ({ pageNumber, maxPageNumber, onPageChange }) => (
  <div className="d-flex justify-content-between">
    <button disabled={pageNumber === 0 ? true : false} onClick={() => onPageChange(pageNumber - 1)} className='btn btn-light'>Prev page</button>
    <button disabled={pageNumber >= maxPageNumber ? true : false} onClick={() => onPageChange(pageNumber + 1)} className='btn btn-light'>Next page</button>
  </div>
)

export default SimplePagination