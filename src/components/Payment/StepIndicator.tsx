"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full max-w-sm mb-6">
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div key={index} className="flex items-center">
            <div
              className={cn(
                "flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300",
                index + 1 === currentStep
                  ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30 scale-110"
                  : index + 1 < currentStep
                  ? "bg-blue-500/80 text-white"
                  : "bg-gray-700 text-gray-400"
              )}
            >
              {index + 1}
            </div>
            
            {index < totalSteps - 1 && (
              <div className="relative h-0.5 w-full min-w-[3rem] mx-1">
                <div className="absolute inset-0 bg-gray-700"></div>
                <div 
                  className="absolute inset-0 bg-blue-500 transition-all duration-500 ease-in-out"
                  style={{ 
                    width: index + 1 < currentStep ? '100%' : index + 1 === currentStep ? '50%' : '0%'
                  }}
                ></div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="flex items-center justify-between text-xs text-gray-400 mt-1 px-1">
        <span className={currentStep >= 1 ? "text-blue-400" : ""}>Card</span>
        <span className={currentStep >= 2 ? "text-blue-400" : ""}>Payment</span>
        <span className={currentStep >= 3 ? "text-blue-400" : ""}>Recipient</span>
        <span className={currentStep >= 4 ? "text-blue-400" : ""}>Location</span>
      </div>
    </div>
  );
}