# Tekijät

Hannu Oksman L2912, Antti Tarvainen L4623, Joose Seppälä M3579

# Yleiskuvaus/suunnitelma

TTOS0900 kurssille tekemäämme Laravel APIa hyödyntävä npm React sivusto. Tarkoituksena on hyödyntää apista saatavaa dataa kaavioiden piirtämiseen reactilla ja chart.js kirjastolla. Autentikointiin käytämme myös apin toimintoja.

Toimintoja 
* sisäänkirjautuminen ja rekisteröityminen.
* käyttäjätietojen muokkaus, password reset.
* lämpötila-, kosteus- ja läsnäolodatan haku apista.

# Toteutuneet toiminnot
# Käyttöliittymä

Kaikenlaisen tyylittelyn jätimme tärkeysjärjestyksessä alimmaksi, joten tämän kannalta on tehty vain bare minimum.

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


# Toteutuneet toiminnot

Saimme toteutettua suurimman osan toiminnoista, vaikka apin puutteet ei sallinut näiden työstämistä täydelliseksi.

Kirjautuminen ja rekisteröityminen toimivat saumattomasti.

Käyttäjän tietojen muokkais jäi ajan loppuessa puuttumaan.

