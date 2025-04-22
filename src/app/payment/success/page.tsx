"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Trigger confetti effect on load
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    
    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };
    
    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
      
      const particleCount = 50 * (timeLeft / duration);
      
      // Since particles fall down, start a bit higher than random
      confetti({
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        zIndex: 0,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        zIndex: 0,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-900 via-slate-900 to-black flex flex-col items-center justify-center p-4">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      
      <div className="container max-w-md text-center relative backdrop-blur-sm bg-white/5 p-8 rounded-2xl border border-white/10 shadow-2xl animate-in fade-in-50 slide-in-from-bottom-10 duration-700">
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-blue-500 blur-lg opacity-60"></div>
            <div className="relative bg-blue-500 p-4 rounded-full">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-white mt-12 mb-2">Payment Successful!</h1>
        <p className="text-gray-400 mb-8">Your transaction has been processed successfully.</p>
        
        <div className="border-t border-white/10 pt-6 mt-6">
          <p className="text-gray-300 mb-2">A confirmation has been sent to your email.</p>
          <p className="text-gray-400 text-sm mb-6">Transaction ID: {Math.random().toString(36).substring(2, 15).toUpperCase()}</p>
          
          <Button 
            onClick={() => router.push("/")}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}