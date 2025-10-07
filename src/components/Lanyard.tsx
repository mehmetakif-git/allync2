/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Power, User, Mail, Zap, AtSign } from 'lucide-react';
import lanyardImage from '../assets/lanyard.png';
import { translations } from '../utils/translations';

const Lanyard = ({ onDismiss, scrollJolt }: { onDismiss: () => void; scrollJolt: number }) => {
    const discordId = "194879626640326656";
    const controls = useAnimation();
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        controls.start({
            y: scrollJolt * 0.1,
            transition: { type: 'spring', stiffness: 400, damping: 20 }
        });
    }, [scrollJolt, controls]);

    // This root div now correctly inherits pointer-events-none from App.tsx
    return (
        <div className="w-full h-full flex items-start justify-center pt-20">
            <motion.div
                ref={ref}
                animate={controls}
                // This is the only clickable element, thanks to pointer-events-auto
                className="relative w-[300px] sm:w-[350px] h-[500px] rounded-3xl overflow-hidden shadow-2xl bg-gray-900/80 backdrop-blur-md border border-gray-700 cursor-pointer pointer-events-auto"
                drag
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                dragElastic={0.1}
                whileTap={{ cursor: "grabbing" }}
                onClick={onDismiss} // Changed to single click for better UX
            >
                <motion.div style={{ zIndex: 2, position: 'relative' }}>
                    <div className="absolute inset-x-0 top-0 h-48">
                        <img src={lanyardImage} alt="User Banner" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/50 to-transparent"></div>
                    </div>
                    <div className="relative flex flex-col items-center justify-center pt-24 text-center p-4">
                        <div className="relative">
                            <img
                                src={`https://cdn.discordapp.com/avatars/${discordId}/a_...`} // Replace with your actual avatar URL logic
                                alt="User Avatar"
                                className="w-24 h-24 rounded-full border-4 border-gray-800 shadow-lg"
                            />
                            <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-gray-900"></div>
                        </div>
                        <h1 className="text-2xl font-bold text-white mt-4">allync</h1>
                        <p className="text-gray-400">allync</p>

                        <div className="flex space-x-4 mt-6">
                            {/* Add social links or other icons here if needed */}
                        </div>

                        <div className="w-full text-left mt-6 space-y-4">
                           <div className="flex items-center text-gray-300">
                                <Zap size={18} className="mr-3 text-cyan-400" />
                                <span>{translations.tr.lanyardStatus}</span>
                            </div>
                            <div className="flex items-center text-gray-300">
                                <User size={18} className="mr-3 text-cyan-400" />
                                <span>{translations.tr.lanyardUsername}</span>
                            </div>
                            <div className="flex items-center text-gray-300">
                                <AtSign size={18} className="mr-3 text-cyan-400" />
                                <span>{translations.tr.lanyardDiscordId}</span>
                            </div>
                        </div>
                        <div
                            className="w-full mt-6 py-3 bg-red-600/80 hover:bg-red-600 transition-colors rounded-lg text-white font-semibold flex items-center justify-center"
                        >
                            <Power size={18} className="mr-2" />
                            {translations.tr.lanyardDismiss}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Lanyard;
