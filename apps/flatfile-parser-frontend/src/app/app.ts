import {Component, inject} from '@angular/core';
import { RouterModule } from '@angular/router';
import {DocumentsStore} from './store/documents.store';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
    protected readonly store = inject(DocumentsStore);

    constructor() {
        this.store.load();
    }

}
