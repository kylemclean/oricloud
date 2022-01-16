import React, { useState } from 'react';
import { Alert, AlertTitle } from '@mui/material';


// This is a yikes, but I also don't know what I'm doing

const setToken = (token: string) => {
    const fetchUser = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        };

        const response = await fetch("/jobs", requestOptions);
        if (!response.ok) {
            localStorage.setItem("authToken", "");
        }
        localStorage.setItem("authToken", token);
    };
    fetchUser()
};

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const submitLogin = async () => {
        const requestOptions = {
            method: "POST",
            headers: { "accept": "application/json", "Content-Type": "application/x-www-form-urlencoded" },
            body: JSON.stringify(
                `grant_type=&username=${email}&password=${password}&scope=&client_id=&client_secret=`
            ),
        };

        const response = await fetch("/token", requestOptions);
        const data = await response.json();

        if (!response.ok) {
            setError(data.detail);
        } else {
            setToken(data.access_token);
        }
    };

    return (
        <div className="column">
            <h1>Login Page</h1>
            <form className="box" onSubmit={submitLogin}>
                <h1 className="title has-text-centered">Login</h1>
                <div className="field">
                    <label className="label">Email Address</label>
                    <div className="control">
                        <input
                            type="text"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input"
                            required
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                        <input
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input"
                            required
                        />
                    </div>
                </div>
                {error ? (
                    <Alert severity="error">
                        <AlertTitle>Username or password incorrect</AlertTitle>
                        {error}
                    </Alert>
                ) : (
                    <h2> Welcome </h2>
                )}
                <br />
                <button className="button is-primary" type="submit">
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;