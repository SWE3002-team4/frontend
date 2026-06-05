"use client";

import React from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { GoogleLogin } from '@react-oauth/google';

export function SocialLoginGroup() {
  const { loginWithGoogle, isLoading } = useAuth();

  return (
    <div className="w-full flex justify-center mt-4">
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          if (credentialResponse.credential) {
            await loginWithGoogle(credentialResponse.credential);
          }
        }}
        onError={() => {

          alert('구글 로그인에 실패했습니다.');
        }}
        useOneTap
      />
    </div>
  );
}
