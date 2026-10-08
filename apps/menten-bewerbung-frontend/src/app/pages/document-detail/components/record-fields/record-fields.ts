import {Component, computed, input} from '@angular/core';

@Component({
  selector: 'app-record-fields',
  imports: [],
  templateUrl: './record-fields.html',
  styleUrl: './record-fields.scss'
})
export class RecordFields {
    public readonly record = input.required<object>();

    protected readonly fields = computed(() =>
        Object.entries(this.record()).filter(
            (e): e is [string, string] => typeof e[1] === 'string',
        ),
    );
}
