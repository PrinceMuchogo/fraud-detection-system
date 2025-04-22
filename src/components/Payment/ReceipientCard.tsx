"use client";

import { useState } from "react";
import { User, Mail, Phone, ChevronLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { PaymentFormData } from "@/types/payment";

interface RecipientFormProps {
  formData: {
    recipientName: string;
    recipientEmail: string;
    recipientPhone: string;
  };
  updateFormData: (data: Partial<PaymentFormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

export function RecipientForm({ 
  formData, 
  updateFormData, 
  goToNextStep, 
  goToPreviousStep 
}: RecipientFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateAndProceed = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    
    if (!formData.recipientName) {
      newErrors.recipientName = "Recipient name is required";
    }
    
    if (!formData.recipientEmail || !validateEmail(formData.recipientEmail)) {
      newErrors.recipientEmail = "Valid email address is required";
    }
    
    if (!formData.recipientPhone) {
      newErrors.recipientPhone = "Phone number is required";
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      goToNextStep();
    }
  };

  return (
    <Card className="backdrop-blur-lg bg-white/5 border-white/10 shadow-lg animate-in fade-in-50 duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="text-white text-xl">Recipient Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="recipientName" className="text-gray-300">Recipient Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              id="recipientName"
              placeholder="Jane Doe"
              value={formData.recipientName}
              onChange={(e) => updateFormData({ recipientName: e.target.value })}
              className="pl-10 bg-white/5 border-white/10 focus:border-blue-500 transition-colors"
            />
          </div>
          {errors.recipientName && (
            <p className="text-red-400 text-xs mt-1">{errors.recipientName}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="recipientEmail" className="text-gray-300">Recipient Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              id="recipientEmail"
              type="email"
              placeholder="email@example.com"
              value={formData.recipientEmail}
              onChange={(e) => updateFormData({ recipientEmail: e.target.value })}
              className="pl-10 bg-white/5 border-white/10 focus:border-blue-500 transition-colors"
            />
          </div>
          {errors.recipientEmail && (
            <p className="text-red-400 text-xs mt-1">{errors.recipientEmail}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="recipientPhone" className="text-gray-300">Recipient Phone</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              id="recipientPhone"
              type="tel"
              placeholder="(123) 456-7890"
              value={formData.recipientPhone}
              onChange={(e) => updateFormData({ recipientPhone: e.target.value })}
              className="pl-10 bg-white/5 border-white/10 focus:border-blue-500 transition-colors"
            />
          </div>
          {errors.recipientPhone && (
            <p className="text-red-400 text-xs mt-1">{errors.recipientPhone}</p>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between space-x-4">
        <Button 
          onClick={goToPreviousStep} 
          variant="outline" 
          className="flex-1 border-white/10 hover:bg-white/10 text-white transition-colors"
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button 
          onClick={validateAndProceed} 
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white transition-colors"
        >
          Continue
        </Button>
      </CardFooter>
    </Card>
  );
}