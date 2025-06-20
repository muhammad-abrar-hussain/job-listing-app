import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Stack,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText
} from '@mui/material';

const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

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
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        tags: initialData.tags.join(', '),
        posting_date: initialData.posting_date || getTodayDate(),
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    ['title', 'company', 'location', 'job_type'].forEach((field) => {
      if (!form[field].trim()) {
        newErrors[field] = 'This field is required';
      }
    });
    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const payload = {
      ...form,
      posting_date: form.posting_date || getTodayDate(),
      tags: form.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag !== ''),
    };

    onSubmit(payload);
    setForm(defaultForm);
    setErrors({});
  };

  return (
    <Box sx={{ my: 2 }}>
      <Stack spacing={2}>
        <TextField
          name="title"
          label="Title"
          value={form.title}
          onChange={handleChange}
          required
          error={Boolean(errors.title)}
          helperText={errors.title}
        />

        <TextField
          name="company"
          label="Company"
          value={form.company}
          onChange={handleChange}
          required
          error={Boolean(errors.company)}
          helperText={errors.company}
        />

        <TextField
          name="location"
          label="Location"
          value={form.location}
          onChange={handleChange}
          required
          error={Boolean(errors.location)}
          helperText={errors.location}
        />

        <FormControl fullWidth required error={Boolean(errors.job_type)}>
          <InputLabel id="job-type-label">Job Type</InputLabel>
          <Select
            labelId="job-type-label"
            name="job_type"
            value={form.job_type}
            label="Job Type"
            onChange={handleChange}
          >
            <MenuItem value="full-time">Full Time</MenuItem>
            <MenuItem value="part-time">Part Time</MenuItem>
            <MenuItem value="contract">Contract</MenuItem>
            <MenuItem value="internship">Internship</MenuItem>
          </Select>
          {errors.job_type && <FormHelperText>{errors.job_type}</FormHelperText>}
        </FormControl>

        <TextField
          name="tags"
          label="Tags (comma-separated)"
          value={form.tags}
          onChange={handleChange}
          helperText="Example: remote, react, full-time"
        />

        <TextField
          name="posting_date"
          label="Posting Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={form.posting_date || getTodayDate()}
          onChange={handleChange}
        />

        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={handleSubmit}>
            {initialData ? 'Update' : 'Add'} Job
          </Button>
          {initialData && (
            <Button variant="outlined" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default JobForm;
