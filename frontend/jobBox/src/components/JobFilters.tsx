import React, { useState } from 'react';
import { Box, TextField, MenuItem, Button, Stack } from '@mui/material';

const sortOptions = [
  { label: 'Newest First', value: 'posting_date_desc' },
  { label: 'Oldest First', value: 'posting_date_asc' },
];

const jobTypes = [
  { label: 'Full-Time', value: 'full-time' },
  { label: 'Part-Time', value: 'part-time' },
  { label: 'Internship', value: 'internship' },
  { label: 'Contract', value: 'contract' },
];

const JobFilters = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    job_type: '',
    location: '',
    tag: '',
    sort: 'posting_date_desc',
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleApply = () => {
    const nonEmptyFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, v]) => v)
    );
    onFilter(nonEmptyFilters);
  };

  return (
    <Box mb={3} width="100%">
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        flexWrap="wrap"
        alignItems="center"
        justifyContent="center"
      >
        <TextField
          name="job_type"
          label="Job Type"
          select
          value={filters.job_type}
          onChange={handleChange}
          size="small"
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="">All</MenuItem>
          {jobTypes.map(({ label, value }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          name="location"
          label="Location"
          value={filters.location}
          onChange={handleChange}
          size="small"
          sx={{ minWidth: 150 }}
        />

        <TextField
          name="tag"
          label="Tag"
          value={filters.tag}
          onChange={handleChange}
          size="small"
          sx={{ minWidth: 150 }}
        />

        <TextField
          name="sort"
          label="Sort By"
          select
          value={filters.sort}
          onChange={handleChange}
          size="small"
          sx={{ minWidth: 180 }}
        >
          {sortOptions.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </TextField>

        <Button variant="contained" onClick={handleApply}>
          Apply Filters
        </Button>
      </Stack>
    </Box>
  );
};

export default JobFilters;
