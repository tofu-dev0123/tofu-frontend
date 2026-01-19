'use client';

import { Card, CardContent } from '@/components/ui/card';
import useAccountMain from '@/hooks/admin/account/useAccountMain';
import AccountInfoColumn from './AccountInfoColumn';

function AccountMain() {
  const {
    accountName,
    username,
    editAccountName,
    editUsername,
    editPassword,
    editConfirmPassword,
    isLoading,
    accountNameEditFlag,
    usernameEditFlag,
    passwordEditFlag,
    handleAccountNameEdit,
    handleUsernameEdit,
    handlePasswordEdit,
    handleAccountNameChange,
    handleUsernameChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
  } = useAccountMain();
  return (
    <div className="h-full w-full lg:w-6xl flex flex-col mx-auto p-4 lg:px-0">
      <div className="h-full lg:w-200 w-full lg:mx-auto flex flex-col">
        <Card className="border-none shadow-none p-4">
          <CardContent className="my-2 flex flex-col gap-4">
            {/* アカウント名 */}
            <AccountInfoColumn
              label="アカウント名"
              value={accountName}
              editValue={editAccountName}
              placeholder="変更後のアカウント名"
              type="text"
              onEditChange={handleAccountNameChange}
              onEdit={handleAccountNameEdit}
              editFlag={accountNameEditFlag}
              onSubmit={() => {}}
            />
            {/* ユーザー名 */}
            <AccountInfoColumn
              label="ユーザー名"
              value={username}
              editValue={editUsername}
              placeholder="変更後のユーザー名"
              type="text"
              onEditChange={handleUsernameChange}
              onEdit={handleUsernameEdit}
              editFlag={usernameEditFlag}
              onSubmit={() => {}}
            />
            {/* パスワード */}
            <AccountInfoColumn
              label="パスワード"
              value=""
              editValue={editPassword}
              confirmValue={editConfirmPassword}
              placeholder="変更後のパスワード"
              type="password"
              onEditChange={handlePasswordChange}
              onConfirmChange={handleConfirmPasswordChange}
              onEdit={handlePasswordEdit}
              editFlag={passwordEditFlag}
              onSubmit={() => {}}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AccountMain;
