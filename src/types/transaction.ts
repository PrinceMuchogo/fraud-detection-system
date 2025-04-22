export interface Transaction {
    id: number;
    trans_date_trans_time: string;
    cc_num: string;
    merchant: string;
    category: string;
    amt: number;
    city: string;
    state: string;
    unix_time: number;
    merch_lat: number;
    merch_long: number;
    reason: string;
    is_fraud: boolean;
  }