import { Component, OnInit } from '@angular/core';

import { Invoice } from '../Invoice';
import { InvoiceService } from '../invoice.service';

/* NgRx */
import { Store } from '@ngrx/store';
import { State, getShowInvoiceCode, getCurrentInvoice, getInvoices } from '../state/invoice.reducer';
import * as InvoiceActions from '../state/invoice.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'im-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {
  pageTitle = 'Invoices';
  errorMessage: string;

  displayCode: boolean;

  // Used to highlight the selected invoice in the list
  selectedInvoice: Invoice | null;
  invoices$: Observable<Invoice[]>;

  constructor(private store: Store<State>, private invoiceService: InvoiceService) { }

  ngOnInit(): void {
    // TODO: Unsubscribe
    this.store.select(getCurrentInvoice).subscribe(
      currentInvoice => this.selectedInvoice = currentInvoice
    );
      this.invoices$ = this.store.select(getInvoices);
      this.store.dispatch(InvoiceActions.loadInvoices());

    // TODO: Unsubscribe
    this.store.select(getShowInvoiceCode).subscribe(
      showInvoiceCode => this.displayCode = showInvoiceCode
    );
  }

  checkChanged(): void {
    this.store.dispatch(InvoiceActions.toggleInvoiceCode());
  }

  newInvoice(): void {
    this.store.dispatch(InvoiceActions.initializeCurrentInvoice());
  }

  invoiceSelected(invoice: Invoice): void {
    this.store.dispatch(InvoiceActions.setCurrentInvoice({ invoice }));
  }

}
