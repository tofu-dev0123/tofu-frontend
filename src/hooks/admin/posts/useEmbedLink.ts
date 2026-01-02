import React, { useState } from 'react';

function useEmbedLink() {
  const [open, setOpen] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e);
    setOpen(true);
    setCursorPosition({ x: e.clientX, y: e.clientY });
  };

  const handleClose = () => {
    setOpen(false);
    setCursorPosition({ x: 0, y: 0 });
  };

  return {
    open,
    cursorPosition,
    handleOpen,
    handleClose,
  };
}

export default useEmbedLink;
