import React from 'react';
import { ChangeEvent, useState } from 'react';

import { Button } from '@/components/ui/button';
import CONSTANTS from '@/config/constants';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@material-tailwind/react';
import { changePassword } from '@/api/users';
import toast from 'react-hot-toast';
import { useAuthContext } from '@/context/AuthContext';

const ChangePassword = () => {
  const { user, reload } = useAuthContext();
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [errors, setErrors] = useState<{
    oldPassword: string | null;
    newPassword: string | null;
  }>({
    oldPassword: null,
    newPassword: null,
  });
  const [input, setInput] = useState({
    oldPassword: '',
    newPassword: '',
    newPasswordConfirm: '',
  });

  if (!user) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Spinner color="blue" />
      </div>
    );
  }

  const onInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = () => {
    if (input.newPassword !== input.newPasswordConfirm) {
      setErrors((prev) => ({
        ...prev,
        newPassword: 'Passwords do not match.',
      }));
      return;
    }

    setIsSaving(true);

    changePassword(input.oldPassword, input.newPassword)
      .then((res) => {
        if (res.code === CONSTANTS.SUCCESS) {
          reload();
          
          setInput((prev) => ({
            ...prev,
            oldPassword: '',
            newPassword: '',
            newPasswordConfirm: '',
          }));

          setErrors((prev) => ({
            ...prev,
            oldPassword: '',
          }));
          
          toast.success(res.message);
        } else {
          toast.error(res.message);
          setErrors((prev) => ({
            ...prev,
            oldPassword: res.message,
          }));
        }
      })
      .catch((err) => {
        toast.error(err.message);

        console.warn(err);
      })
      .finally(() => {
        setIsSaving(false);
      });
  };

  return (
    <div className="flex flex-col justify-between min-h-[700px]">
      <div>
        <h3 className="text-xl font-semibold text-black font-poppins">
          Change Password
        </h3>
        <p className="text-[#7D7D7D] font-medium font-poppins mt-1">
          Choose a strong password and don't reuse it for other account. It's a
          good idea to use a strong password that you don't use elsewhere. Never
          give your password to anyone we never ask our members for password.
        </p>

        <div className="flex flex-col gap-2 mt-2">
          <Input
            id="old-password"
            name="oldPassword"
            type="password"
            placeholder="Old Password"
            value={input.oldPassword}
            onChange={onInputChange}
            className="mt-4"
          />
          {errors && errors.oldPassword && (
            <Label htmlFor="old-password" className="text-red-500">
              {errors.oldPassword}
            </Label>
          )}

          <Input
            id="new-password"
            name="newPassword"
            type="password"
            placeholder="New Password"
            value={input.newPassword}
            onChange={onInputChange}
            className="mt-4"
          />
          {errors && errors.newPassword && (
            <Label htmlFor="new-password" className="text-red-500">
              {errors.newPassword}
            </Label>
          )}

          <Input
            name="newPasswordConfirm"
            type="password"
            placeholder="Confirm Password"
            value={input.newPasswordConfirm}
            onChange={onInputChange}
            className="mt-4"
          />

          {/* <p className="w-full text-right text-[#f00] font-medium font-poppins">
            <a href="#">Forgot Password?</a>
          </p> */}
        </div>
      </div>
      <div>
        <Button
          className="w-full"
          onClick={onSubmit}
          disabled={isSaving}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default ChangePassword;
