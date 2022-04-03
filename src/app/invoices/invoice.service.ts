import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Invoice } from './invoice';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private invoicesUrl = 'api/invoices';

  constructor(private http: HttpClient) { }

  getInvoices(): Observable<Invoice[]> {

    return this.http.get<Invoice[]>(this.invoicesUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  createInvoice(invoice: Invoice): Observable<Invoice> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // invoice Id must be null for the Web API to assign an Id
    const newInvoice = { ...invoice, id: null };
    return this.http.post<Invoice>(this.invoicesUrl, newInvoice, { headers })
      .pipe(
        tap(data => console.log('createInvoice: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deleteInvoice(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.invoicesUrl}/${id}`;
    return this.http.delete<Invoice>(url, { headers })
      .pipe(
        tap(data => console.log('deleteInvoice: ' + id)),
        catchError(this.handleError)
      );
  }

  updateInvoice(invoice: Invoice): Observable<Invoice> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.invoicesUrl}/${invoice.id}`;
    return this.http.put<Invoice>(url, invoice, { headers })
      .pipe(
        tap(() => console.log('updateInvoice: ' + invoice.id)),
        // Return the invoice on an update
        map(() => invoice),
        catchError(this.handleError)
      );
  }

  private handleError(err: any) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

}
