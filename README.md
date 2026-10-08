# menten-bewerbung

Aufgabe für die Bewerbung bei der menten GmbH.

## KI-Einsatz

Code, der von KI generiert wurde, ist klar gekennzeichnet. Die Kommentare im Code schreibe ich selbst, um das
Verständnis sicherzustellen. Bei der Konzeption wurde die KI ebenfalls eingesetzt. Die Kernideen der Datenstruktur,
Schema, Validierung und Fehlerbehandlung stammen von mir. Die KI hat Rückfragen gestellt und kontrolliert.

## Setup

Um das Projekt zu starten, werden folgende Befehle benötigt:

```bash
npm ci
```

Danach Backend und Frontend in je einem eigenen Terminal starten:

```bash
npm run start:backend
```

```bash
npm run start:frontend
```

## Umsetzung

Hier werden die Kernpunkte dokumentiert (Zeitmessung, Schwierigkeiten, Entscheidungen). Der Code selbst wird über
Kommentare und aussagekräftige Namen dokumentiert.

### Zeitmessung

Um eine Übersicht der verwendeten Zeit und der Tätigkeiten zu erhalten, wird hier strukturiert aufgeführt, wie viel Zeit in Anspruch genommen wurde. Da dieses Projekt in der Freizeit gemacht wird und einige Tätigkeiten mittendrin für mehrere Minuten oder Stunden unterbrochen werden, ist der Aufwand eine ungefähre Schätzung, gerundet auf 10 Min.

| Task                                        | Definition of Done                                                                                                                                                                  | Abgeschlossen am | Geschätzter Aufwand in Min | Zeitaufwand in Min | Zählt zu Aufgabenzeit |
|---------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------|----------------------------|--------------------|-----------------------|
| Erstes Einlesen und Überfliegen der Aufgabe | Die Aufgabenstellung wurde ein erstes Mal durchgelesen und mögliche Verständnislücken wurden markiert. Ein erster Austausch mit KI, um die Lücken zu schliessen, hat stattgefunden. | 02.10.2026       | -                          | _60_               | Nein                  |
| Aufsetzen des Projektes                     | NestJS Backend und Angular Frontend lassen sich starten, Shared Library existiert, initiales Markdown existiert.                                                                    | 03.10.2026       | _40_                       | _40_               | Nein                  |
| Erstellen des Umsetzungsplanes              | Ein Zeitplan für die Umsetzung der Aufgabe steht fest. Annahmen und Entscheidungen sind dokumentiert.                                                                               | 03.10.2026       | 120                        | 120                | Ja                    |
| Endpunkte für Server erstellen              | Die drei Endpunkte vom Server sind umgesetzt und liefern eine erste gemockte Response. Der dazugehörige Service wurde erstellt, aber noch nicht umgesetzt.                          | 03.10.2026       | 30                         | 30                 | Ja                    |
| Validierungslogik und Umbau zu JSON         | Die Validierung der Belege und Felder funktioniert wie erwartet. Der Server gibt eine korrekte JSON-Antwort. Die Testfälle gehen alle erfolgreich durch.                            |                  | 750 (Mittelwert)           | 670                | Ja                    |
| Frontend erstellen                          | Das UI ist umgesetzt und benutzbar. Alle Anforderungen aus der Aufgabenstellung sind abgedeckt.                                                                                     |                  | 540 (Mittelwert)           | 120                | Ja                    |
| **Gesamt**                                  | Die Aufgabenstellung wurde komplett erfüllt. Zusätzliche Sachen zählen nicht dazu.                                                                                                  |                  | **1440**                   | **820**            | -                     |

> **Legende:** <br>
> _Kursiv_ = zählt nicht zur Aufgabenzeit <br>
> **Fett** = Gesamtwert <br>
> Die Planung wurde nachträglich erfasst, daher ist die Schätzung = Zeitaufwand. <br>
> Das erste Einlesen wurde nicht vorab geschätzt. Diese Tätigkeit zählt nicht zur Aufgabenzeit, da Verständnislücken geschlossen wurden und erste Gedanken zu Konzepten entstanden sind, ohne diese zu festigen oder zu dokumentieren. Die 60 Min sind eine Schätzung und nicht der tatsächliche Wert. Die Zeit, um die Konzepte zu verfeinern und festzuhalten, ist in der Planung dokumentiert.     

### Planung

1. Endpunkte für Server erstellen, geschätzter Aufwand: 30 Min
    1. Route `GET /documents`
    2. Route `POST /documents`
    3. Route `GET /documents/:id/json`
2. Validierungslogik und Umbau zu JSON, geschätzter Aufwand: 600 - 900 Min
    1. Einlesen der Beispieldatei
    2. Mapping zu `{ lineNr: number, type: string, fields: string[]}`
    3. Gruppieren nach den Typen `HEAD` und `POS` als Hauptelemente mit `ALC` und `TEXT` als dazugehörige Elemente.
    4. Schema pro Typ erstellen:
       `{fieldName: string, required: boolean, fieldValidators: ((value: string) => string | null)[]}` und einbauen.
    5. `fieldValidators` erstellen: `maxLen`, `minLen`, `exactLen`, `isInt`, `isDecimal` und `isDate` und einbauen.
    6. Belege validieren nach Anzahl Elementen
    7. Querprüfungen (Summen, Positionen und Mengen)
    8. Belege im Server Memory speichern als `{id: string, isSuccess: boolean, errorMsg?: string, data?: DocJson}`
    9. Testfälle während Implementation schreiben.
3. Frontend erstellen, geschätzter Aufwand: 480 - 600 Min
    1. Basis Routing erstellen
    2. Signal Store hinzufügen
    3. Resolver zum Laden aller Dokumente
    4. Ladeindikator während Router beschäftigt ist
    5. Upload ermöglichen
    6. Server Fehlermeldungen als Toast ausgeben
    7. Anzeige für Server Fehlermeldungen
    8. Liste für Ansicht aller Belege
    9. Ansicht eines einzelnen Beleges
    10. Download Button für einzelne Belege
    11. Filter für die Belege
    12. Styling anpassen
4. Zusatz
    1. Leere Zeilen in der Datei behandeln
    2. Validierung der erzeugten JSON für die Belege gegen ein JSON-Schema

### Annahmen

1. Die Datei wird unverändert eingelesen, z.B. werden die Zeichen `‹` und `ﬂ` direkt übernommen
2. RECID zählt bis zur ersten Pipe. Diese werde ich als Typ für die nachfolgenden Felder behandeln. Dieses Feld wird
   nicht nach Länge validiert.
3. Satznummer = Zeilennummer. Startend bei 1.
4. Leere Zeilen am Ende werden ignoriert. Die Beispieldatei hat keine leeren Zeilen zwischen den Sätzen. Diesen Fall
   sehe ich als Edge-Case, der bei genügend Zeit behandelt wird.

### Konzepte

1. Splitting nach Zeile und dann nach Pipe. Ziel ist es `{ lineNr: number, type: string, fields: string[]}` zu kriegen.
   Type ist RECID. `fields` sind alle Felder ausser RECID. Wichtig: Zeilennummer ist genau hier bekannt, weshalb sie so
   früh wie möglich gesetzt wird.
2. Gruppierung nach Haupt- und Subelement. Hauptelemente sind `HEAD` und `POS`, diesen können `TEXT` und `ALC` zugewiesen
   sein. Die Struktur soll am Ende so aussehen (`DocRaw`):

```JSON
{
  "type": "HEAD",
  "lineNr": 1,
  "fields": [
    "field1",
    "..."
  ],
  "elements": [
    {
      "type": "TEXT",
      "lineNr": 2,
      "fields": [
        "field1",
        "..."
      ]
    },
    {
      "type": "ALC",
      "lineNr": 3,
      "fields": [
        "field1",
        "..."
      ]
    }
  ],
  "positions": [
    {
      "type": "POS",
      "lineNr": 4,
      "fields": [
        "field1",
        "..."
      ],
      "elements": [
        {
          "type": "TEXT",
          "lineNr": 5,
          "fields": [
            "field1",
            "..."
          ]
        },
        {
          "type": "ALC",
          "lineNr": 6,
          "fields": [
            "field1",
            "..."
          ]
        }
      ]
    }
  ]
}
```

3. `DocRaw` wird benutzt, um über die Daten zu iterieren. Ein `DocRaw` ist die Rohform eines `DocJson` und weiss noch
   nicht, ob es erfolgreich war oder nicht. Dieser Check wird bei der Umwandlung zu `DocJson` gemacht. Dieses Format
   wird benutzt, damit pro Beleg ein Fehler abgefangen werden kann und im `Doc` (`isSuccess, errorMsg`) dokumentiert
   werden kann.
4. Für die Validierung werden Schemas für die Typen gebaut (`field`, siehe Codeblock). Diese Schemas helfen dabei den
   Feldnamen, required und die anderen Überprüfungen durchzuführen:

```TS
{
    fieldName: string;
    required: boolean; 
    fieldValidators: ((value: string) => string | null)[];
}
```

5. Belegvalidatoren: TBD
6. `DocJson` ist das Ausgabeformat, das in der Aufgabe gefordert wird. Die Attributnamen werden aus dem `field` genommen.
   Für Elemente wird der Haupttyp (HEAD oder POS) als Präfix genommen.
7. Die Response (`Doc`) aus dem Backend wird folgende Struktur haben, damit Fehler erkannt werden können und eine
   eindeutige ID zugewiesen ist:

```TS
{
    id: string;
    originalFileName: string; // Name der hochgeladenen Datei. Wird für den Download des JSON verwendet.
    isSuccess: boolean; // ob der Beleg erfolgreich verarbeitet wurde
    errorMsg?: string; // Fehlermeldung, die Zeile und exaktes Problem angibt
    data?: DocJson; // Späteres JSON-File. Ist bei einem Fehler nicht gesetzt.
}
```

8. Für das Laden im Frontend wird nur eine Route gebraucht `GET /documents`. Diese wird mit einem Resolver aufgerufen.
   Grund ist Zeitersparnis und die Daten werden in der Listen- und Detailansicht verfügbar sein. Die Detailansicht
   funktioniert damit auch bei einem Reload. Die Response von `POST /documents` wird im Signal Store hinzugefügt.
9. Eine Ladeanzeige wird angezeigt, solange der Resolver (bzw. der Router) noch beschäftigt ist.
10. Fehlerbehandlung beim Laden: Der Store wird auf Error gesetzt und zeigt den Fehler im UI an. Ein Store enthält
    entweder `Doc[] | ApiError`.
11. Beim Hochladen wird ein Ladesymbol über die Tabelle gelegt und der Button inaktiv. Wenn ein Fehler auftaucht wird
    ein Toast angezeigt und der Store bleibt unangetastet.
12. Filter im Client: Um Zeit zu sparen wird der Filter nur im Frontend gemacht. Bei kleiner Datenmenge ist es kein
    Problem, sollte mehr dazu kommen wird Pagination und Filter im Request gebraucht werden.
13. Nx-Monorepo, um Datentypen zu teilen und Zeit zu sparen. Angular und NestJS sind gut unterstützt und können einfach
    in einem Repository landen.