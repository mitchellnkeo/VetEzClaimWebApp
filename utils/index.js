import Swal from 'sweetalert2';

export const removeHtmlTags = (text) => {
  const htmlTagsToRemove = ['<div>', '</div>', '<br>'];
  htmlTagsToRemove.forEach((it) => {
    text = text.replace(it, '');
  });
  return text;
};

export const showAlert = (title, type, time = 2000, position = 'top-end') => {
  const toast = Swal.mixin({
    toast: true,
    position: position,
    showConfirmButton: false,
    timer: time,
  });
  return toast.fire({
    icon: type,
    title,
    padding: '10px 20px',
    timerProgressBar: true,
    background: type === 'success' ? '#007bff' : '#dc3545',
  });
};

export const notificationAlert = (title) => {
  const toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3500,
    showCloseButton: true,
    customClass: {
      popup: `color-info`,
    },
  });
  toast.fire({
    title: title,
  });
};

export async function confirmAlert(msg = 'Are you sure want to update') {
  return await Swal.fire({
    allowOutsideClick: false,
    title: 'Are you sure?',
    text: msg,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, update it!',
  });
}

export async function deleteAlert(
  msg = 'Are you sure want to delete  ?',
  btnTxt = 'Yes, delete it!'
) {
  return await Swal.fire({
    allowOutsideClick: false,
    title: 'Are you sure?',
    text: msg,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: btnTxt,
  });
}

export function getPlatform() {
  const platform = window.navigator.platform;
  return platform;
}
export function getOS() {
  var userAgent = window.navigator.userAgent,
    platform = window.navigator.platform,
    macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
    windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
    iosPlatforms = ['iPhone', 'iPad', 'iPod'],
    os = null;

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = 'Mac OS';
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = 'iOS';
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = 'Windows';
  } else if (/Android/.test(userAgent)) {
    os = 'Android';
  } else if (!os && /Linux/.test(platform)) {
    os = 'Linux';
  }
  return os;
}
export function getBrowserName() {
  let browserInfo = navigator.userAgent;
  let browser;
  if (browserInfo.includes('Opera') || browserInfo.includes('Opr')) {
    browser = 'Opera';
  } else if (browserInfo.includes('Edg')) {
    browser = 'Edge';
  } else if (browserInfo.includes('Chrome')) {
    browser = 'Chrome';
  } else if (browserInfo.includes('Safari')) {
    browser = 'Safari';
  } else if (browserInfo.includes('Firefox')) {
    browser = 'Firefox';
  } else {
    browser = 'unknown';
  }
  return browser;
}
