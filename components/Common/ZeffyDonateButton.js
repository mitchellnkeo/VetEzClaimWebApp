import { useEffect, useRef } from 'react';
import { ZEFFY_EMBED_FORM_URL } from '@/constants/donate';

/**
 * Zeffy popup donate button — requires embed-form-script in document head
 * and the `zeffy-form-link` attribute (not passed through by React by default).
 */
export default function ZeffyDonateButton({
  children,
  className,
  embedUrl = ZEFFY_EMBED_FORM_URL,
  onFallback,
}) {
  const buttonRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button || !embedUrl) {
      return;
    }

    button.setAttribute('zeffy-form-link', embedUrl);
  }, [embedUrl]);

  const handleClick = (event) => {
    if (!embedUrl && onFallback) {
      event.preventDefault();
      onFallback();
    }
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      className={className}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
