export const formatPhoneNumber = (phoneNumber) => {
  const areaCode = phoneNumber?.substring?.(0, 3);
  return `${areaCode}-${phoneNumber?.substring?.(
    3,
    6
  )}-${phoneNumber?.substring?.(6)}`;
};

export const getOriginalPhoneNumber = (phoneNumber) => {
  const originalPhoneNumber = phoneNumber?.replaceAll?.('-', '');
  return originalPhoneNumber;
};

export const capitalizeFirstLetter = (str) => {
  const value = str?.charAt(0)?.toUpperCase?.() + str?.slice?.(1);
  return value;
};
