import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

console.log("API Base URL:", BASE_URL);

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getJobs = async () => {
  try {
    const response = await axiosInstance.get('/');
    return response.data;
  } catch (error) {
    console.error("Failed to fetch jobs:", error);
    return [];
  }
};

export const createJob = async (job: any) => {
  try {
    const response = await axiosInstance.post('/', job);
    return response.data;
  } catch (error) {
    console.error("Create job error:", error.response?.data || error.message);
    return null;
  }
};

export const updateJob = async (id: number, job: any) => {
  try {
    const response = await axiosInstance.patch(`/${id}`, job);
    return response.data;
  } catch (error) {
    console.error("Update job error:", error.response?.data || error.message);
    return null;
  }
};

export const deleteJob = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error("Delete job error:", error.response?.data || error.message);
    return null;
  }
};
