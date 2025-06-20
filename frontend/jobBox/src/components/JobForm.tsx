import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Stack } from '@mui/material';

const defaultForm = {
  title: '',
  company: '',
  location: '',
  job_type: '',
  tags: '',
  posting_date: '',
};

const JobForm = ({ onSubmit, initialData, onCancel }) => {
  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    if (initialData) {
      setForm({ ...initialData, tags: initialData.tags.join(', ') });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.title || !form.company || !form.location || !form.job_type) {
      alert('Please fill in all required fields');
      return;
    }

    const payload = {
      ...form,
      tags: form.tags.split(',').map(tag => tag.trim()),
    };

    onSubmit(payload);
    setForm(defaultForm);
  };

  return (
    <Box sx={{ my: 2 }}>
      <Stack spacing={2}>
        {['title', 'company', 'location', 'job_type'].map(field => (
          <TextField key={field} name={field} label={field} value={form[field]} onChange={handleChange} required />
        ))}
        <TextField name="tags" label="Tags (comma-separated)" value={form.tags} onChange={handleChange} />
        <TextField
          name="posting_date"
          label="Posting Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={form.posting_date}
          onChange={handleChange}
        />
        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={handleSubmit}>
            {initialData ? 'Update' : 'Add'} Job
          </Button>
          {initialData && (
            <Button variant="outlined" onClick={onCancel}>Cancel</Button>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default JobForm;
