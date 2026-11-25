import { useState } from 'react';
import { ShieldCheck } from 'lucide-react';

interface ClinicalImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectClass?: string;
}

export function ClinicalImage({ src, alt, className = '', aspectClass = 'aspect-[4/3]' }: ClinicalImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-slate-100 text-slate-500 dark:bg-slate-800/80 dark:text-slate-400 ${aspectClass} ${className}`}
        role="img"
        aria-label={alt}
      >
        <ShieldCheck className="mb-2 h-7 w-7 text-teal-600 dark:text-teal-400" />
        <span className="max-w-[80%] text-center text-xs font-medium leading-snug">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading="lazy"
      onError={() => setHasError(true)}
      className={`object-cover ${className}`}
    />
  );
}
