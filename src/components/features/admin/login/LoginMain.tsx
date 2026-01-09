import Header from '@/components/features/admin/common/Navigation';
import LoginFrom from './LoginFrom';

function LoginMain() {
  return (
    <>
      <div className="h-full flex flex-col bg-admin-main">
        <LoginFrom />
      </div>
    </>
  );
}

export default LoginMain;
