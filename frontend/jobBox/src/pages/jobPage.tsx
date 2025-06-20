import React, { useEffect, useState } from 'react';
import {
  Container, Typography, Button, Box, Grid, Divider,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { useJobsApi } from '../api/jobApi';
import JobForm from '../components/JobForm';
import JobCard from '../components/JobCard';
import JobFilters from '../components/JobFilters';
import ConfirmDialog from '../components/ConfirmDialog';

const JobsPage = () => {
  const { getJobs, createJob, updateJob, deleteJob } = useJobsApi();
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState({});
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const fetchJobs = async (appliedFilters = {}) => {
    const data = await getJobs(appliedFilters);
    setJobs(data);
  };

  useEffect(() => {
    fetchJobs(filters);
  }, [filters]);

  const handleAddOrEdit = async (job) => {
    if (editingJob) {
      await updateJob(editingJob.id, job);
      setEditingJob(null);
    } else {
      await createJob(job);
    }
    setShowForm(false);
    fetchJobs(filters);
  };

  const handleDeleteConfirm = async () => {
    if (deleteId) {
      await deleteJob(deleteId);
      fetchJobs(filters);
      setDeleteId(null);
    }
    setConfirmOpen(false);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          my: 4,
          flexWrap: 'wrap',
          rowGap: 2,
        }}
      >
        <Typography variant="h4">Job Box</Typography>
        <Button
          variant="contained"
          startIcon={!showForm && <AddIcon />}
          onClick={() => {
            setShowForm(!showForm);
            setEditingJob(null);
          }}
        >
          {showForm ? 'Close Form' : 'Post New Job'}
        </Button>
      </Box>

      <Typography variant="h5" sx={{ mb: 2 }}>
        {showForm ? 'Enlist a New Opportunity' : 'Available Positions'}
      </Typography>

      <Divider sx={{ mb: 3 }} />

      {!showForm && <JobFilters onFilter={setFilters} />}

      {showForm ? (
        <JobForm
          onSubmit={handleAddOrEdit}
          initialData={editingJob}
          onCancel={() => {
            setEditingJob(null);
            setShowForm(false);
          }}
        />
      ) : (
        <Grid
          container
          spacing={3}
          justifyContent={{ xs: 'center', sm: 'flex-center' }}
        >
          {jobs.map((job) => (
            <Grid
              item
              key={job.id}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <JobCard
                job={job}
                onEdit={(job) => {
                  setEditingJob(job);
                  setShowForm(true);
                }}
                onDelete={() => handleDelete(job.id)}
              />
            </Grid>
          ))}
        </Grid>
      )}

      <ConfirmDialog
        open={confirmOpen}
        title="Delete Job"
        content="Are you sure you want to delete this job?"
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </Container>
  );
};

export default JobsPage;
