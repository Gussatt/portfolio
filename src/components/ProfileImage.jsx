import Image from 'next/image';

export default function ProfileImage({ src, alt, size = 64 }) {
  return (
    <div 
      className="relative overflow-hidden border-2 border-dracula-purple rounded-full shadow-lg transition-transform duration-300 hover:scale-105"
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={`${size}px`}
        className="object-cover transition-all duration-500"
        priority
      />
    </div>
  );
}
