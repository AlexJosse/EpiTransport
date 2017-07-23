# EpiTransport
application mobile hybride ionic implémentant l'API Navitia
-Possibilité d'afficher les moyens de transports les plus près;
-D'avoir un iténéraire d'un point A a B avec filtres (correspondance, moins de marche, plus rapide)
-D'avoir des informations des les lignes

# dependencies
Ionic, NodeJS, Cordova

# Installation
npm install

# Simulated on chrome
ionic serve -w chrome (launch on locahost:XXXX)

# Build APK
-For android signed :
     ionic build android --release
     or debug
     ionic buid android
-For IOS signed:
     ionic build ios --release
     or debug
     ionic build ios
