import { StyledToastContainer } from './style';

const Toast = () => {
  return <StyledToastContainer limit={5} autoClose={3000} />;
};

export default Toast;
