import React, { useState } from "react";
import { Card, Typography, Button, Avatar, Input, IconButton, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";
import { 
  Send, 
  Search, 
  MoreVertical, 
  Phone, 
  Video, 
  Paperclip, 
  Smile, 
  Mic, 
  X,
  CheckCheck,
  Clock,
  Users,
  Plus,
  UserPlus,
  Settings2,
  Menu,
  ArrowLeft
} from "lucide-react";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState("John Doe");
  const [showNewGroupDialog, setShowNewGroupDialog] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showSidebar, setShowSidebar] = useState(true);

  const chats = [
    { name: "John Doe", lastMessage: "Hey, how's the project going?", time: "2:30 PM", unread: 2, avatar: "https://randomuser.me/api/portraits/men/43.jpg", type: "direct" },
    { name: "Jane Smith", lastMessage: "Can you review the latest changes?", time: "1:45 PM", unread: 0, avatar: "https://randomuser.me/api/portraits/women/63.jpg", type: "direct" },
    { name: "Project Team", lastMessage: "Meeting at 3 PM", time: "12:20 PM", unread: 0, avatar: "https://randomuser.me/api/portraits/women/45.jpg", type: "group", members: 5 },
    { name: "Design Team", lastMessage: "New design approved!", time: "11:15 AM", unread: 1, avatar: "https://randomuser.me/api/portraits/men/22.jpg", type: "group", members: 3 },
    { name: "Eva Chen", lastMessage: "The design looks perfect", time: "10:30 AM", unread: 0, avatar: "https://randomuser.me/api/portraits/women/22.jpg", type: "direct" },
  ];

  const availableUsers = [
    { name: "John Doe", avatar: "https://randomuser.me/api/portraits/men/43.jpg" },
    { name: "Jane Smith", avatar: "https://randomuser.me/api/portraits/women/63.jpg" },
    { name: "Alice Johnson", avatar: "https://randomuser.me/api/portraits/women/45.jpg" },
    { name: "Bob Wilson", avatar: "https://randomuser.me/api/portraits/men/22.jpg" },
    { name: "Eva Chen", avatar: "https://randomuser.me/api/portraits/women/22.jpg" },
  ];

  const messages = [
    { text: "Hey, how's the project going?", sender: "John Doe", time: "2:30 PM", sent: true, read: true },
    { text: "It's going well! I've completed the frontend changes", sender: "You", time: "2:31 PM", sent: true, read: true },
    { text: "That's great! Can you share the progress report?", sender: "John Doe", time: "2:32 PM", sent: true, read: true },
    { text: "Sure, I'll send it right away", sender: "You", time: "2:33 PM", sent: true, read: false },
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // Here you would typically send the message to your backend
      setMessage("");
    }
  };

  const handleCreateGroup = () => {
    if (newGroupName.trim() && selectedUsers.length > 0) {
      // Here you would typically create the group in your backend
      setShowNewGroupDialog(false);
      setNewGroupName("");
      setSelectedUsers([]);
    }
  };

  const toggleUserSelection = (user) => {
    setSelectedUsers(prev => 
      prev.find(u => u.name === user.name)
        ? prev.filter(u => u.name !== user.name)
        : [...prev, user]
    );
  };

  const handleChatSelect = (chatName) => {
    setSelectedChat(chatName);
    if (window.innerWidth < 768) {
      setShowSidebar(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Chat List Sidebar */}
      <Card 
        className={`${showSidebar ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-80 border-r border-gray-200 rounded-none absolute md:relative z-10 md:z-0 bg-white h-full`}
      >
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <Typography variant="h5" className="font-bold text-gray-900">Messages</Typography>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="text" 
                className="text-gray-700 hover:text-gray-900 hidden sm:flex"
                onClick={() => setShowNewGroupDialog(true)}
              >
                <Users className="w-4 h-4 mr-1" />
                New Group
              </Button>
              <Button 
                size="sm" 
                className="bg-gray-900 hover:bg-gray-800 text-white shadow-sm"
                onClick={() => setShowNewGroupDialog(true)}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search messages..."
              className="pl-10 bg-gray-50 border-gray-200"
            />
          </div>
        </div>
        <div className="overflow-y-auto flex-1">
          {chats.map((chat, index) => (
            <div
              key={index}
              className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedChat === chat.name ? "bg-gray-100" : ""
              }`}
              onClick={() => handleChatSelect(chat.name)}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar src={chat.avatar} size="sm" className="ring-2 ring-gray-200" />
                  {chat.type === "group" && (
                    <div className="absolute -bottom-1 -right-1 bg-gray-900 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {chat.members}
                    </div>
                  )}
                  {chat.unread > 0 && (
                    <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {chat.unread}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <Typography variant="small" className="font-semibold text-gray-900 truncate">
                      {chat.name}
                    </Typography>
                    <Typography variant="small" className="text-gray-500 text-xs">
                      {chat.time}
                    </Typography>
                  </div>
                  <Typography variant="small" className="text-gray-600 truncate">
                    {chat.lastMessage}
                  </Typography>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Chat Window */}
      <div className={`${!showSidebar ? 'flex' : 'hidden'} md:flex flex-1 flex-col h-full`}>
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            {!showSidebar && (
              <IconButton 
                variant="text" 
                className="mr-1 text-gray-600 hover:text-gray-900 md:hidden"
                onClick={() => setShowSidebar(true)}
              >
                <ArrowLeft className="w-5 h-5" />
              </IconButton>
            )}
            <Avatar src="https://randomuser.me/api/portraits/men/43.jpg" size="sm" className="ring-2 ring-gray-200" />
            <div>
              <Typography variant="h6" className="font-semibold text-gray-900">{selectedChat}</Typography>
              <Typography variant="small" className="text-gray-500">Online</Typography>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {chats.find(chat => chat.name === selectedChat)?.type === "group" && (
              <IconButton variant="text" className="text-gray-600 hover:text-gray-900 hidden sm:flex">
                <UserPlus className="w-5 h-5" />
              </IconButton>
            )}
            <IconButton variant="text" className="text-gray-600 hover:text-gray-900 hidden sm:flex">
              <Phone className="w-5 h-5" />
            </IconButton>
            <IconButton variant="text" className="text-gray-600 hover:text-gray-900 hidden sm:flex">
              <Video className="w-5 h-5" />
            </IconButton>
            <IconButton variant="text" className="text-gray-600 hover:text-gray-900 hidden sm:flex">
              <Settings2 className="w-5 h-5" />
            </IconButton>
            <IconButton variant="text" className="text-gray-600 hover:text-gray-900">
              <MoreVertical className="w-5 h-5" />
            </IconButton>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[90%] sm:max-w-[70%] ${msg.sender === "You" ? "bg-gray-900 text-white" : "bg-white"} rounded-lg p-3 shadow-sm`}>
                <Typography variant="small" className="mb-1">
                  {msg.text}
                </Typography>
                <div className="flex items-center gap-1 justify-end">
                  <Typography variant="small" className="text-xs opacity-70">
                    {msg.time}
                  </Typography>
                  {msg.sender === "You" && (
                    <span className="text-xs">
                      {msg.read ? (
                        <CheckCheck className="w-3 h-3 text-blue-400" />
                      ) : (
                        <Clock className="w-3 h-3" />
                      )}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-3 sm:p-4 border-t border-gray-200 bg-white">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <IconButton variant="text" className="text-gray-600 hover:text-gray-900 hidden sm:flex">
              <Paperclip className="w-5 h-5" />
            </IconButton>
            <Input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 bg-gray-50 border-gray-200"
            />
            <IconButton variant="text" className="text-gray-600 hover:text-gray-900 hidden sm:flex">
              <Smile className="w-5 h-5" />
            </IconButton>
            <IconButton variant="text" className="text-gray-600 hover:text-gray-900 hidden sm:flex">
              <Mic className="w-5 h-5" />
            </IconButton>
            <Button
              type="submit"
              className="bg-gray-900 hover:bg-gray-800 text-white shadow-sm"
            >
              <Send className="w-5 h-5" />
            </Button>
          </form>
        </div>
      </div>

      {/* Toggle Sidebar Button for Mobile */}
      {!showSidebar && (
        <Button
          size="sm"
          className="fixed bottom-6 left-6 z-20 bg-gray-900 hover:bg-gray-800 text-white shadow-lg md:hidden rounded-full w-12 h-12 flex items-center justify-center"
          onClick={() => setShowSidebar(true)}
        >
          <Menu className="w-6 h-6" />
        </Button>
      )}

      {/* New Group Dialog */}
      <Dialog open={showNewGroupDialog} handler={() => setShowNewGroupDialog(false)} size="sm" className="bg-white">
        <DialogHeader className="flex justify-between items-center">
          <Typography variant="h5" className="font-bold text-gray-900">Create New Group</Typography>
          <IconButton variant="text" onClick={() => setShowNewGroupDialog(false)}>
            <X className="w-5 h-5" />
          </IconButton>
        </DialogHeader>
        <DialogBody>
          <div className="space-y-4">
            <Input
              label="Group Name"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              className="bg-gray-50 border-gray-200"
            />
            <div>
              <Typography variant="small" className="font-medium text-gray-900 mb-2">Select Members</Typography>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {availableUsers.map((user, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
                      selectedUsers.find(u => u.name === user.name)
                        ? "bg-gray-100"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => toggleUserSelection(user)}
                  >
                    <Avatar src={user.avatar} size="sm" className="ring-2 ring-gray-200" />
                    <Typography variant="small" className="font-medium text-gray-900">
                      {user.name}
                    </Typography>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
          <Button
            variant="text"
            onClick={() => setShowNewGroupDialog(false)}
            className="text-gray-700 hover:text-gray-900 w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreateGroup}
            className="bg-gray-900 hover:bg-gray-800 text-white shadow-sm w-full sm:w-auto"
            disabled={!newGroupName.trim() || selectedUsers.length === 0}
          >
            Create Group
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default Chat; 