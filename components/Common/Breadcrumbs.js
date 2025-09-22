import Link from 'next/link';
import React from 'react';

export default function Breadcrumbs({ items }) {
  return (
    <ul className="flex space-x-2 rtl:space-x-reverse">
      {items.map((item, index) => (
        <li
          key={index}
          className={
            index === 0
              ? ''
              : 'capitalize before:content-["/"] ltr:before:mr-2 rtl:before:ml-2'
          }
        >
          {item.noLink ? (
            <span>{item.name}</span>
          ) : (
            <Link
              href={item.link}
              className="capitalize text-primary hover:underline"
            >
              {item.name}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}
