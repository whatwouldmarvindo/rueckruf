# DEVK Rückruf-Formular
Dieses Projekt ist eine technische Demo-Anwendung im Rahmen einer Bewerbung für die Position als Fullstack-Entwickler bei der DEVK. Es implementiert ein einfaches Formular zur Anforderung eines Rückrufs, das die übermittelten Daten auf dem Server verarbeitet und speichert.

## Grundlagen
Um dieses Projekt zu starten, muss Deno auf Ihrem System installiert sein. Deno ist eine moderne und sichere Laufzeitumgebung für JavaScript und TypeScript.

Für MacOS / Linux

```
curl -fsSL [https://deno.land/install.sh](https://deno.land/install.sh) | sh
```

Für Windows (in PowerShell)

```
irm [https://deno.land/install.ps1](https://deno.land/install.ps1) | iex
```

## Server starten
Führen Sie deno task dev in Ihrer Konsole aus, um den Development-Server zu starten. Der Server überwacht automatisch Dateiänderungen und startet bei Bedarf neu.

## Projektüberblick
### Technologiestack
- Backend: Deno & Fresh Framework
- Frontend: Preact & Tailwind CSS
- Sprache: TypeScript
- Validierung: Zod

Als Technologie wurde das Fresh-Framework auf Basis von Deno gewählt, da es eine extrem schnelle Entwicklung ohne komplexe Build-Schritte ermöglicht. Deno bringt von Haus aus alles Notwendige mit (Linter, Formatter, Task Runner, TypeScript-Compiler), was die Konfiguration minimiert und die Produktivität maximiert. Fresh nutzt eine "Island Architecture", bei der standardmäßig kein JavaScript an den Client gesendet wird, was zu exzellenten Ladezeiten führt.

### Frontend-Architektur
Das Frontend wurde nach einem komponentenbasierten Ansatz mit Preact entwickelt. Die Hauptkomponente (`RueckrufForm.tsx`) dient als "intelligenter" Container, der den gesamten Zustand des Formulars verwaltet.

Wiederverwendbare Komponenten: Das Formular ist aus kleineren, "dummen" Präsentationskomponenten zusammengesetzt (z.B. `DevkInput`, `DevkRadio`, `DevkTextArea`). Diese Komponenten sind für die Darstellung eines einzelnen Formularelements verantwortlich und erhalten ihren Zustand sowie Callback-Funktionen (`onChange`) über Props.

Zustandsverwaltung: Der gesamte Formulardatenzustand wird zentral in der RueckrufForm-Komponente über den `useState`-Hook gehalten ("Lifting State Up"). Wenn ein Benutzer eine Eingabe in einer Kindkomponente tätigt, ruft diese die per Prop übergebene `onChange`-Funktion auf, welche den Zustand in der Elternkomponente aktualisiert. Dies sorgt für einen klaren und unidirektionalen Datenfluss.

Datenübermittlung: Bei der Übermittlung des Formulars wird die native `fetch`-API verwendet, um eine asynchrone POST-Anfrage mit den Formulardaten im JSON-Format an den Backend-Endpunkt (`/api/rueckruf`) zu senden.

### Backend-Architektur
Die API folgt einer klassischen Layered Architecture, um eine klare Trennung der Verantwortlichkeiten (Separation of Concerns) zu gewährleisten und die Wartbarkeit zu erhöhen:

Controller (Handler): Befindet sich in `routes/api/.` Diese Schicht ist der Einstiegspunkt für HTTP-Anfragen. Ihre Aufgabe ist es, die Anfrage entgegenzunehmen, den Body zu parsen und die Daten mit Zod zu validieren. Anschließend ruft sie den Service auf und formatiert dessen Antwort in eine HTTP-Response.

Service: Befindet sich in `services/.` Hier liegt die Kern-Geschäftslogik. Der Service erhält die validierten Daten vom Controller, transformiert diese (z.B. Erstellung des HTML-Inhalts) und koordiniert die Datenpersistenz, indem er das Repository aufruft.

Repository: Befindet sich in `repositories/.` Diese Schicht ist ausschließlich für den Datenzugriff zuständig. Sie abstrahiert die Art der Speicherung (in diesem Fall das Schreiben von Dateien auf dem Dateisystem) und stellt einfache Methoden wie `saveFile` bereit.

### Formular-Validierung
Für die Formular-Validierung wurde auf die Bibliothek Zod zurückgegriffen. Zod ermöglicht die Definition von deklarativen und typsicheren Schemata. Dies macht es einfach, auch komplexe, bedingte Validierungsregeln zu implementieren – wie in diesem Projekt, wo bestimmte Felder nur dann zu Pflichtfeldern werden, wenn keine Kundennummer angegeben ist. Die Validierung findet im Controller statt, um ungültige Anfragen frühzeitig abzufangen ("Fail Fast"-Prinzip).

### Datenpersistenz
Die übermittelten Formulardaten werden als einfache HTML-Dateien im Verzeichnis `./data` auf dem Server abgelegt. Jede Anfrage generiert eine neue Datei mit einem Zeitstempel im Namen. Dieser Ansatz wurde gewählt, um die Anforderung ohne eine externe Datenbank-Abhängigkeit zu erfüllen. In einem produktiven Szenario könnte das `FileRepository` einfach durch ein `DatabaseRepository` ausgetauscht werden, ohne die Service- oder Controller-Schicht anpassen zu müssen.