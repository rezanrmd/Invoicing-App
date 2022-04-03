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
  private invoices: Invoice[];

  constructor(private http: HttpClient) { }

  getinvoices(): Observable<Invoice[]> {
    if (this.invoices) {
      return of(this.invoices);
    }
    return this.http.get<Invoice[]>(this.invoicesUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        tap(data => this.invoices = data),
        catchError(this.handleError)
      );
  }

  createinvoice(invoice: Invoice): Observable<Invoice> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // invoice Id must be null for the Web API to assign an Id
    const newinvoice = { ...invoice, id: null };
    return this.http.post<Invoice>(this.invoicesUrl, newinvoice, { headers })
      .pipe(
        tap(data => console.log('createinvoice: ' + JSON.stringify(data))),
        tap(data => {
          this.invoices.push(data);
        }),
        catchError(this.handleError)
      );
  }

  deleteinvoice(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.invoicesUrl}/${id}`;
    return this.http.delete<Invoice>(url, { headers })
      .pipe(
        tap(data => console.log('deleteinvoice: ' + id)),
        tap(data => {
          const foundIndex = this.invoices.findIndex(item => item.id === id);
          if (foundIndex > -1) {
            this.invoices.splice(foundIndex, 1);
          }
        }),
        catchError(this.handleError)
      );
  }

  updateinvoice(invoice: Invoice): Observable<Invoice> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.invoicesUrl}/${invoice.id}`;
    return this.http.put<Invoice>(url, invoice, { headers })
      .pipe(
        tap(() => console.log('updateinvoice: ' + invoice.id)),
        // Update the item in the list
        // This is required because the selected invoice that was edited
        // was a copy of the item from the array.
        tap(() => {
          const foundIndex = this.invoices.findIndex(item => item.id === invoice.id);
          if (foundIndex > -1) {
            this.invoices[foundIndex] = invoice;
          }
        }),
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
