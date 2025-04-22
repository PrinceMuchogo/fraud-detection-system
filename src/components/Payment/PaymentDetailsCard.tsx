"use client";

import { useState } from "react";
import { DollarSign, AlertTriangle, ChevronLeft } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PaymentFormData } from "@/types/payment";

interface PaymentDetailsProps {
  formData: {
    amt: string;
    category: string;
    reason: string;
  };
  updateFormData: (data: Partial<PaymentFormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

const categories = [
  "Online Shopping",
  "Travel",
  "Entertainment",
  "Food & Dining",
  "Services",
  "Other",
];

export function PaymentDetails({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
}: PaymentDetailsProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateAndProceed = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.amt || parseFloat(formData.amt) <= 0) {
      newErrors.amt = "Please enter a valid amount";
    }

    if (!formData.category) {
      newErrors.category = "Please select a category";
    }

    if (!formData.reason) {
      newErrors.reason = "Please enter a payment reason";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      goToNextStep();
    }
  };

  return (
    <Card className="animate-in fade-in-50 border-white/10 bg-white/5 shadow-lg backdrop-blur-lg duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl text-white">Payment Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="amount" className="text-gray-300">
            Amount
          </Label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              value={formData.amt}
              onChange={(e) => updateFormData({ amt: e.target.value })}
              className="border-white/10 bg-white/5 pl-10 transition-colors focus:border-blue-500"
              min="0"
              step="0.01"
            />
          </div>
          {errors.amt && (
            <p className="mt-1 text-xs text-red-400">{errors.amt}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="category" className="text-gray-300">
            Payment Category
          </Label>
          <Select
            value={formData.category}
            onValueChange={(value) => updateFormData({ category: value })}
          >
            <SelectTrigger
              id="category"
              className="border-white/10 bg-white/5 transition-colors focus:border-blue-500"
            >
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.category && (
            <p className="mt-1 text-xs text-red-400">{errors.category}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="reason" className="text-gray-300">
            Payment Reason
          </Label>
          <div className="relative">
            <AlertTriangle className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              id="reason"
              placeholder="e.g., Monthly subscription"
              value={formData.reason}
              onChange={(e) => updateFormData({ reason: e.target.value })}
              className="border-white/10 bg-white/5 pl-10 transition-colors focus:border-blue-500"
            />
          </div>
          {errors.reason && (
            <p className="mt-1 text-xs text-red-400">{errors.reason}</p>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between space-x-4">
        <Button
          onClick={goToPreviousStep}
          variant="outline"
          className="flex-1 border-white/10 text-white transition-colors hover:bg-white/10"
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button
          onClick={validateAndProceed}
          className="flex-1 bg-blue-500 text-white transition-colors hover:bg-blue-600"
        >
          Continue
        </Button>
      </CardFooter>
    </Card>
  );
}
