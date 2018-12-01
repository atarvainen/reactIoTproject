# Tekijät

Hannu Oksman L2912, Antti Tarvainen L4623, Joose Seppälä M3579

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

# Komponentit

* App.js
  * Käytetään käyttäjän kirjautumisen tarkistamiseen ennen näkymän renderöintiä
  * Välittää käyttäjän tietoja mainiin jos käyttäjä on kirjautunut
* Main.js
  * Suurin osa toiminnallisuudesta
  * Välittää Navbarille ja muille komponenteille tarvittavia funktioita
  * Datan fetchaus tapahtuu täällä
  * Kaavioiden konditionaalinen renderäys chartmenussa tapahtuvien käyttäjän valintojen mukaan
* NavBar.js
  * Sisältää Login, Register ja User settings renderöintiä

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

# Ongelmatilanteita

Reactin toteutus kärsi samanaikaisesta apin devauksesta. Apin ollessa erillisillä virtuaalikoneilla, ei aina samassa osoitteessa, eikä välillä edes toiminnassa toi haasteita fetchien toiminnallisuuden toteuttamiseen. Suurin osa toiminnoista kuitenkin vaativat apin toimiakseen.

Virtuaalikoneilla kaavioiden piirtäminen tuotti ongelmia. Yritimme siirtää kaavioiden renderäyksen toiminnan webworkkereille, mutta webpackiä käyttäviin workereihin komponenttien importtaaminen ei onnistunut. Tämä ei tosin ole ongelma normaalissa käyttöympäristössä, tai jos virtuaalikoneelle antaa käyttöön enemmän resursseja.

Buildin jälkeinen toiminta tuotti ongelmia erityisesti workkerien osalta, npm ei osannut rakentaa webworkerien polkuja oikein. Buildaaminen onnistui ongelmitta, mutta sivusto ei saanut lähetettyä tietoa workkereille.

Serviceworkerin käyttö devaus vaiheessa oletuksena on pois päältä, mutta workerin toimintaa muuttaessa tämä otettiin pois päältä.

Devaus serviceworkkerin päällä ollessa, worker tallensi cacheen koko sivuston ja muutoksia ei saanut näkyviin ilman cachen tyhjennystä. Tämän tajuamiseen meni hukkaan pari tuntia.

# React app käyttöönotto

Reactin muunnos build versioon onnistuu yksinkertaisesti vaihtamalla package.json tiedostoon haluttu "homepage" ja ajamalla terminaalissa npm run build. Tämän jälkeen build kansion sisältö voidaan siirtää haluttuun kohteeseen.

# Pohdinta





