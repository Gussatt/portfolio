export default function ProfileImage({ src, alt, size = 64 }) {
  return (
    <div 
      className="relative overflow-hidden border-2 border-dracula-purple rounded-full shadow-lg transition-transform duration-300 hover:scale-105"
      style={{ width: size, height: size }}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover grayscale contrast-[1.1] brightness-[1.05] hover:grayscale-0 transition-all duration-500"
      />
    </div>
  );
}
