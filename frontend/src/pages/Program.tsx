import { Alert, AlertTitle, CircularProgress, Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';
import { Program } from '../api/models/program';

export default function ProgramPage(): JSX.Element {
    const { programId } = useParams<{ programId: string }>();

    const [program, setProgram] = useState<Program | undefined>(undefined);
    const [programError, setProgramError] = useState<string>('');

    useEffect(() => {
        if (!programId) {
            setProgramError('No program id');
            return;
        }
        api.getProgram(programId)
            .then(setProgram)
            .catch(error => setProgramError(error.message));
    }, [programId]);

    return (
        <Container maxWidth="md">
            {program ? (
                <Typography variant="h3">
                    {program.name}
                </Typography>
            ) : programError ? (
                <Alert severity="error">
                    <AlertTitle>Failed to get program</AlertTitle>
                    {programError}
                </Alert>
            ) : (
                <CircularProgress />
            )}
        </Container>
    );
}