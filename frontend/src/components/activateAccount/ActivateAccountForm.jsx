import { useState } from 'react';
import { Box, Button, TextField, InputLabel } from '@mui/material'
import { useNavigate } from 'react-router';
import { useForm } from "react-hook-form";
import { useContext } from 'react';
import { ActivationContext } from '../../utils/ActivationContext'
import { BASE_URL } from '../signin/constants';
import axios from 'axios';
import Alert from '@mui/material/Alert';

const ActivateAccountForm = ({ onClose }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const { setActivationEmail } = useContext(ActivationContext);
    const onSubmit = async (data) => {

        try {
            const response = await axios.post(`${BASE_URL}/authapp/regenerate-otp/`, data);
            if (response.status === 200) {
                setActivationEmail(data.email);
                navigate('/activate')
                onClose()
            } else {
                setShowErrorMessage(!showErrorMessage)
            }

        } catch (error) {
            setShowErrorMessage(!showErrorMessage)

        }


    }
    return (
        <Box sx={{ p: 2 }}>
            <Box
                component="form" noValidate autoComplete="off"
                onSubmit={
                    handleSubmit(onSubmit)
                }
            >
                {showErrorMessage &&
                    <Alert severity="error">An Error occured, try again</Alert>
                }
                <InputLabel required sx={{ fontWeight: 'bold', color: 'black' }}>Email</InputLabel>
                <TextField
                    placeholder="Enter registered email"
                    type="email"
                    fullWidth
                    {...register("email", {
                        required: true,
                        pattern: /^\S+@\S+$/i,
                    })}
                    error={Boolean(errors.email)}
                    helperText={errors.email ? "Enter valid email." : ""}
                />
                <Box
                    sx={{
                        mt: 3,
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}
                >
                    <Button
                        variant='outlined'
                        onClick={onClose}
                        sx={{ textTransform: 'none' }}
                    >Cancel</Button>
                    <Button variant="contained"
                        color="success"
                        type="submit">Submit
                    </Button>
                </Box>

            </Box>
        </Box>
    )
}

export default ActivateAccountForm