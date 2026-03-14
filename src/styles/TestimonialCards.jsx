import { FaStar } from "react-icons/fa";

export default function TestimonialCard({ testimonial }) {
  // Capture the icon component (FaMale/FaFemale) from the data
  const IconComponent = testimonial.image;

  return (
    <div
      className="
        relative 
        w-[280px] h-[340px]
        sm:w-[360px] sm:h-[440px] 
        mx-auto
      "
    >
      {/* SVG Speech Bubble */}
      <svg
        viewBox="0 0 360 440"
        className="absolute inset-0 w-full h-full drop-shadow-md"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="
            M60 20 
            H300 
            Q340 20 340 60 
            V300 
            Q340 340 300 340 
            H140 
            C110 340 95 360 85 385 
            C75 410 55 420 45 420 
            C55 395 60 365 55 350 
            C30 345 20 325 20 300 
            V60 
            Q20 20 60 20 
            Z
          "
          fill={testimonial.bg}
        />
      </svg>

      {/* CONTENT */}
      <div className="relative z-10 h-full px-6 py-8 sm:px-10 sm:py-12 flex flex-col">
        {/* Profile */}
        <div className="flex items-center gap-3 sm:gap-4 mb-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
            {typeof testimonial.image === "string" ? (
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-full h-full object-cover"
              />
            ) : (
              // This renders the FaMale or FaFemale icon
              <IconComponent className="text-2xl sm:text-3xl text-gray-400" />
            )}
          </div>
          <div className="flex-1 text-left">
            <h4 className="font-bold text-purple-800 text-sm sm:text-lg leading-tight">
              {testimonial.name}
            </h4>
            <p className="text-[10px] sm:text-xs text-orange-500 font-bold uppercase tracking-wide">
              {testimonial.role}
            </p>
          </div>
        </div>

        {/* Text */}
        <p className="text-gray-700 text-xs sm:text-base leading-relaxed text-left italic">
          "{testimonial.text}"
        </p>

        {/* ⭐ Stars - Using Flexbox for better alignment than Absolute */}
        <div className="mt-auto mb-12 sm:mb-20 flex gap-1 text-yellow-500">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className="text-xs sm:text-sm" />
          ))}
        </div>

        {/* Decorative Quote Mark */}
        <div
          className="
          absolute bottom-10 sm:bottom-12 right-8 sm:right-10
          text-5xl sm:text-7xl font-serif font-black text-black opacity-10
          "
        >
          ”
        </div>
      </div>
    </div>
  );
}