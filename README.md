# TTOMS0500 ja TTOMS0900

Yhdistettynä IoT kurssin Ruuvitageistä saadulle datalle rakennettu Laravel REST API rajapinta ja tätä hyödyntävä Node React frontend.

# Laravel API Query Builder

Admin paneeli Joose //tekee tämän
Autentikointi 


{"Count":159,"Temp":62,"Humidity":55,"Pressure":7953,"Acceleration-X":7615,"Acceleration-Y":9340,"Acceleration-Z":1252,"Power":702,"Time":"2018-11-19 15:35:42","RuuviTagId":"257385652260480"},

Tarvittavia queryja:

api/tagtempdaily
Temp + DateTime
Group by day

api/tagtemphourly/day
Temp + DateTime
Group by hour

api/taghumdaily
Humidity + DateTime
Group by day

api/taghumhourly/day
Humidity + DateTime
Group by hour

Tagin viimeisin Power ja DateTime

SELECT [activity_dt], count(*)
FROM table1
GROUP BY hour( activity_dt ) , day( activity_dt )


# React

näkymiä lisää
login lomake toimimaan
käyttäjätietojen vaihto
Maybe serviceworker
