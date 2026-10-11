import {Component, input} from '@angular/core';
import {RecordFields} from '../record-fields/record-fields';
import {TextJson} from 'shared';

@Component({
  selector: 'app-text-element',
    imports: [
        RecordFields
    ],
  templateUrl: './text-element.html',
  styleUrl: './text-element.scss'
})
export class TextElement {
    public readonly textElement = input.required<TextJson>();
}
