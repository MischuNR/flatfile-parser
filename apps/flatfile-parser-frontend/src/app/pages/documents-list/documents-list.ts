import {Component, inject} from '@angular/core';
import {DocumentsStore} from '../../store/documents.store';
import {ReactiveFormsModule} from '@angular/forms';
import {UploadDocument} from './components/upload-document/upload-document';
import {DocumentListFilter} from './components/document-list-filter/document-list-filter';
import {RouterLink} from '@angular/router';
import {NgClass} from '@angular/common';

@Component({
    selector: 'app-documents-list',
    imports: [
        ReactiveFormsModule,
        UploadDocument,
        DocumentListFilter,
        RouterLink,
        NgClass
    ],
    templateUrl: './documents-list.html',
    styleUrl: './documents-list.scss'
})
export class DocumentsList {
    protected readonly store = inject(DocumentsStore);
}