import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, RotateCw, Play, RefreshCw, Square, Monitor, Maximize } from 'lucide-react';
import getCroppedImg from '../utils/cropImage';

const ASPECT_RATIOS = [
  { label: 'Free', value: null, icon: <Maximize size={16} /> },
  { label: '1:1', value: 1, icon: <Square size={16} /> },
  { label: '4:3', value: 4 / 3, icon: <Monitor size={16} /> },
  { label: '16:9', value: 16 / 9, icon: <Monitor size={16} className="rotate-90" /> },
];

export default function CropModal({ isOpen, imageSrc, onClose, onCropComplete }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [aspect, setAspect] = useState(ASPECT_RATIOS[2]); // Default to 4:3
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [flip, setFlip] = useState({ horizontal: false, vertical: false });

  const handleCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    if (croppedAreaPixels.width > 0 && croppedAreaPixels.height > 0) {
      setCroppedAreaPixels(croppedAreaPixels);
    } else {
      // console.warn('CropModal: Received invalid crop area', croppedAreaPixels);
      setCroppedAreaPixels(null);
    }
  }, []);

  const handleConfirm = async () => {
    if (!croppedAreaPixels || croppedAreaPixels.width === 0 || croppedAreaPixels.height === 0) {
      // console.error('CropModal: Cannot confirm crop with invalid dimensions', croppedAreaPixels);
      return;
    }

    try {
      // console.log('CropModal: Initiating crop with', { imageSrcLength: imageSrc?.length, croppedAreaPixels, rotation, flip });
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels, rotation, flip);
      onCropComplete(croppedImage);
      onClose();
    } catch (e) {
      // console.error('CropModal: getCroppedImg failed', e);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
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
                <RotateCw size={20} />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Crop & Adjust</h3>
                <p className="text-slate-400 text-xs font-medium">Refine your image perspective</p>
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
          <div className="relative flex-1 bg-black min-h-[400px]">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              aspect={aspect.value}
              onCropChange={setCrop}
              onCropComplete={handleCropComplete}
              onZoomChange={setZoom}
              onRotationChange={setRotation}
              showGrid={true}
              classes={{
                containerClassName: "bg-black",
                mediaClassName: "max-w-full max-h-full",
              }}
            />
          </div>

          {/* Controls Section */}
          <div className="p-6 bg-slate-900 border-t border-white/10 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Aspect Ratio & Flip */}
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-3">Aspect Ratio</label>
                  <div className="flex flex-wrap gap-2">
                    {ASPECT_RATIOS.map((ratio) => (
                      <button
                        key={ratio.label}
                        onClick={() => setAspect(ratio)}
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

                <div className="flex gap-4">
                  <button
                    onClick={() => setFlip(prev => ({ ...prev, horizontal: !prev.horizontal }))}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold transition-all border ${
                      flip.horizontal 
                        ? 'bg-blue-500 border-blue-400 text-white' 
                        : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'
                    }`}
                  >
                    <RefreshCw size={18} className={flip.horizontal ? '' : 'rotate-90'} />
                    Flip Horizontal
                  </button>
                  <button
                    onClick={() => setFlip(prev => ({ ...prev, vertical: !prev.vertical }))}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold transition-all border ${
                      flip.vertical 
                        ? 'bg-blue-500 border-blue-400 text-white' 
                        : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'
                    }`}
                  >
                    <RefreshCw size={18} className={flip.vertical ? 'rotate-90' : ''} />
                    Flip Vertical
                  </button>
                </div>
              </div>

              {/* Adjustments */}
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block">Zoom</label>
                    <span className="text-xs font-bold text-orange-500">{Math.round(zoom * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.1}
                    onChange={(e) => setZoom(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-orange-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block">Rotation</label>
                    <span className="text-xs font-bold text-orange-500">{rotation}°</span>
                  </div>
                  <input
                    type="range"
                    value={rotation}
                    min={0}
                    max={360}
                    step={1}
                    onChange={(e) => setRotation(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-orange-500"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-white/5">
              <button
                onClick={onClose}
                className="px-8 py-3 rounded-2xl text-slate-400 font-bold hover:bg-white/5 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={!croppedAreaPixels || croppedAreaPixels.width === 0}
                className="px-10 py-3 bg-orange-600 text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-orange-500 transition-all shadow-xl shadow-orange-600/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Check size={20} strokeWidth={3} />
                Save & Apply
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
