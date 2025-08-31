import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getConfig } from './wagmi';
import { OnchainProvider } from './contexts/OnchainKitProvider';
import App from './App.tsx';
import './index.css';

const config = getConfig();
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <OnchainProvider>
          <App />
        </OnchainProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>
);
