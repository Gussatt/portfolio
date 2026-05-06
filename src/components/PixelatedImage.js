export default function PixelatedImage({ src, alt, size = 64 }) {
  return (
    <div 
      className="relative overflow-hidden border border-dracula-comment rounded"
      style={{ width: size, height: size }}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        style={{
          imageRendering: 'pixelated',
          filter: 'grayscale(100%) contrast(1.2) brightness(0.9)',
        }}
      />
    </div>
  );
}
