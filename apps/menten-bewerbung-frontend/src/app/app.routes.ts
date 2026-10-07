import {Route} from '@angular/router';
import {DocumentsList} from './pages/documents-list/documents-list';
import {DocumentDetail} from './pages/document-detail/document-detail';

export const appRoutes: Route[] = [
    {
        path: '',
        children: [
            {path: '', redirectTo: 'documents', pathMatch: 'full'},
            {path: 'documents', component: DocumentsList},
            {path: 'documents/:id', component: DocumentDetail},
        ],
    },
    {path: '**', redirectTo: 'documents'},
];
