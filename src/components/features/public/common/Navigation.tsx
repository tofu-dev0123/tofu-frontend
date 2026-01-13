'use client';

import Link from 'next/link';

function Navigation() {
  const navigationItems = [
    {
      label: 'About',
      href: '/about',
    },
    {
      label: 'Blog',
      href: '/blog',
    },
    {
      label: 'Products',
      href: '/products',
    },
    {
      label: 'Books',
      href: '/books',
    },
    {
      label: 'Contact',
      href: '/contact',
    },
  ];
  return (
    <div className="flex items-center justify-start gap-10">
      {navigationItems.map((item) => (
        <Link
          href={item.href}
          key={item.label}
          className="lg:text-lg text-sm font-semibold tracking-[0.3em] font-sub-logo text-black/50 hover:text-black hover:translate-y-[-1px] transition-all duration-300"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}

export default Navigation;
