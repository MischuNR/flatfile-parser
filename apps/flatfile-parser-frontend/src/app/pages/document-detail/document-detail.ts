import {Component, computed, inject} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {DocumentsStore} from '../../store/documents.store';
import {DocumentsService} from '../../services/documents.service';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs';
import {RecordFields} from './components/record-fields/record-fields';
import {TextElement} from './components/text-element/text-element';
import {AlcElement} from './components/alc-element/alc-element';
import {PosElement} from './components/pos-element/pos-element';

@Component({
  selector: 'app-document-detail',
    imports: [
        RouterLink,
        RecordFields,
        TextElement,
        AlcElement,
        PosElement
    ],
  templateUrl: './document-detail.html',
  styleUrl: './document-detail.scss'
})
export class DocumentDetail {
    private readonly store = inject(DocumentsStore);
    private readonly route = inject(ActivatedRoute);
    private readonly service = inject(DocumentsService);

    // route param as signal, then find the document in the store
    private readonly id = toSignal(
        this.route.paramMap.pipe(map((params) => params.get('id'))),
    );

    protected readonly document = computed(() => this.store.documents().find((d) => d.id === this.id()),);

    protected readonly jsonUrl = computed(() => {
        const id = this.id();
        return id ? this.service.createJsonDownloadUrlForDocument(id) : null;
    });
}
