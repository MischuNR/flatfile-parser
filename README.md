# flatfile-parser

Aufgabe für das Parsen einer flatfile-Datei zu mehreren JSON nach gewissen Schemas. Das inkludiert:

- Hochladen einer Datei
- Validieren von Feldern für die Typen im flatfile
- Download für erfolgreich geparste flatfile Datensätze
- Laden aller bereits hochgeladenen Daten aus dem Cache

## KI-Einsatz

Code, der von KI generiert wurde, ist klar gekennzeichnet. Falls Änderungen von mir vorgenommen wurden, ist das deklariert. Konzeption des Schema-Ansatzes, strenges Typing und Code-Kontrollen wurden von mir gemacht.

Die KI hat mich in folgenden Tätigkeiten unterstützt:

- Feedback zu Schema-Konzeption
- Generieren von diversen Funktionen
- Schreiben der Tests
- Code-Reviews

## Setup

Dieses Projekt wurde mit `node@24.15.0` umgesetzt und getestet. Support mit einer anderen Node Version ist nicht
gewährleistet.

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
Kommentare und aussagekräftige Namen dokumentiert. Wichtig: Das Readme (ausser die Zeitschätzung) wurde als erstes
erstellt und wird fast als letztes überarbeitet. Geänderte Konzepte können durch den GIT Verlauf nur bedingt verfolgt
werden, Begründung für die Entscheidung steht aber dabei.

### Zeitmessung

Um eine Übersicht der verwendeten Zeit und der Tätigkeiten zu erhalten, wird hier strukturiert aufgeführt, wie viel Zeit
in Anspruch genommen wurde. Da dieses Projekt in der Freizeit gemacht wird und einige Tätigkeiten mittendrin für mehrere
Minuten oder Stunden unterbrochen werden, ist der Aufwand eine ungefähre Schätzung, gerundet auf 10 Min.

| Task                                        | Definition of Done                                                                                                                                                                  | Abgeschlossen am | Geschätzter Aufwand in Min | Zeitaufwand in Min | Zählt zu Aufgabenzeit |
|---------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------|----------------------------|--------------------|-----------------------|
| Erstes Einlesen und Überfliegen der Aufgabe | Die Aufgabenstellung wurde ein erstes Mal durchgelesen und mögliche Verständnislücken wurden markiert. Ein erster Austausch mit KI, um die Lücken zu schliessen, hat stattgefunden. | 02.10.2026       | -                          | _60_               | Nein                  |
| Aufsetzen des Projektes                     | NestJS Backend und Angular Frontend lassen sich starten, Shared Library existiert, initiales Markdown existiert.                                                                    | 03.10.2026       | _40_                       | _40_               | Nein                  |
| Dokumentation                               | Ein Zeitplan für die Umsetzung der Aufgabe steht fest. Annahmen und Entscheidungen sind dokumentiert. Konzepte werden geschrieben oder überarbeitet.                                | 03.10.2026       | 120                        | 270                | Ja                    |
| Endpunkte für Server erstellen              | Die drei Endpunkte vom Server sind umgesetzt und liefern eine erste gemockte Response. Der dazugehörige Service wurde erstellt, aber noch nicht umgesetzt.                          | 03.10.2026       | 30                         | 30                 | Ja                    |
| Validierungslogik und Umbau zu JSON         | Die Validierung der Belege und Felder funktioniert wie erwartet. Der Server gibt eine korrekte JSON-Antwort. Die Testfälle gehen alle erfolgreich durch.                            | 09.10.2026       | 750 (Mittelwert)           | 850                | Ja                    |
| Frontend erstellen                          | Das UI ist umgesetzt und benutzbar. Alle Anforderungen aus der Aufgabenstellung sind abgedeckt.                                                                                     | 08.10.2026       | 540 (Mittelwert)           | 220                | Ja                    |
| **Gesamt**                                  | Die Aufgabenstellung wurde komplett erfüllt. Zusätzliche Sachen zählen nicht dazu.                                                                                                  |                  | **1440**                   | **1370**           | -                     |

> **Legende:** <br>
> _Kursiv_ = zählt nicht zur Aufgabenzeit <br>
> **Fett** = Gesamtwert <br>
> Der erste Teil der Dokumentation war das Schreiben des README und die Konzepte zu den verschiedenen Anforderungen
> schreiben. Der geschätzte Aufwand war der initiale Aufwand, durch konzeptionelle Änderungen und Umstrukturierung von
> Aufgaben musste das README erneut überarbeitet werden. Der Aufwand ist bei Zeitaufwand dazu gerechnet. <br>
> Das erste Einlesen wurde nicht vorab geschätzt. Diese Tätigkeit zählt nicht zur Aufgabenzeit, da Verständnislücken
> geschlossen wurden und erste Gedanken zu Konzepten entstanden sind, ohne diese zu festigen oder zu dokumentieren. Die 60
> Min sind eine Schätzung und nicht der tatsächliche Wert. Die Zeit, um die Konzepte zu verfeinern und festzuhalten, ist
> im Punkt "Dokumentation" festgehalten. <br>
> "Abgeschlossen am" bezieht sich auf die geforderte Funktion und nicht das finale Produkt. Zeiten, die danach addiert
> werden sind Verbesserung der bestehenden Applikation(en).

### Planung

Der Transparenz halber: Die Planung wurde im Nachhinein angepasst. Die Grundfunktionen waren in der geschätzten Zeit
umgesetzt. Hier eine Auflistung für die geänderten Punkte:

- Validierungslogik: wurde präzisiert mit neuem Konzept
- Validierungslogik: Feld-Validatoren wurden präzisiert
- Validierungslogik: Validieren von angehängten Elementen wurde hinzugefügt
- Validierungslogik: Quervalidieren wurde präzisiert
- Frontend erstellen: Laden der Daten wurde von Resolver auf Hauptkomponente gewechselt, um den Resolver zu sparen
- Frontend erstellen: Allgemeine Präzisierung der Fehleranzeigen und Ladeanzeigen
- Frontend erstellen: Präzisierung der Schritte
- Zusätzliche "Must-haves": Hinzugefügt, weil diese Tätigkeiten/Funktionalitäten die Benutzung nicht einschränken, aber
  gemacht werden sollten um ein komplettes "Produkt" abzuliefern
- Zusatz: Präzisiert

1. Endpunkte für Server erstellen, geschätzter Aufwand: 30 Min
    1. Route `GET /documents`
    2. Route `POST /documents`
    3. Route `GET /documents/:id/json`
2. Validierungslogik und Umbau zu JSON, geschätzter Aufwand: 600 - 900 Min
    1. Einlesen der Beispieldatei
    2. Mapping zu `{ lineNr: number, type: string, fields: string[]}`
    3. Gruppieren nach den Typen `HEAD` und `POS` als Hauptelemente mit `ALC` und `TEXT` als dazugehörige Elemente.
    4. Schema pro Typ erstellen, dort jeweils pro Feld eine Kontrolle hinzufügen:
       `Record<FIELD_NAME, { required: boolean, fieldValidators: ((value: string) => string | null)[] }>`.
    5. Validatoren für Felder erstellen: `maxValueLength`, `minValueLength`, `exactValueLength`, `int`, `decimal`,
       `date`, `allowedValues`, `minNumeric`, testen und in Schemas einbauen.
    6. Validieren von angehängten Elementen (Mindest- und Maximalanzahl)
    7. Quervalidieren von Element-Typen nach bestimmten Voraussetzungen (z.B. Prozentsätze, Beträge aus HEAD und
       POS, ...)
    8. Belege im Server Memory speichern als `{id: string, originalFileName: string, isSuccess: boolean, errorMsg?: string, data?: HeadJson}`
3. Frontend erstellen, geschätzter Aufwand: 480 - 600 Min
    1. Basis Routing erstellen
    2. Signal Store hinzufügen (State und Store selber)
    3. Laden aller Daten in Hauptkomponente (App) hinzufügen
    4. Ladeanzeige während Frontend Daten lädt
    5. Fehleranzeige und Option zum Reload wenn Server nicht erreichbar ist
    6. Hauptansicht hinzufügen (Liste, Hochladen einer Datei, Filter)
    7. Upload einer Datei ermöglichen
    8. Anzeige, dass Frontend einen Upload-Request an das Backend geschickt hat
    9. Anzeige, dass ein Fehler während des Uploads passiert ist
    10. Ansicht eines einzelnen Beleges
    11. Download Möglichkeit für einen fehlerfreien Beleg
    12. Fehleranzeige für Einzelansicht
4. Zusätzliche "Must-haves"
    1. Unit Tests bei weiteren kritischen Backend Funktionen
    2. README aktualisieren (angepasste Konzeption, Dokumentation)
5. Zusatz
    1. Besseres Styling (könnte bei Must haves sein, aber function before design)
    2. Validierung der erzeugten JSON für die Belege gegen ein JSON-Schema

### Annahmen

Hier werden nur Annahmen festgehalten, die von mir getroffen wurden, ohne die involvierte Person zu informieren.

1. Eine Datei ohne Inhalt gibt einen Fehler: Sie kann nicht umgewandelt werden.
2. Zeilen vor dem ersten HEAD sind fehlerhaft: HEAD muss am Anfang stehen.
3. Unbekannte Satzarten in einem HEAD: Diese machen den Beleg fehlerhaft.
4. Die Feldanzahl muss genau zum Schema passen: Hat ein Element mehr oder weniger Felder, ist es fehlerhaft. Optional
   bezieht sich auf den Wert im Feld, nicht auf die Anzahl der Pipes.

### Konzepte

Die Konzepte haben sich während der Implementation minimal geändert. Für die Transparenz ist hier klar deklariert,
welche Punkte angepasst wurden.

- Konzept 2: wurde präzisiert.
- Konzept 4: wurde abgeändert, dass der key jetzt ein Feldname ist statt eines properties. Information zur Fehlerwerfung
  bei fehlendem Schema hinzugefügt.
- Konzept 5: Belegvalidatoren wurden erst kurz vor der Implementation konzipiert und nachträglich hier hinzugefügt und
  erklärt.
- Konzept 6: Präzisieren von Type Definition
- Konzept 7: Präzisierung von Type Definition
- Konzept 8: Anpassung von Resolver auf App Komponente für das Laden der Daten
- Konzept 9: Anpassung für wann die Ladeanzeige angezeigt wird und was sie auslöst
- Konzept 10: Anpassung von Konzept an Realität: Store hat dediziertes Property und Komponente zeigt Fehlermeldung mit "Erneut versuchen" Option.
- Konzept 11: Ladeanzeige wird direkt beim Input angezeigt, Input ist deaktiviert während des Hochladens und
  Fehlermeldung wurde präzisiert
- Konzept 12: Präzisieren Empfänger-Filter

1. Splitting nach Zeile und dann nach Pipe. Ziel ist es `{ lineNr: number, type: string, fields: string[]}` zu kriegen.
   Type ist RECID. `fields` sind alle Felder ausser RECID. Wichtig: Zeilennummer ist genau hier bekannt, weshalb sie so
   früh wie möglich gesetzt wird.
2. Gruppierung nach Haupt- und Subelement. Hauptelemente sind `HEAD` und `POS`, diesen können `TEXT` und `ALC`
   zugewiesen
   sein. `POS` muss einem `HEAD` zugewiesen sein. Die Struktur soll am Ende so aussehen (`DocRaw`):

```JSON
{
  "type": "HEAD",
  "lineNr": 1,
  "fields": [
    "field1",
    "..."
  ],
  "texts": [
    {
      "type": "TEXT",
      "lineNr": 2,
      "fields": [
        "field1",
        "..."
      ]
    }
  ],
  "alcs": [
    {
      "type": "ALC",
      "lineNr": 3,
      "fields": [
        "field1",
        "..."
      ]
    }
  ],
  "pos": [
    {
      "type": "POS",
      "lineNr": 4,
      "fields": [
        "field1",
        "..."
      ],
      "texts": [
        {
          "type": "TEXT",
          "lineNr": 5,
          "fields": [
            "field1",
            "..."
          ]
        }
      ],
      "alcs": [
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

3. `DocRaw` wird benutzt, um über die Daten zu iterieren. Ein `DocRaw` ist die Rohform eines `HeadJson`, `PosJson`,
   `AlcJson` oder `TextJson` und weiss noch
   nicht, ob die Verarbeitung erfolgreich war oder nicht. Dieser Check wird bei der Umwandlung zu den festen Typen
   gemacht. Dieses Format
   wird benutzt, damit pro Beleg ein Fehler abgefangen werden kann und im `Doc` (`isSuccess, errorMsg`) dokumentiert
   werden kann.
4. Für die Validierung werden Schemas für die Typen gebaut (siehe Codeblock). Diese Schemas helfen dabei den
   Feldnamen, required und die anderen Überprüfungen durchzuführen. Ist ein Schema nicht vorhanden, wird ein Fehler
   geworfen.

```TS
Record<FIELD_NAME, { required: boolean, fieldValidators: ((value: string) => string | null)[] }>
```

5. Damit eine Validierung über den ganzen Beleg möglich ist, müssen Validatoren für die Anzahl zugewiesener Elemente
   hinzugefügt werden. Diese Validatoren werden noch vor der Feldvalidation aufgerufen, damit die Validierung des
   Beleges so früh wie möglich abgebrochen wird. Andere Validatoren mit Werten, die über den ganzen Beleg oder eine
   `POS` gemacht werden, werden erst nach der Feldvalidierung gemacht.
6. `HeadJson`, `PosJson`, `AlcJson`, `TextJson` sind die Ausgabeformate, die in der Aufgabe gefordert werden. Die
   Attributnamen werden aus dem Schema übernommen.
7. Die Response (`Doc`) aus dem Backend wird folgende Struktur haben, damit Fehler erkannt werden können und eine
   eindeutige ID zugewiesen ist:

```TS
{
    id: string;
    originalFileName: string; // Name der hochgeladenen Datei. Wird für den Download des JSON verwendet.
    isSuccess: boolean; // ob der Beleg erfolgreich verarbeitet wurde
    errorMsg?: string; // Fehlermeldung, die Zeile und exaktes Problem angibt, nur bei Fehler
    data?: HeadJson; // Beginnt immer mit einem Head, nur bei erfolgreich
}
```

8. Für das Laden der Daten im Frontend wird die Basis-Route gebraucht. Die App Komponente (Main Komponente) feuert das
   Event ab, damit der Store die Daten lädt.
9. Eine Ladeanzeige wird angezeigt, so lange das dedizierte Property für das Laden aller Daten im Store auf `true`
   gesetzt ist.
10. Fehlerbehandlung beim Laden aller Daten: Der Store hat ein zusätzliches Property, das den Fehler für das Laden aller
    Daten anzeigt. Ist dieses gesetzt, wird eine Fehlermeldung ausgegeben und ein Button für den erneuten Versuch
    bereitgestellt.
11. Beim Hochladen einer Datei wird der File-Input auf Disabled gesetzt (nur während des Requests) und eine kleine
    Information erscheint. Ist der Upload erfolgreich erscheint keine Meldung, die Daten in der Tabelle werden aber
    aktualisiert. Ist der Upload fehlerhaft erscheint eine Meldung.
12. Filter im Client: Um Zeit zu sparen wird der Filter nur im Frontend gemacht. Bei kleiner Datenmenge ist es kein
    Problem, sollte mehr dazu kommen wird Pagination und Filter im Request gebraucht werden. Der Empfänger-Filter,
    filtert nach allen relevanten Daten, die etwas mit dem Empfänger zu tun haben.
13. Nx-Monorepo, um Datentypen zu teilen und Zeit zu sparen. Angular und NestJS sind gut unterstützt und können einfach
    in einem Repository landen.

### Testing

Dieses Projekt wurde mit verschiedenen Methoden getestet und kontrolliert. Ziel war es, die Grundfunktionen zu
gewährleisten.

#### Backend

Für Controller, Service, die Validatoren, Belegregeln und Erstellung des Basis-Objektes (`DocRaw`) wurden im Backend
Unit-Tests geschrieben. Diese wurden erst nach der Implementation geschrieben und nicht für Test Driven Development.
Ziel ist es, dass die Funktionalität auch bei Änderungen gewährleistet bleibt.

Befehl um die Tests durchlaufen zu lassen:

```bash
npm run test:backend
```

Zusätzlich wurden manuelle Tests mit der Beispieldatei (nicht im Repository) durchgeführt. Dafür wurden bestimmte Felder
bewusst von `required: true` auf `required: false` gesetzt oder absichtlich Validatoren angepasst. Ohne diese
Anpassungen kommt die Beispieldatei ohne Fehler durch.

Diese Tests wurden mit Postman gemacht.

#### Frontend

Das Frontend wurde nur manuell getestet. Dazu wurden ebenfalls Felder angepasst (Required, Validatoren), andere
Backend-Fehler provoziert oder künstliche Delays eingebaut (Ladeanzeige).

