import React from 'react';
import JobCard from './JobCard';

const JobList = ({ jobs, onDelete, onEdit }) => {
  return (
    <div>
      {jobs.map(job => (
        <JobCard key={job.id} job={job} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  );
};

export default JobList;
