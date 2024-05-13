'use client';

import * as React from 'react';

import { useConnect } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { Button } from './ui/button';

const ConnectButton = () => {
  const { connect, isPending } = useConnect();

  const onClickHandler = () => {
    connect({ connector: injected() });
  };

  return (
    <Button
      name='connect'
      role='button'
      disabled={isPending}
      className='button w-full'
      onClick={onClickHandler}
      type='button'
    >
      Connect Wallet
    </Button>
  );
};

export default ConnectButton;
