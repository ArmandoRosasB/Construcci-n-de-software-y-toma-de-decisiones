
-- Consultas

/*
SELECT campos
FROM tablas (JOIN)
WHERE (JOIN) [condiciones sobre campos]
GROUP BY [Columnas por agrupar]
HAVING [condiciones sobre funciones agregadas] ... count () min () max ()...
ORDER BY 
*/


-- Ejercicios  

/* Mostrar la descripcion de los materiales 
entregados al proyecto Queretaro limpio ordenados alfabetocamente*/
USE entregas;

SELECT M.Descripcion 
FROM materiales M, entregan E, proyectos P
WHERE M.clave = E.clave AND P.numero = E.numero
AND P.denominacion = 'Queretaro limpio'
ORDER BY Descripcion ASC;


/* Mostrar la razon social de los proveedores y el tota de unidades 
entregadas (sin importar el material) SOLO para aquellos proveedores 
que registraron mas de 1000 unidades ordenados de mayor a menor en funcion 
de las unidades entregadas)*/


SELECT P.razonSocial, SUM(E.cantidad) AS 'Total Unidades'
FROM entregan E, proveedores P
WHERE E.rfc = P.rfc 
GROUP BY P.razonsocial
HAVING SUM(E.cantidad) > 1000
ORDER BY SUM(E.cantidad) DESC;


/*Mostrar la descripcion de los materiales y el total de veces 
que han sido entregados sin importar el proveedor o proyecto durante 
la decada pasada ordenados de mayor a menor*/

SELECT M.descripcion, COUNT(*) AS 'Numero de entregas'
FROM materiales M, entregan E
WHERE M.clave = E.clave
AND E.fecha BETWEEN '2010-01-01' AND '2019-12-31'
GROUP BY m.descripcion
ORDER BY COUNT(*) DESC;


/*Mostrar la razon social de los proveedores que registraron mas entregas que el 
proveedor con razoon social Oviedo*/

SELECT P.razonsocial, COUNT(*) AS 'Entregas'
FROM proveedores P, entregan E
WHERE E.rfc = P.rfc
GROUP BY P.razonsocial
HAVING COUNT(*) > (SELECT COUNT(*) FROM entregan E, proveedores P WHERE E.rfc = P.rfc AND P.razonsocial = 'Oviedo');
