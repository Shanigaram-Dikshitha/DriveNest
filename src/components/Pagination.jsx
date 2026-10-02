function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="pagination">

      <button
        type="button"
        className="pagination-btn"
        onClick={() =>
          onPageChange(currentPage - 1)
        }
        disabled={currentPage === 1}
      >
        ← Previous
      </button>

      <div className="pagination-numbers">

        {Array.from(
          { length: totalPages },
          (_, index) => index + 1
        ).map((pageNumber) => (

          <button
            type="button"
            key={pageNumber}
            className={`pagination-number ${
              currentPage === pageNumber
                ? "pagination-active"
                : ""
            }`}
            onClick={() =>
              onPageChange(pageNumber)
            }
          >
            {pageNumber}
          </button>

        ))}

      </div>

      <button
        type="button"
        className="pagination-btn"
        onClick={() =>
          onPageChange(currentPage + 1)
        }
        disabled={currentPage === totalPages}
      >
        Next →
      </button>

    </div>
  );
}

export default Pagination;