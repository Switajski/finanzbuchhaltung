#Schema

Konto Soll / Debit: 6081, 100$
Konto Haben / Credit 40059, 100$

## in DBF
Datensatz A
    konto: 6081 100$
    gegen: 40059
    betrag_h: 0
    betrag_s: 100$
Datensatz C
    konto: 40059
    gegen: 6081
    betrag_h: 100
    betrag_s: 0

## Konfiguration
KKlasse K: Aktiva 0xxx, 1xxx, 2xxx
KKlasse P: Passiva 3xxx, 4xxx
KKlasse E: Ertraege 5xxx
KKlasse A: Aufwendungen 6xxx, 7xxx
KKlasse G: Ergebnisrechnung 8xxx
KKlasse R: Kosten/Leistungsrechnung 9xxx
KKlasse ' ': alle anderen

Konto_art K: Kundenkonten (Forderungen) 10xxx 
Konto_art L: Lieferantenkonten (Verbindlichkeiten) 40xxx
Konto_art S: alle anderen