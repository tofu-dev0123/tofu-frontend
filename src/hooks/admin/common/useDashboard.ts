'use client';

import { useState } from 'react';

function useDashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClickMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return { isMenuOpen, handleClickMenu };
}

export default useDashboard;
