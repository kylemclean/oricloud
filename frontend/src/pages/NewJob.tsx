import React, { useEffect, useState } from 'react';
import { Alert, AlertTitle, Box, CircularProgress, Container, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { Check as CheckIcon } from '@mui/icons-material';
import { Controller, SubmitHandler, useForm, useFormState } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import { Program } from '../api/models/program';


interface NewJobForm {
    program_id: string,
    input: FileList
}

export default function NewJob(): JSX.Element {
    const [programs, setPrograms] = useState<Program[] | undefined>(undefined);
    const [programsError, setProgramsError] = useState<string>('');

    useEffect(() => {
        api.getPrograms()
            .then(setPrograms)
            .catch(error => setProgramsError(error.message));
    }, []);

    const navigate = useNavigate();

    const { control, handleSubmit, register } = useForm<NewJobForm>({
        defaultValues: {
            program_id: "",
            input: undefined
        }
    });

    const { isSubmitting } = useFormState({ control });

    const onSubmit: SubmitHandler<NewJobForm> = data => {
        api.createJob({ input: data.input[0], program_id: data.program_id })
            .then(result => {
                if (result.success) {
                    navigate(`/jobs/${result.id}`);
                }
            })
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h3">
                New Job
            </Typography>

            {programs ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                    {[
                        <Controller
                            name="program_id"
                            control={control}
                            render={({ field }) => (
                                <FormControl fullWidth>
                                    <InputLabel id="program-select-label">Program</InputLabel>
                                    <Select
                                        {...field}
                                        labelId="program-select-label"
                                        variant="outlined"
                                        required
                                    >
                                        {programs.map(program => (
                                            <MenuItem value={program.id}>{program.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                        />,
                        <>
                            <Box>
                                <label htmlFor="file-input">
                                    Input file
                                </label>
                            </Box>
                            <input
                                {...register("input")}
                                id="file-input"
                                type="file"
                                required
                            />
                        </>,
                        <LoadingButton
                            type="submit"
                            variant="contained"
                            disabled={isSubmitting}
                            loading={isSubmitting}
                            startIcon={<CheckIcon />}
                        >
                            Create Job
                        </LoadingButton>].map((control, i) => (
                            <Box key={i} sx={{ my: 2 }}>{control}</Box>
                        ))}
                </form>
            ) : programsError ? (
                <Alert severity="error">
                    <AlertTitle>Failed to get programs</AlertTitle>
                    {programsError}
                </Alert>
            ) : (
                <CircularProgress />
            )}
        </Container >
    );
}