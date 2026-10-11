import {Component, inject} from '@angular/core';
import {DocumentsStore} from '../../../../store/documents.store';

@Component({
  selector: 'app-upload-document',
  imports: [],
  templateUrl: './upload-document.html',
  styleUrl: './upload-document.scss'
})
export class UploadDocument {
    protected readonly store = inject(DocumentsStore);

    protected uploadFile(event: Event) {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];
        if (file) {
            this.store.upload(file);
            input.value = '';
        }
    }

    protected preventOpeningFilesWhileUploading(event: Event): void {
        if (this.store.isUploading()) {
            event.preventDefault();
        }
    }
}
