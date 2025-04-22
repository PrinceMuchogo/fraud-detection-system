"use client";

import { useState } from "react";
import { CreditCard, User, Calendar, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { PaymentFormData } from "@/types/payment";

interface CardFormProps {
  formData: PaymentFormData;
  updateFormData: (data: Partial<PaymentFormData>) => void;
  goToNextStep: () => void;
}

export function CardForm({
  formData,
  updateFormData,
  goToNextStep,
}: CardFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return `${v.slice(0, 2)}/${v.slice(2, 4)}`;
    }
    return v;
  };

  const validateAndProceed = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.cardholderName) {
      newErrors.cardholderName = "Cardholder name is required";
    }

    if (!formData.cc_num || formData.cc_num.replace(/\s/g, "").length < 16) {
      newErrors.cc_num = "Valid card number is required";
    }

    if (!formData.expiry || formData.expiry.length < 5) {
      newErrors.expiry = "Valid expiry date is required";
    }

    if (!formData.cvv || formData.cvv.length < 3) {
      newErrors.cvv = "Valid CVV is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("errors: ", Object.keys(newErrors).length);
      console.log("form data: ", formData);
      goToNextStep();
    }
  };

  return (
    <Card className="animate-in fade-in-50 border-white/10 bg-white/5 shadow-lg backdrop-blur-lg duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl text-white">Card Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="cardholderName" className="text-gray-300">
            Cardholder Name
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              id="cardholderName"
              placeholder="Cardholder fullname"
              value={formData.cardholderName}
              onChange={(e) =>
                updateFormData({ cardholderName: e.target.value })
              }
              className="border-white/10 bg-white/5 pl-10 transition-colors focus:border-blue-500"
              maxLength={30}
            />
          </div>
          {errors.cardholderName && (
            <p className="mt-1 text-xs text-red-400">{errors.cardholderName}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="cardNumber" className="text-gray-300">
            Card Number
          </Label>
          <div className="relative">
            <CreditCard className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              id="cardNumber"
              placeholder="0000 0000 0000 0000"
              value={formData.cc_num}
              onChange={(e) =>
                updateFormData({ cc_num: formatCardNumber(e.target.value) })
              }
              className="border-white/10 bg-white/5 pl-10 transition-colors focus:border-blue-500"
              maxLength={19}
            />
          </div>
          {errors.cc_num && (
            <p className="mt-1 text-xs text-red-400">{errors.cc_num}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="expiry" className="text-gray-300">
              Expiry Date
            </Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                id="expiry"
                placeholder="MM/YY"
                value={formData.expiry}
                onChange={(e) =>
                  updateFormData({ expiry: formatExpiry(e.target.value) })
                }
                className="border-white/10 bg-white/5 pl-10 transition-colors focus:border-blue-500"
                maxLength={5}
              />
            </div>
            {errors.expiry && (
              <p className="mt-1 text-xs text-red-400">{errors.expiry}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="cvv" className="text-gray-300">
              CVV
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                id="cvv"
                type="password"
                placeholder="•••"
                value={formData.cvv}
                onChange={(e) =>
                  updateFormData({ cvv: e.target.value.replace(/\D/g, "") })
                }
                className="border-white/10 bg-white/5 pl-10 transition-colors focus:border-blue-500"
                maxLength={4}
              />
            </div>
            {errors.cvv && (
              <p className="mt-1 text-xs text-red-400">{errors.cvv}</p>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={validateAndProceed}
          className="w-full bg-blue-500 text-white transition-colors hover:bg-blue-600"
        >
          Continue to Payment Details
        </Button>
      </CardFooter>
    </Card>
  );
}
