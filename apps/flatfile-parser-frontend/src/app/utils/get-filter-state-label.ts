import {STATUS_FILTER} from '../types/status-filter';

export function getStatusLabel(state: STATUS_FILTER) {
    switch (state) {
        case STATUS_FILTER.ALL:
            return 'Alle';
        case STATUS_FILTER.ERRORED:
            return 'Fehlerhafte';
        case STATUS_FILTER.OK:
            return 'Korrekte';
        default:
            throw new Error(`Unbekannter Status: ${state satisfies never}`);
    }
}