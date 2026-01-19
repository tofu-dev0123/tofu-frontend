import { useState } from 'react';

function useAccountEdit() {
  const [accountNameEditFlag, setAccountNameEditFlag] = useState(false);
  const [usernameEditFlag, setUsernameEditFlag] = useState(false);
  const [passwordEditFlag, setPasswordEditFlag] = useState(false);

  const handleAccountNameEdit = () => {
    if (accountNameEditFlag) {
      setEditAccountName('');
    }
    setAccountNameEditFlag(!accountNameEditFlag);
  };

  const handleUsernameEdit = () => {
    if (usernameEditFlag) {
      setEditUsername('');
    }
    setUsernameEditFlag(!usernameEditFlag);
  };

  const handlePasswordEdit = () => {
    if (passwordEditFlag) {
      setEditPassword('');
      setEditConfirmPassword('');
    }
    setPasswordEditFlag(!passwordEditFlag);
  };

  const [editAccountName, setEditAccountName] = useState<string>('');
  const [editUsername, setEditUsername] = useState<string>('');
  const [editPassword, setEditPassword] = useState<string>('');
  const [editConfirmPassword, setEditConfirmPassword] = useState<string>('');

  const handleAccountNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditAccountName(e.target.value);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEditConfirmPassword(e.target.value);
  };

  return {
    accountNameEditFlag,
    usernameEditFlag,
    passwordEditFlag,
    handleAccountNameEdit,
    handleUsernameEdit,
    handlePasswordEdit,
    editAccountName,
    editUsername,
    editPassword,
    editConfirmPassword,
    handleAccountNameChange,
    handleUsernameChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
  };
}

export default useAccountEdit;
