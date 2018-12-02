# Web-palvelinohjelmointi TTMS0900 –opintojakson harjoitustyö

## Rest-rajapinta Laravel-sovelluskehyksellä

### [Hannu Oksman L2912](https://github.com/szeretni), [Joose Seppälä M3579](https://github.com/jooseba), [Antti Tarvainen L4623](https://github.com/atarvainen)

## Johdanto

Saimme idean tähän harjoitustyöhön IoT-järjestelmän toteutus –opintojaksosta, joka tarvitsi oman taustaohjelmiston datan käyttöä varten. Lyhyesti sanottuna toteutimme IoT-ratkaisun, jossa RuuviTag-sensoreiden lähettämää dataa vastaanotetaan Raspberry Pi –tietokoneella Bluetooth-yhteyden avulla. Raspberry Pi käsittelee dataa ja julkaisee sen MQTT-protokollalla JSON-muodossa. Labranetissä oleva virtuaalikone tilaa MQTT-otsikkoa ja tallentaa datan MySQL-tietokantaan. [IoT-toteutuksen dokumentaatio (ei ajantasalla).](https://github.com/atarvainen/IoT_Project)

Representational State Transfer (REST) on HTTP-protokollaan perustuva arkkitehtuurimalli ohjelmointirajapintojen toteuttamiseen (Rantala 2018). Käytämme PHP-kielen Laravel-sovelluskehystä rajapinnan toteuttamiseen. Rajapinnat ovat tyypillisiä REST-resursseja, jotka käyttävät HTTP-metoda GET, PUT, POST ja DELETE. Olemme toteuttaneet React-ohjelman, joka hyödyntää rajapinnoista haettavaa mittausdataa, käyttäjätietoja ja sensoritietoja. [React-toteutuksen dokumentaatio.](https://github.com/atarvainen/reactIoTproject/tree/master/react)

Saimme toteutettua toimivan kokonaisuuden, joka on kohtuullisen monipuolinen. Käytämmä mm. osassa rajapintoja api_token –avainta, jolla rajoitetaan ketkä saavat pyyntöihin vastauksen. Ongelmia oli erittäin paljon ja emme käyttäneet tuntikirjanpitoa, joten emme tarkkaan kykene osoittamaan, kuinka paljon olemme käyttäneet aikaa eri haasteisiin. Lähdekoodit ovat tässä kansiossa ja ohjelma pyörii Labranet:ssa olevalla virtuaalikoneella (IP-osoite: 192.168.9.133).

### Tietokantakuvaus

Osa tauluista tehtiin ennen kuin Laravel-projekti alkoi ja osa tauluista on tehty php artisan make:migration -toiminnallisuudella. Meidän tekemät migrate-tiedostot ovat [/database/migrations](https://github.com/atarvainen/reactIoTproject/tree/master/laravel/database/migrations)-kansiossa ja ne on ajettu tietokantaan php artisan migrate:lla. 

![databaseschema](../laravel/images/iotschema.png)

### Rajapintakuvaukset

[Rajapintakuvauksia (ei ole kirjoitettu kaikista resursseista)](../laravel/interfacedescription.md)

Suurin osa reiteistä ovat api.php:ssa ja osa niistä vaatii api_token:n käyttöä. /api/-resurssit on tarkoitettu toisten ohjelmien, kuten React, käytettäväksi. web.php:ssa on Laravel:n admin-paneelin käyttämät reitit ja ne vaativat kirjautumisen, mutteivät api_token.

#### Advanced Rest Client:lla lähetetty pyyntö POST /api/login -rajapintaan

POST-pyynnöissä parametreja välitetään kutsun sisällä ("Body", vrt. osoiterivimuuttujat ("string queries" esim. url?sum=1+1)) JSON-muodossa. 

![postloginrequest](../laravel/images/postloginrequest.png)

#### Vastaus

Rajapinta palauttaa käyttäjätiedot, api_token -avaimen sekä käyttäjälle osoitetut RuuviTag-sensorien tiedot.

![postloginresponse](../laravel/images/postloginresponse.png)

## Lista tiedostoista, joita olemme kommentoineet

* /app/Admin.php
* /app/Data.php
* /app/Ruuvitag.php
* /app/RuuvitagsUser.php
* /app/User.php
* /app/Exceptions/Handler.php
* /app/Http/Kernel.php
* /app/Http/Controllers/DataController.php
* /app/Http/Controllers/RuuvitagController.php
* /app/Http/Controllers/UserController.php
* /app/Http/Controllers/Auth/LoginController.php
* /app/Http/Controllers/Auth/RegisterController.php
* /app/Http/Middleware/Authenticate.php
* /app/Http/Middleware/CORS.php
* /app/Http/Requests/AdminTools.php
* /database/migrations - php artisan make:lla tehdyt templatet
* /database/seeds/ProductsTableSeeder.php - tässä kokeiltu tietokannan täyttöä testi/dummy-datalla
* /resources/views/-kansio
* /resources/views/layouts/app.blade.php
* /routes/api.php
* /routes/web.php

## Toteutumattomat tai vajaaksi jääneet ominaisuudet

* Admin-paneeli, josta voisi lisätä ja poistaa Ruuvitag-sensoreita sekä käyttäjiä.
* Käyttäjät eivät voi asettaa itselleen tai poistaa itseltään Ruuvitag-sensoreita

## Kohdattuja ongelmia (paljon enemmän oli, joita emme enää muista)

* CORS-ongelmia kun Laravel ja React ovat eri verkoissa
   * Saatu toimimaan laittamalla tarvittavia otsakkeita suoraan Controllerin sisälle, ei hyvä ratkaisu
   * Kirjoittamatta otsakkeet /bootstrap/app-tiedostoon. Selkeä ratkaisu, kaikki yhdessä paikassa.
   * Apache .htaccess-tiedoston avulla. Ei saatu tyydyttävästi toimimaan. Silloin meillä oli tosin samalla palvelimella eri porteissa http ja Laravel, turhan monimutkaista ilman Linux-palvelinkurssia.
   * Omia luokkia netissä olevien esimerkkien pohjalta. Toimi jotenkuten. Parempi kuitenkin käyttää valmista palikkaa.
   * Barryvdh CORS Middleware for Laravel 5 on lopullisessa toteutuksessa ja sille on hyvät käyttöönotto-ohjeet GitHub:ssa.
   * Asetukset ovat /vendor/barryvdh/laravel-cors/config/cors.php -tiedostosssa.
* Labranetin virtuaalikoneella liian vähän resursseja. Kaikki kyselyt eivät toimineet, poistettu 30.11. 150000 riviä Data-taulusta
* Mixed Content kun Laravel Labranetin virtuaalikoneella ja React Studentilla. Korjattu ottamalla virtuaalikoneella käyttöön itse allekirjoitettu sertifikaatti, jolloin saatu https käyttöön. Aikaisemmin ei ongelma kun Student oli http.
* Transaktio-ongelma tietokannan kanssa. Havaittu bugi kun login, jolloin generoidaan uusi api_token ja palautetaan käyttäjätiedot. Ongelma oli, että joskus palautui vanha api_token eli uusi generoitu api_token ei ollut ehtinyt tallentua tietokantaa. Tästä johtui tuntiesityksessä ollut "unauthorized"-ongelma. Korjattu siten, että login tallentaa kantaan ja palauttaa suoraan uuden api_token, eikä erikseen hae sitä kannasta. Tässä olisi voinut kokeilla Laravelin transaktioita, muttemme ehtineet.

## Pohdinta

* Andreé Castelo:n Laravel Rest Api -tutoraali oli hyödyllinen hahmottamaan miten tehdä hyvien käytänteiden mukaan Laravelilla Rest API. https://www.toptal.com/laravel/restful-laravel-api-tutorial
* Onnistuimme toteuttamaan suhteellisen laajan kokonaisuuden, josta olemme ylpeitä.
* Kehitysideoita seuraavia projekteja ajatellen:
   * Tuntikirjanpito vartin tai puolen tunnin tarkkuudella. Teimme älyttömän määrän tunteja tänä syksynä tähän kokonaisuuteen liittyen, mutta kaikkea ei voi nyt osoittaa. Olemme tehneet todella paljon työtä, joka ei näy lopullisessa koodissa tai ympäristössä. Hukkaan sekään aika ei toki ole mennyt, olemme oppineet paljon ja saanut kohtuullisen laajan ja selkeän kuvan full stack -toteutuksesta (sensorit, palvelimet, siirtoväylät, kannat, backend, frontend jne.) ja MVC-mallista.
   * Meidän oli hankala kehittää rinnakkain samaa ohjelmaosiota. Esim. Antti teki enemmän React kuin Hannu ja toisinpäin Laravel:n suhteen, jotta 1) ei tule merge conflicts, 2) saa toteutetua rauhassa jonkun osakokonaisuuden, jos on näkemys miten voi tehdä, 3) eritahtisuus työajassa. Hannu teki enimmäkseen iltaisin, Antti enimmäkseen myöhemmin, jolloin ei kannata jäädä odottamaan itse tarvitsemaa komponenttia, jota toinen työstää. On parempi tehdä itse, jottei hukkaa aikaa. Eli lyhyesti taskitus ja projektinhallinta siten, että kaikki voivat tehdä kaikkea tasapainoisemmin.
   * Uuden koodin ja toiminnallisuuden kirjoittamisen täytyy loppua useampia päiviä ennen palautuspäivää, jotta jää aikaa ohjelman tuotantoympäristön siirtämiselle, toimivuuden tarkistamiselle ja dokumentoinnille. Nyt meillä hajosi tuotantopalvelin, jossa on toimivat buildit ja viimeisenä päivänä toteutimme vielä uutta toiminnallisuutta, joka aiheutti ongelmia.

## Itsearvioinnit

* Joose 2
   * Hommaan oli motia niinkuin web-ohjelmoinninkin puolesta, mutta ulkomaanreissu toi mukanaan 2vko jälkeenjäämisen melkein joka aineessa, mitä en ehtinyt kiriä kunnolla kiinni, joten aika loppui kesken. Viikkokin meni hukkaan kun sähkelsin laravelin asennuksessa enkä tajunnut ottaa konffaus tiedostosta pois puolipisteita ja manasin kun ei laraveli toimi. Siltä osin paljon aikaa ehdin käyttää työhön, onnistuin ihan ok omasta mielestäni.
   
* Hannu 5
   * Olin kaikessa mukana suunnittelusta palvelimelle laittoon ja tein kaikentyyppisiä tiedostoja ja asetuksia. En ehtinyt ohjelmoida niin paljon kuin olisin halunnut, esim. monipuolisempia rajauksia hauille ja yksikkötestien kirjoittaminen, mikä sinänsä on opintojakson laajuuden ulkopuolella, mutta olisi saattanut säästää aikaakin. Meillä kului tämän opintojakson kannalta tarpeettoman paljon aikaa palvelimien säätöön esim. https-käyttöönotto, useammassa portissa apache2 virtualhost, palomuuriasetukset ufw ja iptables. Halusimme kuitenkin tehdä täydellisen putken mittaussensorista loppukäyttäjän selaimeen.

* Antti 5
    * Suurin osa ajasta kului kaikenlaiseen konfigurointiin ja cors virheiden kanssa säätämiseen. Reittien suunnittelu apille onnistui mielestäni hyvin, tämä kuitenkin suurin osa toiminnallisuudesta. Validointiin ja vielä reittien lisäykseen olisi voinut käyttää lisää aikaa. Toteutus jäi hieman enemmän Hannulle loppuvaiheessa, mutta olin mukana suunnittelussa.
