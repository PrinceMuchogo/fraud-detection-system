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
import { 
  Filter, 
  ChevronDown, 
  AlertTriangle, 
  ShieldCheck, 
  Search, 
  CreditCard,
  Clock,
  MapPin,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

interface TransactionsTableProps {
  transactions: Transaction[];
}

export function TransactionsTable({ transactions }: TransactionsTableProps) {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "fraud" | "legitimate">("all");
  const [page, setPage] = useState(1);
  const pageSize = 10;

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
  
  const totalPages = Math.ceil(filteredTransactions.length / pageSize);
  const paginatedTransactions = filteredTransactions.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <div className="rounded-xl overflow-hidden">
      <div className="p-4 border-b border-border bg-secondary/20">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-secondary/50 border-border w-full"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-border bg-secondary/50 whitespace-nowrap">
                <Filter className="mr-2 h-4 w-4" />
                {filterStatus === "all" ? "All" : filterStatus === "fraud" ? "Fraudulent" : "Legitimate"}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-popover border-border">
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

      <div>
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-secondary/5">
              <TableHead className="font-medium">Transaction</TableHead>
              <TableHead className="font-medium">Amount</TableHead>
              <TableHead className="font-medium">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedTransactions.length > 0 ? (
              paginatedTransactions.map((transaction) => (
                <TableRow 
                  key={transaction.id} 
                  className="border-border hover:bg-secondary/10 transition-colors"
                >
                  <TableCell>
                    <div className="flex items-start gap-3">
                      <div className={`p-2.5 rounded-xl ${transaction.is_fraud ? 'bg-destructive/10' : 'bg-success/10'} mt-0.5`}>
                        <CreditCard className={`h-5 w-5 ${transaction.is_fraud ? 'text-destructive' : 'text-success'}`} />
                      </div>
                      <div className="space-y-1">
                        <div className="font-medium">{transaction.merchant}</div>
                        <div className="text-sm text-muted-foreground">{transaction.category}</div>
                        <div className="text-xs flex items-center text-muted-foreground/70 gap-1 mt-1">
                          <Clock className="h-3 w-3" />
                          {new Date(transaction.trans_date_trans_time).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">${transaction.amt.toLocaleString()}</div>
                    <div className="text-sm flex items-center text-muted-foreground gap-1 mt-1">
                      <MapPin className="h-3 w-3" />
                      {`${transaction.city}, ${transaction.state}`}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {transaction.is_fraud ? (
                        <Badge variant="destructive" className="px-3 py-1.5 rounded-md bg-destructive/10 text-destructive border-none">
                          <AlertTriangle className="h-3.5 w-3.5 mr-1" />
                          Fraudulent
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="px-3 py-1.5 rounded-md bg-success/10 text-success border-none">
                          <ShieldCheck className="h-3.5 w-3.5 mr-1" />
                          Legitimate
                        </Badge>
                      )}
                    </div>
                    {transaction.reason && (
                      <div className="text-xs text-muted-foreground mt-2 bg-secondary/30 px-3 py-1.5 rounded-md">
                        {transaction.reason}
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-6 text-muted-foreground">
                  No transactions found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {totalPages > 1 && (
        <div className="border-t border-border p-4 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {Math.min((page - 1) * pageSize + 1, filteredTransactions.length)} to {Math.min(page * pageSize, filteredTransactions.length)} of {filteredTransactions.length} transactions
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="h-8 w-8 border-border"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="text-sm text-muted-foreground">
              Page {page} of {totalPages}
            </div>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="h-8 w-8 border-border"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}