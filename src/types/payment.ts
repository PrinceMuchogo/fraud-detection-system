export interface PaymentFormData {
    // Card Details
    cc_num: string;
    expiry: string;
    cvv: string;
    cardholderName: string;
    // Payment Details
    amt: string;
    category: string;
    reason: string;
    // Recipient Details
    recipientName: string;
    recipientEmail: string;
    recipientPhone: string;
    // Location
    city: string;
    state: string;
    address: string;
    zipCode: string;
  }