import { motion } from "framer-motion";

export default function GradientImageCard({
  title,
  description,
  image,
  frontColor,
  gradientFrom,
  gradientTo,
  radius,
}) {
  return (
    <div className={`relative md:h-[200px] h-[160px] perspective-[1200px] ${radius}`}>
      <motion.div
        whileHover={{ rotateY: 180 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* FRONT */}
        <div
          className={`absolute inset-0 ${radius} overflow-hidden`}
          style={{
            backfaceVisibility: "hidden",
          }}
        >
          <img
            src={image}
            alt={title}
            className="absolute w-full h-full object-cover"
          />

          <div
            className="absolute inset-0 items-center"
            style={{ backgroundColor: frontColor }}
          >
            <h3 className="text-white text-wrap align-center text-sm md:text-2xl py-21 font-bold leading-tight">
              {title}
            </h3>
            
          </div>
        </div>

        {/* BACK */}
        <div
          className={`absolute inset-0 ${radius} overflow-hidden`}
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
            background: `linear-gradient(to top, ${gradientFrom}, ${gradientTo})`,
          }}
        >
          <img
            src={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />

          <div className="relative z-10 h-full flex items-center justify-center p-6 text-center">
            <p className="text-gray-800 font-medium leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
