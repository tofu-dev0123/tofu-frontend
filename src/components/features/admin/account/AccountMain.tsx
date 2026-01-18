'use client';

import { Card, CardContent } from '@/components/ui/card';
import useAccountMain from '@/hooks/admin/account/useAccountMain';

function AccountMain() {
  const { account, isLoading, getAccount } = useAccountMain();
  return (
    <div className="h-full w-full lg:w-6xl flex flex-col mx-auto p-4 lg:px-0">
      <div className="h-full lg:w-200 w-full lg:mx-auto flex flex-col">
        <Card className="border-none shadow-none">
          <CardContent>
            <div>{account?.account_name}</div>
            <div>{account?.username}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AccountMain;
