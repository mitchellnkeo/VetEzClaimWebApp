import Link from 'next/link';
import moment from 'moment';
import { ClockIcon, EmailIcon, UserNameIcon } from '../icons/SvgIcons';
import { useSelector, useDispatch } from 'react-redux';

const ProfileInformation = ({ data }) => {
  const { user, uid } = useSelector((state) => state.auth);

  return (
    <>
      <div className="panel">
        <div className="mb-5 flex items-center justify-between">
          <h5 className="text-lg font-semibold dark:text-white-light">
            Profile
          </h5>
          <Link
            href="../profile/settings/"
            className="btn btn-primary ml-2 rounded-full p-2"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
            >
              <path
                opacity="0.5"
                d="M4 22H20"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M14.6296 2.92142L13.8881 3.66293L7.07106 10.4799C6.60933 10.9416 6.37846 11.1725 6.17992 11.4271C5.94571 11.7273 5.74491 12.0522 5.58107 12.396C5.44219 12.6874 5.33894 12.9972 5.13245 13.6167L4.25745 16.2417L4.04356 16.8833C3.94194 17.1882 4.02128 17.5243 4.2485 17.7515C4.47573 17.9787 4.81182 18.0581 5.11667 17.9564L5.75834 17.7426L8.38334 16.8675L8.3834 16.8675C9.00284 16.6611 9.31256 16.5578 9.60398 16.4189C9.94775 16.2551 10.2727 16.0543 10.5729 15.8201C10.8275 15.6215 11.0583 15.3907 11.5201 14.929L11.5201 14.9289L18.3371 8.11195L19.0786 7.37044C20.3071 6.14188 20.3071 4.14999 19.0786 2.92142C17.85 1.69286 15.8581 1.69286 14.6296 2.92142Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                opacity="0.5"
                d="M13.8879 3.66406C13.8879 3.66406 13.9806 5.23976 15.3709 6.63008C16.7613 8.0204 18.337 8.11308 18.337 8.11308M5.75821 17.7437L4.25732 16.2428"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </Link>
        </div>

        <div className="mb-5 rounded-md border border-[#ebedf2] bg-white p-4 dark:border-[#191e3a] dark:bg-black">
          {/* Row 1 */}
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-bold text-gray-500">Name</p>
              <p className="font-semibold">
                {user.firstName} {user.lastName}
              </p>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-500">Birth Date</p>
              <p className="font-semibold">{user.birthday}</p>
            </div>
          </div>

          {/* Row 2 */}
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-bold text-gray-500">Email</p>
              <p className="font-semibold">{user.email}</p>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-500">Phone Number</p>
              <p className="font-semibold">{user.phone}</p>
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <li className="flex items-center gap-2 text-sm font-bold text-gray-500">
                <ClockIcon />
                Join: {moment(data?.createdAt).format('YYYY-MM-DD')}
              </li>
            </div>
            <div>
              <li className="flex items-center gap-2 text-sm font-bold text-gray-500">
                <ClockIcon />
                Update: {moment(data?.updatedAt).format('YYYY-MM-DD')}
              </li>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileInformation;
