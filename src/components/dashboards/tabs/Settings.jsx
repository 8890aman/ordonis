import React from "react";
import { Typography, Button, Input, Switch, Select, Option } from "@material-tailwind/react";
import { 
  UserIcon, Bell, Lock, Palette, Save, Shield, Moon, 
  Globe, Eye, EyeOff, Mail, Calendar, Clock, 
  CreditCard, Database, Trash2, BellRing, BellOff
} from "lucide-react";

const Settings = () => {
  // Dummy state for demonstration
  const [notifications, setNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);
  const [emailNotifications, setEmailNotifications] = React.useState(true);
  const [calendarSync, setCalendarSync] = React.useState(true);
  const [showOnlineStatus, setShowOnlineStatus] = React.useState(true);
  const [autoSave, setAutoSave] = React.useState(true);
  const [language, setLanguage] = React.useState("en");
  const [timezone, setTimezone] = React.useState("UTC");

  return (
    <div className="p-8 w-full bg-white min-h-screen text-black">
      {/* Page Header */}
      <div className="mb-10">
        <Typography variant="h4" className="font-bold text-gray-900">
          Settings
        </Typography>
        <Typography variant="small" className="text-gray-500 mt-2">
          Customize your account and preferences
        </Typography>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6 max-w-3xl">
        {/* Account Info */}
        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gray-50 rounded-lg">
              <UserIcon className="w-5 h-5 text-gray-700" />
            </div>
            <Typography variant="h6" className="font-semibold text-gray-900">
              Account Information
            </Typography>
          </div>
          <div className="space-y-5">
            <div>
              <Typography variant="small" className="text-gray-600 mb-2 font-medium">
                Full Name
              </Typography>
              <Input
                type="text"
                placeholder="Jane Doe"
                className="border-gray-200 focus:border-gray-400 text-gray-900"
                labelProps={{ className: "hidden" }}
              />
            </div>
            <div>
              <Typography variant="small" className="text-gray-600 mb-2 font-medium">
                Email
              </Typography>
              <Input
                type="email"
                placeholder="jane.doe@example.com"
                className="border-gray-200 focus:border-gray-400 text-gray-900"
                labelProps={{ className: "hidden" }}
              />
            </div>
            <div>
              <Typography variant="small" className="text-gray-600 mb-2 font-medium">
                Bio
              </Typography>
              <Input
                type="text"
                placeholder="Tell us about yourself"
                className="border-gray-200 focus:border-gray-400 text-gray-900"
                labelProps={{ className: "hidden" }}
              />
            </div>
            <Button 
              className="bg-black hover:bg-gray-800 text-white transition-colors flex items-center justify-center gap-2 w-full md:w-auto"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gray-50 rounded-lg">
              <Bell className="w-5 h-5 text-gray-700" />
            </div>
            <Typography variant="h6" className="font-semibold text-gray-900">
              Notifications
            </Typography>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Typography variant="small" className="text-gray-900 font-medium">
                  Push Notifications
                </Typography>
                <Typography variant="small" className="text-gray-500">
                  Receive instant updates on your device
                </Typography>
              </div>
              <Switch
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
                color="gray"
                className="checked:bg-gray-900"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Typography variant="small" className="text-gray-900 font-medium">
                  Email Notifications
                </Typography>
                <Typography variant="small" className="text-gray-500">
                  Get updates delivered to your inbox
                </Typography>
              </div>
              <Switch
                checked={emailNotifications}
                onChange={() => setEmailNotifications(!emailNotifications)}
                color="gray"
                className="checked:bg-gray-900"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Typography variant="small" className="text-gray-900 font-medium">
                  Calendar Sync
                </Typography>
                <Typography variant="small" className="text-gray-500">
                  Sync your tasks with your calendar
                </Typography>
              </div>
              <Switch
                checked={calendarSync}
                onChange={() => setCalendarSync(!calendarSync)}
                color="gray"
                className="checked:bg-gray-900"
              />
            </div>
          </div>
        </div>

        {/* Privacy */}
        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gray-50 rounded-lg">
              <Shield className="w-5 h-5 text-gray-700" />
            </div>
            <Typography variant="h6" className="font-semibold text-gray-900">
              Privacy
            </Typography>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Typography variant="small" className="text-gray-900 font-medium">
                  Show Online Status
                </Typography>
                <Typography variant="small" className="text-gray-500">
                  Let others see when you're active
                </Typography>
              </div>
              <Switch
                checked={showOnlineStatus}
                onChange={() => setShowOnlineStatus(!showOnlineStatus)}
                color="gray"
                className="checked:bg-gray-900"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Typography variant="small" className="text-gray-900 font-medium">
                  Profile Visibility
                </Typography>
                <Typography variant="small" className="text-gray-500">
                  Control who can see your profile
                </Typography>
              </div>
              <Select
                value="public"
                className="w-40"
                labelProps={{ className: "hidden" }}
              >
                <Option value="public">Public</Option>
                <Option value="private">Private</Option>
                <Option value="friends">Friends Only</Option>
              </Select>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gray-50 rounded-lg">
              <Lock className="w-5 h-5 text-gray-700" />
            </div>
            <Typography variant="h6" className="font-semibold text-gray-900">
              Security
            </Typography>
          </div>
          <div className="space-y-5">
            <div>
              <Typography variant="small" className="text-gray-600 mb-2 font-medium">
                Current Password
              </Typography>
              <Input
                type="password"
                placeholder="••••••••"
                className="border-gray-200 focus:border-gray-400 text-gray-900"
                labelProps={{ className: "hidden" }}
              />
            </div>
            <div>
              <Typography variant="small" className="text-gray-600 mb-2 font-medium">
                New Password
              </Typography>
              <Input
                type="password"
                placeholder="••••••••"
                className="border-gray-200 focus:border-gray-400 text-gray-900"
                labelProps={{ className: "hidden" }}
              />
            </div>
            <div>
              <Typography variant="small" className="text-gray-600 mb-2 font-medium">
                Two-Factor Authentication
              </Typography>
              <div className="flex items-center gap-2">
                <Switch
                  checked={false}
                  onChange={() => {}}
                  color="gray"
                  className="checked:bg-gray-900"
                />
                <Typography variant="small" className="text-gray-500">
                  Enable 2FA for additional security
                </Typography>
              </div>
            </div>
            <Button 
              className="bg-black hover:bg-gray-800 text-white transition-colors flex items-center justify-center gap-2 w-full md:w-auto"
            >
              <Lock className="w-4 h-4" />
              Update Security Settings
            </Button>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gray-50 rounded-lg">
              <Globe className="w-5 h-5 text-gray-700" />
            </div>
            <Typography variant="h6" className="font-semibold text-gray-900">
              Preferences
            </Typography>
          </div>
          <div className="space-y-5">
            <div>
              <Typography variant="small" className="text-gray-600 mb-2 font-medium">
                Language
              </Typography>
              <Select
                value={language}
                onChange={(value) => setLanguage(value)}
                className="border-gray-200 focus:border-gray-400"
                labelProps={{ className: "hidden" }}
              >
                <Option value="en">English</Option>
                <Option value="es">Spanish</Option>
                <Option value="fr">French</Option>
                <Option value="de">German</Option>
                <Option value="ja">Japanese</Option>
              </Select>
            </div>
            <div>
              <Typography variant="small" className="text-gray-600 mb-2 font-medium">
                Timezone
              </Typography>
              <Select
                value={timezone}
                onChange={(value) => setTimezone(value)}
                className="border-gray-200 focus:border-gray-400"
                labelProps={{ className: "hidden" }}
              >
                <Option value="UTC">UTC</Option>
                <Option value="EST">Eastern Time</Option>
                <Option value="PST">Pacific Time</Option>
                <Option value="GMT">GMT</Option>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Typography variant="small" className="text-gray-900 font-medium">
                  Auto-Save
                </Typography>
                <Typography variant="small" className="text-gray-500">
                  Automatically save your changes
                </Typography>
              </div>
              <Switch
                checked={autoSave}
                onChange={() => setAutoSave(!autoSave)}
                color="gray"
                className="checked:bg-gray-900"
              />
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gray-50 rounded-lg">
              <Moon className="w-5 h-5 text-gray-700" />
            </div>
            <Typography variant="h6" className="font-semibold text-gray-900">
              Appearance
            </Typography>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Typography variant="small" className="text-gray-900 font-medium">
                  Dark Mode
                </Typography>
                <Typography variant="small" className="text-gray-500">
                  Switch to a darker theme for better visibility in low light
                </Typography>
              </div>
              <Switch
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                color="gray"
                className="checked:bg-gray-900"
              />
            </div>
            <div>
              <Typography variant="small" className="text-gray-600 mb-2 font-medium">
                Font Size
              </Typography>
              <Select
                value="medium"
                className="border-gray-200 focus:border-gray-400"
                labelProps={{ className: "hidden" }}
              >
                <Option value="small">Small</Option>
                <Option value="medium">Medium</Option>
                <Option value="large">Large</Option>
              </Select>
            </div>
          </div>
        </div>

        {/* Billing */}
        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gray-50 rounded-lg">
              <CreditCard className="w-5 h-5 text-gray-700" />
            </div>
            <Typography variant="h6" className="font-semibold text-gray-900">
              Billing
            </Typography>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Typography variant="small" className="text-gray-900 font-medium">
                  Current Plan
                </Typography>
                <Typography variant="small" className="text-gray-500">
                  Pro Plan - $29/month
                </Typography>
              </div>
              <Button 
                variant="outlined"
                className="border-gray-200 text-gray-700 hover:bg-gray-50"
              >
                Change Plan
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Typography variant="small" className="text-gray-900 font-medium">
                  Payment Method
                </Typography>
                <Typography variant="small" className="text-gray-500">
                  Visa ending in 4242
                </Typography>
              </div>
              <Button 
                variant="outlined"
                className="border-gray-200 text-gray-700 hover:bg-gray-50"
              >
                Update
              </Button>
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gray-50 rounded-lg">
              <Database className="w-5 h-5 text-gray-700" />
            </div>
            <Typography variant="h6" className="font-semibold text-gray-900">
              Data Management
            </Typography>
          </div>
          <div className="space-y-4">
            <Button 
              variant="outlined"
              className="border-gray-200 text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2"
            >
              <Database className="w-4 h-4" />
              Export Data
            </Button>
            <Button 
              variant="outlined"
              className="border-red-200 text-red-600 hover:bg-red-50 flex items-center justify-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;