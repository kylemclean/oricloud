import React, { useState } from 'react';
import { Alert, AlertTitle, Button, Container, TextField, Typography } from '@mui/material';
import api from '../api/api';
import { useForm, useFormState, SubmitHandler, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';

interface LoginForm {
    email: string,
    password: string
}

const Login = () => {
    const navigate = useNavigate();

    const [error, setError] = useState<string>('');

    const { control, handleSubmit, register } = useForm<LoginForm>({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const { isSubmitting } = useFormState({ control });

    const onSubmit: SubmitHandler<LoginForm> = data => {
        api.login(data.email, data.password)
            .then(() => navigate('/programs'))
            .catch((error) => setError(error.message));
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h3">Login</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            type="email"
                            label="Email"
                            variant="outlined"
                            required
                            fullWidth
                        />
                    )}
                />
                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            type="password"
                            label="Password"
                            variant="outlined"
                            required
                            fullWidth
                        />
                    )}
                />
                {error && (
                    <Alert severity="error">
                        <AlertTitle>Email or password incorrect</AlertTitle>
                        {error}
                    </Alert>
                )}
                <LoadingButton type="submit" disabled={isSubmitting} loading={isSubmitting} fullWidth variant="contained">
                    Login
                </LoadingButton>
            </form>
        </Container>
    );
}

export default Login;