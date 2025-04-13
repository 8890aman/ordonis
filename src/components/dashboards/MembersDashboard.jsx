import React from 'react';
import Sidebar from './utils/Sidebar';
import { useState, useEffect } from 'react';
import TaskTab from './tabs/TaskTab';
import Chat from './tabs/Chat';
import Dashboard from './tabs/Dashboard';

const MembersDashboard = () => {
  const [selectedTab, setSelectedTab] = useState(() => {
    return localStorage.getItem("activeTab") || "dashboard";
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const storedTab = localStorage.getItem("activeTab");
      if (storedTab && storedTab !== selectedTab) {
        setSelectedTab(storedTab);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [selectedTab]);

  const renderContent = () => {
    switch (selectedTab) {
      case "dashboard":
        return <Dashboard isMember={true} />;
      case "Task":
        return <TaskTab />;
      case "Chat":
        return <Chat />;
      default:
        return <Dashboard isMember={true} />;
    }
  };

  return (
    <div className="flex">
      <Sidebar setSelectedTab={setSelectedTab} memberView={true} />
      <div className="w-full ml-72 border-l-2 border-gray-100 min-h-screen">
        {renderContent()}
      </div>
    </div>
  );
};

export default MembersDashboard;
