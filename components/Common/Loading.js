import React from 'react';

export default function Loading(CSS = null) {
  return (
    <span
      className={`m-auto flex h-14 w-14 animate-spin rounded-full border-8 border-[#f1f2f3] border-l-primary align-middle ${CSS}`}
    ></span>
  );
}
