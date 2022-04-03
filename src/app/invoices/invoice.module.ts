import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { InvoiceShellComponent } from './invoice-shell/invoice-shell.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceEditComponent } from './invoice-edit/invoice-edit.component';

/* NgRx */
import { StoreModule } from '@ngrx/store';
import { invoiceReducer } from './state/invoice.reducer';

const invoiceRoutes: Routes = [
  { path: '', component: InvoiceShellComponent }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(invoiceRoutes),
    StoreModule.forFeature('invoices', invoiceReducer)
  ],
  declarations: [
    InvoiceShellComponent,
    InvoiceListComponent,
    InvoiceEditComponent
  ]
})
export class InvoiceModule { }
