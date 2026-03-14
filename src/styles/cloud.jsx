export default function CloudLogo({ logo }) {
  return (
    <div className="relative w-[300px]">
      {/* Cloud SVG */}
      <svg
        viewBox="0 0 600 350"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        <path
          d="
            M170 300
            H430 
            C500 300 550 250 560 190
            C560 135 515 90 455 90
            C435 40 380 10 320 10
            C255 10 200 50 180 105
            C120 105 70 150 70 210
            C70 260 115 300 170 300
            Z
          "
          fill="white"
        />
      </svg>

      {/* Logo centered inside cloud */}
      <img
        src={logo}
        alt="Bluestone International Preschool"
        className="absolute inset-0 m-auto w-44"
      />
    </div>
  );
}
