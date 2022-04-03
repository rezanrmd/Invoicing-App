import { Component, OnInit } from '@angular/core';

import { Invoice } from '../invoice';
import { InvoiceService } from '../invoice.service';

/* NgRx */
import { Store } from '@ngrx/store';
import { State, getShowinvoiceCode, getCurrentinvoice } from '../state/invoice.reducer';
import * as invoiceActions from '../state/invoice.actions';

@Component({
  selector: 'pm-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {
  pageTitle = 'invoices';
  errorMessage: string;

  displayCode: boolean;

  invoices: Invoice[];

  // Used to highlight the selected invoice in the list
  selectedinvoice: Invoice | null;

  constructor(private store: Store<State>, private invoiceService: InvoiceService) { }

  ngOnInit(): void {
    // TODO: Unsubscribe
    this.store.select(getCurrentinvoice).subscribe(
      currentinvoice => this.selectedinvoice = currentinvoice
    );

    this.invoiceService.getinvoices().subscribe({
      next: (invoices: Invoice[]) => this.invoices = invoices,
      error: err => this.errorMessage = err
    });

    // TODO: Unsubscribe
    this.store.select(getShowinvoiceCode).subscribe(
      showinvoiceCode => this.displayCode = showinvoiceCode
    );
  }

  checkChanged(): void {
    this.store.dispatch(invoiceActions.toggleinvoiceCode());
  }

  newinvoice(): void {
    this.store.dispatch(invoiceActions.initializeCurrentinvoice());
  }

  invoiceSelected(invoice: Invoice): void {
    this.store.dispatch(invoiceActions.setCurrentinvoice({ invoice }));
  }

}
