"use client";

import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Transaction } from "@/types/transaction";

interface FraudMapProps {
  transactions: Transaction[];
}

declare global {
  interface Window {
    google: any;
  }
}

export function FraudMap({ transactions }: FraudMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window.google === "undefined") {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.head.appendChild(script);
    } else {
      initMap();
    }
  }, [transactions]);

  const initMap = () => {
    if (!mapRef.current) return;

    const map = new window.google.maps.Map(mapRef.current, {
      zoom: 4,
      center: { lat: 39.8283, lng: -98.5795 },
      styles: [
        {
          featureType: "all",
          elementType: "geometry",
          stylers: [{ color: "#242f3e" }]
        },
        {
          featureType: "all",
          elementType: "labels.text.stroke",
          stylers: [{ color: "#242f3e" }]
        },
        {
          featureType: "all",
          elementType: "labels.text.fill",
          stylers: [{ color: "#746855" }]
        }
      ]
    });

    transactions.forEach((transaction) => {
      new window.google.maps.Marker({
        position: { lat: transaction.merch_lat, lng: transaction.merch_long },
        map,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: transaction.is_fraud ? "#ef4444" : "#22c55e",
          fillOpacity: 0.7,
          strokeWeight: 0
        }
      });
    });
  };

  return (
    <Card className="backdrop-blur-lg bg-white/10 border-none shadow-xl">
      <div ref={mapRef} style={{ width: "100%", height: "400px" }} />
    </Card>
  );
}