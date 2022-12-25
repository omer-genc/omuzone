import React from 'react';

type Props = {
  page: number;
  totalPage: number;
  onchange: (page: number) => void;
};
const Pagination: React.FC<Props> = ({ page, totalPage, onchange }) => {
  return (
    <div className="mx-auto flex justify-center gap-4 my-8">
      <button
        className="h-12 w-12 bg-orange-500 rounded-full text-white cursor-pointer hover:bg-orange-600 disabled:bg-slate-500 disabled:cursor-not-allowed"
        onClick={() => onchange(page - 1)}
        disabled={page === 1}
      >
        {'<'}
      </button>
      {page > 1 &&
        Array.from({ length: page - 1 }, (_, i) => i + 1)
          .slice(-5)
          .map((p) => (
            <button
              className="h-12 w-12 bg-orange-500 rounded-full text-white cursor-pointer hover:bg-orange-600 disabled:bg-slate-500 disabled:cursor-not-allowed"
              key={p}
              onClick={() => onchange(p)}
              disabled={p === page || p > totalPage}
            >
              {p}
            </button>
          ))}
      <button
        className="h-12 w-12 bg-orange-500 rounded-full text-white cursor-pointer hover:bg-orange-600 disabled:bg-slate-500 disabled:cursor-not-allowed"
        disabled
      >
        {page}{' '}
      </button>

      {Array.from({ length: totalPage }, (_, i) => i + 1)
        .slice(page, 5)
        .map((p) => (
          <button
            className="h-12 w-12 bg-orange-500 rounded-full text-white cursor-pointer hover:bg-orange-600 disabled:bg-slate-500 disabled:cursor-not-allowed"
            key={p}
            onClick={() => onchange(p)}
            disabled={p === page || p > totalPage}
          >
            {p}
          </button>
        ))}
      <button
        className="h-12 w-12 bg-orange-500 rounded-full text-white cursor-pointer hover:bg-orange-600 disabled:bg-slate-500 disabled:cursor-not-allowed"
        onClick={() => onchange(page + 1)}
        disabled={page === totalPage}
      >
        {'>'}
      </button>
    </div>
  );
};

export default Pagination;
