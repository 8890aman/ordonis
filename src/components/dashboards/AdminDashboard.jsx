import React from 'react';
import Sidebar from './utils/Sidebar';
import { useState, useEffect } from 'react'; // Added useEffect
import Team from './tabs/Team';
import Settings from './tabs/Settings';
import Dashboard from './tabs/Dashboard';
import TaskTab from './tabs/TaskTab';
import Chat from './tabs/Chat';

const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState(() => {
    // Load from localStorage, default to "dashboard" if not found
    return localStorage.getItem("activeTab") || "dashboard";
  });
  
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile and handle resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Optional: Sync with localStorage changes from other components
  useEffect(() => {
    const handleStorageChange = () => {
      const storedTab = localStorage.getItem("activeTab");
      if (storedTab && storedTab !== selectedTab) {
        setSelectedTab(storedTab);
      }
    };

    // Listen for storage changes (useful if multiple tabs/windows are open)
    window.addEventListener('storage', handleStorageChange);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [selectedTab]);

  const renderContent = () => {
    switch (selectedTab) {
      case "dashboard":
        return <Dashboard />;
      case "Team":
        return <Team />;
      case "Task":
        return <TaskTab />;
      case "Settings":
        return <Settings />;
      case "Chat":
        return <Chat />;
      default:
        return <Dashboard />;
    }
  };

  // Render mobile bottom navigation bar
  const renderMobileNavBar = () => {
    return (
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg z-50 border-t border-gray-200">
        <div className="flex justify-around items-center px-2 py-2 max-w-lg mx-auto">
          <button 
            onClick={() => setSelectedTab("dashboard")} 
            className={`flex flex-col items-center justify-center w-1/5 py-2 ${selectedTab === "dashboard" ? "text-blue-600" : "text-gray-600"}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-xs font-medium">Dashboard</span>
          </button>
          
          <button 
            onClick={() => setSelectedTab("Team")} 
            className={`flex flex-col items-center justify-center w-1/5 py-2 ${selectedTab === "Team" ? "text-blue-600" : "text-gray-600"}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span className="text-xs font-medium">Team</span>
          </button>
          
          <button 
            onClick={() => setSelectedTab("Task")} 
            className={`flex flex-col items-center justify-center w-1/5 py-2 ${selectedTab === "Task" ? "text-blue-600" : "text-gray-600"}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span className="text-xs font-medium">Tasks</span>
          </button>
          
          <button 
            onClick={() => setSelectedTab("Chat")} 
            className={`flex flex-col items-center justify-center w-1/5 py-2 ${selectedTab === "Chat" ? "text-blue-600" : "text-gray-600"}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="text-xs font-medium">Chat</span>
          </button>
          
          <button 
            onClick={() => setSelectedTab("Settings")} 
            className={`flex flex-col items-center justify-center w-1/5 py-2 ${selectedTab === "Settings" ? "text-blue-600" : "text-gray-600"}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-xs font-medium">Settings</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex relative">
      {!isMobile && <Sidebar setSelectedTab={setSelectedTab} />}
      <div className={`w-full ${!isMobile ? "ml-72 border-l-2 border-gray-100" : ""} min-h-screen ${isMobile ? "pb-20" : ""}`}>
        {renderContent()}
      </div>
      {isMobile && renderMobileNavBar()}
    </div>
  );
};

export default AdminDashboard;