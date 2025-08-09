const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Handle API requests
export async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = new Error('API request failed');
    error.status = response.status;
    throw error;
  }

  return response.json();
}

// Auth API
export const authAPI = {
  login: (credentials) => apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),
  logout: () => apiRequest('/auth/logout', { method: 'POST' }),
  getProfile: () => apiRequest('/auth/profile'),
};

// Queue API
export const queueAPI = {
  getQueue: () => apiRequest('/queue'),
  addToQueue: (patientData) => apiRequest('/queue', {
    method: 'POST',
    body: JSON.stringify(patientData),
  }),
  updatePatientStatus: (patientId, status) => apiRequest(`/queue/${patientId}`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  }),
  prioritizePatient: (patientId) => apiRequest(`/queue/${patientId}/priority`, {
    method: 'PUT',
  }),
};

// Appointments API
export const appointmentsAPI = {
  getAppointments: () => apiRequest('/appointments'),
  bookAppointment: (appointmentData) => apiRequest('/appointments', {
    method: 'POST',
    body: JSON.stringify(appointmentData),
  }),
  rescheduleAppointment: (appointmentId, newDateTime) => apiRequest(`/appointments/${appointmentId}`, {
    method: 'PUT',
    body: JSON.stringify(newDateTime),
  }),
  cancelAppointment: (appointmentId) => apiRequest(`/appointments/${appointmentId}`, {
    method: 'DELETE',
  }),
};

// Doctors API
export const doctorsAPI = {
  getDoctors: () => apiRequest('/doctors'),
  getDoctor: (doctorId) => apiRequest(`/doctors/${doctorId}`),
};
