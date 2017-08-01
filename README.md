# EpiTransport
Application mobile hybride ionic implémentant l'API Navitia
* Affiche les moyens de transports en fonction de la région et du pays.
* Affiche les iténéraires possibles en fonction de l'heure d'un point A a B.
* Affiche les arrêts d'une ligne spécifique.

### Dependances
* Ionic
* NodeJS
* Cordova

### Installation
``` 
npm install -g ionic@2.2.3 cordova
npm install
```

### Lancement sur chrome
```
ionic serve -w chrome (launch on locahost:XXXX)
```
### Build APK de debug
apk de debug dispo dans le répertoir apk

### Build APK
* For android signed :
     * ionic platform add android
     * ionic build android --release
     * ionic buid android
* For IOS signed:
     * ionic platform add ios
     * ionic build ios --release
     * ionic build ios


### Screenshoots 
> Accceuil 
> - Première page que l'utilisateur voir, il peut rentrer une adresse de départ et d'arrivé et modifier l'heure de départ <p>
![Acceuil](https://raw.githubusercontent.com/AlexJosse/EpiTransport/master/EpiTransport-screen/home.PNG) <p>
> Detail du trajet lors d'un clique sur un resultat
> - Affiche la durée, les correspondances <p>
![detail d'un trajet](https://raw.githubusercontent.com/AlexJosse/EpiTransport/master/EpiTransport-screen/detail.PNG) <p>
> Affiche les lignes diponible en fonction de la region <p>
![lignes disponible](https://raw.githubusercontent.com/AlexJosse/EpiTransport/master/EpiTransport-screen/lignes.PNG) <p>
> Detail de la ligne
> - Affiche les arrêts et toutes les lignes passant par ces arrêts <p>
![detail d'une ligne](https://raw.githubusercontent.com/AlexJosse/EpiTransport/master/EpiTransport-screen/detail-lignes.PNG) <p>
> Filtre permettant à l'utilisateur de filtrer les resultats <p>
![filtre sur les arrêts](https://raw.githubusercontent.com/AlexJosse/EpiTransport/master/EpiTransport-screen/filtre-detail.PNG)
