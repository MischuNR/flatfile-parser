import {Component, input} from '@angular/core';
import {RecordFields} from '../record-fields/record-fields';
import {AlcJson} from 'shared';

@Component({
  selector: 'app-alc-element',
    imports: [
        RecordFields
    ],
  templateUrl: './alc-element.html',
  styleUrl: './alc-element.scss'
})
export class AlcElement {
    public readonly alcElement = input.required<AlcJson>();
}
