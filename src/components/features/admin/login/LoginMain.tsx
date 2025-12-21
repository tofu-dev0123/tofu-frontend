import Header from '@/components/features/admin/common/Header';
import LoginFrom from './LoginFrom';

function LoginMain() {
  return (
    <>
      <div className="min-h-screen flex flex-col bg-admin-main">
        <Header loginFlag={false} />
        <LoginFrom />
      </div>
    </>
  );
}

export default LoginMain;
