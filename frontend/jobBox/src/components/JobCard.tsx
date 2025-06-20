import React from 'react';
import { Card, CardContent, Typography, Chip, IconButton, Stack } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

const JobCard = ({ job, onDelete, onEdit }) => {
  return (
    <Card sx={{ margin: 2 }}>
      <CardContent>
        <Typography variant="h5">{job.title}</Typography>
        <Typography color="text.secondary">
          {job.company} • {job.location} • {job.job_type}
        </Typography>
        <Typography variant="body2" sx={{ my: 1 }}>
          Posted: {new Date(job.posting_date).toLocaleDateString()}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', my: 1 }}>
          {job.tags.map((tag, index) => (
            <Chip key={index} label={tag.trim()} />
          ))}
        </Stack>
        <Stack direction="row" spacing={1}>
          <IconButton onClick={() => onEdit(job)}><Edit /></IconButton>
          <IconButton onClick={() => onDelete(job.id)}><Delete /></IconButton>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default JobCard;
