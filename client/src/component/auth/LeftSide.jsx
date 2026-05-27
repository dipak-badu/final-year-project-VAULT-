export default function ({ imgSrc, title, description }) {
  return (
    <div className="w-1/2 h-screen relative hidden lg:block">
      <img src={imgSrc} alt="signup" className="w-full h-full object-cover" />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Text on Image */}
      <div className="absolute bottom-30 left-10 z-10 gap-6 flex flex-col">
        <h1 className="text-8xl font-bold">{title}</h1>
        <p className="text-gray-300 mt-3 text-lg max-w-md line-clamp-3">
          {description}
        </p>
      </div>
    </div>
  );
}
