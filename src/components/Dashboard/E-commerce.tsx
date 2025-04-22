"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { StatsCards } from "../StatsCard/statsCard";
import { TransactionsTable } from "../TransactionsTable/TransactionsTable";
import { FraudMap } from "../FraudMap/FraudMap";
import { Transaction } from "@/types/transaction";
import { Shield, LogOut, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

// Temporary mock data - replace with your API call
// const mockTransactions: Transaction[] = [
//   {
//     id: 1,
//     trans_date_trans_time: "2024-03-20T10:30:00",
//     cc_num: "4532XXXXXXXX1234",
//     merchant: "Amazon",
//     category: "Online Shopping",
//     amt: 299.99,
//     city: "Seattle",
//     state: "WA",
//     unix_time: 1710931800,
//     merch_lat: 47.6062,
//     merch_long: -122.3321,
//     reason: "Unusual spending pattern",
//     is_fraud: true,
//   },
//   // Add more mock transactions as needed
// ];

export default function Home() {
  const [transactions, setTransactions] =
    useState<Transaction[]>([]);

  // Replace with your actual API call
  useEffect(() => {
    // Fetch transactions from your API
    const fetchTransactions = async () => {
      const response = await fetch("/api/transactions");
      const data = await response.json();
      console.log("data: ", data);
      setTransactions(data.transactions);
    };
    fetchTransactions();
  }, []);

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-900 via-slate-900 to-black text-white">
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

      <div className="relative">
        {/* Header Section */}
        <header className="border-b border-white/10 bg-black/20 backdrop-blur-xl">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="rounded-2xl bg-blue-500/20 p-3 backdrop-blur-xl">
                  <Shield className="h-8 w-8 text-blue-400" />
                </div>
                <div>
                  <h1 className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-4xl font-bold text-transparent">
                    Fraud Detection Hub
                  </h1>
                  <p className="mt-1 text-gray-400">
                    Real-time transaction monitoring & analysis
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Link href="/payment">
                  <Button
                    variant="outline"
                    className="border-white/10 bg-white/5"
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Make Payment
                  </Button>
                </Link>
                <Link href="/auth/login">
                  <Button
                    variant="outline"
                    className="border-white/10 bg-white/5"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          {/* Stats Section */}
          <section className="mb-8">
            <StatsCards transactions={transactions} />
          </section>

          {/* Main Content */}
          <div className="space-y-6">
            {/* Map Section */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-2xl font-semibold text-transparent">
                  Transaction Geography
                </h2>
                <div className="rounded-full bg-blue-500/10 px-4 py-1 text-sm text-blue-400">
                  Live Updates
                </div>
              </div>
              <div className="h-[500px] overflow-hidden rounded-2xl">
                <FraudMap transactions={transactions} />
              </div>
            </section>

            {/* Transactions Section */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-2xl font-semibold text-transparent">
                  Recent Activity
                </h2>
                <div className="rounded-full bg-blue-500/10 px-4 py-1 text-sm text-blue-400">
                  Real-time
                </div>
              </div>
              <TransactionsTable transactions={transactions} />
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
