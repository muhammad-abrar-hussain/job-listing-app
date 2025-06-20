import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Tooltip,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const JobCard = ({ job, onDelete, onEdit }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleEdit = () => {
    handleMenuClose();
    onEdit(job);
  };

  const handleDelete = () => {
    handleMenuClose();
    onDelete(job.id);
  };

  return (
    <Card
      sx={{
        width: '100%',
        minWidth: 275,
        maxWidth: 275,
        height: 320,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxSizing: 'border-box',
        borderRadius: 3,
        boxShadow: 2,
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'scale(1.03)',
          boxShadow: 5,
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Tooltip title={job.title} arrow>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 2,
                  overflow: 'hidden',
                  fontWeight: 600,
                  maxHeight: '3.2em',
                }}
              >
                {job.title.charAt(0).toUpperCase() + job.title.slice(1)}
              </Typography>
          </Tooltip>



          <IconButton onClick={handleMenuOpen} size="small">
            <MoreVertIcon />
          </IconButton>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          gutterBottom
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {job.company} • {job.location} • {job.job_type}
        </Typography>

        <Typography variant="body2" sx={{ mb: 1 }}>
          Posted: {new Date(job.posting_date).toLocaleDateString()}
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          sx={{
            flexWrap: 'wrap',
            maxHeight: 60,
            overflow: 'hidden',
          }}
        >
          {job.tags.map((tag, index) => (
            <Chip key={index} label={tag.trim()} size="small" />
          ))}
        </Stack>
      </CardContent>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={handleEdit}>
          <EditIcon sx={{ mr: 1 }} /> Edit Job
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <DeleteIcon sx={{ mr: 1 }} /> Delete Job
        </MenuItem>
      </Menu>
    </Card>
  );
};

export default JobCard;
