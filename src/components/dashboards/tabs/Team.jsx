import React, { useState, useEffect } from "react";
import { 
  ReactFlow, 
  useNodesState, 
  useEdgesState, 
  Background, 
  addEdge, 
  ReactFlowProvider,
  Handle,
  Position
} from "@xyflow/react";
import { PlusCircle, XCircle, Wrench, Trash2, Upload, Info, X } from "lucide-react";
import useAlert from '../../../hooks/useAlert';
import AlertContainer from '../../ui/AlertContainer';
import { employeeService, departmentService } from '../../../api/apiService';

import "@xyflow/react/dist/style.css";

const initialNodes = [
  { 
    id: "admin-node", 
    position: { x: 300, y: 100 }, 
    data: { 
      label: "Admin", 
      type: "person",
      role: "Admin",
      permissions: ["Admin"],
      isDepartmentHead: true
    }, 
    style: { 
      backgroundColor: "#F3F4F6", 
      padding: 0,
      borderRadius: 8,
      color: "#111827",
      minWidth: 120,
      border: '1px solid #E5E7EB',
    } 
  },
  {
    id: "dev-dept",
    position: { x: 100, y: 250 },
    data: {
      label: "Development",
      type: "department"
    },
    style: {
      backgroundColor: "#60A5FA",
      padding: 0,
      borderRadius: 8,
      color: "white",
      minWidth: 200,
      border: 'none',
    }
  },
  {
    id: "design-dept",
    position: { x: 400, y: 250 },
    data: {
      label: "Design",
      type: "department"
    },
    style: {
      backgroundColor: "#34D399",
      padding: 0,
      borderRadius: 8,
      color: "white",
      minWidth: 200,
      border: 'none',
    }
  },
  {
    id: "marketing-dept",
    position: { x: 700, y: 250 },
    data: {
      label: "Marketing",
      type: "department"
    },
    style: {
      backgroundColor: "#A78BFA",
      padding: 0,
      borderRadius: 8,
      color: "white",
      minWidth: 200,
      border: 'none',
    }
  },
  {
    id: "person-1",
    position: { x: 50, y: 400 },
    data: {
      label: "John Smith",
      role: "Manager, Department Head",
      permissions: ["Read", "Write", "Edit", "Admin"],
      name: "John Smith",
      email: "john@example.com",
      type: "person",
      isDepartmentHead: true
    },
    style: {
      backgroundColor: "#60A5FA",
      padding: 0,
      borderRadius: 8,
      color: "white",
      minWidth: 120,
      border: 'none',
    }
  },
  {
    id: "person-2",
    position: { x: 200, y: 400 },
    data: {
      label: "Sarah Johnson",
      role: "Developer",
      permissions: ["Read", "Write"],
      name: "Sarah Johnson",
      email: "sarah@example.com",
      type: "person",
      isDepartmentHead: false
    },
    style: {
      backgroundColor: "#F3F4F6",
      padding: 0,
      borderRadius: 8,
      color: "#111827",
      minWidth: 120,
      border: '1px solid #E5E7EB',
    }
  },
  {
    id: "person-3",
    position: { x: 350, y: 400 },
    data: {
      label: "Michael Chen",
      role: "Designer, Department Head",
      permissions: ["Read", "Write", "Edit"],
      name: "Michael Chen",
      email: "michael@example.com",
      type: "person",
      isDepartmentHead: true
    },
    style: {
      backgroundColor: "#34D399",
      padding: 0,
      borderRadius: 8,
      color: "white",
      minWidth: 120,
      border: 'none',
    }
  },
  {
    id: "person-4",
    position: { x: 500, y: 400 },
    data: {
      label: "Emma Wilson",
      role: "Designer",
      permissions: ["Read", "Write"],
      name: "Emma Wilson",
      email: "emma@example.com",
      type: "person",
      isDepartmentHead: false
    },
    style: {
      backgroundColor: "#F3F4F6",
      padding: 0,
      borderRadius: 8,
      color: "#111827",
      minWidth: 120,
      border: '1px solid #E5E7EB',
    }
  },
  {
    id: "person-5",
    position: { x: 650, y: 400 },
    data: {
      label: "David Lopez",
      role: "Marketing, Department Head",
      permissions: ["Read", "Write", "Edit"],
      name: "David Lopez",
      email: "david@example.com",
      type: "person",
      isDepartmentHead: true
    },
    style: {
      backgroundColor: "#A78BFA",
      padding: 0,
      borderRadius: 8,
      color: "white",
      minWidth: 120,
      border: 'none',
    }
  },
  {
    id: "person-6",
    position: { x: 800, y: 400 },
    data: {
      label: "Lisa Brown",
      role: "Content Writer",
      permissions: ["Read", "Write"],
      name: "Lisa Brown",
      email: "lisa@example.com",
      type: "person",
      isDepartmentHead: false
    },
    style: {
      backgroundColor: "#F3F4F6",
      padding: 0,
      borderRadius: 8,
      color: "#111827",
      minWidth: 120,
      border: '1px solid #E5E7EB',
    }
  }
];

const initialEdges = [
  {
    id: "edge-admin-dev",
    source: "admin-node",
    target: "dev-dept",
    type: "default"
  },
  {
    id: "edge-admin-design",
    source: "admin-node",
    target: "design-dept",
    type: "default"
  },
  {
    id: "edge-admin-marketing",
    source: "admin-node",
    target: "marketing-dept",
    type: "default"
  },
  {
    id: "edge-dev-john",
    source: "dev-dept",
    target: "person-1",
    type: "default"
  },
  {
    id: "edge-dev-sarah",
    source: "dev-dept",
    target: "person-2",
    type: "default"
  },
  {
    id: "edge-design-michael",
    source: "design-dept",
    target: "person-3",
    type: "default"
  },
  {
    id: "edge-design-emma",
    source: "design-dept",
    target: "person-4",
    type: "default"
  },
  {
    id: "edge-marketing-david",
    source: "marketing-dept",
    target: "person-5",
    type: "default"
  },
  {
    id: "edge-marketing-lisa",
    source: "marketing-dept",
    target: "person-6",
    type: "default"
  }
];

const CustomNode = ({ data, id, style, setNodes, setEdges, onLongPress, edges, nodes, showError }) => {
  const handleDelete = async () => {
    // Check if this is a department head being deleted
    if (data.isDepartmentHead) {
      const departmentEdges = edges.filter(edge => 
        edge.source === id || edge.target === id
      );
      
      // Check each connected department
      for (const edge of departmentEdges) {
        const departmentId = edge.source === id ? edge.target : edge.source;
        const departmentNode = nodes.find(n => n.id === departmentId);
        
        if (departmentNode && departmentNode.data.type === "department") {
          // If this is the last department head, prevent deletion
          if (!checkDepartmentHeadStatus(departmentId, edges, nodes)) {
            showError(
              `Cannot delete the last Department Head of ${departmentNode.data.label}`,
              "Deletion Prevented",
              { duration: 3000 }
            );
            return;
          }
        }
      }
    }

    try {
      if (data.type === "person") {
        await employeeService.deleteEmployee(id);
      } else {
        await departmentService.deleteDepartment(id);
      }

      setNodes((nds) => nds.filter((node) => node.id !== id));
      setEdges((eds) => eds.filter((edge) => edge.source !== id && edge.target !== id));
      
      showError(`${data.type === "person" ? "Employee" : "Department"} deleted successfully`, "Success", { duration: 3000 });
    } catch {
      showError("Failed to delete node", "Error", { duration: 3000 });
    }
  };

  const isAdmin = data.label.toLowerCase() === "admin";
  const isDepartment = data.type === "department";

  return (
    <div 
      style={{ 
        ...style, 
        position: 'relative',
        border: '1px solid #E5E7EB',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
        transition: 'all 0.2s ease-in-out',
        maxWidth: '100%', // Ensure node doesn't overflow on mobile
        width: 'auto',
      }}
      className="group hover:shadow-lg hover:border-gray-300"
    >
      <Handle 
        type="target" 
        position={Position.Top}
        style={{
          background: '#fff',
          border: '1px solid #E5E7EB',
          width: '8px',
          height: '8px',
        }}
      />
      <div className="relative px-3 py-2 md:px-4 md:py-3">
        {isDepartment && (
          <span className="absolute -top-2 -left-2 inline-flex items-center px-1.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
            Dept
          </span>
        )}
        <div className="flex items-center justify-center gap-2 md:gap-3">
          {data.image && (
            <div className="relative">
              <img 
                src={data.image} 
                alt={data.label} 
                className="w-8 h-8 md:w-10 md:h-10 rounded-lg object-cover border border-gray-200"
              />
            </div>
          )}
          <div className="flex flex-col items-start">
            <span className="font-medium text-xs md:text-sm text-gray-900 line-clamp-1">
              {data.label}
            </span>
            {data.type === "person" && data.role && (
              <span className="text-[10px] md:text-xs text-gray-500 line-clamp-1">
                {data.role.split(',')[0]}
              </span>
            )}
          </div>
        </div>
        <div className="absolute top-1 right-1 md:top-2 md:right-2 flex gap-1 md:gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onLongPress(id)}
            className="p-1 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          >
            <Info className="h-3 w-3 md:h-3.5 md:w-3.5 text-gray-600" />
          </button>
          {!isAdmin && (
            <button
              onClick={handleDelete}
              className="p-1 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              <Trash2 className="h-3 w-3 md:h-3.5 md:w-3.5 text-gray-600" />
            </button>
          )}
        </div>
      </div>
      <Handle 
        type="source" 
        position={Position.Bottom}
        style={{
          background: '#fff',
          border: '1px solid #E5E7EB',
          width: '8px',
          height: '8px',
        }}
      />
    </div>
  );
};

const NodeDetailsModal = ({ isOpen, onClose, node, peopleUnderDepartment, onColorChange }) => {
  if (!isOpen || !node) return null;

  const isDepartment = node.data.type === 'department';
  const colorPresets = [
    { color: "#F3F4F6", label: "Light Gray" },
    { color: "#60A5FA", label: "Blue" },
    { color: "#34D399", label: "Green" },
    { color: "#F87171", label: "Red" },
    { color: "#FBBF24", label: "Yellow" },
    { color: "#A78BFA", label: "Purple" }
  ];

  const handleCustomColorChange = (e) => {
    onColorChange(node.id, e.target.value);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-4 md:p-6 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-800">
            {isDepartment ? 'Department Details' : 'Person Details'}
          </h2>
          <XCircle 
            className="h-5 w-5 text-gray-500 cursor-pointer hover:text-gray-700" 
            onClick={onClose} 
          />
        </div>

        <div className="p-4 md:p-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Node Color</h3>
          <div className="flex items-center gap-4 mb-3">
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-1">Custom Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={node.style.backgroundColor}
                  onChange={handleCustomColorChange}
                  className="w-10 h-10 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={node.style.backgroundColor}
                  onChange={(e) => {
                    if (e.target.value.match(/^#[0-9A-Fa-f]{6}$/)) {
                      onColorChange(node.id, e.target.value);
                    }
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-gray-200 focus:border-gray-400 text-sm"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {colorPresets.map((preset) => (
              <button
                key={preset.color}
                type="button"
                onClick={() => onColorChange(node.id, preset.color)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${
                  node.style.backgroundColor === preset.color 
                    ? 'border-gray-900 bg-gray-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div 
                  className="w-4 h-4 rounded-full border border-gray-200" 
                  style={{ backgroundColor: preset.color }}
                />
                <span className="text-sm text-gray-700">{preset.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 md:p-6 border-t border-gray-200">
          {isDepartment ? (
            <>
              <h3 className="text-xl font-semibold mb-2">{node.data.label}</h3>
              <p className="text-gray-600">This department has {peopleUnderDepartment} people.</p>
            </>
          ) : (
            <>
              <div className="flex items-center mb-4">
                {node.data.image && (
                  <img 
                    src={node.data.image} 
                    alt={node.data.label} 
                    className="w-12 h-12 rounded-full mr-3 object-cover" 
                  />
                )}
                <div>
                  <h3 className="text-xl font-semibold">{node.data.label}</h3>
                  <p className="text-gray-600">{node.data.name}</p>
                  <p className="text-gray-600">{node.data.email}</p>
                </div>
              </div>
              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2">Roles:</h4>
                <p>{node.data.role || 'None'}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Permissions:</h4>
                <p>{node.data.permissions || 'None'}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const NodeCreationModal = ({
  isOpen,
  onClose,
  nodeData,
  setNodeData,
  onSubmit,
  availableRoles,
  availablePermissions,
  toggleRole,
  togglePermission,
  handleImageChange,
  removeImage
}) => {
  if (!isOpen) return null;

  const colorPresets = [
    { color: "#F3F4F6", label: "Light Gray" },
    { color: "#60A5FA", label: "Blue" },
    { color: "#34D399", label: "Green" },
    { color: "#F87171", label: "Red" },
    { color: "#FBBF24", label: "Yellow" },
    { color: "#A78BFA", label: "Purple" }
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl border border-gray-200 my-8">
        <div className="flex justify-between items-center p-4 md:p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Create New Node</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-4 md:p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={nodeData.type}
                  onChange={(e) => setNodeData({ ...nodeData, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-gray-200 focus:border-gray-400 text-sm"
                  required
                >
                  <option value="person">Person</option>
                  <option value="department">Department</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {nodeData.type === "department" ? "Department Name" : "Name"}
                </label>
                <input 
                  type="text"
                  value={nodeData.label}
                  onChange={(e) => setNodeData({ ...nodeData, label: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-gray-200 focus:border-gray-400 text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Node Color</label>
                <div className="grid grid-cols-3 gap-2">
                  {colorPresets.map((preset) => (
                    <button
                      key={preset.color}
                      type="button"
                      onClick={() => setNodeData({ ...nodeData, color: preset.color })}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${
                        nodeData.color === preset.color 
                          ? 'border-gray-900 bg-gray-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div 
                        className="w-4 h-4 rounded-full border border-gray-200" 
                        style={{ backgroundColor: preset.color }}
                      />
                      <span className="text-sm text-gray-700 hidden md:inline">{preset.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {nodeData.type === "person" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                    <div className="flex items-center gap-2 flex-wrap">
                      <label className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
                        <Upload className="w-4 h-4" />
                        <span>Upload Image</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                      {nodeData.image && (
                        <div className="relative">
                          <img
                            src={nodeData.image}
                            alt="Preview"
                            className="w-10 h-10 rounded-lg object-cover border border-gray-200"
                          />
                          <button
                            type="button"
                            onClick={removeImage}
                            className="absolute -top-1 -right-1 p-1 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Roles</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {availableRoles.map((role) => (
                        <button
                          key={role}
                          type="button"
                          onClick={() => toggleRole(role)}
                          className={`px-2 py-1 rounded-md text-sm font-medium transition-colors ${
                            nodeData.role.includes(role)
                              ? 'bg-gray-900 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {role}
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-2 mt-2 flex-col sm:flex-row">
                      <input
                        type="text"
                        value={nodeData.customRole}
                        onChange={(e) => setNodeData({ ...nodeData, customRole: e.target.value })}
                        placeholder="Add custom role..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-gray-200 focus:border-gray-400 text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (nodeData.customRole.trim()) {
                            setNodeData(prev => ({
                              ...prev,
                              role: [...prev.role, prev.customRole.trim()],
                              customRole: ''
                            }));
                          }
                        }}
                        disabled={!nodeData.customRole.trim()}
                        className="px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Add
                      </button>
                    </div>
                    {nodeData.role.filter(r => !availableRoles.includes(r)).length > 0 && (
                      <div className="mt-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Custom Roles</label>
                        <div className="flex flex-wrap gap-2">
                          {nodeData.role.filter(r => !availableRoles.includes(r)).map((role) => (
                            <span
                              key={role}
                              className="group px-2 py-1 rounded-md text-sm font-medium bg-gray-100 text-gray-700 flex items-center gap-1"
                            >
                              {role}
                              <button
                                type="button"
                                onClick={() => toggleRole(role)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="h-3 w-3 text-gray-500 hover:text-gray-700" />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Permissions</label>
                    <div className="flex flex-wrap gap-2">
                      {availablePermissions.map((permission) => (
                        <button
                          key={permission}
                          type="button"
                          onClick={() => togglePermission(permission)}
                          className={`px-2 py-1 rounded-md text-sm font-medium transition-colors ${
                            nodeData.permissions.includes(permission)
                              ? 'bg-gray-900 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {permission}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Create Node
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Move checkDepartmentHeadStatus outside of components
const checkDepartmentHeadStatus = (departmentId, edges, nodes) => {
  const departmentEdges = edges.filter(edge => 
    edge.source === departmentId || edge.target === departmentId
  );
  
  const connectedPersonIds = departmentEdges.map(edge => 
    edge.source === departmentId ? edge.target : edge.source
  );
  
  const departmentHeads = nodes.filter(node => 
    connectedPersonIds.includes(node.id) && 
    node.data.isDepartmentHead
  );

  return departmentHeads.length > 0;
};

function Flow() {
  const { showSuccess, showError, showInfo, alerts, removeAlert } = useAlert();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [nodeData, setNodeData] = useState({ 
    label: "", 
    color: "#F3F4F6", 
    role: [], 
    permissions: [], 
    name: "", 
    email: "",
    type: "person",
    customRole: "",
    image: null,
    isDepartmentHead: false
  });
  const [tempPosition, setTempPosition] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [peopleUnderDepartment, setPeopleUnderDepartment] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Load initial data from localStorage
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        
        // Attempt to load from localStorage
        const savedNodesJSON = localStorage.getItem('teamNodes');
        const savedEdgesJSON = localStorage.getItem('teamEdges');
        
        if (savedNodesJSON && savedNodesJSON !== "undefined" && savedNodesJSON !== "null") {
          try {
            const parsedNodes = JSON.parse(savedNodesJSON);
            if (Array.isArray(parsedNodes) && parsedNodes.length > 0) {
              // Filter out any circle nodes before setting
              const filteredNodes = parsedNodes.filter(node => 
                !node.data.type || node.data.type !== "circle"
              );
              
              setNodes(filteredNodes);
              console.log("Loaded nodes from localStorage:", filteredNodes);
            } else {
              console.log("localStorage nodes array was empty, using initialNodes");
            }
          } catch (e) {
            console.error("Error parsing nodes from localStorage:", e);
          }
        } else {
          console.log("No valid nodes in localStorage, using initialNodes");
          // Save initialNodes to localStorage for future use
          localStorage.setItem('teamNodes', JSON.stringify(initialNodes));
        }
        
        if (savedEdgesJSON && savedEdgesJSON !== "undefined" && savedEdgesJSON !== "null") {
          try {
            const parsedEdges = JSON.parse(savedEdgesJSON);
            if (Array.isArray(parsedEdges)) {
              setEdges(parsedEdges);
              console.log("Loaded edges from localStorage:", parsedEdges);
            }
          } catch (e) {
            console.error("Error parsing edges from localStorage:", e);
          }
        } else {
          console.log("No valid edges in localStorage, using initialEdges");
          // Save initialEdges to localStorage for future use
          localStorage.setItem('teamEdges', JSON.stringify(initialEdges));
        }
      } catch (error) {
        console.error("Error loading team data:", error);
        showError("Failed to load team data, using default values", "Error", { duration: 3000 });
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 500); // Short delay to ensure UI is properly updated
      }
    };

    loadData();
  }, []);

  const nodeTypes = {
    default: (props) => (
      <CustomNode 
        {...props} 
        setNodes={setNodes}
        setEdges={setEdges}
        onLongPress={handleNodeLongPress}
        edges={edges}
        nodes={nodes}
        showError={showError}
      />
    )
  };

  const availableRoles = ["Manager", "Developer", "Designer", "Analyst", "Support", "Department Head"];
  const availablePermissions = ["Read", "Write", "Edit", "Delete", "Admin"];

  const toggleRole = (role) => {
    setNodeData(prev => {
      if (role === "Department Head") {
        return {
          ...prev,
          isDepartmentHead: !prev.isDepartmentHead,
          role: prev.isDepartmentHead ? prev.role.filter(r => r !== "Department Head") : [...prev.role, "Department Head"]
        };
      }
      return {
        ...prev,
        role: prev.role.includes(role)
          ? prev.role.filter(r => r !== role)
          : [...prev.role, role]
      };
    });
  };

  const togglePermission = (permission) => {
    setNodeData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNodeData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setNodeData(prev => ({ ...prev, image: null }));
  };

  useEffect(() => {
    try {
      // Filter out any circle nodes before saving
      const filteredNodes = nodes.filter(node => 
        !node.data.type || node.data.type !== "circle"
      );
      
      localStorage.setItem('teamNodes', JSON.stringify(filteredNodes));
      console.log("Saved nodes to localStorage:", filteredNodes);
    } catch (error) {
      console.error("Error saving nodes to localStorage:", error);
    }
  }, [nodes]);

  useEffect(() => {
    try {
      localStorage.setItem('teamEdges', JSON.stringify(edges));
      console.log("Saved edges to localStorage:", edges);
    } catch (error) {
      console.error("Error saving edges to localStorage:", error);
    }
  }, [edges]);

  const onDrop = (event) => {
    event.preventDefault();
    const nodeType = event.dataTransfer.getData("application/reactflow");
    if (!nodeType) return;

    const reactFlowBounds = document.querySelector('.react-flow').getBoundingClientRect();
    const position = {
      x: (event.clientX - reactFlowBounds.left) / 1.5,
      y: (event.clientY - reactFlowBounds.top) / 1.5
    };

    setTempPosition(position);
    setIsModalOpen(true);
  };

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (nodeData.type === "person") {
        // Create employee
        const employeeData = {
          name: nodeData.label,
          email: nodeData.email,
          role: [...nodeData.role, nodeData.customRole].filter(Boolean).join(", "),
          permissions: nodeData.permissions.join(", "),
          image: nodeData.image,
          isDepartmentHead: nodeData.isDepartmentHead,
          position: tempPosition,
          color: nodeData.color
        };

        const newId = Date.now().toString();
        
        const newNode = {
          id: newId,
          position: tempPosition,
          data: { 
            label: nodeData.label,
            role: employeeData.role,
            permissions: employeeData.permissions,
            name: nodeData.name,
            email: nodeData.email,
            image: nodeData.image,
            isDepartmentHead: nodeData.isDepartmentHead,
            type: "person"
          },
          style: { 
            backgroundColor: nodeData.color, 
            padding: 0,
            borderRadius: 8,
            color: nodeData.color === "#F3F4F6" ? "#111827" : "white",
            minWidth: 120,
            border: nodeData.color === "#F3F4F6" ? '1px solid #E5E7EB' : 'none',
          },
          type: 'default'
        };

        setNodes((nds) => [...nds, newNode]);
        showSuccess("Employee created successfully", "Success", { duration: 3000 });
      } else {
        // Create department
        const newId = Date.now().toString();
        
        const newNode = {
          id: newId,
          position: tempPosition,
          data: { 
            label: nodeData.label,
            type: "department"
          },
          style: { 
            backgroundColor: nodeData.color, 
            padding: 0,
            borderRadius: 8,
            color: nodeData.color === "#F3F4F6" ? "#111827" : "white",
            minWidth: 200,
            border: nodeData.color === "#F3F4F6" ? '1px solid #E5E7EB' : 'none',
          },
          type: 'default'
        };

        setNodes((nds) => [...nds, newNode]);
        showSuccess("Department created successfully", "Success", { duration: 3000 });
      }

      setIsModalOpen(false);
      setNodeData({ 
        label: "", 
        color: "#F3F4F6", 
        role: [],
        permissions: [],
        name: "", 
        email: "",
        type: "person",
        customRole: "",
        image: null,
        isDepartmentHead: false
      });
    } catch {
      showError("Failed to create new node", "Error", { duration: 3000 });
    }
  };

  const handleNodeLongPress = (nodeId) => {
    const node = nodes.find(n => n.id === nodeId);
    if (node.data.type === 'department') {
      const departmentEdges = edges.filter(edge => edge.source === nodeId);
      const peopleCount = departmentEdges.length;
      setPeopleUnderDepartment(peopleCount);
    }
    setSelectedNode(node);
    setIsDetailsModalOpen(true);
  };

  const handleConnect = async (params) => {
    const sourceNode = nodes.find(n => n.id === params.source);
    const targetNode = nodes.find(n => n.id === params.target);

    // Prevent department-to-department connections
    if (sourceNode.data.type === "department" && targetNode.data.type === "department") {
      showError(
        "Cannot connect departments directly",
        "Invalid Connection",
        { duration: 3000 }
      );
      return;
    }

    try {
      // Handle department connections
      if (sourceNode.data.type === "department" || targetNode.data.type === "department") {
        const departmentNode = sourceNode.data.type === "department" ? sourceNode : targetNode;
        const personNode = sourceNode.data.type === "department" ? targetNode : sourceNode;

        // Check if this is the first person being connected to the department
        const existingConnections = edges.filter(edge => 
          (edge.source === departmentNode.id || edge.target === departmentNode.id) &&
          edge.id !== params.id
        );

        if (existingConnections.length === 0) {
          // This is the first person being connected to the department
          // Automatically set them as department head
          // Update node data locally
          setNodes((nds) =>
            nds.map((node) => {
              if (node.id === personNode.id) {
                return {
                  ...node,
                  data: {
                    ...node.data,
                    role: node.data.role ? `${node.data.role}, Department Head` : "Department Head",
                    isDepartmentHead: true
                  }
                };
              }
              return node;
            })
          );

          setNodes((nds) =>
            nds.map((node) => {
              if (node.id === personNode.id) {
                return {
                  ...node,
                  data: {
                    ...node.data,
                    role: node.data.role ? `${node.data.role}, Department Head` : "Department Head",
                    isDepartmentHead: true
                  }
                };
              }
              return node;
            })
          );

          showSuccess(
            `${personNode.data.label} has been automatically set as Department Head of ${departmentNode.data.label}`,
            "Department Head Assigned",
            { duration: 3000 }
          );
        }

        // Update department with new employee
        // Update edges locally
          setEdges((eds) => addEdge(params, eds));

        showSuccess(
          `Connected ${sourceNode.data.label} with ${targetNode.data.label}`,
          "Connection Made",
          { duration: 3000 }
        );

        setEdges((eds) => addEdge(params, eds));
        return;
      }

      // Handle person-to-person connections
      showInfo(
        `Connected ${sourceNode.data.label} with ${targetNode.data.label}`,
        "Connection Made",
        { duration: 3000 }
      );

      setEdges((eds) => addEdge(params, eds));
    } catch {
      showError("Failed to create connection", "Error", { duration: 3000 });
    }
  };

  const handleColorChange = (nodeId, newColor) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            style: {
              ...node.style,
              backgroundColor: newColor,
              color: newColor === "#F3F4F6" ? "#111827" : "white",
              border: newColor === "#F3F4F6" ? '1px solid #E5E7EB' : 'none',
            },
          };
        }
        return node;
      })
    );
  };

  return (
    <div className="h-screen flex flex-col md:flex-row-reverse">
      {isLoading ? (
        <div className="flex items-center justify-center w-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <>
          <div className="md:w-64 w-full bg-white p-4 md:p-6 border-b md:border-l md:border-b-0 border-gray-200 flex flex-col space-y-4 md:space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Wrench className="h-5 w-5 text-gray-600" />
                <span className="text-lg font-medium text-gray-900">Tools</span>
              </div>
            </div>

            <div className="flex md:flex-col flex-row gap-3 md:gap-0">
              <div
                className="group flex items-center space-x-2 p-3 bg-gray-100 text-gray-700 cursor-grab rounded-lg 
                          hover:bg-gray-200 transition-all duration-200 flex-1 md:flex-auto"
                draggable
                onDragStart={(event) => onDragStart(event, "default")}
              >
                <PlusCircle className="h-4 w-4 text-gray-600 group-hover:scale-105 transition-transform" />
                <span className="font-medium text-sm">Add Node</span>
              </div>
  
              <button
                onClick={() => {
                  localStorage.removeItem('teamNodes');
                  localStorage.removeItem('teamEdges');
                  showSuccess("Local storage cleared! Refreshing...", "Success", { duration: 2000 });
                  setTimeout(() => {
                    window.location.reload();
                  }, 2000);
                }}
                className="flex items-center justify-center gap-2 p-3 bg-red-100 text-red-700 rounded-lg 
                          hover:bg-red-200 transition-all duration-200 flex-1 md:flex-auto"
              >
                <Trash2 className="h-4 w-4" />
                <span className="font-medium text-sm">Reset</span>
              </button>
            </div>

            <div className="text-gray-500 text-xs text-center italic hidden md:block">
              Drag to add new nodes
            </div>
          </div>

          <div
            className="flex-grow h-[calc(100vh-96px)] md:h-screen bg-gray-50 relative"
            onDragOver={(event) => event.preventDefault()}
            onDrop={onDrop}
          >
            <ReactFlow
              nodes={nodes.filter(node => !node.data?.type || node.data.type !== "circle")}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={handleConnect}
              fitView
              nodeTypes={nodeTypes}
              zoomOnScroll={false}
              zoomOnPinch={true}
              panOnScroll={true}
              panOnDrag={true}
              defaultZoom={0.8}
              minZoom={0.2}
              maxZoom={2}
            >
              <Background variant="dots" gap={20} size={1} color="#E5E7EB" />
              <div className="fixed bottom-4 right-4 z-10 flex flex-col md:hidden gap-2">
                <button 
                  className="bg-white p-2 rounded-full shadow-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => {
                    document.querySelector('.react-flow__controls-zoomin')?.click();
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </button>
                <button 
                  className="bg-white p-2 rounded-full shadow-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => {
                    document.querySelector('.react-flow__controls-zoomout')?.click();
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                  </svg>
                </button>
                <button 
                  className="bg-white p-2 rounded-full shadow-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => {
                    document.querySelector('.react-flow__controls-fitview')?.click();
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                  </svg>
                </button>
              </div>
            </ReactFlow>
          </div>

          {isModalOpen && (
            <NodeCreationModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              nodeData={nodeData}
              setNodeData={setNodeData}
              onSubmit={handleSubmit}
              availableRoles={availableRoles}
              availablePermissions={availablePermissions}
              toggleRole={toggleRole}
              togglePermission={togglePermission}
              handleImageChange={handleImageChange}
              removeImage={removeImage}
            />
          )}

          {isDetailsModalOpen && selectedNode && (
            <NodeDetailsModal
              isOpen={isDetailsModalOpen}
              onClose={() => setIsDetailsModalOpen(false)}
              node={selectedNode}
              peopleUnderDepartment={peopleUnderDepartment}
              onColorChange={handleColorChange}
            />
          )}

          <AlertContainer alerts={alerts} onClose={removeAlert} />
        </>
      )}
    </div>
  );
}

export default function Team() {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
}