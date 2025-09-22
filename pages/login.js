import AuthLayout from '@/components/layouts/AuthLayout';
import LoginForm from '@/components/forms/UserLogin';

const Login = () => {
  return (
    <AuthLayout title="VetEZ - Login">
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
