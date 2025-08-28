import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import LandownerDashboard from '../components/LandownerDashboard';
import SeekerDashboard from '../components/SeekerDashboard';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-very-dark-green flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-very-dark-green">
      {user.type === 'landowner' ? (
        <LandownerDashboard user={user} />
      ) : (
        <SeekerDashboard user={user} />
      )}
    </div>
  );
};

export default Dashboard;