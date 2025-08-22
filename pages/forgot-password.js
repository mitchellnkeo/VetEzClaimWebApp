import AuthLayout from '@/components/layouts/AuthLayout';
import ForgotPasswordForm from '@/components/forms/ForgotPasswordForm';

const ForgotPassword = () => {
  return (
    <AuthLayout title="VetEZ - Forgot Password">
      <ForgotPasswordForm />
    </AuthLayout>
  );
};

export default ForgotPassword;
