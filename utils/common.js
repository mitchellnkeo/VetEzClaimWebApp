/** Accept 5554443333 or 555-444-3333; store dashed for PDF field splitting. */
export const normalizeUSPhone = (value) => {
  if (!value || typeof value !== 'string') {
    return value;
  }
  const digits = value.replace(/\D/g, '');
  if (digits.length !== 10) {
    return value.trim();
  }
  return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
};

export const isUserOver18 = (dob) => {
  if (!dob || typeof dob !== 'string') {
    return false;
  }

  const dateFormatRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;
  if (!dateFormatRegex.test(dob)) {
    return false;
  }
  const [month, day, year] = dob.split('/').map(Number);
  const birthDate = new Date(year, month - 1, day);
  if (
    birthDate.getMonth() !== month - 1 ||
    birthDate.getDate() !== day ||
    birthDate.getFullYear() !== year
  ) {
    return false;
  }
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age >= 18;
};


export const getProfileStatus = (user) => {
  if (!user) return 0;
  const requiredFields = [
    'firstName',
    'lastName',
    'email',
    'birthday',
    'phone',
    'ssn',
    'branchOfService',
    'street',
    'city',
    'province',
    'zipCode',
    'country',
    'signature',
  ];

  const isComplete = requiredFields.every(
    (field) => Boolean(user[field])
  );

  if (!isComplete) {
    return 0;
  }

  return isUserOver18(user.birthday) ? 2 : 1;
};
