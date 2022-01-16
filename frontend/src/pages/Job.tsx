import { Alert, AlertTitle, CircularProgress, Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';
import { Job } from '../api/models/job';

export default function JobPage(): JSX.Element {
    const { jobId } = useParams<{ jobId: string }>();

    const [job, setJob] = useState<Job | undefined>(undefined);
    const [jobError, setJobError] = useState<string>('');

    useEffect(() => {
        if (!jobId) {
            setJobError('No job id');
            return;
        }
        api.getJob(jobId)
            .then(setJob)
            .catch(error => setJobError(error.message));
    }, [jobId]);

    return (
        <Container maxWidth="md">
            {job ? (
                <Typography variant="h3">
                    {job.id}
                </Typography>
            ) : jobError ? (
                <Alert severity="error">
                    <AlertTitle>Failed to get job</AlertTitle>
                    {jobError}
                </Alert>
            ) : (
                <CircularProgress />
            )}
        </Container>
    );
}