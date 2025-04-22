"use client";

import { Card } from "@/components/ui/card";
import { DollarSign, AlertTriangle, ShieldCheck, TrendingUp } from "lucide-react";
import { Transaction } from "@/types/transaction";

interface StatsCardsProps {
  transactions: Transaction[];
}

export function StatsCards({ transactions }: StatsCardsProps) {
  console.log("transactions: ", transactions)
  const totalTransactions = transactions.length;
  const fraudulentTransactions = transactions?.filter(t => t.is_fraud).length ?? 0;
  const totalAmount = transactions.reduce((sum, t) => sum + t.amt, 0);
  const fraudAmount = transactions.filter(t => t.is_fraud).reduce((sum, t) => sum + t.amt, 0);
  const fraudPercentage = ((fraudulentTransactions / totalTransactions) * 100).toFixed(1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="relative overflow-hidden backdrop-blur-xl bg-white/5 border-white/10 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent" />
        <div className="relative p-6">
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-2xl bg-blue-500/20">
              <DollarSign className="h-6 w-6 text-blue-400" />
            </div>
            <TrendingUp className="h-5 w-5 text-blue-400" />
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-400">Total Volume</p>
            <h3 className="text-2xl font-bold mt-1">${totalAmount.toLocaleString()}</h3>
          </div>
        </div>
      </Card>
      
      <Card className="relative overflow-hidden backdrop-blur-xl bg-white/5 border-white/10 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-transparent" />
        <div className="relative p-6">
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-2xl bg-red-500/20">
              <AlertTriangle className="h-6 w-6 text-red-400" />
            </div>
            <div className="px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-sm">
              {fraudPercentage}%
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-400">Fraud Amount</p>
            <h3 className="text-2xl font-bold mt-1">${fraudAmount.toLocaleString()}</h3>
          </div>
        </div>
      </Card>

      <Card className="relative overflow-hidden backdrop-blur-xl bg-white/5 border-white/10 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-transparent" />
        <div className="relative p-6">
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-2xl bg-green-500/20">
              <ShieldCheck className="h-6 w-6 text-green-400" />
            </div>
            <div className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-sm">
              Protected
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-400">Total Transactions</p>
            <h3 className="text-2xl font-bold mt-1">{totalTransactions.toLocaleString()}</h3>
          </div>
        </div>
      </Card>

      <Card className="relative overflow-hidden backdrop-blur-xl bg-white/5 border-white/10 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-transparent" />
        <div className="relative p-6">
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-2xl bg-yellow-500/20">
              <AlertTriangle className="h-6 w-6 text-yellow-400" />
            </div>
            <div className="px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 text-sm">
              Alert
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-400">Fraud Cases</p>
            <h3 className="text-2xl font-bold mt-1">{fraudulentTransactions.toLocaleString()}</h3>
          </div>
        </div>
      </Card>
    </div>
  );
}