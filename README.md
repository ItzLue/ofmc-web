# Installation 

Dette projekt kræver [NodeJS](https://nodejs.org/en/). For yderligere hjælp, se [NextJs dokumentationen](https://nextjs.org/docs)

Når NodeJs er installeret, skal du køre følgende kommando fra projektmappen:
```bash
npm install
```
Dette henter alle pakkerne som er i package.json filen og nødvendigt for projektet. (Det kan godt tage lidt tid, hvis det er første gang at dette køres).

Herefter er projektet klar til at blive startet, dette gøres ved at køre følgende kommando:
```bash
npm run dev
```
Der startes herved en lokal server på [http://localhost:3000](http://localhost:3000), der kan tilgås via en browser.

# Folder struktur 
Der er brugt NextJs og folderstrukturen er som følger:

    - components
    - helpers
        - firebase
            - protocols
            - user
        - server
    - ofmc
        - templates
        - examples
        - user-created
    - pages
        - api
        - protocol
    - public
    - recoil
        - atoms
    - types
    - styles
    - package.json
    - README.md
    - .gitignore
    - .editorconfig
    - .eslintrc.js
    - .prettierrc.js
    - .stylelintrc.js...

Alt routing ligger i mappen [pages](./pages), der en mappe til de routes som er til Api'et i [api](./api) disse endpoints kan tilgås eksempelvis kan templates hentes på [http://localhost:3000/api/templates](http://localhost:3000/api/tempaltes). 

Der ligger content på index siden på [http://localhost:3000](http://localhost:3000/), og på localhost:3000/protocol... her kræves det dog at der er valgt en templates hvis ikke man er logget ind eller at man logget ind og har valgt en protokol. 
Hvis ikke dette er opfyldt vil man redirected til forsiden.

Api og routning af siderne er ydereligere beskrevet i rapporten. 

