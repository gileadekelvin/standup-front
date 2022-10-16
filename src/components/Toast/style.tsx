import { ToastContainer } from 'react-toastify';
import { styled } from '@mui/material';

export const StyledToastContainer = styled(ToastContainer)(
  ({ theme }) => `
  .Toastify__toast {
    font-family: "Public Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
  }
`,
);
