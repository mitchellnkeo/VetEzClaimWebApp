import ApiService from '@/utils/apiService';

export const getFaxBodyData = async (filename, isCourtForm = false) => {
  let faxNumber = isCourtForm
    ? process.env.NEXT_PUBLIC_FAX_STOCOURT_FAX_NUMBER
    : process.env.NEXT_PUBLIC_FAX_STOFAX_NUMBER;

  const bodyData = {
    action: process.env.NEXT_PUBLIC_FAX_ACTION,
    access_id: process.env.NEXT_PUBLIC_FAX_ACCESS_ID,
    access_pwd: process.env.NEXT_PUBLIC_FAX_ACCESS_PWD,
    sCallerID: process.env.NEXT_PUBLIC_FAX_SCALLER_ID,
    sSenderEmail: process.env.NEXT_PUBLIC_FAX_SSENDER_EMAIL,
    sFaxType: process.env.NEXT_PUBLIC_FAX_SFAX_TYPE,
    sToFaxNumber: faxNumber,
    sFileName_1: `${filename}`,
  };
  return bodyData;
};

export const sendViaSRFax = async (faxData) => {
  return ApiService.post(`/srfax/send`, faxData, {
    noAuth: true,
  }).then((response) => {
    return response.data;
  });
};

export const getFaxStatus = async (pdfGuid) => {
  const faxData = {
    faxId: pdfGuid,
  };
  return ApiService.post(`/srfax/getFax`, faxData, {
    noAuth: true,
  }).then((response) => {
    return response.data;
  });
};
