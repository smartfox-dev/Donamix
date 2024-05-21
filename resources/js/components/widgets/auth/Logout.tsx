import React from 'react';
import { logout } from '@/actions/auth';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  logout().then(() => {
    navigate('/auth');
  });

  return <></>;
};

export default Logout;
