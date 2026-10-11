import {Component, computed, input} from '@angular/core';
import {PosJson} from 'shared';
import {RecordFields} from '../record-fields/record-fields';
import {AlcElement} from "../alc-element/alc-element";
import {TextElement} from "../text-element/text-element";

@Component({
  selector: 'app-pos-element',
    imports: [
        RecordFields,
        AlcElement,
        TextElement
    ],
  templateUrl: './pos-element.html',
  styleUrl: './pos-element.scss'
})
export class PosElement {
    public readonly posElement = input.required<PosJson>();
}
