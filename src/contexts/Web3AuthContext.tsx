import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { coinbaseWallet } from 'wagmi/connectors';

interface User {
  id: string;
  address: string;
  name?: string;
  type: 'landowner' | 'seeker';
}

interface Web3AuthContextType {
  user: User | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  setUserType: (type: 'landowner' | 'seeker') => void;
  isLoading: boolean;
  isConnected: boolean;
}

const Web3AuthContext = createContext<Web3AuthContextType | undefined>(undefined);

export const useWeb3Auth = () => {
  const context = useContext(Web3AuthContext);
  if (context === undefined) {
    throw new Error('useWeb3Auth must be used within a Web3AuthProvider');
  }
  return context;
};

interface Web3AuthProviderProps {
  children: ReactNode;
}

export const Web3AuthProvider: React.FC<Web3AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const { address, isConnected } = useAccount();
  const { connect: wagmiConnect } = useConnect();
  const { disconnect: wagmiDisconnect } = useDisconnect();

  useEffect(() => {
    if (isConnected && address) {
      // Check for stored user data
      const storedUserData = localStorage.getItem(`user_${address}`);
      if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        setUser(userData);
      } else {
        // Create a new user profile for this address
        const newUser: User = {
          id: address,
          address,
          type: 'seeker', // Default type
        };
        setUser(newUser);
      }
    } else {
      setUser(null);
    }
    setIsLoading(false);
  }, [address, isConnected]);

  const connect = async () => {
    try {
      setIsLoading(true);
      await wagmiConnect({ 
        connector: coinbaseWallet({
          appName: 'LandLease Base Mini App',
          preference: 'smartWalletOnly',
        })
      });
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const disconnect = () => {
    wagmiDisconnect();
    setUser(null);
  };

  const setUserType = (type: 'landowner' | 'seeker') => {
    if (user && address) {
      const updatedUser = { ...user, type };
      setUser(updatedUser);
      localStorage.setItem(`user_${address}`, JSON.stringify(updatedUser));
    }
  };

  const value = {
    user,
    connect,
    disconnect,
    setUserType,
    isLoading,
    isConnected,
  };

  return <Web3AuthContext.Provider value={value}>{children}</Web3AuthContext.Provider>;
};
