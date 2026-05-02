import { useState, useEffect, useCallback } from "react";
import { RefreshCw } from "lucide-react";

const Captcha = ({ onCaptchaGenerate, variant = "light" }) => {
  const [captchaText, setCaptchaText] = useState("");

  const generateCaptcha = useCallback(() => {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(result);
    if (onCaptchaGenerate) {
      onCaptchaGenerate(result);
    }
  }, [onCaptchaGenerate]);

  useEffect(() => {
    generateCaptcha();
  }, [generateCaptcha]);

  const isDark = variant === "dark";

  return (
    <div className={`flex items-center gap-4 p-3 rounded-xl border select-none ${
      isDark ? "bg-white/5 border-white/10" : "bg-black/5 border-black/20"
    }`}>
      <div 
        className={`px-6 py-2 rounded-lg font-mono text-2xl font-bold tracking-[0.5em] italic shadow-inner border ${
          isDark 
            ? "bg-white text-black border-gray-200" 
            : "bg-white text-black border-black/20"
        }`}
        style={{
          textShadow: "1px 1px 1px rgba(0,0,0,0.1)",
          fontFamily: "'Courier New', Courier, monospace",
          backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.05) 1px, transparent 1px)",
          backgroundSize: "10px 10px"
        }}
      >
        {captchaText}
      </div>
      <button
        type="button"
        onClick={generateCaptcha}
        className={`p-2 rounded-full transition-colors ${
          isDark ? "hover:bg-white/10 text-gray-400 hover:text-white" : "hover:bg-black/5 text-gray-500 hover:text-black"
        }`}
        title="Refresh Captcha"
      >
        <RefreshCw size={20} className="hover:rotate-180 transition-transform duration-500" />
      </button>
    </div>
  );
};

export default Captcha;
