import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, db } from '@/firebase/firebase';
import { setDoc, doc } from 'firebase/firestore';
import { seed } from '@/helpers/sessionHelper';
import { showAlert } from '@/utils';
import { FaGoogle } from 'react-icons/fa';

function SignInwithGoogle({ icon }) {
  function googleLogin() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (result) => {
      console.log(result);
      const user = result.user;
      if (result.user) {
        await setDoc(doc(db, 'Users', user.uid), {
          email: user.email,
          firstName: user.displayName,
          photo: user.photoURL,
          lastName: '',
        });

        seed(result?.user?.accessToken);
        showAlert('Login Success', 'success');
        setTimeout(() => {
          window.location.replace('/');
        }, 500);
      }
    });
  }

  return (
    <div>
      <div
        style={{ display: 'flex', justifyContent: 'center', cursor: 'pointer' }}
        onClick={googleLogin}
      >
        {icon ? (
          <img
            className="inline w-1/2 hover:opacity-80 ltr:-ml-1 rtl:-mr-1"
            src="/assets/images/google.png"
            alt="logo"
          />
        ) : (
          <p className="flex items-center gap-2 rounded-sm bg-dark p-2 text-white hover:opacity-70 ">
            <FaGoogle /> Login With Google
          </p>
        )}
      </div>
    </div>
  );
}
export default SignInwithGoogle;
