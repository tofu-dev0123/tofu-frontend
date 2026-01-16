'use client';

import { ReactNode, useState } from 'react';
import { motion } from 'framer-motion';

type Placement = 'top' | 'bottom' | 'left' | 'right';

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  placement?: Placement;
  offset?: number;
}

export default function Tooltip({
  content,
  children,
  placement = 'top',
  offset = 8,
}: TooltipProps) {
  const [open, setOpen] = useState(false);

  const basePosition =
    'absolute z-50 whitespace-nowrap rounded bg-white px-2 py-1 text-xs shadow border border-black/10';

  const positionMap: Record<Placement, string> = {
    top: `bottom-full left-1/2 -translate-x-1/2 mb-${offset}`,
    bottom: `top-full left-1/2 -translate-x-1/2 mt-${offset}`,
    left: `right-full top-1/2 -translate-y-1/2 mr-${offset}`,
    right: `left-full top-1/2 -translate-y-1/2 ml-${offset}`,
  };

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      tabIndex={0}
    >
      {children}

      {open && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: open ? 1 : 0 }}
          transition={{ duration: 0.2, delay: 0.2 }}
          role="tooltip"
          className={`${basePosition} ${positionMap[placement]}`}
        >
          {content}
        </motion.span>
      )}
    </span>
  );
}
