import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const apiService = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Employee endpoints
export const employeeService = {
  createEmployee: async (employeeData) => {
    const response = await apiService.post('/employees', employeeData);
    return response.data;
  },
  
  getEmployees: async () => {
    const response = await apiService.get('/employees');
    return response.data;
  },
  
  updateEmployee: async (id, employeeData) => {
    const response = await apiService.put(`/employees/${id}`, employeeData);
    return response.data;
  },
  
  deleteEmployee: async (id) => {
    const response = await apiService.delete(`/employees/${id}`);
    return response.data;
  }
};

// Department endpoints
export const departmentService = {
  createDepartment: async (departmentData) => {
    const response = await apiService.post('/departments', departmentData);
    return response.data;
  },
  
  getDepartments: async () => {
    const response = await apiService.get('/departments');
    return response.data;
  },
  
  updateDepartment: async (id, departmentData) => {
    const response = await apiService.put(`/departments/${id}`, departmentData);
    return response.data;
  },
  
  deleteDepartment: async (id) => {
    const response = await apiService.delete(`/departments/${id}`);
    return response.data;
  }
};

export default apiService; 