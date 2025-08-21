import AuthLayout from '@/components/layouts/AuthLayout';
import UserRegistration from '@/components/forms/UserRegistration';

const Registration = () => {
  return (
    <AuthLayout title="Registration" withCover={true}>
      <UserRegistration />
    </AuthLayout>
  );
};

export default Registration;
