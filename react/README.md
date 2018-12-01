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

![reactApp](/images/ui.PNG)

Yksinkertainen alkunäkymä, jossa pyydämme käyttäjää rekisteröitymään tai kirjautumaan sisään, jollei kirjautumista ole sessiomuistissa.

![Login](/images/login.PNG)

Login toteutettu popup tyylisenä, sulkeminen tapahtuu klikkaamalla loginin ulkopuolelle tai close buttonilla. Nimi ja salasana placeholderit aikaisemmassa versiossa toteutettiin blurrin ja onfocusin avulla, mutta muistuessa mieleen HTML sisäänrakennettu placeholder toiminnallisuus siirryimme siihen.

![Register](/images/register.PNG)

Rekisteröinti toteutettu samanlailla kuin login popup.

![No tag](/images/notag.PNG)

![Chart selection](/images/chartchoice.PNG)

Käyttäjä voi valita mistä datasta haluaa piirtää kaavion, tämän lisäksi valita voi kolmesta erilaisesta kaaviosta.

![Bar chart](/images/bar.PNG)
![Line chart](/images/line.PNG)
![Donut chart](/images/donut.PNG)
![Login error](/images/loginerror.PNG)
![Password matching](/images/passmatch.PNG)


