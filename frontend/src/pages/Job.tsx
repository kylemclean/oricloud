import { Alert, AlertTitle, Box, CircularProgress, Container, IconButton, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Download as DownloadIcon } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';
import { Job } from '../api/models/job';
import { Run } from '../api/models/run';

export default function JobPage(): JSX.Element {
    const { jobId } = useParams<{ jobId: string }>();

    const [job, setJob] = useState<Job | undefined>(undefined);
    const [jobError, setJobError] = useState<string>('');

    const [runs, setRuns] = useState<Run[] | undefined>(undefined);
    const [runsError, setRunsError] = useState<string>('');

    useEffect(() => {
        if (!jobId) {
            setJobError('No job id');
            return;
        }
        api.getJob(jobId)
            .then(setJob)
            .catch(error => setJobError(error.message));
        api.getRuns(jobId)
            .then(setRuns)
            .catch(error => setRunsError(error.message));
    }, [jobId]);

    return (
        <Container maxWidth="md">
            {job ? <>
                <Typography variant="h3">
                    {job.id}
                </Typography>
                <Box>
                    <Typography variant="h4">
                        Runs
                    </Typography>
                    <TableContainer component={Paper}>
                        {runs ? (
                            runs.length > 0 ? (
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Run ID</TableCell>
                                            <TableCell>Output hash</TableCell>
                                            <TableCell>Output file</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {runs.map(run => (
                                            <TableRow key={run.id}>
                                                <TableCell>{run.id}</TableCell>
                                                <TableCell>...</TableCell>
                                                <TableCell>
                                                    <IconButton
                                                        component={Link}
                                                        href={api.runOutputUrl(run.id)}
                                                        aria-label="download">
                                                        <DownloadIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            ) : "No runs yet."
                        ) : runsError ? (
                            <Alert severity="error">
                                <AlertTitle>Failed to get runs</AlertTitle>
                                {runsError}
                            </Alert>
                        ) : (
                            <CircularProgress />
                        )}
                    </TableContainer>
                </Box>
            </> : jobError ? (
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