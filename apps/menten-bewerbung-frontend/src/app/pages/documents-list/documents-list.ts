import {Component, inject} from '@angular/core';
import {DocumentsStore} from '../../store/documents.store';
import {JsonPipe} from '@angular/common';
import {STATUS_FILTER} from '../../types/status-filter';
import {ReactiveFormsModule} from '@angular/forms';
import {getStatusLabel} from '../../utils/get-filter-state-label';

@Component({
    selector: 'app-documents-list',
    imports: [
        JsonPipe,
        ReactiveFormsModule
    ],
    templateUrl: './documents-list.html',
    styleUrl: './documents-list.scss'
})
export class DocumentsList {
    protected readonly store = inject(DocumentsStore);

    protected readonly statusFilterArr: readonly StatusFilterSelect[] = Object.values(STATUS_FILTER).map((s): StatusFilterSelect => ({
        value: s,
        label: getStatusLabel(s)
    }));

    protected uploadFile(event: Event) {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];
        if (file) {
            this.store.upload(file);
        }
    }

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
