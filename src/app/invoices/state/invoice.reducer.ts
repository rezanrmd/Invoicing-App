import { Invoice } from '../Invoice';

/* NgRx */
import { createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import * as InvoiceActions from './invoice.actions';
import * as AppState from '../../state/app.state';

// Extends the app state to include the invoice feature.
// This is required because invoices are lazy loaded.
// So the reference to invoiceState cannot be added to app.state.ts directly.
export interface State extends AppState.State {
  invoices: InvoiceState;
}

// State for this feature (invoice)
export interface InvoiceState {
  showInvoiceCode: boolean;
  currentInvoice: Invoice;
  invoices: Invoice[];
}

const initialState: InvoiceState = {
  showInvoiceCode: true,
  currentInvoice: null,
  invoices: []
};

// Selector functions
const getInvoiceFeatureState = createFeatureSelector<InvoiceState>('invoices');

export const getShowInvoiceCode = createSelector(
  getInvoiceFeatureState,
  state => state.showInvoiceCode
);

export const getCurrentInvoice = createSelector(
  getInvoiceFeatureState,
  state => state.currentInvoice
);

export const getInvoices = createSelector(
  getInvoiceFeatureState,
  state => state.invoices
);

export const invoiceReducer = createReducer<InvoiceState>(
  initialState,
  on(InvoiceActions.toggleInvoiceCode, (state): InvoiceState => {
    return {
      ...state,
      showInvoiceCode: !state.showInvoiceCode
    };
  }),
  on(InvoiceActions.setCurrentInvoice, (state, action): InvoiceState => {
    return {
      ...state,
      currentInvoice: action.invoice
    };
  }),
  on(InvoiceActions.clearCurrentInvoice, (state): InvoiceState => {
    return {
      ...state,
      currentInvoice: null
    };
  }),
  on(InvoiceActions.initializeCurrentInvoice, (state): InvoiceState => {
    return {
      ...state,
      currentInvoice: {
        id: 0,
        invoiceName: '',
        invoiceCode: 'New',
        description: '',
        starRating: 0
      }
    };
  }),
  on(InvoiceActions.loadInvoicesSuccess, (state, action): InvoiceState => {
    return {
      ...state,
      invoices: action.invoices
    }
  })
);
