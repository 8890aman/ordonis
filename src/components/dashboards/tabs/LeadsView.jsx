import React from 'react';
import {
  Card,
  Typography,
  Button,
  IconButton,
  Chip,
  Avatar,
} from "@material-tailwind/react";
import { PlusCircle, Search, Filter, Download, AlertCircle, RefreshCw } from 'lucide-react';

const LeadsView = ({ leads, error, onRetry }) => {
  // Ensure leads is always an array, even if undefined or null is passed
  const leadsArray = Array.isArray(leads) ? leads : [];

  // Show error state if there's an error
  if (error) {
    return (
      <Card className="w-full p-6 h-[calc(100vh-200px)] flex flex-col items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <Typography variant="h5" className="text-red-500">
            Error Loading Leads
          </Typography>
          <Typography variant="paragraph" className="text-gray-500 max-w-sm">
            {error.message || "There was an error loading the leads. Please try again."}
          </Typography>
          <Button 
            className="bg-gray-900 mt-4 flex items-center gap-2" 
            onClick={onRetry}
          >
            <RefreshCw className="w-4 h-4" />
            Retry
          </Button>
        </div>
      </Card>
    );
  }

  // Show empty state if there are no leads
  if (leadsArray.length === 0) {
    return (
      <Card className="w-full p-6 h-[calc(100vh-200px)] flex flex-col items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
            <PlusCircle className="w-8 h-8 text-gray-400" />
          </div>
          <Typography variant="h5" className="text-gray-700">
            No Leads Yet
          </Typography>
          <Typography variant="paragraph" className="text-gray-500 max-w-sm">
            Start adding leads to track your business development progress.
          </Typography>
          <Button className="bg-gray-900 mt-4 flex items-center gap-2">
            <PlusCircle className="w-4 h-4" />
            Add New Lead
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <Typography variant="h4" className="text-gray-900">
            Leads
          </Typography>
          <Typography variant="small" className="text-gray-600">
            Manage and track your business leadsgit 
          </Typography>
        </div>
        <Button className="bg-gray-900 flex items-center gap-2">
          <PlusCircle className="w-4 h-4" />
          Add New Lead
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search leads..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:border-gray-400"
          />
        </div>
        <Button variant="outlined" className="flex items-center gap-2" color="gray">
          <Filter className="w-4 h-4" />
          Filters
        </Button>
        <Button variant="outlined" className="flex items-center gap-2" color="gray">
          <Download className="w-4 h-4" />
          Export
        </Button>
      </div>

      {/* Leads Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                <th className="border-b border-gray-100 bg-gray-50 p-4">
                  <Typography variant="small" className="font-medium text-gray-600">
                    Person
                  </Typography>
                </th>
                <th className="border-b border-gray-100 bg-gray-50 p-4">
                  <Typography variant="small" className="font-medium text-gray-600">
                    Company
                  </Typography>
                </th>
                <th className="border-b border-gray-100 bg-gray-50 p-4">
                  <Typography variant="small" className="font-medium text-gray-600">
                    Status
                  </Typography>
                </th>
                <th className="border-b border-gray-100 bg-gray-50 p-4">
                  <Typography variant="small" className="font-medium text-gray-600">
                    Value
                  </Typography>
                </th>
                <th className="border-b border-gray-100 bg-gray-50 p-4">
                  <Typography variant="small" className="font-medium text-gray-600">
                    Actions
                  </Typography>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {leadsArray.map((lead) => (
                <tr key={lead?.id || Math.random()} className="hover:bg-gray-50/50 transition-colors duration-200">
                  <td className="p-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white shadow-md">
                          <span className="text-sm font-medium">
                            {lead?.personName?.charAt(0) || '?'}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <Typography variant="small" className="font-medium text-gray-900">
                          {lead?.personName || 'Unknown'}
                        </Typography>
                        <Typography variant="small" className="text-gray-600">
                          {lead?.personEmail || 'No email provided'}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <Typography variant="small">
                      {lead?.company || 'N/A'}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Chip
                      value={lead?.status || 'Unknown'}
                      className={`
                        ${lead?.status === 'New' ? 'bg-blue-50 text-blue-700' :
                          lead?.status === 'In Progress' ? 'bg-yellow-50 text-yellow-700' :
                          lead?.status === 'Closed' ? 'bg-green-50 text-green-700' :
                          'bg-gray-50 text-gray-700'}
                      `}
                    />
                  </td>
                  <td className="p-4">
                    <Typography variant="small">
                      ${(lead?.value || 0).toLocaleString()}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-gray-900">
                        View
                      </Button>
                      <Button size="sm" variant="outlined" color="gray">
                        Edit
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default LeadsView; 