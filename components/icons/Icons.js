export const GoogleIcon = ({ height, width }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 48 48"
      height={height}
      width={width}
    >
      <defs>
        <path
          id="a"
          d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
        ></path>
      </defs>
      <clipPath id="b">
        <use overflow="visible" xlinkHref="#a"></use>
      </clipPath>
      <path fill="#FBBC05" d="M0 37V11l17 13z" clipPath="url(#b)"></path>
      <path
        fill="#EA4335"
        d="M0 11l17 13 7-6.1L48 14V0H0z"
        clipPath="url(#b)"
      ></path>
      <path
        fill="#34A853"
        d="M0 37l30-23 7.9 1L48 0v48H0z"
        clipPath="url(#b)"
      ></path>
      <path
        fill="#4285F4"
        d="M48 48L17 24l-4-3 35-10z"
        clipPath="url(#b)"
      ></path>
    </svg>
  );
};

export const FacebookIcon = ({ height, width, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={fill}
      version="1.1"
      viewBox="0 0 23.101 23.101"
      xmlSpace="preserve"
    >
      <path d="M8.258 4.458c0-.144.02-.455.06-.931.043-.477.223-.976.546-1.5.32-.522.839-.991 1.561-1.406C11.144.208 12.183 0 13.539 0h3.82v4.163h-2.797c-.277 0-.535.104-.768.309-.231.205-.35.4-.35.581v2.59h3.914c-.041.507-.086 1-.138 1.476l-.155 1.258c-.062.425-.125.819-.187 1.182h-3.462v11.542H8.258V11.558H5.742V7.643h2.516V4.458z"></path>
    </svg>
  );
};

export const BackIcon = ({ height, width }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      width={width}
      height={height}
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
      />
    </svg>
  );
};
