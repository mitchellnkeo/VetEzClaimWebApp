import Link from 'next/link';
import React from 'react';
import Breadcrumbs from './Breadcrumbs';

export default function PageHeading({
  title,
  items,
  onClick,
  btn,
  btnClass = 'btn-primary',
}) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between rounded-md bg-white p-3">
      <div>
        <h2 className="mb-1 text-sm font-bold uppercase">{title}</h2>
        <Breadcrumbs items={items} />
      </div>

      {btn && (
        <div className="flex gap-2">
          <button
            type="button"
            className={`btn ${btnClass} gap-2 hover:opacity-70`}
            onClick={() => onClick()}
          >
            {btn}
          </button>
        </div>
      )}
    </div>
  );
}
