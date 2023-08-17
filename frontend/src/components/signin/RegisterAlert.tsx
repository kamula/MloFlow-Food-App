import Alert from '@mui/material/Alert';
import { Box } from '@mui/material';

const style = {
    // position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    // transform: 'translate(-50%, -50%)',
    width: '100%',
    bgcolor: 'translucent',
    // border: '1px solid green',
    boxShadow: 24,
    p: 4,
};

export default function RegisterAlert() {
    return (
        <Box sx={style}>
            <Alert severity="success">Successfully Created an Account. Check your email for Account Activation details</Alert>
        </Box>
    );
}
