export function GetErrorFieldsString(errors, fieldMap) {
  const errorFields = Object.keys(errors);
  if (errorFields.length === 0) return [false, ''];
  const friendlyNames = errorFields.map((field) => fieldMap[field] || field);
  return [true, friendlyNames.join(', ')];
}

export const formatAmount = async (amount) => {
  if (amount.length < 6) {
   return amount.padStart(6, '0');
  }
  return amount;
}
