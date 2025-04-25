"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { StatsCards } from "@/components/StatsCard/statsCard";
import { TransactionsTable } from "@/components/TransactionsTable/TransactionsTable";
import { FraudMap } from "@/components/FraudMap/FraudMap";
import { Transaction } from "@/types/transaction";
import {
  Shield,
  LogOut,
  CreditCard,
  Bell,
  Search,
  User,
  BarChart4,
  Settings,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/transactions");
        const data = await response.json();
        setTransactions(data.transactions);
      } catch (error) {
        toast.error("Error fetching transactions");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();

    // Set up polling for real-time updates
    const intervalId = setInterval(fetchTransactions, 30000);
    return () => clearInterval(intervalId);
  }, [toast]);

  const handleSignOut = () => {
    router.push("/");
  };

  return (
    <div className="animate-fade-in min-h-screen">
      {/* Sidebar - Hidden on mobile */}
      {/* <div className="fixed inset-y-0 left-0 z-50 hidden w-64 bg-card border-r border-border lg:block">
        <div className="flex h-full flex-col">
          <div className="flex items-center gap-2 px-6 py-8">
            <div className="rounded-xl bg-primary/10 p-2">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-xl font-bold gradient-text from-primary to-accent">Sentinel</h1>
          </div>
          
          <nav className="space-y-1 px-3 py-4">
            <Button variant="ghost" className="w-full justify-start font-normal text-base h-12 px-4">
              <BarChart4 className="mr-3 h-5 w-5" />
              Dashboard
            </Button>
            <Button variant="ghost" className="w-full justify-start font-normal text-base h-12 px-4 text-muted-foreground">
              <CreditCard className="mr-3 h-5 w-5" />
              Transactions
            </Button>
            <Button variant="ghost" className="w-full justify-start font-normal text-base h-12 px-4 text-muted-foreground">
              <Bell className="mr-3 h-5 w-5" />
              Alerts
            </Button>
            <Button variant="ghost" className="w-full justify-start font-normal text-base h-12 px-4 text-muted-foreground">
              <Settings className="mr-3 h-5 w-5" />
              Settings
            </Button>
          </nav>
          
          <div className="mt-auto p-4">
            <Link href="/auth/login">
              <Button variant="outline" className="w-full justify-start">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </Link>
          </div>
        </div>
      </div> */}

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="bg-background/95 animate-fade-in fixed inset-0 z-50 backdrop-blur-sm lg:hidden">
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-2">
                <div className="rounded-xl bg-primary/10 p-2">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h1 className="gradient-text to-accent from-primary text-xl font-bold">
                  Sentinel
                </h1>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMenuOpen(false)}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            <div className="mt-auto p-4">
              <Link href="/auth/login">
                <Button variant="outline" className="w-full justify-start">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="">
        {/* Header */}
        <header className="border-border bg-card/80 sticky top-0 z-40 border-b backdrop-blur-xl">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6">
            <div className="flex items-center gap-2 lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMenuOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </Button>
              <div className="flex items-center gap-2 lg:hidden">
                <div className="rounded-xl bg-primary/10 p-1.5">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <span className="font-bold">Sentinel</span>
              </div>
            </div>

            <div className="hidden max-w-md flex-1 md:block"></div>

            {/* <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="text-muted-foreground">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="bg-secondary/50 rounded-full h-9 w-9 text-primary">
                <User className="h-5 w-5" />
              </Button>
            </div> */}
            <div className="flex items-center gap-3">
              <Button
                onClick={handleSignOut}
                variant="outline"
                className="w-full justify-start"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="mb-1 text-2xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Monitor and analyze transaction activity
            </p>
          </div>

          {/* Stats Cards */}
          <section className="mb-8">
            <StatsCards transactions={transactions} />
          </section>

          {/* Tabs for Map and Transactions */}
          <Tabs defaultValue="transactions" className="space-y-6">
            <TabsList className="bg-card border-border h-12 w-full justify-start border p-1">
              {/* <TabsTrigger value="map" className="text-base px-4 data-[state=active]:bg-secondary/60">
                Geographic View
              </TabsTrigger> */}
              <TabsTrigger
                value="transactions"
                className="data-[state=active]:bg-secondary/60 px-4 text-base"
              >
                Transactions
              </TabsTrigger>
            </TabsList>

            <TabsContent value="map" className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <h2 className="gradient-text to-accent from-primary text-xl font-semibold">
                  Transaction Geography
                </h2>
                <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
                  </span>
                  Live Updates
                </div>
              </div>

              <Card className="glass-card">
                <div className="glass-card-gradient from-primary/10 to-transparent" />
                <div className="relative h-[500px] overflow-hidden rounded-xl">
                  {isLoading ? (
                    <div className="bg-card/80 absolute inset-0 flex items-center justify-center">
                      <div className="flex flex-col items-center">
                        <svg
                          className="mb-4 h-10 w-10 animate-spin text-primary"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        <p className="text-muted-foreground">
                          Loading map data...
                        </p>
                      </div>
                    </div>
                  ) : (
                    <FraudMap transactions={transactions} />
                  )}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="transactions" className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <h2 className="gradient-text to-accent from-primary text-xl font-semibold">
                  Recent Activity
                </h2>
                <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
                  </span>
                  Real-time
                </div>
              </div>

              <Card className="glass-card">
                <div className="glass-card-gradient from-primary/10 to-transparent" />
                <div className="relative">
                  {isLoading ? (
                    <div className="bg-card/80 absolute inset-0 flex min-h-[400px] items-center justify-center">
                      <div className="flex flex-col items-center">
                        <svg
                          className="mb-4 h-10 w-10 animate-spin text-primary"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        <p className="text-muted-foreground">
                          Loading transactions...
                        </p>
                      </div>
                    </div>
                  ) : (
                    <TransactionsTable transactions={transactions} />
                  )}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
