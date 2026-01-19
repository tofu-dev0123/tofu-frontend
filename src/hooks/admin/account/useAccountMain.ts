'use client';

import useErrorModal from '@/hooks/admin/common/useErrorModal';
import useAccountMe from './useAccountMe';
import useAccountEdit from './useAccountEdit';

function useAccountMain() {
  const errorModalHooks = useErrorModal();
  const accountMeHooks = useAccountMe({ showError: errorModalHooks.showError });
  const accountEditHooks = useAccountEdit();

  return {
    accountName: accountMeHooks.accountName,
    username: accountMeHooks.username,
    editAccountName: accountEditHooks.editAccountName,
    editUsername: accountEditHooks.editUsername,
    editPassword: accountEditHooks.editPassword,
    editConfirmPassword: accountEditHooks.editConfirmPassword,
    isLoading: accountMeHooks.isLoading,
    userId: accountMeHooks.userId,
    accountNameEditFlag: accountEditHooks.accountNameEditFlag,
    usernameEditFlag: accountEditHooks.usernameEditFlag,
    passwordEditFlag: accountEditHooks.passwordEditFlag,
    handleAccountNameEdit: accountEditHooks.handleAccountNameEdit,
    handleUsernameEdit: accountEditHooks.handleUsernameEdit,
    handlePasswordEdit: accountEditHooks.handlePasswordEdit,
    handleAccountNameChange: accountEditHooks.handleAccountNameChange,
    handleUsernameChange: accountEditHooks.handleUsernameChange,
    handlePasswordChange: accountEditHooks.handlePasswordChange,
    handleConfirmPasswordChange: accountEditHooks.handleConfirmPasswordChange,
  };
}

export default useAccountMain;
