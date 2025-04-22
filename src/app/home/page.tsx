import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: 'Fraud Detection Dashboard',
  description: 'Real-time fraud detection monitoring system',
};


export default function Home() {
  return (
    <>
        <ECommerce />
    </>
  );
}
