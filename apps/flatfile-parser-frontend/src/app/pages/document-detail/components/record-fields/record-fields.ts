import {Component, computed, input} from '@angular/core';

@Component({
  selector: 'app-record-fields',
  imports: [],
  templateUrl: './record-fields.html',
  styleUrl: './record-fields.scss'
})
export class RecordFields {
    public readonly record = input.required<object>();

    // only string fields are displayed.
    // Reason is that HEAD_ALC, POS_ALC, HEAD_TEXT and POS_TEXT are arrays and handled differently.
    protected readonly fields = computed(() =>
        Object.entries(this.record()).filter(
            (e): e is [string, string] => typeof e[1] === 'string',
        ),
    );
}
