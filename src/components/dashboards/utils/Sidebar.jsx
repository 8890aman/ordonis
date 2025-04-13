import React, { useState, useEffect, Suspense, memo } from "react";
import { Typography, Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input, IconButton } from "@material-tailwind/react";
import { LayoutDashboard, UserIcon, Settings, Briefcase, ChevronRight, ListTodo, LogOut, Crown, Sparkles, MessageSquare, Bot, Send, X } from "lucide-react";
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Spline from '@splinetool/react-spline';
import { authAPI } from '../../../services/api';
import { useNavigate } from 'react-router-dom';

// Replace the AIModel and AI3DSection components with a single SplineSection
const SplineSection = memo(() => {
  return (
    <div className="h-[200px] border-b border-gray-200 bg-gray-50 relative overflow-hidden">
      <div 
        className="w-full h-full"
        style={{
          filter: 'grayscale(100%) brightness(1.1) contrast(1.1)'
        }}
      >
        <Spline 
          scene="https://prod.spline.design/jxeKH4RRUUZDG1Nw/scene.splinecode"
          style={{ 
            width: '100%',
            height: '100%',
          }}
        />
      </div>
      <div 
        className="absolute bottom-5 right-4 w-[150px] h-[100px] bg-gray-50 " 
        style={{ 
          zIndex: 1000,
        }} 
      />
    </div>
  );
});

const Sidebar = ({ setSelectedTab, memberView }) => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const planInfo = { name: "Pro Plan", status: "Active", renewalDate: "April 20, 2025" };
  const dailyQuotes = ["The best way to predict the future is to create it. - Peter Drucker"];

  const [quote, setQuote] = useState("");
  const [activeTab, setActiveTab] = useState(() => {
    // Get the saved tab from localStorage, default to "dashboard" if not found
    return localStorage.getItem("activeTab") || "dashboard";
  });

  const [aiMessage, setAiMessage] = useState("");
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);

  useEffect(() => {
    const user = authAPI.getCurrentUser();
    if (user) {
      setUserInfo({
        name: user.name,
        email: user.email,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`
      });
    }
    setQuote(dailyQuotes[0]); // Simplified for example
  }, []);

  useEffect(() => {
    // Save activeTab to localStorage whenever it changes
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  const handleTabClick = (tab) => {
    setActiveTab(tab); // Update active tab
    setSelectedTab(tab); // Call parent function to update selected tab
  };

  const handleLogout = () => {
    authAPI.logout();
    navigate('/login');
  };

  // Define navigation items based on user role
  const getNavigationItems = () => {
    const baseItems = [
      { icon: <LayoutDashboard className="w-5 h-5" />, label: "Dashboard", tab: "dashboard" },
      { icon: <ListTodo className="w-5 h-5" />, label: "Tasks", tab: "Task" },
      { icon: <MessageSquare className="w-5 h-5" />, label: "Chat", tab: "Chat" },
    ];

    // Add admin-only items if not in member view
    if (!memberView) {
      baseItems.push(
        { icon: <UserIcon className="w-5 h-5" />, label: "Team", tab: "Team" },
        { icon: <Settings className="w-5 h-5" />, label: "Settings", tab: "Settings" }
      );
    }

    return baseItems;
  };

  // Memoize the input component
  const ChatInput = memo(({ value, onChange }) => (
    <div className="border-t border-gray-200 p-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex gap-3 items-start">
          <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
            <UserIcon className="w-4 h-4 text-gray-600" />
          </div>
          <div className="flex-1">
            <Input
              key="ai-chat-input"
              value={value}
              onChange={onChange}
              placeholder="Message NOVA..."
              className="!border-none !ring-0 focus:!border-none focus:!ring-0 bg-transparent text-gray-800"
              containerProps={{
                className: "!border-none !ring-0",
              }}
              labelProps={{
                className: "hidden",
              }}
            />
            <div className="mt-1 flex items-center gap-2">
              <Typography variant="small" className="text-gray-400">
                Press Enter to send
              </Typography>
              <div className="h-1 w-1 rounded-full bg-gray-300" />
              <Button 
                variant="text"
                className="text-gray-400 hover:text-gray-600 p-1 h-auto"
                onClick={() => setIsAIChatOpen(false)}
              >
                ESC to close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));

  // Memoize the modal content
  const ModalContent = memo(() => (
    <>
      <DialogHeader className="border-b border-gray-200 p-4">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
            <Bot className="w-5 h-5 text-gray-700" />
          </div>
          <div>
            <Typography className="font-medium text-gray-900">NOVA</Typography>
            <Typography variant="small" className="text-gray-500">AI Assistant</Typography>
          </div>
        </div>
      </DialogHeader>
      <DialogBody className="h-[600px] flex flex-col p-0">
        <SplineSection />
        <div className="flex-1 overflow-y-auto">
          {/* AI Welcome Message */}
          <div className="p-4 hover:bg-gray-50 transition-colors">
            <div className="flex gap-3 max-w-3xl mx-auto">
              <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-gray-600" />
              </div>
              <div className="flex-1 prose prose-gray">
                <Typography className="text-gray-800 leading-relaxed">
                  Hello! I'm NOVA, your AI assistant. I can help you with:
                </Typography>
                <ul className="mt-2 space-y-1 text-gray-600 text-sm">
                  <li>Task management and organization</li>
                  <li>Project planning and scheduling</li>
                  <li>Team coordination questions</li>
                  <li>General administrative assistance</li>
                </ul>
              </div>
            </div>
          </div>
          {/* Message history would go here */}
        </div>
      </DialogBody>
    </>
  ));

  const AIChatModal = memo(() => (
    <Dialog
      open={isAIChatOpen}
      handler={() => setIsAIChatOpen(false)}
      className="min-w-[600px] max-w-[800px]"
    >
      <DialogHeader className="border-b border-gray-200 p-4">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
            <Bot className="w-5 h-5 text-gray-700" />
          </div>
          <div>
            <Typography className="font-medium text-gray-900">NOVA</Typography>
            <Typography variant="small" className="text-gray-500">AI Assistant</Typography>
          </div>
        </div>
      </DialogHeader>
      <DialogBody className="h-[600px] flex flex-col p-0">
        <SplineSection />

        <div className="flex-1 overflow-y-auto">
          {/* AI Welcome Message */}
          <div className="p-4 hover:bg-gray-50 transition-colors">
            <div className="flex gap-3 max-w-3xl mx-auto">
              <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-gray-600" />
              </div>
              <div className="flex-1 prose prose-gray">
                <Typography className="text-gray-800 leading-relaxed">
                  Hello! I'm NOVA, your AI assistant. I can help you with:
                </Typography>
                <ul className="mt-2 space-y-1 text-gray-600 text-sm">
                  <li>Task management and organization</li>
                  <li>Project planning and scheduling</li>
                  <li>Team coordination questions</li>
                  <li>General administrative assistance</li>
                </ul>
              </div>
            </div>
          </div>
          {/* Message history would go here */}
        </div>
        
        {/* Message Input */}
        <div className="border-t border-gray-200 p-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex gap-3 items-start">
              <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                <UserIcon className="w-4 h-4 text-gray-600" />
              </div>
              <div className="flex-1">
                <Input
                  key="ai-chat-input"
                  value={aiMessage}
                  onChange={(e) => setAiMessage(e.target.value)}
                  placeholder="Message NOVA..."
                  className="!border-none !ring-0 focus:!border-none focus:!ring-0 bg-transparent text-gray-800"
                  containerProps={{
                    className: "!border-none !ring-0",
                  }}
                  labelProps={{
                    className: "hidden",
                  }}
                />
                <div className="mt-1 flex items-center gap-2">
                  <Typography variant="small" className="text-gray-400">
                    Press Enter to send
                  </Typography>
                  <div className="h-1 w-1 rounded-full bg-gray-300" />
                  <Button 
                    variant="text"
                    className="text-gray-400 hover:text-gray-600 p-1 h-auto"
                    onClick={() => setIsAIChatOpen(false)}
                  >
                    ESC to close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogBody>
    </Dialog>
  ));

  return (
    <div className="w-72 h-screen fixed left-0 top-0 flex flex-col p-6 gap-6 bg-white text-black border-r border-gray-100">
      {/* Logo Section */}
      <div className="flex items-center gap-3 px-2">
        <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
          <Typography variant="h6" className="font-bold text-white">L</Typography>
        </div>
        <Typography variant="h5" className="font-bold text-black">Logo</Typography>
      </div>

      {/* User Profile Section */}
      {userInfo && (
        <div className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
          <div className="flex items-center gap-3">
            <img src={userInfo.avatar} alt="User Avatar" className="w-8 h-8 rounded-full border-2 border-gray-200" />
            <div>
              <Typography variant="small" className="font-semibold text-gray-900">{userInfo.name}</Typography>
              <Typography variant="small" className="text-gray-500">{userInfo.email}</Typography>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Section */}
      <nav className="w-full flex flex-col gap-1">
        {getNavigationItems().map((item, index) => (
          <div
            key={index}
            className={`px-3 py-2 rounded-lg cursor-pointer flex items-center justify-between transition-all duration-200 ${
              activeTab === item.tab 
                ? "bg-gray-100 text-black" 
                : "text-gray-600 hover:bg-gray-50 hover:text-black"
            }`}
            onClick={() => handleTabClick(item.tab)}
          >
            <div className="flex items-center gap-3">
              {React.cloneElement(item.icon, {
                className: `w-5 h-5 ${
                  activeTab === item.tab ? "text-black" : "text-gray-500"
                }`
              })}
              <Typography 
                variant="small" 
                className={`font-medium`}
              >
                {item.label}
              </Typography>
            </div>
            <ChevronRight 
              className={`w-4 h-4 ${
                activeTab === item.tab ? "text-black" : "text-gray-400"
              }`}
            />
          </div>
        ))}
      </nav>

      {/* Plan Section - Only show for non-members */}
      {!memberView && (
        <>
          <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <Crown className="w-4 h-4 text-yellow-500" />
              <Typography variant="small" className="font-semibold text-gray-900">{planInfo.name}</Typography>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <Typography variant="small" className="text-gray-600">{planInfo.status}</Typography>
              </div>
              <Typography variant="small" className="text-gray-500">Renews: {planInfo.renewalDate}</Typography>
            </div>
            <Button 
              size="sm" 
              className="mt-3 w-full bg-black hover:bg-gray-800 text-white transition-colors flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Upgrade Plan
            </Button>
          </div>
          
          {/* Notion-style AI Chat Button */}
          <Button 
            className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 transition-colors flex items-center justify-center gap-2 py-3 normal-case font-normal"
            onClick={() => setIsAIChatOpen(true)}
          >
            <Bot className="w-4 h-4" />
            Chat with NOVA
          </Button>
        </>
      )}

      {/* Quote Section */}
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
        <Typography variant="small" className="text-gray-600 italic leading-relaxed">"{quote}"</Typography>
      </div>

      {/* Logout Button */}
      <div className="mt-auto">
        <Button 
          className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 transition-colors flex items-center justify-center gap-2"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>

      {/* AI Chat Modal */}
      <AIChatModal />
    </div>
  );
};

export default Sidebar;