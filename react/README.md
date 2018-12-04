# Tekijät

Hannu Oksman L2912, Antti Tarvainen L4623, Joose Seppälä M3579

# Käyttäjätunnukset

React: han@oks.fi, sala1234. Uusia käyttäjiä voi rekisteröidä, mutta heille ei ole asetettu RuuviTag-sensoria, joten heille ei voi piirtää dataa. Tällä hetkellä tarvitsee käyttäjään liitetyn sensorin, jotta näkee dataa. Laravelin puolella on admin-hallintapaneeli, mutta siihen ei ehditty toteuttaa toiminnallisuutta, jolla käyttäjille tai käyttäjät voisivat lisätä ja poistaa sensoreita.

# Yleiskuvaus/suunnitelma

TTOS0900 kurssille tekemäämme Laravel APIa hyödyntävä npm React sivu. Tarkoituksena on hyödyntää apista saatavaa dataa kaavioiden piirtämiseen reactilla ja chart.js kirjastolla. Autentikointiin käytämme myös apin toimintoja.

Toimintoja 
* sisäänkirjautuminen ja rekisteröityminen.
* käyttäjätietojen muokkaus, password reset.
* lämpötila-, kosteus- ja läsnäolodatan haku apista.
* kaavioiden piirtäminen chart.js:llä

# Käyttöliittymä

Kaikenlaisen tyylittelyn jätimme tärkeysjärjestyksessä alimmaksi, joten tämän kannalta on tehty vain bare minimum.

Konditionaaliseen renderäykseen käytetty useita menetelmiä, if else jos halusimme monia eri vaihtoehtoja samaan kohtaan eri tilanteissa. Ternary operaattoria jos komponentteja vain toggletaan pois tai päälle, tosin tämäkin on vain lyhennys if elsestä, mutta siistimpi ehkä käyttää render metodissa.

Komponenttien renderöintiehdot tallennettu boolean tiloiksi.

![reactApp](/images/ui.PNG)

Yksinkertainen alkunäkymä, jossa pyydämme käyttäjää rekisteröitymään tai kirjautumaan sisään, jollei kirjautumista ole sessiomuistissa.

![Login](/images/login.PNG)

Login toteutettu popup tyylisenä, sulkeminen tapahtuu klikkaamalla loginin ulkopuolelle tai close buttonilla. Nimi ja salasana placeholderit aikaisemmassa versiossa toteutettiin blurrin ja onfocusin avulla, mutta muistuessa mieleen HTML sisäänrakennettu placeholder toiminnallisuus siirryimme siihen.

![Register](/images/register.PNG)

Rekisteröinti toteutettu samanlailla kuin login popup.

![No tag](/images/notag.PNG)

Jos kirjautuneella käyttäjällä ei ole rekisteröityä Ruuvitagiä, hän ei voi hakea dataa.

![Login error](/images/loginerror.PNG)

Kirjautumista yrittäessä api palauttaa viestin jos tiedot ovat väärin, tämä renderöidään näin sattuessa käyttäjälle. Myös apin saavuttamattomuudesta tiedotetaan.

![Password matching](/images/passmatch.PNG)

Rekisteröityessä api myös palauttaa viestin epäonnistumisesta, mutta password ja password_conf tarkistus on tehty myös ohjelmallisesti.

![Chart selection](/images/chartchoice.PNG)

Käyttäjä voi valita mistä datasta haluaa piirtää kaavion, tämän lisäksi valita voi kolmesta erilaisesta kaaviosta. Tarkoituksena oli hakea dataa käyttäjään liitetyn RuuviTagin macin avulla, mutta apin RuuviTag::find() palauttaa saman 10 merkin osan idstä, vaikka tägiä hakee kenen idllä.

Näin haemme siis vain kaikesta datasta 25kpl syötteitä, jotta saamme kaaviot piirrettyä.

![Bar chart](/images/bar.PNG)

Kaavioille on kaikille asetettu date/time x akselille ja arvot x akselille.

Title asetetaan käyttäjän valinnasta, tässä jos käyttäjä valitsee esim. Temp pylväskaavion ja sen jälkeen jonkun toisen pylväskaavion, title pysyy Temppinä, tämä jäi korjaamatta.

![Line chart](/images/line.PNG)

Viivakaaviossa oletus tyylityksenä on täyttää myös viivan alapuolinen osa.

![Donut chart](/images/donut.PNG)

Piirakkakaaviota voisi käyttää läsnäolon mittaamiseen paremmin, mutta tätä toiminnallisuutta ei ole apissa, joten tämä on vain esimerkkinä.

# Luokat

* App.js
  * Käytetään käyttäjän kirjautumisen tarkistamiseen ennen näkymän renderöintiä
  * Välittää käyttäjän tietoja mainiin jos käyttäjä on kirjautunut
* Main.js
  * Suurin osa toiminnallisuudesta
  * Välittää Navbarille ja muille luokille tarvittavia funktioita
  * Datan fetchaus tapahtuu täällä
  * Kaavioiden konditionaalinen renderäys chartmenussa tapahtuvien käyttäjän valintojen mukaan
* NavBar.js
  * Sisältää Login, Register ja User settings renderöintiä
  * Login yms buttonien renderöinti isLogged tilan mukaan
  * Käsittelee login ja registerin pyytämät toiminnot
* Login.js
  * Hoitaa login formin fetch postaamisen apille, vastauksen tallentamisen sessionstorageen ja kutsuu parent luokkien metodeja käsittelemään login/register
* Register.js
  * Toimii samalla tavalla kuin login mutta lähettää register pyynnön apille
* ChartMwnu.js
  * Hoitaa käyttäjän datan ja kaavion valinnat ja kutsuu parent classin funktioita käsittelemäan nämä
* Line.js, Bar.js, Doughtnut.js
  * Ottaa vastaan kaavion piirtämiseen käytettävän datan ja otsikon yms. optionit Main.jssästä ja renderöi kaavion
* public/customWorker.js
  * Kaappaa fetchit ja tarkistaa cachestä löytyykö haettu data jo valmiiksi, jos ei niin data haetaan apista
* Loput workkerit olisivat hakeneet datan heti käyttäjän kirjautuessa, mutta tätä ei saatu toimimaan build versiossa

# Toteutuneet toiminnot

Saimme toteutettua suurimman osan toiminnoista, vaikka apin puutteet ei sallinut näiden työstämistä täydelliseksi.

Kirjautuminen ja rekisteröityminen toimivat saumattomasti.

Kaavioiden piirtäminen toimii, tähän yritimme rakentaa webWorkkereitä pirtäämään kaavion valmiiksi, webworker ei toimi.

Datan hakeminen toimii reactista apiin, tähän myös otimme käyttöön webWorkkerit, jotka hakivat datan valmiiksi heti käyttäjän kirjauduttua. Fetchworkkerit toimivat vain devaus vaiheessa, npm run build jälkeen workkerit lakkasivat toimimasta.

Ylimääräisenä otimme käyttöön osaksi sisäänrakennetun create-react-appiin ja osittain itse kustomoimamme service workkerin, joka ns. toimii proxyna sivun ja apin välissä.

Kaikki fetchit menevät serviceworkkerin kautta ja worker tarkistaa ensin onko cachessä jo valmiiksi haettavaa dataa, jos ei fetch lähetetään apille asti ja response tallennetaan cacheen ja palautetaan alkuperäiseen fetchiin.

![Data fetch without worker](/images/datafetch1.PNG)

Ilman serviceworkkeriä jokainen datan haku kestää >400ms, workkerin avulla ensimmäisen haun jälkeiset haut kestävät vain <5ms.

![Data fetch with worker](/images/datafetch2.PNG)

Serviceworkkerillä olisi myös mahdollista precachea esim. koko sivusto offline-käyttöä varten.

# Ei toteutetut toiminnot

Käyttäjän tietojen muokkaus jäi ajan loppuessa puuttumaan.

# Ei-toimivat toiminnot

Datan haku apista ruuvitagin idtä käyttämällä ei onnistu, tämä tosin johtuu apista.

Webworkkerien toimintaa yritimme monella eri tekniikalla saada toimimaan build versiossa. Dev ympäristössä webworkkerit sai toimimaan käyttämällä webpackiä muuttamaan worker url muotoon. Näin worker saatiin toimimaan erillään muusta toiminnasta, mutta npm buildatessa reitit oletettavasti hajosivat ja workkerit irtosivat projektista.

Yritimme myös react app rewired kirjastoa, joka sallii webpackin konfiguroinnin ilman npm ejectiä, mutta tässä myöskään workerit eivät toimineet buildissa.

## Lähdetiedostojen ja riippuvuuksien käsittely webpack:lla

* webpack on staattinen moduulien paketointikirjasto, joka paketoi koodit, kuvat, scriptit, html-sivut ynnä muut proktin käyttämät tiedostot build-vaiheessa.
* Lopputuloksena on yksi tai useampi tiedosto, jotka on helppo siirtää tuotantoympäristöön. Useampi tiedosto voi olla tarpeen, jos ohjelma on suuri, jolloin sivuston latausaika on nopeampi, kun ei tarvitse yhtä suurta tiedostoa ladata kerralla. Muut tiedostot latautuvat asynkronisesti.
* Paljon muita hyviä tuotantoa tukevia ominaisuuksia kts. [npm-sivu](https://www.npmjs.com/package/webpack) ja [virallinen sivu]( https://webpack.js.org/concepts/).

### Meidän webpack-käyttö

* Saimme säädettyä asetukset niin, että webpack paketoi kaiken yhteen js-tiedostoon. Mutta kun sen sitä palveli esim. [serve:lla](https://www.npmjs.com/package/serve), niin tuli anonymous-virheitä, joita ei ehditty selvittää.
* Muutenkin meni monta tuntia, että sai ratkottua JSX-liittyviä ongelmia konfiguroinneissa.
* Olisi pitänyt ottaa webpack heti alussa käyttöön, jotta ongelmat olisi ollut nopeampia selvittää ja saada asetukset oikein.
* Konfiguraatiotiedostot kommentteineen ovat [täällä](https://github.com/atarvainen/reactIoTproject/blob/master/webpackconfs.txt).
* Alla on kuva onnistuneesta webpack:n käytöstä. Alussa on "Chunk Names"-jossa on ulostulevat tiedostot. Tässä siis kaikki on paketoitu bundle.js. Lopussa generoidaan vielä index.html automaattisesti. Seuraavaksi siirtää vain index.html ja bundle.js tuotantopalvelimelle.

![webpackbuild](https://github.com/atarvainen/reactIoTproject/blob/master/images/npmrunbuild.PNG)

# Ongelmatilanteita

Reactin toteutus kärsi samanaikaisesta apin devauksesta. Apin ollessa erillisillä virtuaalikoneilla, ei aina samassa osoitteessa, eikä välillä edes toiminnassa toi haasteita fetchien toiminnallisuuden toteuttamiseen. Suurin osa toiminnoista kuitenkin vaativat apin toimiakseen.

Virtuaalikoneilla kaavioiden piirtäminen tuotti ongelmia. Yritimme siirtää kaavioiden renderäyksen toiminnan webworkkereille, mutta webpackiä käyttäviin workereihin luokkien importtaaminen ei onnistunut. Tämä ei tosin ole ongelma normaalissa käyttöympäristössä, tai jos virtuaalikoneelle antaa käyttöön enemmän resursseja.

Buildin jälkeinen toiminta tuotti ongelmia erityisesti workkerien osalta, npm ei osannut rakentaa webworkerien polkuja oikein. Buildaaminen onnistui ongelmitta, mutta sivusto ei saanut lähetettyä tietoa workkereille.

Serviceworkerin käyttö devaus vaiheessa oletuksena on pois päältä, mutta workerin toimintaa muuttaessa tämä otettiin pois päältä.

Devaus serviceworkkerin päällä ollessa, worker tallensi cacheen koko sivuston ja muutoksia ei saanut näkyviin ilman cachen tyhjennystä. Tämän tajuamiseen meni hukkaan pari tuntia.

# React app käyttöönotto

Reactin muunnos build versioon onnistuu yksinkertaisesti vaihtamalla package.json tiedostoon haluttu "homepage" ja ajamalla terminaalissa npm run build. Tämän jälkeen build kansion sisältö voidaan siirtää haluttuun kohteeseen.

# Pohdinta

Saimme mielestämme tehtyä toimivan ratkaisun RuuviTagien datan visualisointiin apista. Osa toiminnallisuudesta jäi puuttumaan ajan puuutteen vuoksi ja osaa ratkaisuista emme saaneet toimimaan, kuten haluttu, mutta kokonaisuutena projekti onnistui hyvin.

# Arvioinnit

* Hannu Oksman: 5
  * En ehtinyt käyttää tähän ihan niin paljon aikaa kuin olisin halunnut. Osallistuin kuitenkin kaikkeen, selvitykseen ja tutkimukseen tein osioita ja tiedän miten ohjelma toimii. Tutustuin myös webpack-komponentin käyttöön, jolla saa paketoitua projektin hyvin käännösvaiheessa.
* Antti Tarvainen: 5
  * Reactin tekeminen kallistui hieman enemmän minulle. Workkereiden kanssa säätämiseen meni suurin osa ajasta, sain toimimaan dev ympäristössä hyvin, mutta buildissa ei. Takaisin workkereistä siirtyminen vei hieman turhaa aikaa. Muuten projekti onnistui minun osaltani hyvin.
* Joose Seppälä: 1
  * Työ minun kohdalta pahasti ohitse, ulkomaan reissun takia ja missasin react ja laravel tunnit, Tekemättömien tehtävien takia oli vaikea päästä mukaan ja aika loppui armottomasti kesken.



