Agent AI wykorzystywany do tworzenia treściwego opisu ustawy zawartej w linku, Poza opisem zwraca również najważniejsze tematy poruszone w danej ustawie. Działa jako serwer pod adresem:
```commandline
https://locahost/agent/
```

Przykładowym zapytaniem będzie:
```commandline
https://localhost/agent/explain

BODY:
{
    "link": "https://orka.sejm.gov.pl/Druki10ka.nsf/0/BFD04848ECC80979C1258D55002D7562/%24File/2037.pdf"
}
```

Rezultatem zapytania będzie obiekt:
```commandline
{
    "keypoints": ['Zaostrzenie kar dla przestępstw gospodarczych', 'Zwiększenie kompetencji organów ścigania', 'Promowanie współpracy międzynarodowej', 'Edukacja społeczeństwa o zagrożeniach', 'Obowiązek zgłaszania podejrzanych transakcji przez instytucje finansowe']
    "content": "
        Ustawa, o której mowa w dokumencie, dotyczy wprowadzenia regulacji dotyczących przestępstw gospodarczych i związanego z nimi karania. Celem ustawy jest zwiększenie efektywności działań organów ścigania oraz wymiaru sprawiedliwości w walce z oszustwami i innymi przestępstwami związanymi z działalnością gospodarczą. Ustawa wprowadza zmiany w przepisach dotyczących zjawisk takich jak pranie pieniędzy, oszustwa podatkowe i inne nielegalne działania gospodarcze.
        
        ### Najważniejsze punkty ustawy:
        1. **Zaostrzenie kar** - Wprowadzenie surowszych kar dla sprawców przestępstw gospodarczych, co ma na celu ich odstraszenie.
        2. **Zwiększenie kompetencji organów ścigania** - Policja i inne służby zdobywają dodatkowe uprawnienia do ścigania przestępstw gospodarczych.
        3. **Współpraca międzynarodowa** - Ustawa promuje współpracę z zagranicznymi organami ścigania w celu skuteczniejszego zwalczania przestępczości transgranicznej.
        4. **Edukacja i informowanie społeczeństwa** - Wprowadzenie programów edukacyjnych informujących o zagrożeniach związanych z przestępczością gospodarczą.
        5. **Zwiększenie roli instytucji finansowych** - Banki i inne instytucje finansowe będą miały obowiązek zgłaszania podejrzanych transakcji.
        
        Ustawa ma na celu ochrona uczciwych przedsiębiorców oraz konsumentów poprzez eliminację nieuczciwych praktyk w obrocie gospodarczym. Wzmacnia ona również system prawny w Polsce w walce z korupcją i oszustwami podatkowymi."
}
```