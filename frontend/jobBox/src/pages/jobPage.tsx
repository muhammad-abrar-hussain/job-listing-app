import React, { useEffect, useState } from 'react';
import { getJobs, createJob, updateJob, deleteJob } from '../api/jobApi';
import JobList from '../components/JobList';
import JobForm from '../components/JobForm';
import { Container, Typography, Button } from '@mui/material';

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchJobs = async () => {
    const data = await getJobs();
    setJobs(data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleAddOrEdit = async (job) => {
    if (editingJob) {
      await updateJob(editingJob.id, job);
      setEditingJob(null);
    } else {
      await createJob(job);
    }
    setShowForm(false);
    fetchJobs();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      await deleteJob(id);
      fetchJobs();
    }
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ my: 4 }}>Job Listings</Typography>

      <Button variant="contained" color="primary" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Close Form' : 'Add New Job'}
      </Button>

      {showForm && (
        <JobForm
          onSubmit={handleAddOrEdit}
          initialData={editingJob}
          onCancel={() => {
            setEditingJob(null);
            setShowForm(false);
          }}
        />
      )}

      <JobList jobs={jobs} onDelete={handleDelete} onEdit={(job) => {
        setEditingJob(job);
        setShowForm(true);
      }} />
    </Container>
  );
};

export default JobsPage;
