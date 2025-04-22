"use client";

import { useState, useEffect } from "react";
import { MapPin, Building2, Search, ChevronLeft } from "lucide-react";
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
import * as opencage from "opencage-api-client";
import { PaymentFormData } from "@/types/payment";

interface LocationFormProps {
  formData: {
    city: string;
    state: string;
    address: string;
    zipCode: string;
  };
  updateFormData: (data: Partial<PaymentFormData>) => void;
  setCoordinates: (coords: { lat: number; lng: number }) => void;
  goToPreviousStep: () => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  loading: boolean;
}

const states = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];

export function LocationForm({
  formData,
  updateFormData,
  setCoordinates,
  goToPreviousStep,
  handleSubmit,
  loading,
}: LocationFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );

  const searchLocation = async (query: string) => {
    if (!query) return;

    try {
      const result = await opencage.geocode({
        q: query,
        countrycode: "us",
        limit: 5,
        key: process.env.NEXT_PUBLIC_OPENCAGE_API_KEY || "",
      });

      if (result.results) {
        setSuggestions(
          result.results.map((r: any) => ({
            formatted: r.formatted,
            lat: r.geometry.lat,
            lng: r.geometry.lng,
          })),
        );
      }
    } catch (error) {
      console.error("Geocoding error:", error);
    }
  };

  const handleAddressChange = (address: string) => {
    updateFormData({ address });

    if (searchTimeout) clearTimeout(searchTimeout);

    const timeout = setTimeout(() => {
      searchLocation(address);
    }, 500);

    setSearchTimeout(timeout);
  };

  const validateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.address) {
      newErrors.address = "Address is required";
    }

    if (!formData.city) {
      newErrors.city = "City is required";
    }

    if (!formData.state) {
      newErrors.state = "State is required";
    }

    if (!formData.zipCode) {
      newErrors.zipCode = "ZIP code is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      handleSubmit(e);
    }
  };

  return (
    <Card className="animate-in fade-in-50 border-white/10 bg-white/5 shadow-lg backdrop-blur-lg duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl text-white">Location Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="address" className="text-gray-300">
            Address Search
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              id="address"
              placeholder="Search for an address"
              value={formData.address}
              onChange={(e) => handleAddressChange(e.target.value)}
              className="border-white/10 bg-white/5 pl-10 transition-colors focus:border-blue-500"
            />
          </div>
          {errors.address && (
            <p className="mt-1 text-xs text-red-400">{errors.address}</p>
          )}

          {suggestions.length > 0 && (
            <div className="mt-2 max-h-40 overflow-hidden overflow-y-auto rounded-md border border-white/10 bg-white/5">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  className="w-full p-2 text-left text-sm text-gray-300 transition-colors hover:bg-white/10"
                  onClick={() => {
                    updateFormData({ address: suggestion.formatted });
                    setCoordinates({
                      lat: suggestion.lat,
                      lng: suggestion.lng,
                    });
                    setSuggestions([]);
                  }}
                >
                  {suggestion.formatted}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city" className="text-gray-300">
              City
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                id="city"
                placeholder="New York"
                value={formData.city}
                onChange={(e) => updateFormData({ city: e.target.value })}
                className="border-white/10 bg-white/5 pl-10 transition-colors focus:border-blue-500"
              />
            </div>
            {errors.city && (
              <p className="mt-1 text-xs text-red-400">{errors.city}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="state" className="text-gray-300">
              State
            </Label>
            <Select
              value={formData.state}
              onValueChange={(value) => updateFormData({ state: value })}
            >
              <SelectTrigger
                id="state"
                className="border-white/10 bg-white/5 transition-colors focus:border-blue-500"
              >
                <SelectValue placeholder="State" />
              </SelectTrigger>
              <SelectContent>
                {states.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.state && (
              <p className="mt-1 text-xs text-red-400">{errors.state}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="zipCode" className="text-gray-300">
            ZIP Code
          </Label>
          <div className="relative">
            <Building2 className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              id="zipCode"
              placeholder="10001"
              value={formData.zipCode}
              onChange={(e) => updateFormData({ zipCode: e.target.value })}
              className="border-white/10 bg-white/5 pl-10 transition-colors focus:border-blue-500"
            />
          </div>
          {errors.zipCode && (
            <p className="mt-1 text-xs text-red-400">{errors.zipCode}</p>
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
          onClick={validateAndSubmit}
          className="flex-1 bg-blue-500 text-white transition-colors hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Processing..." : "Complete Payment"}
        </Button>
      </CardFooter>
    </Card>
  );
}
