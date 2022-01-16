import React from 'react';
import { Box, Container, TextField, Typography } from '@mui/material';
import { Check as CheckIcon } from '@mui/icons-material';
import { Controller, SubmitHandler, useForm, useFormState } from 'react-hook-form';
import api from '../api/api';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';

interface NewProgramForm {
    name: string,
    executable: File
}

export default function NewProgram(): JSX.Element {
    /*
    const { programId } = useParams<{programId: string | undefined}>();

    const [formPopulated, setFormPopulated] = useState<boolean>(false);
    const [programError, setProgramError] = useState<string>('');*/

    const navigate = useNavigate();

    const { control, handleSubmit, register/*, reset*/ } = useForm<NewProgramForm>({
        defaultValues: {
            name: '',
            executable: undefined
        }
    });

    const { isSubmitting } = useFormState({ control });

    // Program editing code
    /*
    useEffect(() => {
        if (programId) {
            api.getProgram(programId)
                .then(program => {
                    reset(program);
                    setFormPopulated(true);
                }).catch(error => setProgramError(error.message));
        } else {
            setFormPopulated(true);
        }
        setFormPopulated(true);
    }, []);
    */

    const onSubmit: SubmitHandler<NewProgramForm> = data => {
        api.createProgram(data)
            .then(result => {
                if (result.success) {
                    navigate(`/programs/${result.id}`);
                }
            })
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h3">
                {/*programId ? "Edit Program" : "New Program"*/}
                New Program
            </Typography>
            {/*programError ? (
                <Alert severity="error">
                    <AlertTitle>Failed to get program</AlertTitle>
                    {programError}
                </Alert>
            ) : formPopulated ? (*/
                <form onSubmit={handleSubmit(onSubmit)}>
                    {[
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Name"
                                    variant="outlined"
                                    required
                                    fullWidth
                                />
                            )}
                        />,
                        <>
                            <Box>
                                <label htmlFor="file-input">
                                    Executable (*.wasm)
                                </label>
                            </Box>
                            <input
                                {...register("executable")}
                                accept="application/wasm"
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
                            {/*programId ? "Save Program" : "Create Program"*/}
                            Create Program
                        </LoadingButton>].map((control, i) => (
                            <Box key={i} sx={{ my: 2 }}>{control}</Box>
                        ))}
                </form>
            /*) : (
            <CircularProgress />
            )*/}
        </Container >
    );
}