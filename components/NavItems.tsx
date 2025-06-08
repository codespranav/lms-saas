"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Companions', href: '/companions' },
  { label: 'My Journey', href: '/my-journey' },
];

const NavItems = () => {
  const [active, setIsActive] = useState(true)
  const pathName = usePathname();
  return (
    <nav className="flex items-center gap-4">
      {navItems.map((item, index) => (
        <Link
        href={item.href}
        key={index}
        className={`${
          pathName === item.href ? 'text-blue-500 font-semibold' : 'text-gray-700'
        } hover:underline`}
      >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default NavItems;
