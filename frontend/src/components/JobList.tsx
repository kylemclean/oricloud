import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemText, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Job } from '../api/models/job';

export default function ProgramList(props: { jobs: Job[] }): JSX.Element {
    const { jobs } = props;

    return (
        <Paper>
            {jobs.length > 0 ? (
                <List>
                    {jobs.map(job => (
                        <ListItem key={job.id} disablePadding>
                            <ListItemButton component={RouterLink} to={`/jobs/${job.id}`}>
                                <ListItemText primary={job.id} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            ) : (
                <Box sx={{ p: 1 }}>
                    No jobs yet.
                </Box>
            )}
        </Paper>
    );
}