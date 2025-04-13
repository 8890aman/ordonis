import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Team and Department API calls
export const teamAPI = {
  // Department endpoints
  createDepartment: async (departmentData) => {
    const response = await api.post('/team/departments', departmentData);
    return response.data;
  },

  getDepartmentHierarchy: async (companyId) => {
    const response = await api.get(`/team/departments/${companyId}/hierarchy`);
    return response.data;
  },

  // Team endpoints
  createTeam: async (teamData) => {
    const response = await api.post('/team/teams', teamData);
    return response.data;
  },

  getTeamMembers: async (teamId) => {
    const response = await api.get(`/team/teams/${teamId}/members`);
    return response.data;
  },

  addTeamMember: async (teamId, memberData) => {
    const response = await api.post(`/team/teams/${teamId}/members`, memberData);
    return response.data;
  },

  removeTeamMember: async (teamId, userId) => {
    const response = await api.delete(`/team/teams/${teamId}/members`, {
      data: { userId }
    });
    return response.data;
  }
};

// Auth API calls
export const authAPI = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};

export default api; 