"use client";

import { Card } from "@/components/ui/card";
import { DollarSign, AlertTriangle, ShieldCheck, TrendingUp, CreditCard } from "lucide-react";
import { Transaction } from "@/types/transaction";
import { LineChart, Line, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

interface StatsCardsProps {
  transactions: Transaction[];
}

export function StatsCards({ transactions }: StatsCardsProps) {
  const totalTransactions = transactions.length;
  const fraudulentTransactions = transactions?.filter(t => t.is_fraud).length ?? 0;
  const totalAmount = transactions.reduce((sum, t) => sum + t.amt, 0);
  const fraudAmount = transactions.filter(t => t.is_fraud).reduce((sum, t) => sum + t.amt, 0);
  const fraudPercentage = totalTransactions > 0 
    ? ((fraudulentTransactions / totalTransactions) * 100).toFixed(1) 
    : "0.0";
  
  // Generate mock data for the small charts
  const generateChartData = (isRising: boolean) => {
    return Array.from({ length: 10 }, (_, i) => ({
      name: i.toString(),
      value: isRising 
        ? 100 + Math.random() * 20 * i 
        : 300 - Math.random() * 10 * i
    }));
  };

  const volumeData = generateChartData(true);
  const fraudData = generateChartData(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="glass-card">
        <div className="glass-card-gradient from-primary/20 to-transparent" />
        <div className="relative p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="p-3 rounded-xl bg-primary/10 ring-1 ring-white/10">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Volume</p>
            <h3 className="text-2xl font-bold mt-1">${totalAmount.toLocaleString()}</h3>
          </div>
          <div className="h-12 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={volumeData}>
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>
      
      <Card className="glass-card">
        <div className="glass-card-gradient from-destructive/20 to-transparent" />
        <div className="relative p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="p-3 rounded-xl bg-destructive/10 ring-1 ring-white/10">
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </div>
            <div className="px-3 py-1 rounded-full bg-destructive/10 text-destructive text-sm font-medium">
              {fraudPercentage}%
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Fraud Amount</p>
            <h3 className="text-2xl font-bold mt-1">${fraudAmount.toLocaleString()}</h3>
          </div>
          <div className="h-12 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={fraudData}>
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="hsl(var(--destructive))" 
                  strokeWidth={2} 
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>

      <Card className="glass-card">
        <div className="glass-card-gradient from-success/20 to-transparent" />
        <div className="relative p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="p-3 rounded-xl bg-success/10 ring-1 ring-white/10">
              <ShieldCheck className="h-6 w-6 text-success" />
            </div>
            <div className="px-3 py-1 rounded-full bg-success/10 text-success text-sm font-medium">
              Protected
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Transactions</p>
            <h3 className="text-2xl font-bold mt-1">{totalTransactions.toLocaleString()}</h3>
            <p className="text-sm text-muted-foreground mt-2 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-success" />
              <span>+5.2% from last week</span>
            </p>
          </div>
        </div>
      </Card>

      <Card className="glass-card">
        <div className="glass-card-gradient from-warning/20 to-transparent" />
        <div className="relative p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="p-3 rounded-xl bg-warning/10 ring-1 ring-white/10">
              <CreditCard className="h-6 w-6 text-warning" />
            </div>
            <div className="px-3 py-1 rounded-full bg-warning/10 text-warning text-sm font-medium">
              Alert
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Fraud Cases</p>
            <h3 className="text-2xl font-bold mt-1">{fraudulentTransactions.toLocaleString()}</h3>
            <div className="mt-2 w-full bg-muted rounded-full h-1.5">
              <div 
                className="bg-warning h-1.5 rounded-full" 
                style={{ width: `${fraudPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}