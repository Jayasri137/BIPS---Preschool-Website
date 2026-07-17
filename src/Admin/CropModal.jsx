import React, { useState, useRef, useCallback } from 'react';
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Square, Monitor, Maximize } from 'lucide-react';
import getCroppedImg from '../utils/cropImage';

const ASPECT_RATIOS = [
  { label: 'Free', value: undefined, icon: <Maximize size={16} /> },
  { label: '1:1', value: 1, icon: <Square size={16} /> },
  { label: '4:3', value: 4 / 3, icon: <Monitor size={16} /> },
  { label: '16:9', value: 16 / 9, icon: <Monitor size={16} className="rotate-90" /> },
];

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  )
}

export default function CropModal({ isOpen, imageSrc, onClose, onCropComplete }) {
  const [crop, setCrop] = useState({ unit: '%', width: 100, height: 100, x: 0, y: 0 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const [aspect, setAspect] = useState(ASPECT_RATIOS[0]); // Default to Free
  const imgRef = useRef(null);

  const onImageLoad = useCallback((e) => {
    const { width, height } = e.currentTarget;
    imgRef.current = e.currentTarget;
    if (aspect.value) {
      const initialCrop = centerAspectCrop(width, height, aspect.value);
      setCrop(initialCrop);
      setCompletedCrop(initialCrop);
    } else {
      const fullCrop = { unit: '%', width: 100, height: 100, x: 0, y: 0 };
      setCrop(fullCrop);
      setCompletedCrop(fullCrop);
    }
  }, [aspect.value]);

  const handleAspectClick = (ratio) => {
    setAspect(ratio);
    if (imgRef.current) {
      if (ratio.value) {
        const { width, height } = imgRef.current;
        const newCrop = centerAspectCrop(width, height, ratio.value);
        setCrop(newCrop);
        setCompletedCrop(newCrop);
      } else {
        const fullCrop = { unit: '%', width: 100, height: 100, x: 0, y: 0 };
        setCrop(fullCrop);
        setCompletedCrop(fullCrop);
      }
    }
  };

  const handleConfirm = async () => {
    if (!completedCrop || !imgRef.current) {
      return;
    }

    try {
      const image = imgRef.current;
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      // Handle both % unit and px unit crops
      let pixelCrop = {};
      if (completedCrop.unit === '%') {
        pixelCrop = {
          x: (completedCrop.x / 100) * image.naturalWidth,
          y: (completedCrop.y / 100) * image.naturalHeight,
          width: (completedCrop.width / 100) * image.naturalWidth,
          height: (completedCrop.height / 100) * image.naturalHeight,
        };
      } else {
        pixelCrop = {
          x: completedCrop.x * scaleX,
          y: completedCrop.y * scaleY,
          width: completedCrop.width * scaleX,
          height: completedCrop.height * scaleY,
        };
      }

      // If dimensions are 0 (e.g. they clicked and dragged 0 pixels), do nothing
      if (pixelCrop.width === 0 || pixelCrop.height === 0) {
        return;
      }

      const croppedImage = await getCroppedImg(imageSrc, pixelCrop, 0, { horizontal: false, vertical: false });
      onCropComplete(croppedImage);
      onClose();
    } catch (e) {
      // console.error(e);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-slate-900 rounded-3xl border border-white/10 shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-white/10 bg-slate-800/50 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-500">
                <Maximize size={20} />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Crop Image</h3>
                <p className="text-slate-400 text-xs font-medium">Drag the corners to adjust</p>
              </div>
            </div>
            <button 
              onClick={onClose} 
              className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
            >
              <X size={24} />
            </button>
          </div>

          {/* Cropper Section */}
          <div className="relative flex-1 bg-black min-h-[400px] flex overflow-auto p-4">
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={aspect.value}
              className="m-auto"
            >
              <img
                src={imageSrc}
                onLoad={onImageLoad}
                alt="Crop preview"
                className="max-h-[60vh] w-auto h-auto object-contain block mx-auto"
                crossOrigin="anonymous"
              />
            </ReactCrop>
          </div>

          {/* Controls Section */}
          <div className="p-6 bg-slate-900 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              {/* Aspect Ratios */}
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-3">Aspect Ratio</label>
                <div className="flex flex-wrap gap-2">
                  {ASPECT_RATIOS.map((ratio) => (
                    <button
                      key={ratio.label}
                      onClick={() => handleAspectClick(ratio)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all border ${
                        aspect.label === ratio.label
                          ? 'bg-orange-500 border-orange-400 text-white shadow-lg shadow-orange-500/20'
                          : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:border-white/10 hover:text-slate-200'
                      }`}
                    >
                      {ratio.icon}
                      {ratio.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <button
                  onClick={onClose}
                  className="px-8 py-3 rounded-2xl text-slate-400 font-bold hover:bg-white/5 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={!completedCrop || (completedCrop.width === 0 && completedCrop.unit === 'px')}
                  className="px-10 py-3 bg-orange-600 text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-orange-500 transition-all shadow-xl shadow-orange-600/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Check size={20} strokeWidth={3} />
                  Save & Apply
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
