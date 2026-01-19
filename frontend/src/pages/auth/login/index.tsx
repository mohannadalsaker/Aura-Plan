import LoginForm from "@/features/auth/features/LoginForm";
import { Stack, Box } from "@mui/material";

const LoginPage = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh', 
        background: 'linear-gradient(to bottom right, #3CB371, #1E90FF)', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Stack
        spacing={2}
        sx={{
          width: '100%',
          maxWidth: 400, 
          backgroundColor: 'white',
          padding: 4,     
          borderRadius: 2,  
          boxShadow: 3,       
        }}
      >
        <LoginForm />
      </Stack>
    </Box>
  );
};

export default LoginPage;
