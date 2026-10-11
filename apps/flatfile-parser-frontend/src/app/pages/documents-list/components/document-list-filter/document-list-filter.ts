import {Component, inject} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {STATUS_FILTER} from '../../../../types/status-filter';
import {getStatusLabel} from '../../../../utils/get-filter-state-label';
import {DocumentsStore} from '../../../../store/documents.store';

@Component({
    selector: 'app-document-list-filter',
    imports: [
        ReactiveFormsModule
    ],
    templateUrl: './document-list-filter.html',
    styleUrl: './document-list-filter.scss',
    host: {
        role: 'search',
        'aria-label': 'Belege filtern'
    }
})
export class DocumentListFilter {
    protected readonly store = inject(DocumentsStore);

    protected readonly statusFilterArr: readonly StatusFilterSelect[] = Object.values(STATUS_FILTER).map((s): StatusFilterSelect => ({
        value: s,
        label: getStatusLabel(s)
    }));

    protected changeFilter(event: Event) {
        this.store.setDocumentNumberFilter((event.target as HTMLInputElement).value);
    }

    protected changeStatusFilter(event: Event) {
        const value = (event.target as HTMLInputElement).value as STATUS_FILTER;
        this.store.setStatusFilter(value);
    }

    protected changeRecipientFilter(event: Event): void {
        this.store.setRecipientFilter((event.target as HTMLInputElement).value);
    }
}

type StatusFilterSelect = {
    value: STATUS_FILTER;
    label: string;
};

