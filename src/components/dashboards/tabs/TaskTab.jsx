import React, { useState, useEffect } from 'react';
import {
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
  Card,
  CardHeader,
  CardBody,
  Chip,
  IconButton,
  CardFooter,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Slider,
  DialogContent,
} from '@material-tailwind/react';
import { Paperclip, Eye, ChevronDown, Trash2 } from 'lucide-react';

// Draggable Component
export function TaskDraggable(props) {
  const [holdTimeout, setHoldTimeout] = useState(null);
  const [isEditingProgress, setIsEditingProgress] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const style = {
    position: 'relative',
    zIndex: 1,
  };

  const {
    title = 'Task Title',
    description = 'Task description goes here',
    assignedTo = 'Unassigned',
    deadline = 'No deadline',
    attachment = null,
    pendingProof = null,
    priority = 'medium',
    tags = [],
    timeEstimate = null,
    timeSpent = null,
    comments = [],
    color = '#F3F4F6',
  } = props.task || {};

  const isImageAttachment = attachment && attachment.name && /\.(jpg|jpeg|png|gif)$/i.test(attachment.name);
  const isImageProof = pendingProof && pendingProof.name && /\.(jpg|jpeg|png|gif)$/i.test(pendingProof.name);

  const progress = timeEstimate && timeSpent ? Math.min(Math.round((timeSpent / timeEstimate) * 100), 100) : null;

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEyeButtonMouseDown = () => {
    const timeout = setTimeout(() => setIsModalOpen(true), 500);
    setHoldTimeout(timeout);
  };

  const handleEyeButtonMouseUp = () => {
    if (holdTimeout) {
      clearTimeout(holdTimeout);
      setHoldTimeout(null);
    }
  };

  const handleEyeButtonClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (holdTimeout) {
      clearTimeout(holdTimeout);
      setHoldTimeout(null);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-50';
      case 'medium': return 'bg-yellow-50';
      case 'low': return 'bg-green-50';
      default: return 'bg-gray-50';
    }
  };

  const handleUpdateProgress = (value) => {
    if (props.onUpdateProgress) {
      const newTimeSpent = (value / 100) * timeEstimate;
      props.onUpdateProgress(props.task.id, newTimeSpent);
    }
  };

  return (
    <>
      <div style={style} className="w-full">
        <Card className="w-full hover:shadow-md rounded-lg overflow-hidden border border-gray-200 transition-all duration-200 hover:bg-gray-50" style={{ backgroundColor: color || '#FFFFFF' }}>
          <CardHeader floated={false} shadow={false} className="p-3 sm:p-4 border-b border-gray-200" style={{ backgroundColor: color || '#FFFFFF' }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 max-w-[70%]">
                <div className={`w-2 h-2 rounded-full ${getPriorityColor(priority)}`} />
                <Typography variant="h6" className={`font-semibold truncate text-sm sm:text-base ${color === '#F3F4F6' ? 'text-gray-900' : 'text-white'}`}>
                  {title}
                </Typography>
              </div>
              <div className="flex items-center">
                <IconButton 
                  variant="text" 
                  className="p-1 sm:p-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (props.onViewTask) {
                      props.onViewTask(props.task);
                    }
                  }}
                >
                  <Eye className="h-4 w-4 text-gray-500" />
                </IconButton>
                {props.onDelete && (
                  <IconButton 
                    variant="text" 
                    className="p-1 sm:p-2 text-red-500 hover:text-red-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      props.onDelete();
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </IconButton>
                )}
              </div>
            </div>
          </CardHeader>
          <CardBody className="px-3 py-2 sm:p-4">
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Typography variant="small" className={`font-medium ${color === '#F3F4F6' ? 'text-gray-700' : 'text-white/90'}`}>
                    Assignee:
                  </Typography>
                  <Typography variant="small" className={`${color === '#F3F4F6' ? 'text-gray-600' : 'text-white/70'} truncate max-w-[150px]`}>
                    {assignedTo}
                  </Typography>
                </div>
                {deadline !== 'No deadline' && (
                  <div className="flex items-center gap-1">
                    <span className="text-gray-400 text-xs">Due:</span>
                    <span className={`text-xs font-medium ${
                      new Date(deadline) < new Date() ? 'text-red-500' : 'text-gray-700'
                    }`}>
                      {new Date(deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                )}
              </div>

              {/* Add Status Change Menu */}
              <div className="flex items-center justify-between">
                <Menu>
                  <MenuHandler>
                    <Button 
                      variant="text" 
                      size="sm"
                      className="p-1 text-gray-700 flex items-center gap-1 text-xs"
                    >
                      <span>Status: {props.task?.status?.replace('droppable-', '')?.replace('-', ' ')}</span>
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  </MenuHandler>
                  <MenuList className="bg-white border-gray-200">
                    {['to-do', 'pending', 'in-progress', 'done'].map((status) => (
                      <MenuItem 
                        key={status}
                        onClick={() => {
                          const newStatus = `droppable-${status}`;
                          if (newStatus === 'droppable-pending' && props.task.status !== 'droppable-pending' && !props.task.pendingReason) {
                            // Handle pending status - would need a way to set pendingTask and open reason modal
                            if (props.onStatusChange && props.onPendingChange) {
                              props.onPendingChange(props.task);
                            }
                          } else {
                            if (props.onStatusChange) {
                              props.onStatusChange(props.task.id, newStatus);
                            }
                          }
                        }}
                        className="text-gray-700 hover:bg-gray-50 capitalize"
                      >
                        {status.replace('-', ' ')}
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>
                
                {timeEstimate && timeSpent && (
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <span>{Math.min(Math.round((timeSpent / timeEstimate) * 100), 100)}%</span>
                  </div>
                )}
              </div>

              {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {tags.map((tag, index) => (
                    <Chip
                      key={index}
                      value={tag}
                      variant="ghost"
                      className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5"
                      size="sm"
                    />
                  ))}
                </div>
              )}

              {description && (
                <Typography variant="small" className={`line-clamp-2 text-xs sm:text-sm ${color === '#F3F4F6' ? 'text-gray-600' : 'text-white/70'}`}>
                  {description}
                </Typography>
              )}

              {timeEstimate && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <Typography variant="small" className={`font-medium text-xs sm:text-sm ${color === '#F3F4F6' ? 'text-gray-700' : 'text-white/90'}`}>
                      Progress:
                    </Typography>
                    <Typography variant="small" className={`text-xs sm:text-sm ${color === '#F3F4F6' ? 'text-gray-700' : 'text-white/90'}`}>
                      {progress}%
                    </Typography>
                  </div>
                  <div className="relative h-1.5 sm:h-2 bg-gray-100 rounded-full ">
                    <div 
                      className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                      style={{ 
                        width: `${progress}%`,
                        background: `repeating-linear-gradient(
                          45deg,
                          transparent,
                          transparent 10px,
                          rgba(255,255,255,0.1) 10px,
                          rgba(255,255,255,0.1) 20px
                        )`
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </CardBody>
          {(attachment || pendingProof || comments.length > 0) && (
            <CardFooter className="pt-0 px-3 pb-3 sm:px-4 sm:pb-4 flex items-center gap-2">
              {attachment && (
                <div className="flex items-center gap-1 text-gray-500 text-xs">
                  <Paperclip className="h-3 w-3" />
                  {isImageAttachment ? '1 image' : '1 file'}
                </div>
              )}
              {pendingProof && (
                <div className="flex items-center gap-1 text-gray-500 text-xs">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {isImageProof ? '1 proof image' : '1 proof file'}
                </div>
              )}
              {comments.length > 0 && (
                <div className="flex items-center gap-1 text-gray-500 text-xs">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  {comments.length}
                </div>
              )}
            </CardFooter>
          )}
        </Card>
      </div>

      <Dialog 
        open={isModalOpen} 
        handler={() => setIsModalOpen(!isModalOpen)}
        className="max-w-4xl mx-auto rounded-lg shadow-lg bg-white/95 backdrop-blur-sm"
      >
        <Card className="w-full">
          <DialogHeader className="bg-white text-gray-900 rounded-t-lg p-4 border-b border-gray-200">
            <div className="flex items-center justify-between w-full">
              {props.task && (
                <>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${
                      props.task?.priority === 'high' ? 'bg-red-500' : 
                      props.task?.priority === 'medium' ? 'bg-yellow-500' : 
                      'bg-green-500'
                    }`} />
                    <Typography variant="h5" className="font-semibold text-gray-900">
                      {props.task?.title}
                    </Typography>
                  </div>
                </>
              )}
              
              {props.task !== null && (
                <div className={`px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700`}>
                  {(props.task?.priority.charAt(0).toUpperCase() + 
                    props.task?.priority.slice(1))} Priority
                </div>
              )}
            </div>
          </DialogHeader>
          <DialogContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <Typography variant="h6" className="font-semibold mb-3 text-gray-900">Description</Typography>
                  <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <Typography variant="paragraph" className="text-gray-800">
                      {props.task?.description || 'No description provided'}
                    </Typography>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <Typography variant="small" className="font-medium text-gray-700 mb-2">Assigned To</Typography>
                    <Chip size="sm" value={props.task?.assignedTo} className="bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-xs" />
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <Typography variant="small" className="font-medium text-gray-700 mb-2">Due Date</Typography>
                    <Typography 
                      variant="small"
                      className={`font-medium ${
                        new Date(props.task?.deadline) < new Date() && 
                        props.task?.deadline !== 'No deadline' ? 
                        'text-red-600' : 'text-gray-800'
                      }`}
                    >
                      {props.task?.deadline}
                    </Typography>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <Typography variant="small" className="font-medium text-gray-700 mb-2">Status</Typography>
                    <Chip
                      size="sm"
                      value={props.task?.status.replace('droppable-', '').replace('-', ' ')}
                      className={`rounded-full px-3 py-1 text-xs capitalize ${
                        props.task?.status === 'droppable-to-do' ? 'bg-gray-100 text-gray-600' : 
                        props.task?.status === 'droppable-pending' ? 'bg-yellow-50 text-yellow-600' : 
                        props.task?.status === 'droppable-in-progress' ? 'bg-blue-50 text-blue-600' : 
                        'bg-green-50 text-green-600'
                      }`}
                    />
                  </div>
                </div>
                
                {/* Tags Section */}
                {props.task?.tags?.length > 0 && (
                  <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <Typography variant="small" className="font-medium text-gray-700 mb-2">Tags</Typography>
                    <div className="flex flex-wrap gap-2">
                      {props.task?.tags.map((tag, index) => (
                        <Chip
                          key={index}
                          size="sm"
                          value={tag}
                          variant="ghost"
                          className="bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-xs"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="space-y-6">
                {/* Comments Section */}
                {props.task?.comments?.length > 0 && (
                  <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <Typography variant="small" className="font-medium text-gray-700 mb-2">Comments</Typography>
                    <div className="space-y-3 max-h-[300px] overflow-y-auto">
                      {props.task?.comments.map((comment) => (
                        <div key={comment.id} className="bg-gray-50 p-3 rounded-lg">
                          <Typography variant="small" className="text-gray-800">{comment.text}</Typography>
                          <div className="flex items-center justify-between mt-2">
                            <Typography variant="small" className="text-gray-500 text-xs">{comment.user}</Typography>
                            <Typography variant="small" className="text-gray-500 text-xs">
                              {new Date(comment.timestamp).toLocaleString()}
                            </Typography>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </DialogContent>
          <DialogFooter className="bg-white rounded-b-xl p-4 flex justify-end gap-3 border-t border-gray-200">
            <Button 
              variant="outlined" 
              color="gray" 
              onClick={() => setIsModalOpen(false)} 
              className="rounded-lg border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Close
            </Button>
          </DialogFooter>
        </Card>
      </Dialog>

      <Dialog 
        open={isEditingProgress} 
        handler={() => setIsEditingProgress(false)}
        className="max-w-md mx-auto rounded-lg shadow-lg bg-white/95 backdrop-blur-sm"
      >
        <Card className="w-full">
          <DialogHeader className="bg-white text-gray-900 rounded-t-lg p-4 border-b border-gray-200">
            <Typography variant="h5" className="font-medium">Update Progress</Typography>
          </DialogHeader>
          <DialogBody className="p-6 space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Typography variant="h6" className="font-medium text-gray-700">
                  Current Progress: {progress}%
                </Typography>
                <div
                  className="text-sm font-medium"
                >
                  {timeSpent}h / {timeEstimate}h
                </div>
              </div>
              
              <div className="py-4">
                <Slider
                  value={progress}
                  onChange={(value) => {
                    const newTimeSpent = (value / 100) * timeEstimate;
                    if (props.onUpdateProgress) {
                      props.onUpdateProgress(props.task.id, newTimeSpent);
                    }
                  }}
                  className="h-1.5"
                  barClassName="rounded-full bg-blue-500"
                  thumbClassName="h-4 w-4 bg-blue-500 border-2 border-white shadow-md"
                  trackClassName="rounded-full bg-gray-100"
                />
              </div>

              <div
                className="bg-gray-50 p-4 rounded-lg"
              >
                <div className="flex justify-between items-center mb-2">
                  <Typography variant="small" className="text-gray-600">Time Tracking</Typography>
                  <Typography variant="small" className="text-gray-600">
                    {Math.round((timeSpent / timeEstimate) * 100)}% Complete
                  </Typography>
                </div>
                <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="absolute h-full bg-blue-500 rounded-full"
                    style={{ width: `${(timeSpent / timeEstimate) * 100}%` }}
                  >
                    <div
                      className="absolute inset-0"
                      style={{
                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)"
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </DialogBody>
          <DialogFooter className="bg-gray-50 rounded-b-lg p-4 flex justify-end gap-3 border-t border-gray-200">
            <Button 
              variant="outlined" 
              color="gray" 
              onClick={() => setIsEditingProgress(false)}
              className="rounded-lg border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleUpdateProgress(progress);
                setIsEditingProgress(false);
              }}
              className="rounded-lg bg-blue-500 hover:bg-blue-600 text-white"
            >
              Save Progress
            </Button>
          </DialogFooter>
        </Card>
      </Dialog>
    </>
  );
}

// Droppable Component
export function TaskDroppable(props) {
  const baseStyles = `
    flex
    flex-col
    items-center
    justify-start
    min-h-[calc(100vh-240px)]
    bg-white/50
    backdrop-blur-sm
    border-2
    border-gray-200 border-dashed
    rounded-lg
    p-4
    transition-all
    duration-300
    ease-out
    relative
    hover:border-gray-300
  `;

  return (
    <div className={`${baseStyles}`}>      
      {/* Content */}
      <div className="relative z-10 w-full h-full space-y-4">
        {props.children}
        
        {/* Empty state indicator */}
        {!props.children?.props?.children?.length && (
          <div className="flex flex-col items-center justify-center h-32 text-gray-400 transition-opacity duration-300">
            <svg
              className="w-8 h-8 mb-2 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span className="text-sm font-medium">No tasks</span>
          </div>
        )}
      </div>
    </div>
  );
}

// Task Component
const Task = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('kanbanTasks');
    return savedTasks
      ? JSON.parse(savedTasks).map(task => ({
          ...task,
          comments: task.comments || [],
          color: '#F3F4F6' // Set all saved tasks to grey
        }))
      : [
          {
            id: 'task-1',
            title: 'Complete Project Proposal',
            description: 'Draft and finalize the project proposal for client review',
            assignedTo: 'John Doe',
            deadline: '2025-03-25',
            attachment: { name: 'proposal-image.jpg' },
            status: 'droppable-to-do',
            pendingReason: '',
            pendingProof: null,
            priority: 'high',
            comments: [
              { id: 'c1', text: 'Make sure to include budget breakdown', user: 'Sarah Parker', timestamp: '2023-03-22T10:30:00' },
              { id: 'c2', text: 'Client requested additional mockups', user: 'John Doe', timestamp: '2023-03-23T14:15:00' }
            ],
            color: '#F3F4F6',
            tags: ['Client', 'Proposal', 'Urgent'],
            timeEstimate: 6,
            timeSpent: 4
          },
          {
            id: 'task-2',
            title: 'Fix Payment Gateway Bug',
            description: 'Resolve the issue with credit card processing in checkout flow',
            assignedTo: 'Jane Smith',
            deadline: '2025-03-23',
            attachment: { name: 'bug-screenshot.png' },
            status: 'droppable-in-progress',
            pendingReason: '',
            pendingProof: null,
            priority: 'critical',
            comments: [
              { id: 'c3', text: 'Seems to be an issue with the API integration', user: 'Jane Smith', timestamp: '2023-03-21T11:20:00' }
            ],
            color: '#F3F4F6',
            tags: ['Bug', 'Critical', 'Frontend'],
            timeEstimate: 4,
            timeSpent: 2
          },
          {
            id: 'task-16',
            title: 'Integrate Payment Processor API',
            description: 'Connect with Stripe API for payment processing and implement webhooks',
            assignedTo: 'Michael Brown',
            deadline: '2025-04-05',
            attachment: { name: 'api-docs.pdf' },
            status: 'droppable-in-progress',
            pendingReason: '',
            pendingProof: null,
            priority: 'high',
            comments: [
              { id: 'c19', text: 'Basic integration is working, testing with sandbox accounts', user: 'Michael Brown', timestamp: '2023-04-01T13:25:00' }
            ],
            color: '#F3F4F6',
            tags: ['API', 'Payments', 'Backend'],
            timeEstimate: 15,
            timeSpent: 8
          },
          {
            id: 'task-17',
            title: 'Implement Responsive Design',
            description: 'Update application UI to be fully responsive on all device sizes',
            assignedTo: 'Emma Lee',
            deadline: '2025-04-08',
            attachment: { name: 'responsive-mockups.zip' },
            status: 'droppable-in-progress',
            pendingReason: '',
            pendingProof: null,
            priority: 'medium',
            comments: [
              { id: 'c20', text: 'Mobile views are complete, working on tablet layouts', user: 'Emma Lee', timestamp: '2023-04-02T10:15:00' }
            ],
            color: '#F3F4F6',
            tags: ['UI', 'Responsive', 'Frontend'],
            timeEstimate: 12,
            timeSpent: 7
          },
          {
            id: 'task-3',
            title: 'Database Migration to AWS',
            description: 'Migrate current database to AWS RDS for better scalability',
            assignedTo: 'Robert Johnson',
            deadline: '2025-03-30',
            attachment: { name: 'migration-plan.pdf' },
            status: 'droppable-pending',
            pendingReason: 'Waiting for security approval',
            pendingProof: { name: 'request-email.pdf' },
            priority: 'medium',
            comments: [
              { id: 'c4', text: 'Security team is reviewing our request', user: 'Robert Johnson', timestamp: '2023-03-20T15:45:00' },
              { id: 'c5', text: 'We need to provide more details about encryption', user: 'Mike Wilson', timestamp: '2023-03-21T09:30:00' }
            ],
            color: '#F3F4F6',
            tags: ['Database', 'AWS', 'Migration'],
            timeEstimate: 12,
            timeSpent: 3
          },
          {
            id: 'task-4',
            title: 'Design Landing Page',
            description: 'Create new design for product landing page with focus on conversion',
            assignedTo: 'Emma Lee',
            deadline: '2025-04-05',
            attachment: { name: 'design-brief.docx' },
            status: 'droppable-to-do',
            pendingReason: '',
            pendingProof: null,
            priority: 'medium',
            comments: [],
            color: '#DBEAFE',
            tags: ['Design', 'Marketing', 'Frontend'],
            timeEstimate: 10,
            timeSpent: 0
          },
          {
            id: 'task-5',
            title: 'Implement User Authentication',
            description: 'Add OAuth and traditional login flows to the application',
            assignedTo: 'Michael Brown',
            deadline: '2025-03-28',
            attachment: null,
            status: 'droppable-in-progress',
            pendingReason: '',
            pendingProof: null,
            priority: 'high',
            comments: [
              { id: 'c6', text: 'Should we use Auth0 or build our own?', user: 'David Chen', timestamp: '2023-03-19T16:20:00' },
              { id: 'c7', text: 'Let\'s go with Auth0 for faster implementation', user: 'Michael Brown', timestamp: '2023-03-20T09:15:00' }
            ],
            color: '#E0E7FF',
            tags: ['Security', 'Backend', 'Authentication'],
            timeEstimate: 8,
            timeSpent: 3
          },
          {
            id: 'task-6',
            title: 'Write API Documentation',
            description: 'Create comprehensive documentation for external API endpoints',
            assignedTo: 'Sarah Parker',
            deadline: '2025-04-10',
            attachment: { name: 'api-outline.md' },
            status: 'droppable-to-do',
            pendingReason: '',
            pendingProof: null,
            priority: 'low',
            comments: [],
            color: '#F3F4F6',
            tags: ['Documentation', 'API', 'Backend'],
            timeEstimate: 6,
            timeSpent: 0
          },
          {
            id: 'task-7',
            title: 'Performance Optimization',
            description: 'Improve application loading time and responsiveness',
            assignedTo: 'David Chen',
            deadline: '2025-04-15',
            attachment: null,
            status: 'droppable-to-do',
            pendingReason: '',
            pendingProof: null,
            priority: 'medium',
            comments: [],
            color: '#F3F4F6',
            tags: ['Performance', 'Optimization', 'Frontend'],
            timeEstimate: 12,
            timeSpent: 0
          },
          {
            id: 'task-8',
            title: 'User Testing Session',
            description: 'Conduct user testing for the new features',
            assignedTo: 'Lisa Wang',
            deadline: '2025-04-08',
            attachment: { name: 'test-scenarios.xlsx' },
            status: 'droppable-pending',
            pendingReason: 'Waiting for feature completion',
            pendingProof: null,
            priority: 'medium',
            comments: [
              { id: 'c8', text: 'Can we get at least 10 users for testing?', user: 'Emma Lee', timestamp: '2023-03-22T13:10:00' },
              { id: 'c9', text: 'Yes, I\'ve already recruited 12 participants', user: 'Lisa Wang', timestamp: '2023-03-22T14:30:00' }
            ],
            color: '#FCE7F3',
            tags: ['Testing', 'UX', 'Research'],
            timeEstimate: 4,
            timeSpent: 1
          },
          {
            id: 'task-18',
            title: 'Third-Party API Integration',
            description: 'Integrate with external analytics service and implement tracking',
            assignedTo: 'David Chen',
            deadline: '2025-04-10',
            attachment: { name: 'integration-specs.pdf' },
            status: 'droppable-pending',
            pendingReason: 'Waiting for API access from vendor',
            pendingProof: { name: 'access-request.pdf' },
            priority: 'medium',
            comments: [
              { id: 'c21', text: 'Submitted request for API credentials', user: 'David Chen', timestamp: '2023-04-01T09:30:00' },
              { id: 'c22', text: 'Vendor said they should approve within 48 hours', user: 'John Doe', timestamp: '2023-04-02T14:15:00' }
            ],
            color: '#F3F4F6',
            tags: ['API', 'Integration', 'Analytics'],
            timeEstimate: 8,
            timeSpent: 1.5
          },
          {
            id: 'task-19',
            title: 'Update Privacy Policy',
            description: 'Review and update privacy policy to comply with latest regulations',
            assignedTo: 'Sarah Parker',
            deadline: '2025-04-15',
            attachment: { name: 'current-policy.docx' },
            status: 'droppable-pending',
            pendingReason: 'Waiting for legal review',
            pendingProof: { name: 'legal-request.pdf' },
            priority: 'high',
            comments: [
              { id: 'c23', text: 'Draft complete, submitted to legal for review', user: 'Sarah Parker', timestamp: '2023-04-03T11:20:00' }
            ],
            color: '#F3F4F6',
            tags: ['Legal', 'Compliance', 'Documentation'],
            timeEstimate: 6,
            timeSpent: 4
          },
          {
            id: 'task-9',
            title: 'Setup CI/CD Pipeline',
            description: 'Configure continuous integration and deployment pipeline',
            assignedTo: 'Robert Johnson',
            deadline: '2025-04-02',
            attachment: null,
            status: 'droppable-in-progress',
            pendingReason: '',
            pendingProof: null,
            priority: 'high',
            comments: [
              { id: 'c10', text: 'Let\'s use GitHub Actions for this', user: 'Robert Johnson', timestamp: '2023-03-21T10:45:00' }
            ],
            color: '#F3F4F6',
            tags: ['DevOps', 'CI/CD', 'Automation'],
            timeEstimate: 8,
            timeSpent: 5
          },
          {
            id: 'task-10',
            title: 'Create Marketing Email Templates',
            description: 'Design and code responsive email templates for marketing campaigns',
            assignedTo: 'Emma Lee',
            deadline: '2025-04-12',
            attachment: { name: 'email-draft.png' },
            status: 'droppable-done',
            pendingReason: '',
            pendingProof: null,
            priority: 'medium',
            comments: [
              { id: 'c11', text: 'These look great! Ready for copywriting', user: 'Sarah Parker', timestamp: '2023-03-18T16:20:00' },
              { id: 'c12', text: 'Thanks! Made some small adjustments to the CTA', user: 'Emma Lee', timestamp: '2023-03-19T09:30:00' }
            ],
            color: '#F3F4F6',
            tags: ['Marketing', 'Email', 'Design'],
            timeEstimate: 6,
            timeSpent: 6
          },
          {
            id: 'task-13',
            title: 'Setup Development Environment',
            description: 'Create standardized development environment with Docker for new team members',
            assignedTo: 'David Chen',
            deadline: '2025-03-15',
            attachment: { name: 'docker-compose.yml' },
            status: 'droppable-done',
            pendingReason: '',
            pendingProof: null,
            priority: 'high',
            comments: [
              { id: 'c13', text: 'Added Redis and PostgreSQL containers', user: 'David Chen', timestamp: '2023-03-10T11:30:00' },
              { id: 'c14', text: 'Documentation for setup is in the README', user: 'David Chen', timestamp: '2023-03-14T15:45:00' }
            ],
            color: '#F3F4F6',
            tags: ['DevOps', 'Docker', 'Setup'],
            timeEstimate: 8,
            timeSpent: 7.5
          },
          {
            id: 'task-14',
            title: 'Create User Onboarding Flow',
            description: 'Design and implement interactive onboarding experience for new users',
            assignedTo: 'Emma Lee',
            deadline: '2025-03-20',
            attachment: { name: 'onboarding-flow.fig' },
            status: 'droppable-done',
            pendingReason: '',
            pendingProof: null,
            priority: 'medium',
            comments: [
              { id: 'c15', text: 'Got great feedback from focus group', user: 'Emma Lee', timestamp: '2023-03-18T10:00:00' },
              { id: 'c16', text: 'Implemented all the suggested changes', user: 'Emma Lee', timestamp: '2023-03-19T16:20:00' }
            ],
            color: '#F3F4F6',
            tags: ['UX', 'Onboarding', 'Frontend'],
            timeEstimate: 12,
            timeSpent: 14
          },
          {
            id: 'task-15',
            title: 'Implement Social Login Options',
            description: 'Add Google, Facebook, and Apple login options to authentication flow',
            assignedTo: 'Michael Brown',
            deadline: '2025-03-28',
            attachment: null,
            status: 'droppable-done',
            pendingReason: '',
            pendingProof: null,
            priority: 'high',
            comments: [
              { id: 'c17', text: 'Google and Facebook integration complete', user: 'Michael Brown', timestamp: '2023-03-25T09:15:00' },
              { id: 'c18', text: 'Apple login was tricky but works now', user: 'Michael Brown', timestamp: '2023-03-27T14:30:00' }
            ],
            color: '#F3F4F6',
            tags: ['Authentication', 'OAuth', 'Security'],
            timeEstimate: 10,
            timeSpent: 9
          },
          {
            id: 'task-11',
            title: 'Implement Analytics Dashboard',
            description: 'Create a dashboard to track key performance metrics',
            assignedTo: 'Michael Brown',
            deadline: '2025-04-20',
            attachment: { name: 'dashboard-wireframe.fig' },
            status: 'droppable-to-do',
            pendingReason: '',
            pendingProof: null,
            priority: 'medium',
            comments: [],
            color: '#F3F4F6',
            tags: ['Analytics', 'Dashboard', 'Frontend'],
            timeEstimate: 10,
            timeSpent: 0
          },
          {
            id: 'task-12',
            title: 'Security Audit',
            description: 'Perform comprehensive security assessment of the application',
            assignedTo: 'Jane Smith',
            deadline: '2025-04-25',
            attachment: null,
            status: 'droppable-to-do',
            pendingReason: '',
            pendingProof: null,
            priority: 'high',
            comments: [],
            color: '#F3F4F6',
            tags: ['Security', 'Audit', 'Compliance'],
            timeEstimate: 14,
            timeSpent: 0
          }
        ];
  });

  const [openTaskModal, setOpenTaskModal] = useState(false);
  const [openReasonModal, setOpenReasonModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [viewMode, setViewMode] = useState(() => window.innerWidth < 768 ? 'list' : 'kanban');
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assignedTo: '',
    deadline: '',
    attachment: null,
    priority: 'medium',
    tags: [],
    timeEstimate: null,
    timeSpent: null,
    comments: [],
    color: '#F3F4F6',
  });
  const [pendingTask, setPendingTask] = useState(null);
  const [pendingReason, setPendingReason] = useState('');
  const [pendingProof, setPendingProof] = useState(null);
  const [filter, setFilter] = useState({
    status: 'all',
    assignedTo: 'all',
    deadline: 'all',
  });
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [sortBy, setSortBy] = useState('priority');
  const [newTag, setNewTag] = useState('');
  const [newComment, setNewComment] = useState('');
  const [commentingTask, setCommentingTask] = useState(null);
  const [isEditingProgress, setIsEditingProgress] = useState(false);
  const [viewTaskModal, setViewTaskModal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Add event listener for window resize
  useEffect(() => {
    const handleResize = () => {
      setViewMode(window.innerWidth < 768 ? 'list' : 'kanban');
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getTaskStatistics = () => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.status === 'droppable-done').length;
    const inProgress = tasks.filter(task => task.status === 'droppable-in-progress').length;
    const pending = tasks.filter(task => task.status === 'droppable-pending').length;
    const todo = tasks.filter(task => task.status === 'droppable-to-do').length;
    
    return {
      total,
      completed,
      inProgress,
      pending,
      todo,
      completionRate: total ? Math.round((completed / total) * 100) : 0,
      efficiency: total ? Math.round((completed / total) * 100) : 0
    };
  };

  const stats = getTaskStatistics();

  useEffect(() => {
    const tasksToSave = tasks.map((task) => ({
      ...task,
      attachment: task.attachment ? { name: task.attachment.name } : null,
      pendingProof: task.pendingProof ? { name: task.pendingProof.name } : null,
      comments: task.comments || []
    }));
    localStorage.setItem('kanbanTasks', JSON.stringify(tasksToSave));
  }, [tasks]);

  useEffect(() => {
    let updatedTasks = [...tasks];
    
    if (filter.status !== 'all') {
      updatedTasks = updatedTasks.filter(task => 
        task.status === `droppable-${filter.status.toLowerCase().replace(' ', '-')}`
      );
    }

    if (filter.assignedTo !== 'all') {
      updatedTasks = updatedTasks.filter(task => 
        task.assignedTo.toLowerCase() === filter.assignedTo.toLowerCase()
      );
    }

    if (filter.deadline !== 'all') {
      switch(filter.deadline) {
        case 'overdue':
          updatedTasks = updatedTasks.filter(task => 
            task.deadline !== 'No deadline' && 
            new Date(task.deadline) < new Date()
          );
          break;
        case 'today':
          updatedTasks = updatedTasks.filter(task => {
            const today = new Date().toISOString().split('T')[0];
            return task.deadline === today;
          });
          break;
        case 'upcoming':
          updatedTasks = updatedTasks.filter(task => 
            task.deadline !== 'No deadline' && 
            new Date(task.deadline) > new Date()
          );
          break;
      }
    }

    setFilteredTasks(updatedTasks);
  }, [tasks, filter]);

  const handleOpenTaskModal = () => setOpenTaskModal(!openTaskModal);
  const handleOpenReasonModal = () => setOpenReasonModal(!openReasonModal);
  const handleOpenDeleteModal = (task) => {
    setTaskToDelete(task);
    setOpenDeleteModal(true);
  };
  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setTaskToDelete(null);
  };

  const handleTaskInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTask = () => {
    const taskId = `task-${tasks.length + 1}`;
    const attachmentWithUrl = newTask.attachment
      ? {
          name: newTask.attachment.name,
          url: /\.(jpg|jpeg|png|gif)$/i.test(newTask.attachment.name)
            ? URL.createObjectURL(newTask.attachment)
            : null,
        }
      : null;

    setTasks((prev) => [
      ...prev,
      {
        ...newTask,
        id: taskId,
        attachment: attachmentWithUrl,
        status: 'droppable-to-do',
        pendingReason: '',
        pendingProof: null,
        priority: newTask.priority,
        comments: [],
        color: '#F3F4F6', // Ensure grey color for all new tasks
      },
    ]);
    setNewTask({
      title: '',
      description: '',
      assignedTo: '',
      deadline: '',
      attachment: null,
      priority: 'medium',
      tags: [],
      timeEstimate: null,
      timeSpent: null,
      comments: [],
      color: '#F3F4F6', // Set default color to grey
    });
    handleOpenTaskModal();
  };

  const handleDeleteTask = () => {
    if (taskToDelete) {
      setTasks((prev) => prev.filter((task) => task.id !== taskToDelete.id));
      handleCloseDeleteModal();
    }
  };

  const handleSavePendingReason = () => {
    if (!pendingReason.trim()) {
      alert('Please provide a reason for pending status');
      return;
    }

    const proofWithUrl = pendingProof
      ? {
          name: pendingProof.name,
          url: /\.(jpg|jpeg|png|gif)$/i.test(pendingProof.name)
            ? URL.createObjectURL(pendingProof)
            : null,
        }
      : null;

    setTasks((prev) =>
      prev.map((task) =>
        task.id === pendingTask.id
          ? {
              ...task,
              status: 'droppable-pending',
              pendingReason,
              pendingProof: proofWithUrl,
            }
          : task
      )
    );
    setOpenReasonModal(false);
  };

  const handleFilterChange = (type, value) => {
    setFilter(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const uniqueAssignees = ['all', ...new Set(tasks.map(task => task.assignedTo))];

  const handleAddTag = () => {
    if (newTag.trim() && !newTask.tags.includes(newTag.trim())) {
      setNewTask(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleAddComment = () => {
    if (!newComment.trim() || !commentingTask) return;

    const comment = {
      id: `comment-${Date.now()}`,
      text: newComment.trim(),
      timestamp: new Date().toISOString(),
      userId: 'current-user', // Replace with actual user ID
    };

    setTasks(prev => prev.map(task => 
      task.id === commentingTask.id
        ? { 
            ...task, 
            comments: [...(task.comments || []), comment]
          }
        : task
    ));

    setNewComment('');
    setCommentingTask(null);
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA] p-3 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 sm:gap-4">
          <Card className="bg-white border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <CardBody className="p-3 sm:p-4">
              <Typography variant="h6" className="mb-1 sm:mb-2 text-gray-600 font-normal text-sm sm:text-base">Total Tasks</Typography>
              <Typography variant="h4" className="font-medium text-gray-900">{stats.total}</Typography>
            </CardBody>
          </Card>
          <Card className="bg-white border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <CardBody className="p-3 sm:p-4">
              <Typography variant="h6" className="mb-1 sm:mb-2 text-gray-600 font-normal text-sm sm:text-base">Completed</Typography>
              <Typography variant="h4" className="font-medium text-gray-900">{stats.completed}</Typography>
            </CardBody>
          </Card>
          <Card className="bg-white border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <CardBody className="p-3 sm:p-4">
              <Typography variant="h6" className="mb-1 sm:mb-2 text-gray-600 font-normal text-sm sm:text-base">In Progress</Typography>
              <Typography variant="h4" className="font-medium text-gray-900">{stats.inProgress}</Typography>
            </CardBody>
          </Card>
          <Card className="bg-white border border-gray-200 hover:shadow-md transition-shadow duration-200 col-span-2 md:col-span-1">
            <CardBody className="p-3 sm:p-4">
              <Typography variant="h6" className="mb-1 sm:mb-2 text-gray-600 font-normal text-sm sm:text-base">Pending</Typography>
              <Typography variant="h4" className="font-medium text-gray-900">{stats.pending}</Typography>
            </CardBody>
          </Card>
          <Card className="bg-white border border-gray-200 hover:shadow-md transition-shadow duration-200 hidden md:block">
            <CardBody className="p-3 sm:p-4">
              <Typography variant="h6" className="mb-1 sm:mb-2 text-gray-600 font-normal text-sm sm:text-base">Efficiency</Typography>
              <Typography variant="h4" className="font-medium text-gray-900">{stats.efficiency}%</Typography>
            </CardBody>
          </Card>
        </div>

        {/* Filters and Actions */}
        <div className="bg-white/70 backdrop-blur-sm p-4 rounded-lg border border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex flex-wrap gap-2">
              <Button 
                className="bg-gray-900 hover:bg-gray-800 shadow-sm flex items-center gap-2"
                onClick={handleOpenTaskModal}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                New Task
              </Button>
              
              <Menu>
                <MenuHandler>
                  <Button 
                    variant="outlined" 
                    className="rounded-lg border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  >
                    Status: {filter.status}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </MenuHandler>
                <MenuList className="bg-white border-gray-200">
                  {['all', 'To Do', 'Pending', 'In Progress', 'Done'].map(status => (
                    <MenuItem 
                      key={status}
                      onClick={() => handleFilterChange('status', status)}
                      className="text-gray-700 hover:bg-gray-50"
                    >
                      {status}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>

              <Menu>
                <MenuHandler>
                  <Button 
                    variant="outlined" 
                    className="rounded-lg border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  >
                    Sort by: {sortBy}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </MenuHandler>
                <MenuList className="bg-white border-gray-200">
                  {['priority', 'deadline', 'title'].map(option => (
                    <MenuItem 
                      key={option}
                      onClick={() => setSortBy(option)}
                      className="text-gray-700 hover:bg-gray-50"
                    >
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </div>
            
            {/* View Toggle */}
            <div className="md:ml-auto flex items-center gap-2">
              <Button
                variant={viewMode === 'list' ? 'filled' : 'outlined'}
                className={`flex items-center gap-1 px-3 ${viewMode === 'list' ? 'bg-gray-900 text-white' : 'border-gray-300 text-gray-700'}`}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                List
              </Button>
              <Button
                variant={viewMode === 'kanban' ? 'filled' : 'outlined'}
                className={`flex items-center gap-1 px-3 ${viewMode === 'kanban' ? 'bg-gray-900 text-white' : 'border-gray-300 text-gray-700'}`}
                size="sm"
                onClick={() => setViewMode('kanban')}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                </svg>
                Kanban
              </Button>
            </div>
          </div>
        </div>

        {viewMode === 'list' ? (
          /* List View */
          <div className="space-y-4">
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <Typography variant="h5" className="font-medium text-gray-900">Tasks</Typography>
              </div>
              <div className="divide-y divide-gray-100">
                {filteredTasks.sort((a, b) => {
                  switch (sortBy) {
                    case 'priority': {
                      const priorityOrder = { high: 0, medium: 1, low: 2 };
                      return priorityOrder[a.priority] - priorityOrder[b.priority];
                    }
                    case 'deadline': {
                      if (a.deadline === 'No deadline') return 1;
                      if (b.deadline === 'No deadline') return -1;
                      return new Date(a.deadline) - new Date(b.deadline);
                    }
                    case 'title': {
                      return a.title.localeCompare(b.title);
                    }
                    default:
                      return 0;
                  }
                }).map(task => (
                  <div key={task.id} className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          task.priority === 'high' ? 'bg-red-500' : 
                          task.priority === 'medium' ? 'bg-yellow-500' : 
                          'bg-green-500'
                        }`} />
                        <Typography variant="h6" className="font-semibold text-gray-900">
                          {task.title}
                        </Typography>
                      </div>
                      <div>
                        <Chip
                          size="sm"
                          value={task.status.replace('droppable-', '').replace('-', ' ')}
                          className={`rounded-full text-xs capitalize ${
                            task.status === 'droppable-to-do' ? 'bg-gray-100 text-gray-700' : 
                            task.status === 'droppable-pending' ? 'bg-yellow-50 text-yellow-700' : 
                            task.status === 'droppable-in-progress' ? 'bg-blue-50 text-blue-700' : 
                            'bg-green-50 text-green-700'
                          }`}
                        />
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <span className="text-gray-600">Assignee:</span>
                          <span className="font-medium text-gray-800">{task.assignedTo}</span>
                        </div>
                        {task.deadline !== 'No deadline' && (
                          <div className="flex items-center gap-1">
                            <span className="text-gray-600">Due:</span>
                            <span className={`font-medium ${
                              new Date(task.deadline) < new Date() ? 'text-red-600' : 'text-gray-800'
                            }`}>
                              {new Date(task.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      {task.description && (
                        <Typography variant="small" className="text-gray-600 line-clamp-2">
                          {task.description}
                        </Typography>
                      )}
                      
                      {task.tags && task.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {task.tags.map((tag, index) => (
                            <Chip
                              key={index}
                              value={tag}
                              variant="ghost"
                              className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5"
                              size="sm"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <IconButton 
                          variant="text" 
                          className="p-1 text-gray-500"
                          onClick={() => setCommentingTask(task)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                          </svg>
                        </IconButton>
                        <Menu>
                          <MenuHandler>
                            <Button 
                              variant="text" 
                              size="sm"
                              className="text-gray-600 p-1 flex items-center gap-1"
                            >
                              <span>Status</span>
                              <ChevronDown className="h-3 w-3" />
                            </Button>
                          </MenuHandler>
                          <MenuList className="bg-white border-gray-200">
                            {['to-do', 'pending', 'in-progress', 'done'].map((status) => (
                              <MenuItem 
                                key={status}
                                onClick={() => {
                                  const newStatus = `droppable-${status}`;
                                  if (newStatus === 'droppable-pending' && task.status !== 'droppable-pending' && !task.pendingReason) {
                                    setPendingTask(task);
                                    setPendingReason('');
                                    setPendingProof(null);
                                    setOpenReasonModal(true);
                                  } else {
                                    setTasks(prev => prev.map(t => 
                                      t.id === task.id ? { ...t, status: newStatus } : t
                                    ));
                                  }
                                }}
                                className="text-gray-700 hover:bg-gray-50 capitalize"
                              >
                                {status.replace('-', ' ')}
                              </MenuItem>
                            ))}
                          </MenuList>
                        </Menu>
                      </div>
                      <div className="flex items-center gap-2">
                        <IconButton 
                          variant="text" 
                          className="p-1 text-gray-500"
                          onClick={() => setViewTaskModal(task)}
                        >
                          <Eye className="h-4 w-4" />
                        </IconButton>
                        <IconButton 
                          variant="text" 
                          className="p-1 text-red-500"
                          onClick={() => handleOpenDeleteModal(task)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </IconButton>
                      </div>
                    </div>
                  </div>
                ))}
                
                {filteredTasks.length === 0 && (
                  <div className="p-8 text-center">
                    <Typography variant="h6" className="text-gray-500 mb-2">No tasks found</Typography>
                    <Typography variant="small" className="text-gray-400">
                      Try changing your filters or create a new task
                    </Typography>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Kanban Board View - Non-draggable */
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {['To Do', 'Pending', 'In Progress', 'Done'].map((status, index) => {
                const columnId = `droppable-${status.toLowerCase().replace(' ', '-')}`;
                return (
                  <div key={index} className="w-full">
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                      <div className="bg-gray-50 p-3 sm:p-4 border-b border-gray-200">
                        <Typography variant="h6" className="font-medium text-gray-700 flex items-center">
                          {status}
                          <span className="ml-2 text-sm text-gray-400">
                            {filteredTasks.filter(task => task.status === columnId).length}
                          </span>
                        </Typography>
                      </div>
                      <div className="p-3 sm:p-4">
                        <TaskDroppable id={columnId}>
                          <div className="space-y-3 sm:space-y-4">
                            {filteredTasks
                              .filter(task => task.status === columnId)
                              .map(task => (
                                <TaskDraggable 
                                  key={task.id} 
                                  id={task.id} 
                                  task={task} 
                                  onDelete={() => handleOpenDeleteModal(task)}
                                  onViewTask={(task) => setViewTaskModal(task)}
                                  onUpdateProgress={(taskId, newTimeSpent) => {
                                    setTasks(prev => prev.map(task =>
                                      task.id === taskId 
                                        ? { ...task, timeSpent: newTimeSpent }
                                        : task
                                    ));
                                  }}
                                  onStatusChange={(taskId, newStatus) => {
                                    setTasks(prev => prev.map(task =>
                                      task.id === taskId 
                                        ? { ...task, status: newStatus }
                                        : task
                                    ));
                                  }}
                                  onPendingChange={(task) => {
                                    setPendingTask(task);
                                    setPendingReason('');
                                    setPendingProof(null);
                                    setOpenReasonModal(true);
                                  }}
                                />
                              ))}
                          </div>
                        </TaskDroppable>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <Dialog open={openTaskModal} handler={handleOpenTaskModal} 
              className="max-w-md mx-auto rounded-lg shadow-lg bg-white/95 backdrop-blur-sm">
        <Card className="w-full">
          <DialogHeader className="bg-white text-gray-900 rounded-t-xl p-3 sm:p-4 border-b border-gray-200">
            <Typography variant="h5" className="font-semibold text-gray-900">Create New Task</Typography>
          </DialogHeader>
          <DialogContent className="p-4 sm:p-6 bg-gray-50 max-h-[70vh] overflow-y-auto">
            <div className="flex flex-col gap-4 sm:gap-5">
              <Input 
                label="Task Title" 
                name="title" 
                value={newTask.title} 
                onChange={handleTaskInputChange} 
                className="bg-white rounded-lg border-gray-300 focus:border-gray-500 focus:ring focus:ring-gray-200 text-gray-900" 
                color="gray" 
                size="lg" 
              />
              <Textarea 
                label="Description" 
                name="description" 
                value={newTask.description} 
                onChange={handleTaskInputChange} 
                className="bg-white rounded-lg border-gray-300 focus:border-gray-500 focus:ring focus:ring-gray-200 text-gray-900" 
                color="gray" 
                size="lg" 
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input 
                  label="Assigned To" 
                  name="assignedTo" 
                  value={newTask.assignedTo} 
                  onChange={handleTaskInputChange} 
                  className="bg-white rounded-lg border-gray-300 focus:border-gray-500 focus:ring focus:ring-gray-200 text-gray-900" 
                  color="gray" 
                  size="lg" 
                />
                <Input 
                  type="date" 
                  label="Deadline" 
                  name="deadline" 
                  value={newTask.deadline} 
                  onChange={handleTaskInputChange} 
                  className="bg-white rounded-lg border-gray-300 focus:border-gray-500 focus:ring focus:ring-gray-200 text-gray-900" 
                  color="gray" 
                  size="lg" 
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Typography variant="small" className="font-medium text-gray-700 mb-2">
                    Priority
                  </Typography>
                  <div className="flex flex-wrap gap-2">
                    {['low', 'medium', 'high'].map(p => (
                      <Button 
                        key={p}
                        size="sm"
                        variant={newTask.priority === p ? "filled" : "outlined"}
                        color={
                          p === 'high' ? "red" : 
                          p === 'medium' ? "blue" : 
                          "green"
                        }
                        className="flex-1 capitalize"
                        onClick={() => setNewTask({...newTask, priority: p})}
                      >
                        {p}
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <Typography variant="small" className="font-medium text-gray-700 mb-2">
                    Estimated Time (hours)
                  </Typography>
                  <Input 
                    type="number" 
                    name="timeEstimate" 
                    value={newTask.timeEstimate || ''} 
                    onChange={handleTaskInputChange} 
                    className="bg-white rounded-lg border-gray-300 focus:border-gray-500 focus:ring focus:ring-gray-200 text-gray-900" 
                    color="gray" 
                    size="lg" 
                    min="0"
                  />
                </div>
              </div>
              <div>
                <Typography variant="small" className="font-medium text-gray-700 mb-2">
                  Tags
                </Typography>
                <div className="flex flex-wrap gap-2 mb-2">
                  {newTask.tags.map((tag, index) => (
                    <Chip 
                      key={index} 
                      value={tag} 
                      onClose={() => {
                        setNewTask({
                          ...newTask,
                          tags: newTask.tags.filter((_, i) => i !== index)
                        });
                      }}
                      className="bg-gray-100 text-gray-700"
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Add a tag..."
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    className="bg-white rounded-lg border-gray-300 focus:border-gray-500 focus:ring focus:ring-gray-200 text-gray-900" 
                    color="gray" 
                    size="lg" 
                  />
                  <Button 
                    color="gray"
                    onClick={handleAddTag}
                    disabled={!newTag.trim()}
                    className="bg-gray-900"
                  >
                    Add
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
          <DialogFooter className="bg-white rounded-b-xl p-3 sm:p-4 border-t border-gray-200 flex flex-col sm:flex-row sm:justify-end gap-2">
            <Button 
              variant="outlined" 
              color="gray" 
              onClick={handleOpenTaskModal}
              className="w-full sm:w-auto border-gray-300 text-gray-700"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAddTask}
              className="w-full sm:w-auto bg-gray-900 hover:bg-gray-800"
              disabled={!newTask.title.trim()}
            >
              Add Task
            </Button>
          </DialogFooter>
        </Card>
      </Dialog>

      <Dialog 
        open={openReasonModal} 
        handler={handleOpenReasonModal} 
        className="max-w-md mx-auto rounded-lg shadow-lg bg-white/95 backdrop-blur-sm">
        <Card className="w-full">
          <DialogHeader className="bg-white text-gray-900 rounded-t-xl p-3 sm:p-4 border-b border-gray-200">
            <Typography variant="h5" className="font-semibold text-gray-900">
              Add Pending Reason
            </Typography>
          </DialogHeader>
          <DialogContent className="p-4 sm:p-6 bg-gray-50">
            <div className="space-y-4">
              <Typography variant="small" className="text-gray-700">
                Please provide a reason for setting the task as pending:
              </Typography>
              <Textarea 
                placeholder="Enter reason..."
                value={pendingReason}
                onChange={(e) => setPendingReason(e.target.value)}
                className="bg-white rounded-lg border-gray-300 focus:border-gray-500 focus:ring focus:ring-gray-200 text-gray-900" 
                color="gray" 
                size="lg" 
                rows={4}
              />
              <div>
                <Typography variant="small" className="font-medium text-gray-700 mb-2">
                  Upload proof (optional)
                </Typography>
                <Input 
                  type="file" 
                  onChange={e => setPendingProof(e.target.files[0] || null)}
                  className="bg-white rounded-lg border-gray-300 focus:border-gray-500 focus:ring focus:ring-gray-200 text-gray-900" 
                  color="gray" 
                  size="lg" 
                />
              </div>
            </div>
          </DialogContent>
          <DialogFooter className="bg-white rounded-b-xl p-3 sm:p-4 border-t border-gray-200 flex flex-col sm:flex-row sm:justify-end gap-2">
            <Button 
              variant="outlined" 
              color="gray" 
              onClick={handleOpenReasonModal}
              className="w-full sm:w-auto border-gray-300 text-gray-700"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSavePendingReason}
              className="w-full sm:w-auto bg-gray-900 hover:bg-gray-800"
              disabled={!pendingReason.trim()}
            >
              Save
            </Button>
          </DialogFooter>
        </Card>
      </Dialog>

      <Dialog 
        open={openDeleteModal} 
        handler={handleCloseDeleteModal} 
        className="max-w-sm mx-auto rounded-lg shadow-lg bg-white/95 backdrop-blur-sm">
        <Card className="w-full">
          <DialogHeader className="bg-white text-gray-900 rounded-t-xl p-3 sm:p-4 border-b border-gray-200">
            <Typography variant="h5" className="font-semibold text-red-500">
              Delete Task
            </Typography>
          </DialogHeader>
          <DialogContent className="p-4 sm:p-6 bg-gray-50">
            <Typography className="text-gray-700">
              Are you sure you want to delete "{taskToDelete?.title}"? This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogFooter className="bg-white rounded-b-xl p-3 sm:p-4 border-t border-gray-200 flex flex-col sm:flex-row sm:justify-end gap-2">
            <Button 
              variant="outlined" 
              color="gray" 
              onClick={handleCloseDeleteModal}
              className="w-full sm:w-auto border-gray-300 text-gray-700"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleDeleteTask}
              className="w-full sm:w-auto bg-red-500 hover:bg-red-600"
            >
              Delete
            </Button>
          </DialogFooter>
        </Card>
      </Dialog>

      <Dialog 
        open={!!commentingTask} 
        handler={() => setCommentingTask(null)} 
        className="max-w-md mx-auto rounded-lg shadow-lg bg-white/95 backdrop-blur-sm">
        <Card className="w-full">
          <DialogHeader className="bg-white text-gray-900 rounded-t-xl p-3 sm:p-4 border-b border-gray-200">
            <Typography variant="h5" className="font-semibold text-gray-900">
              Add Comment to "{commentingTask?.title}"
            </Typography>
          </DialogHeader>
          <DialogContent className="p-4 sm:p-6 bg-gray-50 max-h-[60vh] overflow-y-auto">
            <div className="space-y-4">
              <Textarea
                label="Comment"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="bg-white rounded-lg border-gray-300 focus:border-gray-500 focus:ring focus:ring-gray-200 text-gray-900"
                color="gray"
                size="lg"
                rows={4}
              />
              {commentingTask?.comments?.length > 0 && (
                <div className="space-y-2">
                  <Typography variant="small" className="font-medium text-gray-700">Previous Comments:</Typography>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {commentingTask.comments.map((comment) => (
                      <div key={comment.id} className="bg-white p-3 rounded-lg border border-gray-200">
                        <Typography variant="small" className="text-gray-900">{comment.text}</Typography>
                        <Typography variant="small" className="text-gray-600 mt-1">
                          {new Date(comment.timestamp).toLocaleString()}
                        </Typography>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
          <DialogFooter className="bg-white rounded-b-xl p-3 sm:p-4 border-t border-gray-200 flex flex-col sm:flex-row sm:justify-end gap-2">
            <Button 
              variant="outlined" 
              color="gray" 
              onClick={() => setCommentingTask(null)}
              className="w-full sm:w-auto border-gray-300 text-gray-700"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAddComment}
              className="w-full sm:w-auto bg-gray-900 hover:bg-gray-800"
              disabled={!newComment.trim()}
            >
              Add Comment
            </Button>
          </DialogFooter>
        </Card>
      </Dialog>

      {/* Task View Modal */}
      <Dialog 
        open={viewTaskModal !== null} 
        handler={() => setViewTaskModal(null)}
        className="max-w-4xl mx-auto rounded-lg shadow-lg bg-white/95 backdrop-blur-sm"
      >
        {viewTaskModal && (
          <Card className="w-full">
            <DialogHeader className="bg-white text-gray-900 rounded-t-lg p-4 border-b border-gray-200">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${
                    viewTaskModal.priority === 'high' ? 'bg-red-500' : 
                    viewTaskModal.priority === 'medium' ? 'bg-yellow-500' : 
                    'bg-green-500'
                  }`} />
                  <Typography variant="h5" className="font-semibold text-gray-900">
                    {viewTaskModal.title}
                  </Typography>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700`}>
                  {(viewTaskModal.priority.charAt(0).toUpperCase() + 
                    viewTaskModal.priority.slice(1))} Priority
                </div>
              </div>
            </DialogHeader>
            <DialogContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <Typography variant="h6" className="font-semibold mb-3 text-gray-900">Description</Typography>
                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <Typography variant="paragraph" className="text-gray-800">
                        {viewTaskModal.description || 'No description provided'}
                      </Typography>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <Typography variant="small" className="font-medium text-gray-700 mb-2">Assigned To</Typography>
                      <Chip size="sm" value={viewTaskModal.assignedTo} className="bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-xs" />
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <Typography variant="small" className="font-medium text-gray-700 mb-2">Due Date</Typography>
                      <Typography 
                        variant="small"
                        className={`font-medium ${
                          new Date(viewTaskModal.deadline) < new Date() && 
                          viewTaskModal.deadline !== 'No deadline' ? 
                          'text-red-600' : 'text-gray-800'
                        }`}
                      >
                        {viewTaskModal.deadline}
                      </Typography>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <Typography variant="small" className="font-medium text-gray-700 mb-2">Status</Typography>
                      <Chip
                        size="sm"
                        value={viewTaskModal.status.replace('droppable-', '').replace('-', ' ')}
                        className={`rounded-full px-3 py-1 text-xs capitalize ${
                          viewTaskModal.status === 'droppable-to-do' ? 'bg-gray-100 text-gray-600' : 
                          viewTaskModal.status === 'droppable-pending' ? 'bg-yellow-50 text-yellow-600' : 
                          viewTaskModal.status === 'droppable-in-progress' ? 'bg-blue-50 text-blue-600' : 
                          'bg-green-50 text-green-600'
                        }`}
                      />
                    </div>
                  </div>
                  
                  {/* Tags Section */}
                  {viewTaskModal.tags?.length > 0 && (
                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <Typography variant="small" className="font-medium text-gray-700 mb-2">Tags</Typography>
                      <div className="flex flex-wrap gap-2">
                        {viewTaskModal.tags.map((tag, index) => (
                          <Chip
                            key={index}
                            size="sm"
                            value={tag}
                            variant="ghost"
                            className="bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-xs"
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="space-y-6">
                  {/* Comments Section */}
                  {viewTaskModal.comments?.length > 0 && (
                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <Typography variant="small" className="font-medium text-gray-700 mb-2">Comments</Typography>
                      <div className="space-y-3 max-h-[300px] overflow-y-auto">
                        {viewTaskModal.comments.map((comment) => (
                          <div key={comment.id} className="bg-gray-50 p-3 rounded-lg">
                            <Typography variant="small" className="text-gray-800">{comment.text}</Typography>
                            <div className="flex items-center justify-between mt-2">
                              <Typography variant="small" className="text-gray-500 text-xs">{comment.user}</Typography>
                              <Typography variant="small" className="text-gray-500 text-xs">
                                {new Date(comment.timestamp).toLocaleString()}
                              </Typography>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </DialogContent>
            <DialogFooter className="bg-white rounded-b-xl p-4 flex justify-end gap-3 border-t border-gray-200">
              <Button 
                variant="outlined" 
                color="gray" 
                onClick={() => setViewTaskModal(null)} 
                className="rounded-lg border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Close
              </Button>
            </DialogFooter>
          </Card>
        )}
      </Dialog>
    </div>
  );
};

export default Task;