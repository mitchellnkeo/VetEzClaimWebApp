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

export const IsValidDateRange = (initialMonth, initialYear, finalMonth, finalYear) => {
  const monthToNumber = {
    'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
    'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11
  };

  if (!(initialMonth in monthToNumber) || !(finalMonth in monthToNumber)) {
    throw new Error('Invalid month name provided.');
  }

  const initialDate = new Date(parseInt(initialYear), monthToNumber[initialMonth]);
  const finalDate = new Date(parseInt(finalYear), monthToNumber[finalMonth]);

  return finalDate >= initialDate;
};



export const stripMarkdown = (markdownText) => {
  if (!markdownText) return '';
  return markdownText
    .replace(/\*\*(.*?)\*\*/g, '$1') // bold
    .replace(/\*(.*?)\*/g, '$1')     // italic
    .replace(/__([^_]+)__/g, '$1')   // underline-ish
    .replace(/`([^`]+)`/g, '$1')     // inline code
    .replace(/!\[.*?\]\(.*?\)/g, '') // images
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1') // links
    .replace(/#+\s?(.*)/g, '$1')     // headings
    .replace(/>\s?(.*)/g, '$1')      // blockquotes
    .replace(/[-*]\s+(.*)/g, '$1')   // lists
    .replace(/\n{2,}/g, '\n')        // multiple newlines to single
    .trim();
};
