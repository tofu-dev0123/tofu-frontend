import Image from 'next/image';
import { NAVIGATION_ITEMS } from '@/constants/admin/navigationItem';

interface NavigationProps {
  isOpen: boolean;
}

function Navigation({ isOpen }: NavigationProps) {
  const navigationClass = isOpen ? 'w-60' : 'w-16';

  return (
    <nav
      className={`${navigationClass} h-full bg-admin-main transition-all duration-500`}
    >
      <div className="flex flex-col gap-15 pt-20">
        {NAVIGATION_ITEMS.map((item) => (
          <div
            key={item.href}
            className="h-12 mx-auto p-2 hover:bg-gray-500/50 rounded-full duration-100 cursor-pointer"
          >
            <div key={item.href} className="flex items-center px-4">
              {/* icon */}
              <div className="w-6 flex justify-center shrink-0">
                <Image
                  src={item.icon}
                  alt={item.label}
                  width={25}
                  height={25}
                />
              </div>

              {/* label */}
              <div
                className={`
                overflow-hidden
                transition-all duration-300
                ${isOpen ? 'w-24 opacity-100 ml-3' : 'w-0 opacity-0 ml-0'}
              `}
              >
                <span
                  className={`
                  block text-white text-lg whitespace-nowrap
                  transition-transform duration-300
                  ${isOpen ? 'translate-x-0' : '-translate-x-2'}
                `}
                >
                  {item.label}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
}

export default Navigation;
