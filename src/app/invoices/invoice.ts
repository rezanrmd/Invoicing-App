/* Defines the invoice entity */
export interface Invoice {
    id: number | null;
    invoiceName: string;
    invoiceCode: string;
    description: string;
    starRating: number;
}
