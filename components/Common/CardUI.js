import React from 'react';
import Link from 'next/link';
import Dropdown from '@/components/Dropdown';
import { useSelector } from 'react-redux';
import { DotIcon } from '../icons/SvgIcons';

export default function CardUI({
  children,
  title,
  nav,
  bgClass = 'panel bg-gradient-to-r from-cyan-500 to-cyan-400',
}) {
  const isRtl =
    useSelector((state) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

  return (
    <div className={`panel ${bgClass}`}>
      <div className="flex justify-between">
        <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">{title}</div>
        <div className="dropdown">
          <Dropdown
            offset={[0, 5]}
            placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
            btnClassName="hover:text-primary"
            button={<DotIcon />}
          >
            <ul className="text-black dark:text-white-dark">
              {nav.map((item, index) => (
                <Link
                  key={index}
                  href={item.link}
                  className="flex p-2 hover:text-info"
                >
                  {item.title}
                </Link>
              ))}
            </ul>
          </Dropdown>
        </div>
      </div>
      {children}
    </div>
  );
}
