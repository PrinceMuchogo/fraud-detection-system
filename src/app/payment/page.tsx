"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield } from "lucide-react";
import { CardForm } from "@/components/Payment/CardForm";
import { PaymentDetails } from "@/components/Payment/PaymentDetailsCard";
import { RecipientForm } from "@/components/Payment/ReceipientCard";
import { LocationForm } from "@/components/Payment/LocationCard";
import { StepIndicator } from "@/components/Payment/StepIndicator";
import { CardPreview } from "@/components/Payment/PaymentSummary";
import { PaymentFormData } from "@/types/payment";

export default function PaymentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<PaymentFormData>({
    // Card Details
    cc_num: "",
    expiry: "",
    cvv: "",
    cardholderName: "",
    // Payment Details
    amt: "",
    category: "",
    reason: "",
    // Recipient Details
    recipientName: "",
    recipientEmail: "",
    recipientPhone: "",
    // Location
    city: "",
    state: "",
    address: "",
    zipCode: ""
  });
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });

  const updateFormData = (data: Partial<PaymentFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const goToNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const timestamp = new Date();
      const paymentData = {
        ...formData,
        trans_date_trans_time: timestamp.toISOString(),
        unix_time: timestamp.getTime() / 1000,
        merch_lat: coordinates.lat,
        merch_long: coordinates.lng
      };

      console.log(paymentData);
      router.push("/payment/success");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-900 via-slate-900 to-black p-4 py-8 md:py-12">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      
      <div className="container mx-auto max-w-5xl relative">
        <div className="flex flex-col items-center space-y-2 mb-8">
          <div className="p-3 rounded-2xl bg-blue-500/20">
            <Shield className="h-8 w-8 text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold text-white">Secure Payment Gateway</h1>
          <p className="text-gray-400 mb-4">Protected by Advanced Fraud Detection</p>
          
          <StepIndicator currentStep={currentStep} totalSteps={4} />
        </div>

        <div className="grid md:grid-cols-12 gap-6">
          <div className="md:col-span-5 lg:col-span-4 order-2 md:order-1">
            <CardPreview 
              cardNumber={formData.cc_num}
              cardholderName={formData.cardholderName}
              expiryDate={formData.expiry}
            />
          </div>

          <div className="md:col-span-7 lg:col-span-8 order-1 md:order-2">
            <form onSubmit={handleSubmit}>
              {currentStep === 1 && (
                <CardForm 
                  formData={formData} 
                  updateFormData={updateFormData}
                  goToNextStep={goToNextStep}
                />
              )}
              
              {currentStep === 2 && (
                <PaymentDetails
                  formData={formData}
                  updateFormData={updateFormData}
                  goToNextStep={goToNextStep}
                  goToPreviousStep={goToPreviousStep}
                />
              )}
              
              {currentStep === 3 && (
                <RecipientForm
                  formData={formData}
                  updateFormData={updateFormData}
                  goToNextStep={goToNextStep}
                  goToPreviousStep={goToPreviousStep}
                />
              )}
              
              {currentStep === 4 && (
                <LocationForm
                  formData={formData}
                  updateFormData={updateFormData}
                  setCoordinates={setCoordinates}
                  goToPreviousStep={goToPreviousStep}
                  handleSubmit={handleSubmit}
                  loading={loading}
                />
              )}
            </form>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-gray-400">
          <Shield className="h-4 w-4" />
          <span>Protected by Advanced Fraud Detection</span>
        </div>
      </div>
    </div>
  );
}