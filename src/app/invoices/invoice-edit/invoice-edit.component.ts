import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Invoice } from '../invoice';
import { InvoiceService } from '../invoice.service';
import { GenericValidator } from '../../shared/generic-validator';
import { NumberValidators } from '../../shared/number.validator';

/* NgRx */
import { Store } from '@ngrx/store';
import { State, getCurrentInvoice } from '../state/invoice.reducer';
import * as invoiceActions from '../state/invoice.actions';

@Component({
  selector: 'im-invoice-edit',
  templateUrl: './invoice-edit.component.html'
})
export class InvoiceEditComponent implements OnInit {
  pageTitle = 'Invoice Edit';
  errorMessage = '';
  invoiceForm: FormGroup;

  invoice: Invoice | null;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(private store: Store<State>, private fb: FormBuilder, private invoiceService: InvoiceService) {

    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      invoiceName: {
        required: 'invoice name is required.',
        minlength: 'invoice name must be at least three characters.',
        maxlength: 'invoice name cannot exceed 50 characters.'
      },
      invoiceCode: {
        required: 'invoice code is required.'
      },
      starRating: {
        range: 'Rate the invoice between 1 (lowest) and 5 (highest).'
      }
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    // Define the form group
    this.invoiceForm = this.fb.group({
      invoiceName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      invoiceCode: ['', Validators.required],
      starRating: ['', NumberValidators.range(1, 5)],
      description: ''
    });

    // Watch for changes to the currently selected invoice
    // TODO: Unsubscribe
    this.store.select(getCurrentInvoice).subscribe(
      currentInvoice => this.displayInvoice(currentInvoice)
    );

    // Watch for value changes for validation
    this.invoiceForm.valueChanges.subscribe(
      () => this.displayMessage = this.genericValidator.processMessages(this.invoiceForm)
    );
  }

  // Also validate on blur
  // Helpful if the user tabs through required fields
  blur(): void {
    this.displayMessage = this.genericValidator.processMessages(this.invoiceForm);
  }

  displayInvoice(invoice: Invoice | null): void {
    // Set the local invoice property
    this.invoice = invoice;

    if (invoice) {
      // Reset the form back to pristine
      this.invoiceForm.reset();

      // Display the appropriate page title
      if (invoice.id === 0) {
        this.pageTitle = 'Add Invoice';
      } else {
        this.pageTitle = `Edit Invoice: ${invoice.invoiceName}`;
      }

      // Update the data on the form
      this.invoiceForm.patchValue({
        invoiceName: invoice.invoiceName,
        invoiceCode: invoice.invoiceCode,
        starRating: invoice.starRating,
        description: invoice.description
      });
    }
  }

  cancelEdit(invoice: Invoice): void {
    // Redisplay the currently selected invoice
    // replacing any edits made
    this.displayInvoice(invoice);
  }

  deleteInvoice(invoice: Invoice): void {
    if (invoice && invoice.id) {
      if (confirm(`Really delete the invoice: ${invoice.invoiceName}?`)) {
        this.invoiceService.deleteInvoice(invoice.id).subscribe({
          next: () => this.store.dispatch(invoiceActions.clearCurrentInvoice()),
          error: err => this.errorMessage = err
        });
      }
    } else {
      // No need to delete, it was never saved
      this.store.dispatch(invoiceActions.clearCurrentInvoice());
    }
  }

  saveInvoice(originalInvoice: Invoice): void {
    if (this.invoiceForm.valid) {
      if (this.invoiceForm.dirty) {
        // Copy over all of the original invoice properties
        // Then copy over the values from the form
        // This ensures values not on the form, such as the Id, are retained
        const invoice = { ...originalInvoice, ...this.invoiceForm.value };

        if (invoice.id === 0) {
          this.invoiceService.createInvoice(invoice).subscribe({
            next: p => this.store.dispatch(invoiceActions.setCurrentInvoice({ invoice: p })),
            error: err => this.errorMessage = err
          });
        } else {
          this.invoiceService.updateInvoice(invoice).subscribe({
            next: p => this.store.dispatch(invoiceActions.setCurrentInvoice({ invoice: p })),
            error: err => this.errorMessage = err
          });
        }
      }
    }
  }

}
