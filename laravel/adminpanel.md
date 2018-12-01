# Admin Panel

## Johdanto
Tarkoituksena oli tehdä projektiin oma admin paneeli, mistä voidaan muokata MySQL-tietokantaa käyttäjien kohdalta. Toimintoja käyttöliittymässä olisi käyttäjän tietojen hakeminen, muokkaaminen ja poistaminen.

## Admin näkymä
Tässä on kuva admin panelin muokkaus näkymästä.
![Admin Edit näkymä](../images/apedit.PNG)
Edit linkki hakee uuden näkmyän laravelista, mikä määriytyy painetun sarakkeen käyttäjän id mukaan. Tällöin muokattavien kenttien kentät muuttuvat input elementeiksi, jolloin päästään muokkaamaan tietoja. Save napin kuuluisi lähettää form POST methodia käyttäen, mutta emme saaneet nappia toimimaan. Sivustoa emme saaneet mitenkään reagoimaan Save napin painalluksella, eli formin tiedot ei ikinä lähteneet liikkeelle. Delete linkki puolestaan poistaa koko käyttäjän tiedot tietokannasta.

## Toteuttamatta jääneet toiminnot

Käyttäjien tietojen tallentaminen. Deletoinnin toimiminen kaikkien käyttäjien kohdalla.

## Kohdatut ongelmat

Formin toiminta laravelissa. Mystisen virheen takia, emme saaneet toimimaan laravelin formin POST methodia ollenkaan. Laravelin omat ohjeet eivätkä muut netistä löytyneet lähteet ratkaisseet ongelmaa. Kokeilimme harjoitustöiden toimivia formeja, mutta nekään eivät toimineet jostain syystä laravel ympäristössämme.

Käyttäjän poistaminen ei toimi kaikkien kohdalla, sillä osa tiedoista tulee välitaulun kautta. Ongelma huomattiin vasta dokumentointi vaiheessa, eikä ollut aikaa enää korjata sitä.
