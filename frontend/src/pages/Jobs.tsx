import React, { useEffect, useState } from 'react';
import { Alert, AlertTitle, Button, CircularProgress, Container, Typography } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import api from '../api/api';
import { Job } from '../api/models/job';
import JobList from '../components/JobList';

export default function Jobs(): JSX.Element {
    const [jobs, setJobs] = useState<Job[] | undefined>(undefined);
    const [jobsError, setJobsError] = useState<string>('');

    useEffect(() => {
        api.getJobs()
            .then(setJobs)
            .catch(error => setJobsError(error.message));
    }, []);

    return (
        <Container maxWidth="md">
            <Typography variant="h3">Jobs</Typography>
            {jobsError ? (
                <Alert severity="error">
                    <AlertTitle>Failed to get jobs</AlertTitle>
                    {jobsError}
                </Alert>
            ) : jobs ? <>
                <JobList jobs={jobs} />
                <Button
                    variant="contained"
                    endIcon={<AddIcon />}
                    sx={{ mt: 1, float: 'right' }}
                    component={RouterLink}
                    to="/jobs/new"
                >
                    Create Job
                </Button>
            </> : (
                <CircularProgress />
            )}
        </Container>
    );
}