// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { X, Hammer, Bell, Mail } from 'lucide-react';

// export default function BlogModal({ isOpen, onClose }) {
//   const [email, setEmail] = useState('');
//   const [subscribed, setSubscribed] = useState(false);

//   const handleSubscribe = (e) => {
//     e.preventDefault();
//     if (email) {
//       setSubscribed(true);
//       setTimeout(() => {
//         setSubscribed(false);
//         onClose();
//       }, 3000);
//     }
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           {/* BACKDROP */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={onClose}
//             className="fixed inset-0 bg-purple-900/60 backdrop-blur-sm z-[1000] flex items-center justify-center p-4"
//           />

//           {/* MODAL CONTENT */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9, y: 20 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.9, y: 20 }}
//             className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl z-[1001] overflow-hidden border-[6px] border-orange-500/10"
//           >
//             {/* Close Button */}
//             <button 
//               onClick={onClose}
//               className="absolute top-6 right-6 text-gray-400 hover:text-purple-900 transition-colors"
//             >
//               <X size={28} />
//             </button>

//             <div className="p-8 md:p-12 text-center">
//               {/* Icon Animation */}
//               <motion.div 
//                 animate={{ rotate: [0, -10, 10, 0] }}
//                 transition={{ repeat: Infinity, duration: 2 }}
//                 className="w-20 h-20 bg-orange-100 text-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-6"
//               >
//                 <Hammer size={40} />
//               </motion.div>

//               <h2 className="text-3xl md:text-4xl font-black text-purple-900 mb-4">
//                 Coming Soon! ✍️
//               </h2>
              
//               <p className="text-gray-500 font-medium leading-relaxed mb-8">
//                 Our experts are busy crafting helpful parenting guides and school updates. Be the first to know when we launch!
//               </p>

//              <button 
//                     type="submit"
//                     className="w-full py-4 bg-gradient-to-r from-purple-800 to-purple-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-purple-500/30 hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
//                   >
//                     <Bell size={20} />
//                       Expected Launch: March 2026                  
//                       </button>
              
//             </div>

//             {/* Bottom Accent */}
//             <div className="h-2 w-full bg-gradient-to-r from-purple-800 via-orange-500 to-purple-800" />
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// }