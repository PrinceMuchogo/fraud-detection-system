"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardPreviewProps {
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
}

export function CardPreview({ 
  cardNumber, 
  cardholderName, 
  expiryDate 
}: CardPreviewProps) {
  const [mounted, setMounted] = useState(false);
  const [flipped, setFlipped] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Format card number for display
  const formatDisplayCardNumber = (num: string) => {
    const formatted = num.padEnd(19, '•').slice(0, 19);
    return formatted;
  };

  return (
    <div 
      className="relative w-full h-56 perspective-1000 cursor-pointer group"
      onClick={() => setFlipped(!flipped)}
    >
      <div 
        className={cn(
          "absolute w-full h-full rounded-2xl transition-all duration-500 preserve-3d shadow-xl",
          flipped ? "rotate-y-180" : ""
        )}
      >
        {/* Card Front */}
        <div className="absolute w-full h-full backface-hidden rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800"></div>
          <div className="absolute inset-0 bg-[url('/card-pattern.png')] opacity-10 mix-blend-overlay"></div>
          
          <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-xs font-medium opacity-80">Card Preview</p>
                <div className="h-9 w-12 rounded bg-white/20 backdrop-blur-sm"></div>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center"
              >
                <span className="text-white text-sm font-bold">VISA</span>
              </motion.div>
            </div>
            
            <div className="mt-6">
              <div className="text-lg font-mono tracking-wider mb-6">
                {formatDisplayCardNumber(cardNumber)}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs opacity-80 mb-1">Card Holder</p>
                  <p className="font-medium truncate">
                    {cardholderName || 'YOUR NAME'}
                  </p>
                </div>
                <div>
                  <p className="text-xs opacity-80 mb-1">Expires</p>
                  <p className="font-medium">{expiryDate || 'MM/YY'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Card Back */}
        <div className="absolute w-full h-full backface-hidden rounded-2xl overflow-hidden rotate-y-180">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900"></div>
          <div className="absolute inset-0 bg-[url('/card-pattern.png')] opacity-10 mix-blend-overlay"></div>
          
          <div className="absolute inset-0 flex flex-col">
            <div className="h-12 bg-black/60 mt-6"></div>
            <div className="flex-1 p-6">
              <div className="bg-white/20 backdrop-blur-sm h-10 mt-6 w-3/4 rounded flex items-center px-4 justify-end">
                <div className="text-white font-mono text-sm">CVV</div>
              </div>
              <div className="mt-6 text-white text-xs">
                <p className="opacity-60">This card is property of the issuing bank. Unauthorized use is prohibited.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <p className="text-center text-gray-400 text-xs mt-2">
        Click to see {flipped ? "front" : "back"} of card
      </p>
    </div>
  );
}