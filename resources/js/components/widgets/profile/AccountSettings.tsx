import React from 'react';
import { Spinner, Switch } from '@material-tailwind/react';
import { User, userValidator } from '@/lib/validation/user';
import { useEffect, useState } from 'react';

import Button from '@/components/common/Button';
import CONSTANTS from '@/config/constants';
import { toast } from 'react-hot-toast';
import { updateUser } from '@/api/users';
import { useAuthContext } from '@/context/AuthContext';

const AccountSettings = () => {
  const { user, reload } = useAuthContext();
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [settings, setSettings] = useState({
    is_enable_friend_request: true,
    is_enable_private_message: true,
    is_enable_tagging: true,
    is_enable_private_profile: true,
    is_activate_account: true,
    is_remove_ads: true,
  });

  useEffect(() => {
    if (user && user.setting) {
      setSettings(prevSettings => ({
        ...prevSettings,
        ...user.setting,
      }));
    }
  }, [user]);

  if (!user) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Spinner color="blue" />
      </div>
    );
  }

  const onSwitch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.currentTarget;
    console.log(name, value, checked);
    setSettings((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const onDeleteAccount = () => {
    setIsDeleting(true);
    const newUser: User = userValidator.parse({
      ...user,
      deleted: true,
    });

    updateUser(user.id, newUser)
      .then((res) => {
        if (res.code === CONSTANTS.SUCCESS) {
          reload();
          console.log(res);
          toast.success(res.message);
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        console.warn(err);
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };

  const onSubmit = () => {
    setIsSaving(true);
    const newUser: User = userValidator.parse({
      ...user,
      setting: {
        ...settings,
      },
    });

    updateUser(user.id, newUser)
      .then((res) => {
        if (res.code === CONSTANTS.SUCCESS) {
          reload();
          console.log(res);
          toast.success(res.message);
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        console.warn(err);
      })
      .finally(() => {
        setIsSaving(false);
      });
  };

  return (
    <div className="w-full">
      <h3 className="text-black font-poppins text-xl font-semibold">
        Account Privacy Settings
      </h3>
      <p className="text-[#7D7D7D] font-medium font-poppins mt-[14px]">
        Control who can see your profile, who can send you message, and who can
        add you as a friend. User profiles are shown across all Donamix website.
        Complete your profile 100% to reach more people.
      </p>

      <div className="px-0 mt-5">
        <div className="bg-white rounded-[9px] flex gap-3 justify-between items-center px-2 py-2 md:px-5 md:py-4">
          <div>
            <h6 className="text-base font-semibold text-black font-poppins">
              Enable connection requests
            </h6>
            <p className="text-[#666] font-poppins font-medium">
              Enable this if you want people to add you as friend.
            </p>
          </div>

          <Switch
            id="enable-friend-requests"
            ripple={false}
            checked={settings.is_enable_friend_request}
            name="is_enable_friend_request"
            className="w-full h-full checked:bg-gray"
            onChange={onSwitch}
            containerProps={{
              className: 'w-11 h-6',
            }}
            circleProps={{
              className:
                'before:hidden left-0.5 border-none peer-checked:bg-black',
            }}
            crossOrigin={undefined}
          />
        </div>

        <div className="bg-white rounded-[9px] flex gap-3 justify-between items-center px-2 py-2 md:px-5 md:py-4 mt-3">
          <div>
            <h6 className="text-base font-semibold text-black font-poppins">
              Enable private messages
            </h6>
            <p className="text-[#666] font-poppins font-medium">
              Allow users to send you private messages.
            </p>
          </div>

          <Switch
            id="enable-private-message"
            ripple={false}
            checked={settings.is_enable_private_message}
            name="is_enable_private_message"
            className="w-full h-full checked:bg-gray"
            onChange={onSwitch}
            containerProps={{
              className: 'w-11 h-6',
            }}
            circleProps={{
              className:
                'before:hidden left-0.5 border-none peer-checked:bg-black',
            }}
            crossOrigin={undefined}
          />
        </div>

        <div className="bg-white rounded-[9px] flex gap-3 justify-between items-center px-2 py-2 md:px-5 md:py-4 mt-3">
          <div>
            <h6 className="text-base font-semibold text-black font-poppins">
              Enable tagging
            </h6>
            <p className="text-[#666] font-poppins font-medium">
              Allow users to tag you in their posts.
            </p>
          </div>

          <Switch
            id="enable-tagging"
            ripple={false}
            checked={settings.is_enable_tagging}
            name="is_enable_tagging"
            className="w-full h-full checked:bg-gray"
            onChange={onSwitch}
            containerProps={{
              className: 'w-11 h-6',
            }}
            circleProps={{
              className:
                'before:hidden left-0.5 border-none peer-checked:bg-black',
            }}
            crossOrigin={undefined}
          />
        </div>

        <div className="bg-white rounded-[9px] flex gap-3 justify-between items-center px-2 py-2 md:px-5 md:py-4 mt-3">
          <div>
            <h6 className="text-base font-semibold text-black font-poppins">
              Enable private profile
            </h6>
            <p className="text-[#666] font-poppins font-medium">
              Enable this if only your friends are view your activites.
            </p>
          </div>

          <Switch
            id="enable-private-profile"
            ripple={false}
            checked={settings.is_enable_private_profile}
            name="is_enable_private_profile"
            className="w-full h-full checked:bg-gray"
            onChange={onSwitch}
            containerProps={{
              className: 'w-11 h-6',
            }}
            circleProps={{
              className:
                'before:hidden left-0.5 border-none peer-checked:bg-black',
            }}
            crossOrigin={undefined}
          />
        </div>

        <div className="bg-white rounded-[9px] flex gap-3 justify-between items-center px-2 py-2 md:px-5 md:py-4 mt-3">
          <div>
            <h6 className="text-base font-semibold text-black font-poppins">
              Activate/Deactivate Account
            </h6>
            <p className="text-[#666] font-poppins font-medium">
              When you re activate then all your data will show again on
              website.
            </p>
          </div>

          <Switch
            id="activate-account"
            ripple={false}
            checked={settings.is_activate_account}
            name="is_activate_account"
            className="w-full h-full checked:bg-gray"
            onChange={onSwitch}
            containerProps={{
              className: 'w-11 h-6',
            }}
            circleProps={{
              className:
                'before:hidden left-0.5 border-none peer-checked:bg-black',
            }}
            crossOrigin={undefined}
          />
        </div>

        <div className="bg-white rounded-[9px] flex gap-3 justify-between items-center px-2 py-2 md:px-5 md:py-4 mt-3">
          <div>
            <h6 className="text-base font-semibold text-black font-poppins">
              Remove Ads
            </h6>
            <p className="text-[#666] font-poppins font-medium">
              Enable this to remove ads.
            </p>
          </div>

          <Switch
            id="remove-ads"
            ripple={false}
            checked={settings.is_remove_ads}
            name="is_remove_ads"
            className="w-full h-full checked:bg-gray"
            onChange={onSwitch}
            containerProps={{
              className: 'w-11 h-6',
            }}
            circleProps={{
              className:
                'before:hidden left-0.5 border-none peer-checked:bg-black',
            }}
            crossOrigin={undefined}
          />
        </div>

        <div className="bg-white rounded-[9px] flex gap-3 justify-between items-center px-2 py-2 md:px-5 md:py-4 mt-3">
          <div>
            <h6 className="text-base font-semibold text-black font-poppins">
              Delete my Account
            </h6>
            <p className="text-[#666] font-poppins font-medium">
              Permanently delete my Account.
            </p>
          </div>

          <Button
            className="text-white bg-red-600 hover:bg-red-400"
            onClick={onDeleteAccount}
            disabled={isDeleting}
          >
            Delete Account
          </Button>
        </div>

        <Button
          className="w-full mt-4"
          onClick={onSubmit}
          disabled={isSaving}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default AccountSettings;
