import React from 'react';
import Search from '@/components/features/public/blogs/Search';

function BlogsList() {
  const handleSearch = (value: string) => {
    console.log(value);
  };

  return (
    <div className="h-full lg:w-180 w-full px-2 flex flex-col py-10 mx-auto">
      <Search handleSearch={handleSearch} />
      bloglist
    </div>
  );
}

export default BlogsList;
