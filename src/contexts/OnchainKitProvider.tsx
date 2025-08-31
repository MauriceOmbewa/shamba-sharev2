import React, { ReactNode } from 'react';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { base } from 'wagmi/chains';

interface OnchainProviderProps {
  children: ReactNode;
}

export const OnchainProvider: React.FC<OnchainProviderProps> = ({ children }) => {
  return (
    <OnchainKitProvider
      apiKey={import.meta.env.VITE_ONCHAINKIT_API_KEY}
      chain={base}
    >
      {children}
    </OnchainKitProvider>
  );
};
