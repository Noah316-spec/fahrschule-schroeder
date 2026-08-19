# Fahrschule Ingo Schröder – neue Website

Komplett neu gebaute Website für die Fahrschule Ingo Schröder, Theodor-Heuss-Allee 27,
34225 Baunatal-Altenbauna. Alle Texte, Bilder, PDFs und Impressumsangaben stammen
1:1 von der bestehenden Seite `fahrschule-ingo-schroeder.de`.

## Dateien

```
fahrschule-ingo-schroeder/
├─ index.html                Startseite (alle Inhalte auf einer Seite)
├─ datenschutz.html          Datenschutzerklärung
├─ haftungsausschluss.html   Haftungsausschluss
├─ server.js                 kleiner Testserver für die lokale Vorschau
└─ assets/
   ├─ css/style.css
   ├─ js/main.js
   ├─ img/                   5 Bilder – alle aus der alten Website
   └─ pdf/                   5 Infoblätter – alle aus der alten Website
```

## Ansehen

`index.html` einfach doppelklicken. Oder mit Testserver:

```bash
node fahrschule-ingo-schroeder/server.js
```

Danach http://localhost:5173 im Browser öffnen.

## Bilder

Es sind **ausschließlich echte Bilder** der Fahrschule eingebunden – keine Stockfotos,
keine Platzhalter, keine erfundenen Motive:

| Datei | Herkunft |
|---|---|
| `logo.jpg` | Originallogo der Fahrschule (840 × 150) |
| `raum-schulungsraum.jpg` | untere Hälfte von `fahrscdhule-ingo-schroeder-schulungsraum.jpg` |
| `raum-buero.jpg` | obere Hälfte derselben Datei |
| `raum-empfang.jpg` | `ingo-schroeder-fahrschule.jpg` |
| `raum-arbeitsplatz.jpg` | `fahrschule-in-baunatal.jpg` |

Die Originaldatei des Schulungsraums war eine Montage aus zwei untereinander gesetzten
Fotos mit weißem Trennstreifen. Sie wurde in die zwei einzelnen Fotos zerlegt.

Die Fotos liegen im Original nur mit 280 px Breite vor. Sie werden deshalb bewusst
klein dargestellt (Galeriekacheln, kleines Bild im Textbereich), damit sie scharf
bleiben und nicht verpixelt wirken. **Wenn die Originalfotos in höherer Auflösung
vorliegen, sollten sie ersetzt werden** – dann können die Bilder auch größer gezeigt
werden.

Die Ampel im Kopfbereich und die gestrichelte Straße im Hero sind reine CSS-/SVG-Grafiken,
abgeleitet aus dem Logo – keine Fotos.

Die Markenfarbe `#5569a6` wurde direkt aus dem Hintergrund des Originallogos gemessen.

## Was von der alten Seite übernommen wurde

* Slogan, Einleitungstext, Unterrichts- und Anmeldezeiten (Startseite)
* Ablauf in vier Schritten, Vorteile, Liste für die Führerscheinstelle (Und so geht's)
* Klasse B, Klasse B mit Schlüsselzahl 96, Klasse BE – vollständige Beschreibungstexte
  und alle Eckdaten, dazu die fünf PDF-Infoblätter (Führerscheinklassen)
* Kontakttext, Kontaktformular mit denselben Feldern, Einwilligungstext (Kontakt)
* Vollständiges Impressum inkl. USt-ID und zuständiger Kammer
* Datenschutzerklärung und Haftungsausschluss im Wortlaut

## Bewusst weggelassen

**„Die Fahrzeuge"** – die Seite existiert auf der alten Website, ist aber vollständig
leer: kein Text, kein Bild. Es gibt also nichts zu übernehmen und es wurde nichts
erfunden. Sobald Fotos und ein Text zu den Fahrschulautos vorliegen, kann der Punkt
als eigener Abschnitt ergänzt werden.

## Vor dem Livegang zu klären

1. **Widerspruch bei den Theoriezeiten.** Die Startseite der alten Website nennt
   Dienstag und Donnerstag, 18:30–20:00 Uhr. Die Seite „Und so Geht's" nennt
   Dienstag, Mittwoch und Donnerstag. Beide Angaben stehen jetzt an derselben Stelle
   wie im Original – das sollte vereinheitlicht werden.
2. **Kontaktformular.** Es öffnet aktuell das E-Mail-Programm des Besuchers mit einer
   fertig ausgefüllten Nachricht (`mailto:`). Das funktioniert ohne Server. Für einen
   echten Versand direkt von der Seite wird ein Formular-Skript oder ein Dienst
   beim Hoster benötigt.
3. **Datenschutzerklärung.** Wurde im Wortlaut übernommen und beschreibt unter anderem
   Google Analytics und OpenStreetMap-Karten. Diese neue Seite bindet beides **nicht**
   ein – nur Google Fonts wird extern geladen. Der Text sollte entsprechend gekürzt
   und juristisch geprüft werden. Ein Hinweis dazu steht oben auf der Seite und muss
   vor dem Livegang entfernt werden.
   Wenn gar keine externen Dienste gewünscht sind: die beiden
   `fonts.googleapis.com`-Zeilen im `<head>` löschen – die Seite nutzt dann die
   Systemschrift und sieht weiterhin gut aus.
4. **Impressum.** Angaben unverändert übernommen. Zusätzlich fehlt in der Vorlage die
   Fahrlehrererlaubnis-Nummer, die in vielen Fahrschul-Impressen steht.

## Technik

* Reines HTML, CSS und JavaScript – kein Build, kein Framework, keine Abhängigkeiten
* Responsiv von 320 px bis Desktop, geprüft bei 390, 768, 1280 und 1440 px
* Mobiles Menü, Scroll-Fortschritt in der Navigation, Einblendanimationen
* Ohne JavaScript bleibt die komplette Seite lesbar und sichtbar
* `prefers-reduced-motion` wird respektiert, Fokus-Rahmen für Tastaturbedienung,
  Sprunglink, alle Bilder mit Alternativtext, Formularfelder mit Labels
* Strukturierte Daten (`DrivingSchool`) für Google inkl. Öffnungszeiten
* Eigenes Druck-Stylesheet
