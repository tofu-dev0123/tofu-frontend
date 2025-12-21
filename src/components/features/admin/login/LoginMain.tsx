import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import loginIcon from '@/assets/images/login-icon.png';
import Header from '@/components/features/admin/common/Header';

function LoginMain() {
  return (
    <>
      <div className="min-h-screen flex flex-col bg-admin-main">
        <Header loginFlag={false} />
        <div className="flex justify-center items-center flex-1">
          <Card className="w-100 bg-gray-100/50">
            <div className="flex justify-center items-center my-16">
              <img
                src={loginIcon.src}
                alt="login icon"
                width={100}
                height={100}
              />
            </div>
            <CardContent>
              <form>
                <div className="flex flex-col gap-4">
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@example.com"
                    required
                    className="border-white bg-white rounded-full"
                  />
                  <Input
                    id="password"
                    type="password"
                    placeholder="password"
                    required
                    className="border-white bg-white rounded-full"
                  />
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex-col">
              <Button type="submit" className="w-full rounded-full">
                Login
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}

export default LoginMain;
