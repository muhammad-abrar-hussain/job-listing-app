// src/api/jobsApi.ts
import jobsApiInstance from './jobsApiInstance';
import { useSnackbar } from '../context/SnackbarContext';

export const useJobsApi = () => {
  const { showMessage } = useSnackbar();

  const getJobs = async (filters = {}) => {
    try {
      const query = new URLSearchParams(filters).toString();
      const response = await jobsApiInstance.get(`/?${query}`);
      return response.data;
    } catch (error: any) {
      console.error("Failed to fetch jobs:", error);
      showMessage("Failed to fetch jobs. Please try again.", "error");
      return [];
    }
  };

  const createJob = async (job: any) => {
    try {
      const response = await jobsApiInstance.post('/', job);
      showMessage("Job posted successfully!", "success");
      return response.data;
    } catch (error: any) {
      const msg = error.response?.data?.message || "Error posting job.";
      console.error("Create job error:", msg);
      showMessage(`Failed to post job: ${msg}`, "error");
      return null;
    }
  };

  const updateJob = async (id: number, job: any) => {
    try {
      const response = await jobsApiInstance.patch(`/${id}`, job);
      showMessage("Job updated successfully!", "success");
      return response.data;
    } catch (error: any) {
      const msg = error.response?.data?.message || "Error updating job.";
      console.error("Update job error:", msg);
      showMessage(`Failed to update job: ${msg}`, "error");
      return null;
    }
  };

  const deleteJob = async (id: number) => {
    try {
      const response = await jobsApiInstance.delete(`/${id}`);
      showMessage("Job deleted successfully!", "success");
      return response.data;
    } catch (error: any) {
      const msg = error.response?.data?.message || "Error deleting job.";
      console.error("Delete job error:", msg);
      showMessage(`Failed to delete job: ${msg}`, "error");
      return null;
    }
  };

  return {
    getJobs,
    createJob,
    updateJob,
    deleteJob,
  };
};
