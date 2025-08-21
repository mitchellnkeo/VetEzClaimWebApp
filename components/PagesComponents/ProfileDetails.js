import React from 'react';

const ProfileDetails = ({ data }) => {
  return (
    <div className="flex items-center gap-2 text-xl">
      <div>
        <div className="mb-2">
          <label>
            Full Name:{' '}
            <span className="font-bold capitalize">
              {data?.firstName + ' ' + data?.lastName}
            </span>
          </label>
        </div>
        <div className="mb-2">
          <label>
            Email: <span className="font-bold">{data?.email}</span>
          </label>
        </div>
        <div className="mb-2">
          <label>
            Phone: <span className="font-bold">{data?.phone}</span>
          </label>
        </div>
        {data?.city && (
          <div className="mb-2">
            <label>
              City: <span className="font-bold capitalize">{data?.city}</span>
            </label>
          </div>
        )}
        {data?.street && (
          <div className="mb-2">
            <label>
              Street:{' '}
              <span className="font-bold capitalize">{data?.street}</span>
            </label>
          </div>
        )}
        {data?.zipCode && (
          <div className="mb-2">
            <label>
              Zip Code: <span className="font-bold">{data?.zipCode}</span>
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileDetails;
