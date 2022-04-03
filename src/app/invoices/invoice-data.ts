import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Invoice } from './Invoice';

export class InvoiceData implements InMemoryDbService {

    createDb() {
        const invoices: Invoice[] = [
            {
                id: 1,
                invoiceName: 'Leaf Rake',
                invoiceCode: 'GDN-0011',
                description: 'Leaf rake with 48-inch wooden handle',
                starRating: 3.2
            },
            {
                id: 2,
                invoiceName: 'Garden Cart',
                invoiceCode: 'GDN-0023',
                description: '15 gallon capacity rolling garden cart',
                starRating: 4.2
            },
            {
                id: 5,
                invoiceName: 'Hammer',
                invoiceCode: 'TBX-0048',
                description: 'Curved claw steel hammer',
                starRating: 4.8
            },
            {
                id: 8,
                invoiceName: 'Saw',
                invoiceCode: 'TBX-0022',
                description: '15-inch steel blade hand saw',
                starRating: 3.7
            },
            {
                id: 10,
                invoiceName: 'Video Game Controller',
                invoiceCode: 'GMG-0042',
                description: 'Standard two-button video game controller',
                starRating: 4.6
            }
        ];
        return { invoices };
    }
}
