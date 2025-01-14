import { useForm } from "react-hook-form";
import { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Avatar,
    useMediaQuery,
    useTheme
} from '@mui/material';
import { Link } from "react-router-dom";


import { useAuth } from '../../utils/AuthContext'
import { navigateToDashboard } from "../../utils/navigateToDashboard";
import { useNavigate } from "react-router";
import logo from '../../assets/mloflow.png'
import { useSignIn } from 'react-auth-kit'

const LoginForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: { email: "", password: "" } });
    const [recievedErrorMessage, setRecievedErrorMessage] = useState(false);
    const { login, errorMessage } = useAuth();
    const theme = useTheme()
    const isMobileView = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();
    const signIn = useSignIn()



    const onSubmit = async (data) => {
        try {
            const { access, refresh, category } = await login(data.email, data.password);
            const userRole = category;
            signIn({
                access_token:access,
                refresh_token:refresh,
                expiresIn: '3600',
                tokenType: 'Bearer',
                authState: { role: userRole }
            })
            // localStorage.setItem('access_token', access);
            // localStorage.setItem('refresh_token', refresh);
            navigateToDashboard(userRole, navigate);
        } catch (error) {
            setRecievedErrorMessage(!recievedErrorMessage)
        }


    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" maxWidth="sm" sx={{ mt: isMobileView ? 1 : 3, mb: 3 }}>
            <Box component="form" noValidate autoComplete="off"
                onSubmit={
                    handleSubmit(onSubmit)
                }
                display="flex"
                flexDirection="column"
                alignItems="center"
                p={2}
                width="100%"
                maxWidth="400px"
                sx={
                    { boxShadow: 3, mt: isMobileView ? 1 : 4 }
                }>
                <Avatar alt="MloFlow Logo" src={logo} sx={{ height: 54 }} />
                {/* <Typography variant="h5" component="div" gutterBottom>
                    <LoginIcon fontSize="large" />
                </Typography> */}
                <Typography variant="h5" component="div" gutterBottom>
                    Login
                </Typography>
                {recievedErrorMessage && <Typography color='error'>{errorMessage}</Typography>}

                <TextField
                    sx={{ mt: 3 }}
                    label="Email"
                    type="email"
                    fullWidth
                    {...register("email", {
                        required: true,
                        pattern: /^\S+@\S+$/i,
                    })}
                    error={Boolean(errors.email)}
                    helperText={errors.email ? "Enter valid email." : ""}
                />

                <TextField sx={
                    { mt: 3 }
                }
                    id="standard-password-input"
                    label="Password"
                    type="password"
                    fullWidth
                    autoComplete="current-password"
                    variant="outlined"
                    {...register("password", { required: true })}
                    error={
                        Boolean(errors.password)
                    }
                    helperText={
                        errors.password ? "Password is required." : ""
                    } />
                <Button variant="contained"
                    sx={
                        { mt: 3, backgroundColor: "#FFA000" }
                    }
                    color="success"
                    type="submit">Login
                </Button>
                <Box sx={{ mt: 2 }}>
                    <Link to="/email-otp" >
                        forgot password ?
                    </Link>
                </Box>
            </Box>
        </Box>
    )
}

export default LoginForm