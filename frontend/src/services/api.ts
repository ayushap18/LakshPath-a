import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear storage and redirect to login
      localStorage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  
  register: (name: string, email: string, password: string) =>
    api.post('/auth/register', { name, email, password }),
  
  logout: () => api.post('/auth/logout'),
  
  getCurrentUser: () => api.get('/auth/me'),
};

// Assessment API calls
export const assessmentAPI = {
  submit: (answers: Record<string, any>) =>
    api.post('/assessment', { answers }),
  
  getResults: (userId: string) =>
    api.get(`/assessment/${userId}`),
};

// Career API calls
export const careerAPI = {
  getMatches: () => api.get('/careers/matches'),
  
  getCareerDetails: (careerId: string) =>
    api.get(`/careers/${careerId}`),
};

// Roadmap API calls
export const roadmapAPI = {
  getActive: () => api.get('/roadmap/active'),
  
  generate: (careerId: string) =>
    api.post('/roadmap/generate', { careerId }),
  
  updateProgress: (milestoneId: string, completed: boolean) =>
    api.patch(`/roadmap/milestone/${milestoneId}`, { completed }),
};

// User API calls
export const userAPI = {
  getProfile: () => api.get('/user/profile'),
  
  updateProfile: (data: any) =>
    api.patch('/user/profile', data),
  
  getProgress: () => api.get('/user/progress'),
};

export default api;
