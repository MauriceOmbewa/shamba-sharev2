import React from 'react';
import { useWeb3Auth } from '../contexts/Web3AuthContext';
import LandownerDashboard from '../components/LandownerDashboard';
import SeekerDashboard from '../components/SeekerDashboard';
import ContractTester from '../components/ContractTester';

const Dashboard: React.FC = () => {
  const { user } = useWeb3Auth();

  if (!user) {
    return (
      <div className="min-h-screen bg-very-dark-green flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-very-dark-green">
      <div className="container mx-auto px-4 py-8">
        {/* Contract Testing Section */}
        <div className="mb-8">
          <ContractTester />
        </div>

        {/* Original Dashboard Content */}
        {user.type === 'landowner' ? (
          <LandownerDashboard user={user} />
        ) : (
          <SeekerDashboard user={user} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;