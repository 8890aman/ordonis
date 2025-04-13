import React from "react";
import { Card, Typography, Button, Avatar, Progress, IconButton, Dialog, DialogHeader, DialogBody, DialogFooter, Input, Tooltip, Chip, Badge } from "@material-tailwind/react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip as ChartTooltip, 
  Legend, 
  ArcElement,
  PointElement,
  LineElement,
  Filler
} from "chart.js";
import { 
  ClipboardList, 
  CheckCircle, 
  Users, 
  Hourglass, 
  TrendingUp, 
  Calendar, 
  Bell, 
  ArrowUpRight,
  MessagesSquare,
  Send,
  X,
  Search,
  Settings,
  HelpCircle,
  Plus,
  Clock,
  BarChart2,
  PieChart,
  Activity,
  ChevronRight,
  Filter,
  MoreVertical
} from "lucide-react";

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  ChartTooltip, 
  Legend, 
  ArcElement,
  PointElement,
  LineElement,
  Filler
);

const Dashboard = ({ isMember = false }) => {
  const [isActivityModalOpen, setIsActivityModalOpen] = React.useState(false);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = React.useState(false);
  const [isViewCalendarOpen, setIsViewCalendarOpen] = React.useState(false);
  const [isViewDepartmentOpen, setIsViewDepartmentOpen] = React.useState(false);

  const getStats = () => {
    const baseStats = [
      { icon: <ClipboardList className="w-6 h-6 text-gray-700" />, title: "Total Tasks", value: "158", trend: "+24% this month", trendUp: true },
      { icon: <Hourglass className="w-6 h-6 text-gray-700" />, title: "Pending Tasks", value: "63", trend: "-8% this week", trendUp: false },
      { icon: <CheckCircle className="w-6 h-6 text-gray-700" />, title: "Completed Tasks", value: "95", trend: "+18% this week", trendUp: true },
    ];

    if (!isMember) {
      baseStats.push({ 
        icon: <Users className="w-6 h-6 text-gray-700" />, 
        title: "Total Users", 
        value: "42", 
        trend: "+5 new users", 
        trendUp: true 
      });
    }

    return baseStats;
  };

  const taskChartData = {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    datasets: [
      { 
        label: "Tasks Completed", 
        data: [12, 18, 15, 22, 16, 9, 14], 
        backgroundColor: "#4B5563", 
        borderColor: "#4B5563", 
        borderWidth: 1, 
        hoverBackgroundColor: "#374151",
        borderRadius: 6
      },
      {
        label: "Tasks Assigned",
        data: [15, 22, 18, 25, 20, 10, 16],
        backgroundColor: "#9CA3AF",
        borderColor: "#9CA3AF",
        borderWidth: 1,
        hoverBackgroundColor: "#6B7280",
        borderRadius: 6
      }
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { 
      legend: { 
        labels: { color: "#374151", font: { size: 12 } },
        position: 'top',
      }, 
      title: { display: false } 
    },
    scales: { 
      x: { 
        ticks: { color: "#374151" }, 
        grid: { color: "rgba(209, 213, 219, 0.2)" } 
      }, 
      y: { 
        ticks: { color: "#374151" }, 
        grid: { color: "rgba(209, 213, 219, 0.2)" },
        beginAtZero: true
      } 
    },
  };

  const doughnutData = {
    labels: ['Completed', 'In Progress', 'Pending', 'Overdue'],
    datasets: [
      {
        data: [45, 30, 15, 10],
        backgroundColor: [
          '#4B5563',
          '#6B7280',
          '#9CA3AF',
          '#D1D5DB',
        ],
        borderColor: [
          '#4B5563',
          '#6B7280',
          '#9CA3AF',
          '#D1D5DB',
        ],
        borderWidth: 1,
        hoverOffset: 5,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        position: 'right',
        labels: {
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.parsed}%`;
          }
        }
      }
    },
  };

  const activityTrendData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
    datasets: [
      {
        label: "Team Activity",
        data: [65, 78, 52, 91, 85, 107, 120, 115],
        fill: true,
        backgroundColor: "rgba(75, 85, 99, 0.1)",
        borderColor: "#4B5563",
        tension: 0.4,
      }
    ],
  };

  const activityTrendOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#6B7280",
        },
      },
      y: {
        grid: {
          color: "rgba(209, 213, 219, 0.2)",
        },
        ticks: {
          color: "#6B7280",
        },
      },
    },
  };

  const deptActivities = [
    { dept: "Design", activity: "Updated homepage mockups for client review with improved responsive layouts", time: "2 hours ago", statusColor: "text-gray-600", icon: "🎨" },
    { dept: "Development", activity: "Fixed critical payment gateway bug affecting checkout process and transaction completion", time: "3 hours ago", statusColor: "text-gray-600", icon: "💻" },
    { dept: "QA", activity: "Completed comprehensive testing for v2.1 release candidates with 98% test coverage", time: "5 hours ago", statusColor: "text-blue-600", icon: "🔍" },
    { dept: "QA", activity: "Identified and documented 7 critical issues in the latest mobile app build", time: "8 hours ago", statusColor: "text-blue-600", icon: "🔍" },
    { dept: "QA", activity: "Implemented new automated regression test suite for payment processing", time: "1 day ago", statusColor: "text-blue-600", icon: "🔍" },
    { dept: "Management", activity: "Approved Q2 marketing campaign budget of $125K and resource allocation plan", time: "1 day ago", statusColor: "text-gray-600", icon: "📊" },
    { dept: "Marketing", activity: "Launched new social media campaign achieving 15K impressions in first 24 hours", time: "2 days ago", statusColor: "text-gray-600", icon: "📢" },
    { dept: "HR", activity: "Completed quarterly performance reviews for engineering and product teams", time: "3 days ago", statusColor: "text-gray-600", icon: "👥" },
    { dept: "Sales", activity: "Closed enterprise client deal worth $125K annually with 3-year commitment", time: "4 days ago", statusColor: "text-gray-600", icon: "💰" },
    { dept: "Customer Support", activity: "Resolved critical ticket #45892 for VIP client affecting core business operations", time: "4 days ago", statusColor: "text-gray-600", icon: "🛠️" },
    { dept: "Legal", activity: "Finalized contract terms with new vendor including compliance and security terms", time: "5 days ago", statusColor: "text-gray-600", icon: "⚖️" },
    { dept: "Finance", activity: "Completed monthly financial reporting with 12% increase in quarterly revenue", time: "6 days ago", statusColor: "text-gray-600", icon: "📈" },
  ];

  const upcomingEvents = [
    { title: "Team Sprint Planning", date: "Today, 2:00 PM", type: "Meeting" },
    { title: "Product Launch: Version 2.0", date: "Tomorrow, 10:00 AM", type: "Event" },
    { title: "Client Presentation: Acme Corp", date: "May 15, 9:30 AM", type: "Presentation" },
    { title: "Quarterly Review Meeting", date: "May 18, 1:00 PM", type: "Meeting" },
    { title: "Staff Training: New CRM", date: "May 20, 11:00 AM", type: "Training" },
    { title: "Executive Board Meeting", date: "May 25, 3:00 PM", type: "Meeting" },
    { title: "Industry Conference", date: "May 28-30, All Day", type: "Conference" },
    { title: "Team Building Event", date: "June 2, 2:00 PM", type: "Event" },
  ];

  const handleActivityClick = () => {
    setIsActivityModalOpen(true);
  };

  const ActivityModal = () => (
    <Dialog
      open={isActivityModalOpen}
      handler={() => setIsActivityModalOpen(false)}
      className="min-w-[90%] md:min-w-[90%] h-[80vh]"
      size="xxl"
    >
      <DialogHeader className="flex items-center justify-between border-b">
        <Typography variant="h5">Activity Details</Typography>
        <IconButton
          variant="text"
          onClick={() => setIsActivityModalOpen(false)}
          className="text-gray-700"
        >
          <X className="h-5 w-5" />
        </IconButton>
      </DialogHeader>
      <DialogBody className="flex flex-col md:flex-row h-full p-0">
        {/* Left Sidebar */}
        <div className="w-full md:w-64 border-b md:border-b-0 md:border-r bg-gray-50 p-4">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search activities..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:border-gray-400"
              />
            </div>
            <div className="space-y-2">
              <Typography variant="small" className="font-semibold text-gray-700">
                Filter By
              </Typography>
              <Button size="sm" variant="outlined" className="w-full justify-start" color="gray">
                <Calendar className="h-4 w-4 mr-2" /> Today
              </Button>
              <Button size="sm" variant="outlined" className="w-full justify-start" color="gray">
                <Users className="h-4 w-4 mr-2" /> Department
              </Button>
              <Button size="sm" variant="outlined" className="w-full justify-start" color="gray">
                <Activity className="h-4 w-4 mr-2" /> Type
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <div className="p-6 flex-1 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {deptActivities.map((activity, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{activity.icon}</span>
                    <div>
                      <Typography variant="h6" className="font-semibold">
                        {activity.dept}
                      </Typography>
                      <Typography variant="small" className="text-gray-600">
                        {activity.time}
                      </Typography>
                    </div>
                  </div>
                  <Typography className="text-gray-700">
                    {activity.activity}
                  </Typography>
                  <div className="mt-3 flex flex-col sm:flex-row gap-2">
                    <Button size="sm" className="bg-gray-900">View Details</Button>
                    <Button size="sm" variant="outlined" className="border-gray-300">
                      Add Comment
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );

  const CalendarModal = () => (
    <Dialog
      open={isCalendarModalOpen}
      handler={() => setIsCalendarModalOpen(false)}
      className="min-w-[90%] h-[80vh]"
      size="xxl"
    >
      <DialogHeader className="flex items-center justify-between border-b">
        <Typography variant="h5">Calendar Events</Typography>
        <IconButton
          variant="text"
          onClick={() => setIsCalendarModalOpen(false)}
          className="text-gray-700"
        >
          <X className="h-5 w-5" />
        </IconButton>
      </DialogHeader>
      <DialogBody className="flex flex-col md:flex-row h-full p-0">
        {/* Left Sidebar */}
        <div className="w-full md:w-64 border-b md:border-b-0 md:border-r bg-gray-50 p-4">
          <div className="space-y-4">
            <Button 
              size="sm" 
              className="w-full bg-gray-900 flex items-center gap-2"
            >
              <Plus className="h-4 w-4" /> Add Event
            </Button>
            
            <div className="space-y-2">
              <Typography variant="small" className="font-semibold text-gray-700">
                Calendar Views
              </Typography>
              <div className="flex md:flex-col gap-2">
                <Button size="sm" variant="outlined" className="flex-1 md:w-full justify-start" color="gray">
                  <Calendar className="h-4 w-4 mr-2" /> Month
                </Button>
                <Button size="sm" variant="outlined" className="flex-1 md:w-full justify-start" color="gray">
                  <Clock className="h-4 w-4 mr-2" /> Week
                </Button>
                <Button size="sm" variant="outlined" className="flex-1 md:w-full justify-start" color="gray">
                  <Clock className="h-4 w-4 mr-2" /> Day
                </Button>
              </div>
            </div>

            <div className="space-y-2 hidden md:block">
              <Typography variant="small" className="font-semibold text-gray-700">
                Upcoming Events
              </Typography>
              {upcomingEvents.map((event, index) => (
                <div key={index} className="p-2 bg-white rounded-lg border text-sm">
                  <div className="font-medium">{event.title}</div>
                  <div className="text-gray-600 text-xs">{event.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex gap-2 w-full sm:w-auto">
                <Button size="sm" variant="outlined" className="flex items-center gap-2 flex-1 sm:flex-auto">
                  <ChevronRight className="h-4 w-4 rotate-180" /> Previous
                </Button>
                <Button size="sm" variant="outlined" className="flex items-center gap-2 flex-1 sm:flex-auto">
                  Next <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <Typography variant="h6" className="font-medium">
                May 2024
              </Typography>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button size="sm" variant="outlined" className="flex items-center gap-2 flex-1 sm:flex-auto">
                  <Filter className="h-4 w-4" /> Filter
                </Button>
                <Button size="sm" className="bg-gray-900 flex-1 sm:flex-auto">Today</Button>
              </div>
            </div>
          </div>
          
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {upcomingEvents.concat(upcomingEvents).map((event, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        {event.type === "Meeting" && <Users className="h-5 w-5" />}
                        {event.type === "Event" && <Calendar className="h-5 w-5" />}
                        {event.type === "Presentation" && <ClipboardList className="h-5 w-5" />}
                      </div>
                      <div>
                        <Typography variant="h6" className="font-semibold">
                          {event.title}
                        </Typography>
                        <Typography variant="small" className="text-gray-600">
                          {event.date}
                        </Typography>
                      </div>
                    </div>
                    <IconButton variant="text" className="text-gray-700">
                      <MoreVertical className="h-5 w-5" />
                    </IconButton>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );

  const ViewCalendarModal = () => (
    <Dialog
      open={isViewCalendarOpen}
      handler={() => setIsViewCalendarOpen(false)}
      className="min-w-[90%] h-[80vh]"
      size="xxl"
    >
      <DialogHeader className="flex items-center justify-between border-b bg-gray-50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-100 rounded-lg">
            <Calendar className="h-6 w-6 text-gray-700" />
          </div>
          <Typography variant="h5">Calendar View</Typography>
        </div>
        <IconButton
          variant="text"
          onClick={() => setIsViewCalendarOpen(false)}
          className="text-gray-700"
        >
          <X className="h-5 w-5" />
        </IconButton>
      </DialogHeader>
      <DialogBody className="p-4 md:p-6 overflow-y-auto">
        <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex gap-2 w-full sm:w-auto">
            <Button size="sm" variant="outlined" className="flex items-center gap-2 flex-1 sm:flex-auto">
              <ChevronRight className="h-4 w-4 rotate-180" /> Previous
            </Button>
            <Button size="sm" variant="outlined" className="flex items-center gap-2 flex-1 sm:flex-auto">
              Next <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <Typography variant="h4" className="font-medium text-gray-900 text-center">
            May 2024
          </Typography>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button size="sm" variant="outlined" className="flex items-center gap-2 flex-1 sm:flex-auto">
              <Filter className="h-4 w-4" /> Filter
            </Button>
            <Button size="sm" className="bg-gray-900 flex-1 sm:flex-auto">Today</Button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1 md:gap-4">
          {/* Calendar header */}
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
            <div key={index} className="text-center font-semibold text-gray-700 pb-2">
              <span className="md:hidden">{day}</span>
              <span className="hidden md:inline">{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][index]}</span>
            </div>
          ))}
          
          {/* Calendar days */}
          {Array.from({ length: 35 }).map((_, index) => (
            <div
              key={index}
              className="aspect-square p-1 md:p-3 border rounded-lg md:rounded-xl hover:bg-gray-50 cursor-pointer transition-all duration-200 hover:shadow-md group"
            >
              <div className="text-xs md:text-sm text-gray-700 font-medium">{index + 1}</div>
              {index % 7 === 2 && (
                <div className="mt-1 md:mt-2 space-y-1">
                  <Chip
                    size="sm"
                    variant="ghost"
                    value={window.innerWidth < 768 ? "M" : "Meeting"}
                    className="bg-blue-50 text-blue-700 text-[10px] md:text-xs group-hover:bg-blue-100"
                  />
                  <Chip
                    size="sm"
                    variant="ghost"
                    value={window.innerWidth < 768 ? "E" : "Event"}
                    className="bg-purple-50 text-purple-700 text-[10px] md:text-xs group-hover:bg-purple-100"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </DialogBody>
    </Dialog>
  );

  const ViewDepartmentModal = () => (
    <Dialog
      open={isViewDepartmentOpen}
      handler={() => setIsViewDepartmentOpen(false)}
      className="min-w-[90%] h-[80vh]"
      size="xxl"
    >
      <DialogHeader className="flex items-center justify-between border-b bg-gray-50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-100 rounded-lg">
            <Users className="h-6 w-6 text-gray-700" />
          </div>
          <Typography variant="h5">Department Activities</Typography>
        </div>
        <IconButton
          variant="text"
          onClick={() => setIsViewDepartmentOpen(false)}
          className="text-gray-700"
        >
          <X className="h-5 w-5" />
        </IconButton>
      </DialogHeader>
      <DialogBody className="p-4 md:p-6">
        <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search activities..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:border-gray-400"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button size="sm" variant="outlined" className="flex items-center gap-2 flex-1 sm:flex-auto">
              <Filter className="h-4 w-4" /> Filter
            </Button>
            <Button size="sm" className="bg-gray-900 flex items-center gap-2 flex-1 sm:flex-auto">
              <Plus className="h-4 w-4" /> Add Activity
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {deptActivities.concat(deptActivities).map((activity, index) => (
            <Card key={index} className="p-4 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-2xl p-3 bg-gray-50 rounded-lg group-hover:scale-110 transition-transform">
                  {activity.icon}
                </div>
                <div className="flex-1">
                  <Typography variant="h6" className="font-semibold">
                    {activity.dept}
                  </Typography>
                  <Typography variant="small" className="text-gray-600">
                    {activity.time}
                  </Typography>
                </div>
                <IconButton variant="text" className="text-gray-700">
                  <MoreVertical className="h-5 w-5" />
                </IconButton>
              </div>
              <Typography className="text-gray-700 mb-4">
                {activity.activity}
              </Typography>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button size="sm" className="bg-gray-900 flex-1">View Details</Button>
                <Button size="sm" variant="outlined" className="border-gray-300 flex items-center gap-2">
                  <MessagesSquare className="h-4 w-4" />
                  Comments
                </Button>
              </div>
              <div className="mt-4 pt-4 border-t flex items-center gap-2">
                <Avatar 
                  src="https://randomuser.me/api/portraits/men/43.jpg" 
                  size="xs" 
                  className="border-2 border-white"
                />
                <Avatar 
                  src="https://randomuser.me/api/portraits/women/43.jpg" 
                  size="xs" 
                  className="border-2 border-white -ml-3"
                />
                <Typography variant="small" className="text-gray-600">
                  +3 team members involved
                </Typography>
              </div>
            </Card>
          ))}
        </div>
        <div className="space-y-4 max-h-48 sm:max-h-64 overflow-y-auto pr-2 custom-scrollbar">
          {deptActivities.slice(0, 4).map((activity, index) => (
            <div 
              key={index} 
              className={`p-3 sm:p-4 ${activity.dept === "QA" ? "bg-blue-50 border-blue-100" : "bg-gray-50"} rounded-xl hover:bg-gray-100 transition-all duration-200 flex items-start gap-3 group border border-transparent hover:border-gray-200 cursor-pointer`}
              onClick={handleActivityClick}
            >
              <div className={`text-xl sm:text-2xl ${activity.dept === "QA" ? "bg-blue-100" : "bg-white"} p-2 rounded-lg shadow-sm group-hover:scale-110 transition-transform`}>{activity.icon}</div>
              <div className="flex-1 min-w-0">
                <Typography variant="small" className={`font-semibold ${activity.dept === "QA" ? "text-blue-900" : "text-gray-900"}`}>{activity.dept}</Typography>
                <Typography variant="small" className="text-gray-600 block truncate">{activity.activity}</Typography>
                <Typography variant="small" className={`${activity.statusColor} text-xs`}>{activity.time}</Typography>
              </div>
            </div>
          ))}
        </div>
      </DialogBody>
    </Dialog>
  );

  return (
    <div className="p-3 sm:p-6 w-full bg-white min-h-screen text-black relative">
      {/* Enhanced header with subtle gradient */}
      <div className="mb-6 sm:mb-8 bg-gradient-to-r from-gray-50 to-gray-100 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <div>
            <Typography variant="h4" className="font-bold text-gray-900">Dashboard</Typography>
            <Typography variant="paragraph" className="text-gray-600 mt-1 text-sm sm:text-base">
              {isMember ? "Welcome back! Here's your activity summary" : "Welcome back! Here's what's happening today"}
            </Typography>
          </div>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <Tooltip content="Notifications">
              <div className="relative cursor-pointer group">
                <div className="absolute -inset-1 bg-gray-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Bell className="w-6 h-6 text-gray-600 hover:text-gray-900 transition-colors relative z-10" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
              </div>
            </Tooltip>
            {!isMember && (
              <Tooltip content="Calendar">
                <div className="relative cursor-pointer group" onClick={() => setIsCalendarModalOpen(true)}>
                  <div className="absolute -inset-1 bg-gray-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Calendar className="w-6 h-6 text-gray-600 hover:text-gray-900 transition-colors relative z-10" />
                </div>
              </Tooltip>
            )}
            <Tooltip content="Settings">
              <div className="relative cursor-pointer group">
                <div className="absolute -inset-1 bg-gray-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Settings className="w-6 h-6 text-gray-600 hover:text-gray-900 transition-colors relative z-10" />
              </div>
            </Tooltip>
            <Avatar 
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80" 
              alt="User" 
              size="sm" 
              className="border-2 border-gray-200 cursor-pointer hover:border-gray-300 transition-all"
            />
          </div>
        </div>
        <div className="mt-4 sm:mt-6 flex items-center bg-white rounded-lg w-full p-2 border border-gray-200 shadow-sm">
          <Search className="h-5 w-5 text-gray-400 ml-2" />
          <input 
            type="text" 
            placeholder="Search tasks, users, or projects..." 
            className="bg-transparent border-none outline-none text-gray-900 placeholder-gray-400 px-2 py-1 w-full"
          />
        </div>
      </div>

      {/* Enhanced stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
        {getStats().map((stat, index) => (
          <Card key={index} className="p-4 sm:p-6 flex items-center justify-between bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
            <div className="relative">
              <div className="rounded-full p-2 sm:p-3 bg-gray-50 group-hover:bg-gray-100 transition-colors border border-gray-100">
                {stat.icon}
              </div>
            </div>
            <div className="text-right">
              <Typography variant="h5" className="font-bold text-gray-900">{stat.value}</Typography>
              <Typography variant="small" className="text-gray-600">{stat.title}</Typography>
              <div className={`flex items-center justify-end gap-1 mt-1 ${stat.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                <ArrowUpRight className={`w-3 h-3 ${!stat.trendUp && 'rotate-180'}`} />
                <Typography variant="small" className="text-xs sm:text-sm">{stat.trend}</Typography>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Enhanced chart section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <Card className="col-span-1 lg:col-span-2 bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-6 hover:shadow-md transition-all duration-200">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2 sm:gap-0">
            <div className="flex items-center">
              <div className="p-2 rounded-lg bg-gray-50 mr-3">
                <BarChart2 className="w-5 h-5 text-gray-700" />
              </div>
              <Typography variant="h5" className="font-bold text-gray-900">
                Task Activity
              </Typography>
            </div>
            <div className="flex gap-2 mt-2 sm:mt-0">
              <Button size="sm" variant="text" className="text-gray-700 flex items-center gap-1 hover:bg-gray-50 text-xs sm:text-sm">
                <Calendar className="h-4 w-4" /> This Week
              </Button>
              <Button size="sm" variant="text" className="text-gray-700 flex items-center gap-1 hover:bg-gray-50 text-xs sm:text-sm">
                <Calendar className="h-4 w-4" /> This Month
              </Button>
            </div>
          </div>
          <div className="h-60 sm:h-80 bg-white rounded-lg p-2 sm:p-4 border border-gray-100">
            <Bar data={taskChartData} options={chartOptions} />
          </div>
        </Card>
        
        {!isMember && (
          <Card className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-6 hover:shadow-md transition-all duration-200">
            <div className="flex items-center mb-4">
              <div className="p-2 rounded-lg bg-gray-50 mr-3">
                <PieChart className="w-5 h-5 text-gray-700" />
              </div>
              <Typography variant="h5" className="font-bold text-gray-900">
                Task Distribution
              </Typography>
            </div>
            <div className="h-60 sm:h-80 flex items-center justify-center p-2 sm:p-4 border border-gray-100 rounded-lg bg-white">
              <Doughnut data={doughnutData} options={doughnutOptions} />
            </div>
          </Card>
        )}
      </div>

      {/* Enhanced activity section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <Card className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-6 hover:shadow-md transition-all duration-200">
          <div className="flex items-center mb-4">
            <div className="p-2 rounded-lg bg-gray-50 mr-3">
              <Activity className="w-5 h-5 text-gray-700" />
            </div>
            <Typography variant="h5" className="font-bold text-gray-900">
              Activity Trends
            </Typography>
          </div>
          <div className="h-48 sm:h-64 p-2 sm:p-4 border border-gray-100 rounded-lg bg-white">
            <Line data={activityTrendData} options={activityTrendOptions} />
          </div>
        </Card>
        
        {!isMember && (
          <Card className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-6 hover:shadow-md transition-all duration-200">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2 sm:gap-0">
              <div className="flex items-center">
                <div className="p-2 rounded-lg bg-gray-50 mr-3">
                  <Users className="w-5 h-5 text-gray-700" />
                </div>
                <Typography variant="h5" className="font-bold text-gray-900">
                  Department Activity
                </Typography>
              </div>
              <Button 
                size="sm" 
                className="bg-gray-900 hover:bg-gray-800 text-white shadow-sm mt-2 sm:mt-0"
                onClick={() => setIsViewDepartmentOpen(true)}
              >
                View All
              </Button>
            </div>
            <div className="space-y-4 max-h-48 sm:max-h-64 overflow-y-auto pr-2 custom-scrollbar">
              {deptActivities.slice(0, 4).map((activity, index) => (
                <div 
                  key={index} 
                  className={`p-3 sm:p-4 ${activity.dept === "QA" ? "bg-blue-50 border-blue-100" : "bg-gray-50"} rounded-xl hover:bg-gray-100 transition-all duration-200 flex items-start gap-3 group border border-transparent hover:border-gray-200 cursor-pointer`}
                  onClick={handleActivityClick}
                >
                  <div className={`text-xl sm:text-2xl ${activity.dept === "QA" ? "bg-blue-100" : "bg-white"} p-2 rounded-lg shadow-sm group-hover:scale-110 transition-transform`}>{activity.icon}</div>
                  <div className="flex-1 min-w-0">
                    <Typography variant="small" className={`font-semibold ${activity.dept === "QA" ? "text-blue-900" : "text-gray-900"}`}>{activity.dept}</Typography>
                    <Typography variant="small" className="text-gray-600 block truncate">{activity.activity}</Typography>
                    <Typography variant="small" className={`${activity.statusColor} text-xs`}>{activity.time}</Typography>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
        
        {!isMember && (
          <Card className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-6 hover:shadow-md transition-all duration-200 md:col-span-2 lg:col-span-1">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center">
                <div className="p-2 rounded-lg bg-gray-50 mr-2">
                  <Calendar className="w-4 h-4 text-gray-700" />
                </div>
                <Typography variant="h6" className="font-bold text-gray-900">
                  Upcoming Events
                </Typography>
              </div>
              <Button size="sm" variant="text" className="text-gray-700 flex items-center gap-1 hover:bg-gray-50 p-1">
                <Plus className="h-3 w-3" /> Add
              </Button>
            </div>
            <div className="flex flex-col h-full">
              <div className="space-y-2 grid sm:grid-cols-2 lg:grid-cols-1 gap-2 sm:space-y-0 lg:space-y-2 max-h-48 sm:max-h-52 overflow-y-auto pr-2 mb-3">
                {upcomingEvents.slice(0, 5).map((event, index) => (
                  <div key={index} className="p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200 flex items-center gap-2 group border border-transparent hover:border-gray-200">
                    <div className="p-1.5 bg-gray-100 text-gray-700 rounded-md group-hover:bg-gray-200 transition-colors">
                      {event.type === "Meeting" && <Users className="w-3.5 h-3.5" />}
                      {event.type === "Event" && <Calendar className="w-3.5 h-3.5" />}
                      {event.type === "Presentation" && <ClipboardList className="w-3.5 h-3.5" />}
                    </div>
                    <div className="min-w-0">
                      <Typography variant="small" className="font-semibold text-gray-900 truncate text-xs sm:text-sm">{event.title}</Typography>
                      <Typography variant="small" className="text-gray-600 truncate text-xs">{event.date}</Typography>
                    </div>
                  </div>
                ))}
              </div>
              <Button 
                fullWidth 
                className="bg-gray-900 hover:bg-gray-800 text-white shadow-sm group py-1.5 text-xs sm:text-sm sticky bottom-0"
                onClick={() => setIsViewCalendarOpen(true)}
              >
                <span className="flex items-center justify-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 group-hover:animate-pulse" />
                  View Calendar
                </span>
              </Button>
            </div>
          </Card>
        )}
      </div>

      {/* Enhanced tasks table */}
      <Card className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-6 mb-8 hover:shadow-md transition-all duration-200">
        <div className="flex items-center mb-4">
          <div className="p-2 rounded-lg bg-gray-50 mr-3">
            <ClipboardList className="w-5 h-5 text-gray-700" />
          </div>
          <Typography variant="h5" className="font-bold text-gray-900">
            {isMember ? "My Tasks" : "Recent Tasks"}
          </Typography>
        </div>
        <div className="overflow-x-auto border border-gray-100 rounded-xl">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-3 sm:p-4 text-gray-600 rounded-tl-lg font-medium">Task</th>
                {!isMember && <th className="p-3 sm:p-4 text-gray-600 font-medium hidden md:table-cell">Assigned To</th>}
                <th className="p-3 sm:p-4 text-gray-600 font-medium hidden sm:table-cell">Priority</th>
                <th className="p-3 sm:p-4 text-gray-600 font-medium hidden sm:table-cell">Deadline</th>
                <th className="p-3 sm:p-4 text-gray-600 font-medium hidden md:table-cell">Progress</th>
                <th className="p-3 sm:p-4 text-gray-600 font-medium">Status</th>
                <th className="p-3 sm:p-4 text-gray-600 rounded-tr-lg font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { task: "Redesign Landing Page", assigned: "John Doe", assignedAvatar: "https://randomuser.me/api/portraits/men/43.jpg", priority: "High", deadline: "May 10", progress: 75, status: "In Progress", statusColor: "text-blue-600" },
                { task: "Fix Payment Gateway Bug #123", assigned: "Jane Smith", assignedAvatar: "https://randomuser.me/api/portraits/women/63.jpg", priority: "Critical", deadline: "May 6", progress: 100, status: "Completed", statusColor: "text-green-600" },
                { task: "Database Migration to AWS", assigned: "Alice Johnson", assignedAvatar: "https://randomuser.me/api/portraits/women/45.jpg", priority: "Medium", deadline: "May 8", progress: 20, status: "Overdue", statusColor: "text-red-600" },
                { task: "Create API Documentation v2", assigned: "Bob Wilson", assignedAvatar: "https://randomuser.me/api/portraits/men/22.jpg", priority: "Low", deadline: "May 15", progress: 0, status: "Pending", statusColor: "text-gray-600" },
                { task: "Implement SSO Authentication", assigned: "Eva Chen", assignedAvatar: "https://randomuser.me/api/portraits/women/22.jpg", priority: "High", deadline: "May 11", progress: 50, status: "In Progress", statusColor: "text-blue-600" },
                { task: "Mobile App UI Enhancements", assigned: "Michael Brown", assignedAvatar: "https://randomuser.me/api/portraits/men/56.jpg", priority: "Medium", deadline: "May 14", progress: 65, status: "In Progress", statusColor: "text-blue-600" },
                { task: "Content Migration to CMS", assigned: "Sarah Parker", assignedAvatar: "https://randomuser.me/api/portraits/women/33.jpg", priority: "Medium", deadline: "May 18", progress: 10, status: "Pending", statusColor: "text-gray-600" },
                { task: "Security Audit Implementation", assigned: "David Lee", assignedAvatar: "https://randomuser.me/api/portraits/men/32.jpg", priority: "High", deadline: "May 12", progress: 35, status: "In Progress", statusColor: "text-blue-600" },
                { task: "Performance Optimization", assigned: "Lisa Wang", assignedAvatar: "https://randomuser.me/api/portraits/women/35.jpg", priority: "Medium", deadline: "May 20", progress: 0, status: "Pending", statusColor: "text-gray-600" },
                { task: "Analytics Dashboard Redesign", assigned: "James Wilson", assignedAvatar: "https://randomuser.me/api/portraits/men/67.jpg", priority: "Low", deadline: "May 25", progress: 15, status: "Pending", statusColor: "text-gray-600" },
              ].map((row, index) => (
                <tr key={index} className={`hover:bg-gray-50 transition-colors group ${index >= 5 ? 'hidden md:table-row' : ''}`}>
                  <td className="p-3 sm:p-4 text-gray-900 font-medium">{row.task}</td>
                  {!isMember && (
                    <td className="p-3 sm:p-4 hidden md:table-cell">
                      <div className="flex items-center gap-2">
                        <Avatar src={row.assignedAvatar} size="xs" className="ring-2 ring-gray-200 group-hover:ring-gray-300 transition-all" />
                        <Typography className="text-sm text-gray-700">{row.assigned}</Typography>
                      </div>
                    </td>
                  )}
                  <td className="p-3 sm:p-4 hidden sm:table-cell">
                    <Chip
                      variant="ghost"
                      size="sm"
                      className={`font-medium ${
                        row.priority === 'Critical' ? 'bg-orange-50 text-orange-700' :
                        row.priority === 'High' ? 'bg-red-50 text-red-700' : 
                        row.priority === 'Medium' ? 'bg-blue-50 text-blue-700' : 
                        'bg-green-50 text-green-700'
                      }`}
                      value={row.priority}
                    />
                  </td>
                  <td className="p-3 sm:p-4 text-sm text-gray-600 hidden sm:table-cell">{row.deadline}</td>
                  <td className="p-3 sm:p-4 w-32 hidden md:table-cell">
                    <div className="flex items-center gap-2">
                      <Progress value={row.progress} size="sm" color={
                        row.progress === 100 ? "green" : 
                        row.progress > 50 ? "blue" : 
                        row.status === "Overdue" ? "red" : "gray"
                      } className="overflow-hidden rounded-full" />
                      <span className="text-xs font-medium text-gray-600">{row.progress}%</span>
                    </div>
                  </td>
                  <td className="p-3 sm:p-4">
                    <span className={`
                      px-2 py-1 rounded-md text-xs sm:text-sm font-medium inline-flex items-center
                      ${
                        row.status === 'Completed' ? 'bg-green-50 text-green-700' : 
                        row.status === 'In Progress' ? 'bg-blue-50 text-blue-700' : 
                        row.status === 'Overdue' ? 'bg-red-50 text-red-700' : 
                        'bg-gray-50 text-gray-700'
                      }
                    `}>
                      {row.status}
                    </span>
                  </td>
                  <td className="p-3 sm:p-4">
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-gray-900 hover:bg-gray-800 text-white shadow-sm flex items-center gap-1 px-2 sm:px-3 py-1">
                        <span className="hidden sm:inline">View</span>
                        <span className="sm:hidden">👁️</span>
                      </Button>
                      <Button size="sm" variant="outlined" className="border-gray-200 text-gray-700 hover:bg-gray-50 flex items-center gap-1 px-2 sm:px-3 py-1 hidden sm:flex">
                        Edit
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-3 sm:gap-0">
          <Typography variant="small" className="text-gray-600">Showing 5 of 32 tasks</Typography>
          <div className="flex gap-2">
            <Button size="sm" variant="outlined" className="border-gray-200 text-gray-700 hover:bg-gray-50 px-2 sm:px-3 py-1">Prev</Button>
            <Button size="sm" variant="filled" className="bg-gray-900 shadow-sm px-2 sm:px-3 py-1">1</Button>
            <Button size="sm" variant="outlined" className="border-gray-200 text-gray-700 hover:bg-gray-50 px-2 sm:px-3 py-1 hidden sm:inline-flex">2</Button>
            <Button size="sm" variant="outlined" className="border-gray-200 text-gray-700 hover:bg-gray-50 px-2 sm:px-3 py-1">Next</Button>
          </div>
        </div>
      </Card>
      
      {/* Enhanced Footer */}
      <div className="flex flex-col sm:flex-row justify-between items-center text-gray-500 text-sm border-t border-gray-200 pt-4 gap-3 sm:gap-0">
        <div>© 2023 Ordonis Admin Dashboard</div>
        <div className="flex gap-4">
          <a href="#" className="hover:text-gray-900 transition-colors">Help</a>
          <a href="#" className="hover:text-gray-900 transition-colors">Privacy</a>
          <a href="#" className="hover:text-gray-900 transition-colors">Terms</a>
        </div>
      </div>

      {/* Recent Notifications Section - Added for demo data */}
      <Dialog 
        open={false} 
        handler={() => {}} 
        className="min-w-[90%] md:min-w-[450px]"
        size="md"
      >
        <DialogHeader className="flex items-center justify-between border-b bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Bell className="h-5 w-5 text-gray-700" />
            </div>
            <Typography variant="h5">Recent Notifications</Typography>
          </div>
          <IconButton variant="text" onClick={() => {}} className="text-gray-700">
            <X className="h-5 w-5" />
          </IconButton>
        </DialogHeader>
        <DialogBody className="p-4 max-h-[70vh] overflow-y-auto">
          <div className="space-y-3">
            {[
              { title: "New Task Assigned", message: "You have been assigned to 'Security Audit Implementation'", time: "10 minutes ago", icon: "📋", color: "bg-blue-50" },
              { title: "Meeting Reminder", message: "Team Sprint Planning starts in 30 minutes", time: "25 minutes ago", icon: "🕒", color: "bg-yellow-50" },
              { title: "Deadline Approaching", message: "Database Migration to AWS due in 2 days", time: "1 hour ago", icon: "⚠️", color: "bg-orange-50" },
              { title: "Task Completed", message: "Jane Smith completed 'Fix Payment Gateway Bug #123'", time: "2 hours ago", icon: "✅", color: "bg-green-50" },
              { title: "Comment on Task", message: "Bob Wilson commented on 'Create API Documentation v2'", time: "4 hours ago", icon: "💬", color: "bg-purple-50" },
              { title: "Task Marked Overdue", message: "Database Migration to AWS is now overdue", time: "5 hours ago", icon: "❗", color: "bg-red-50" },
              { title: "New Team Member", message: "Sarah Parker has joined the Development team", time: "Yesterday", icon: "👋", color: "bg-indigo-50" },
              { title: "Budget Approved", message: "Q2 Marketing Campaign budget has been approved", time: "Yesterday", icon: "💰", color: "bg-green-50" },
              { title: "System Update", message: "System will undergo maintenance on May 15", time: "2 days ago", icon: "🔄", color: "bg-gray-50" },
              { title: "New Feature Request", message: "Client requested new reporting features", time: "3 days ago", icon: "🆕", color: "bg-blue-50" },
            ].map((notification, index) => (
              <div key={index} className={`p-3 rounded-xl ${notification.color} border border-gray-200 hover:shadow-md transition-all duration-200`}>
                <div className="flex items-start gap-3">
                  <div className="text-xl p-2 bg-white rounded-lg shadow-sm">{notification.icon}</div>
                  <div className="flex-1">
                    <Typography variant="h6" className="text-gray-900 font-medium">{notification.title}</Typography>
                    <Typography variant="small" className="text-gray-700">{notification.message}</Typography>
                    <Typography variant="small" className="text-gray-500 mt-1 block">{notification.time}</Typography>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DialogBody>
        <DialogFooter className="flex justify-between border-t p-3">
          <Button variant="text" size="sm" className="text-gray-700">Mark All Read</Button>
          <Button size="sm" className="bg-gray-900">View All</Button>
        </DialogFooter>
      </Dialog>

      {!isMember && (
        <>
          <ActivityModal />
          <CalendarModal />
          <ViewCalendarModal />
          <ViewDepartmentModal />
        </>
      )}
    </div>
  );
};

export default Dashboard;