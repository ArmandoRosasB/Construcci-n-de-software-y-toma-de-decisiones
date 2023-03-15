/*Película(título, año, duración, encolor, presupuesto, nomestudio, idproductor)
Elenco(título, año, nombre, sueldo)
Actor(nombre, dirección, telefono, fechanacimiento, sexo)
Productor(idproductor, nombre, dirección, teléfono)
Estudio(nomestudio, dirección)*/

-- 1.- Actrices de “Las brujas de Salem”.

SELECT A.nombre
FROM Elenco e, Actor A
WHERE E.nombre = A.nombre
AND sexo = 'F'
AND titulo = 'Las brujas de Salem';


SELECT nombre
FROM Elenco 
WHERE titulo = 'Las brujas de Salem'
AND nombre IN ( SELECT nombre
                FROM Actor
                WHERE sexo = 'F');

-- 2.- Nombres de los actores que aparecen en películas producidas por MGM en 1995.

SELECT P.nombre 
FROM Elenco e, Pelicula P
WHERE e.titulo = p.titulo
AND e.anio = a.anio
AND e.anio = 1995
AND p.nomestudio = 'MGM';

SELECT nombre
FROM Elenco
WHERE titulo IN (SELECT titulo
                FROM Pelicula
                WHERE anio = 1995
                AND nomestudio = 'MGM');




-- 3.- Películas que duran más que “Lo que el viento se llevó” (de 1939).

CREATE SYNONYM target FOR Pelicula

SELECT p.titulo FROM Pelicula p, target t
WHERE t.titulo = 'Lo que el viento se llevo'
AND t.anio = 1939
AND p.duracion > t.duracion;

SELECT titulo FROM Pelicula
WHERE duracion > (SELECT duracion FROM Pelicula WHERE titulo = 'Lo que el viento se llevó' AND anio = 1939);


-- 4.- Productores que han hecho más películas que George Lucas.

CREATE SYNONYM target FOR Productor

SELECT p.nombre FROM Productor pr, target t, pelicula pe
WHERE pr.id = pe.idproductor
AND t.nombre = 'GEORGE LUCAS'
AND 

SELECT pr.nombre FROM Productor pr, Pelicula pe
HAVING COUNT(pe.idproductor) >
(SELECT COUNT(*)
FROM Pelicula pe Productor pr
WHERE pe.idproductor =  pr.id
AND pr.nombre = 'George Lucas');



-- 5.- Nombres de los productores de las películas en las que ha aparecido Sharon Stone.



-- 6.- Título de las películas que han sido filmadas más de una vez