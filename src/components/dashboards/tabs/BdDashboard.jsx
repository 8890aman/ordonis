import React, { useState, useEffect } from 'react';
import {
  Card,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  TabsBody,
  TabPanel,
} from "@material-tailwind/react";
import { Building2, Users, TrendingUp, ListChecks } from 'lucide-react';
import LeadsView from './LeadsView';

// Demo leads data for empty state
const demoLeads = [
  {
    id: 1,
    personName: "John Smith",
    personEmail: "john.smith@example.com",
    company: "Tech Solutions Inc",
    status: "New",
    value: 50000
  },
  {
    id: 2,
    personName: "Sarah Johnson",
    personEmail: "sarah.j@innovate.co",
    company: "Innovate Co",
    status: "In Progress",
    value: 75000
  },
  {
    id: 3,
    personName: "Michael Brown",
    personEmail: "m.brown@global.com",
    company: "Global Enterprises",
    status: "Closed",
    value: 100000
  }
];

const BdDashboard = () => {
  const [activeTab, setActiveTab] = useState("leads");
  // Initialize with demo leads
  const [leads, setLeads] = useState(demoLeads);
  const [isLoading, setIsLoading] = useState(false); // Start with false to show initial demo data
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch leads data here
    const fetchLeads = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Simulate API call with demo data
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLeads(demoLeads);
      } catch (error) {
        console.error('Error fetching leads:', error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeads();
  }, []);

  const handleRetry = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simulate API call with demo data
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLeads(demoLeads);
    } catch (error) {
      console.error('Error fetching leads:', error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Memoize the tabs data to prevent unnecessary re-renders
  const data = React.useMemo(() => [
    {
      label: "Leads",
      value: "leads",
      icon: Building2,
      component: <LeadsView leads={leads} error={error} onRetry={handleRetry} />,
    },
    {
      label: "Contacts",
      value: "contacts",
      icon: Users,
      component: <div>Contacts View</div>,
    },
    {
      label: "Opportunities",
      value: "opportunities",
      icon: TrendingUp,
      component: <div>Opportunities View</div>,
    },
    {
      label: "Tasks",
      value: "tasks",
      icon: ListChecks,
      component: <div>Tasks View</div>,
    },
  ], [leads, error, handleRetry]); // Add dependencies

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <Card className="w-full shadow-none">
        <Tabs value={activeTab} className="w-full">
          <TabsHeader>
            {data.map(({ label, value, icon }) => {
              const IconComponent = icon;
              return (
                <Tab key={value} value={value} onClick={() => setActiveTab(value)}>
                  <div className="flex items-center gap-2">
                    <IconComponent className="w-4 h-4" />
                    {label}
                  </div>
                </Tab>
              );
            })}
          </TabsHeader>
          <TabsBody>
            {data.map(({ value, component }) => (
              <TabPanel key={value} value={value}>
                {component}
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      </Card>
    </div>
  );
};

export default BdDashboard; 