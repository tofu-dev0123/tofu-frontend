import Links from '@/components/features/public/blogs/slug/Links';
import Profile from '@/components/features/public/common/Profile';
function BlogFooter() {
  return (
    <div className="w-full flex flex-col mt-10">
      <hr className="w-full my-2 border-black/10" />
      <Links position="left" />
      <Profile />
    </div>
  );
}

export default BlogFooter;
