import { Injectable } from "@angular/core";
import * as InvoiceActions from "./invoice.actions"
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { InvoiceService } from "../invoice.service";
import { map, mergeMap } from "rxjs/operators";

@Injectable()
export class InvoiceEffects {
    constructor(private actions$: Actions , private invoiceService: InvoiceService){ }

    private _loadInvoices$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(InvoiceActions.loadInvoices),
            mergeMap(() => this.invoiceService.getInvoices().pipe(
                map(invoices => InvoiceActions.loadInvoicesSuccess({ invoices }))
            ))
        );
    });
    public get loadInvoices$() {
        return this._loadInvoices$;
    }
    public set loadInvoices$(value) {
        this._loadInvoices$ = value;
    }
}