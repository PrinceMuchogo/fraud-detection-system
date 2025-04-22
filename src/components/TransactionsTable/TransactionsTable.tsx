"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Transaction } from "@/types/transaction";
import { Badge } from "@/components/ui/badge";
import { Filter, ChevronDown, AlertTriangle, ShieldCheck } from "lucide-react";

interface TransactionsTableProps {
  transactions: Transaction[];
}

export function TransactionsTable({ transactions }: TransactionsTableProps) {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "fraud" | "legitimate">("all");

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.merchant.toLowerCase().includes(search.toLowerCase()) ||
      transaction.category.toLowerCase().includes(search.toLowerCase()) ||
      transaction.city.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "fraud" && transaction.is_fraud) ||
      (filterStatus === "legitimate" && !transaction.is_fraud);

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl">
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Input
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-white/5 border-white/10"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-white/10 bg-white/5">
                <Filter className="mr-2 h-4 w-4" />
                Filter
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-gray-900/95 backdrop-blur-xl border-white/10">
              <DropdownMenuItem onClick={() => setFilterStatus("all")}>
                All Transactions
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus("fraud")}>
                Fraudulent Only
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus("legitimate")}>
                Legitimate Only
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="overflow-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-white/5">
              <TableHead>Transaction Details</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.map((transaction) => (
              <TableRow key={transaction.id} className="border-white/10 hover:bg-white/5">
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-medium">{transaction.merchant}</div>
                    <div className="text-sm text-gray-400">{transaction.category}</div>
                    <div className="text-xs text-gray-500">
                      {new Date(transaction.trans_date_trans_time).toLocaleString()}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">${transaction.amt.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">{`${transaction.city}, ${transaction.state}`}</div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {transaction.is_fraud ? (
                      <>
                        <AlertTriangle className="h-4 w-4 text-red-400" />
                        <Badge variant="destructive" className="bg-red-500/10 text-red-400 hover:bg-red-500/20">
                          Fraudulent
                        </Badge>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="h-4 w-4 text-green-400" />
                        <Badge variant="success" className="bg-green-500/10 text-green-400 hover:bg-green-500/20">
                          Legitimate
                        </Badge>
                      </>
                    )}
                  </div>
                  {transaction.reason && (
                    <div className="text-xs text-gray-400 mt-1">{transaction.reason}</div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}