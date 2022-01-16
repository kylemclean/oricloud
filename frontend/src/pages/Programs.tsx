import React, { useEffect, useState } from 'react';
import { Alert, AlertTitle, Button, CircularProgress, Container, Typography } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import api from '../api/api';
import { Program } from '../api/models/program';
import ProgramList from '../components/ProgramList';

export default function Programs(): JSX.Element {
    const [programs, setPrograms] = useState<Program[] | undefined>(undefined);
    const [programsError, setProgramsError] = useState<string>('');

    useEffect(() => {
        api.getPrograms()
            .then(setPrograms)
            .catch(error => setProgramsError(error.message));
    }, []);

    return (
        <Container maxWidth="md">
            <Typography variant="h3">Programs</Typography>
            {programsError ? (
                <Alert severity="error">
                    <AlertTitle>Failed to get programs</AlertTitle>
                    {programsError}
                </Alert>
            ) : programs ? <>
                <ProgramList programs={programs} />
                <Button
                    variant="contained"
                    endIcon={<AddIcon />}
                    sx={{ mt: 1, float: 'right' }}
                    component={RouterLink}
                    to="/programs/new"
                >
                    Add Program
                </Button>
            </> : (
                <CircularProgress />
            )}
        </Container>
    );
}