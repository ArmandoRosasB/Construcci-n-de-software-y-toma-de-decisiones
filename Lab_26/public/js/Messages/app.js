document.getElementById('buscar-nombre').onkeyup = () => {
    const nombre = document.getElementById('buscar-nombre').value;

    //función que manda la petición asíncrona
    fetch('/AboutMe/Messages/buscar/' + nombre, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }

    }).then(result => {
        return result.json(); //Regresa otra promesa
    }).then(array => {

        let respuesta = "";
        if(array.nombres.length > 0) {
            array.nombres.forEach(element => { 
                console.log(element);
                respuesta += '<article class="message-item">';
                respuesta += '<div class="info">';
                    respuesta +=   `<h3 class="title">${element.fname} ${element.lname} </h3>`;
                    respuesta +=    `<h4> Programa en ${element.Planguage}</h4>`;
                    respuesta +=    `<h4>Correo: ${element.email}</h4>`;
                    respuesta +=   `<p class="description">${element.message}</p>`;
        
                    respuesta += '<button class="edit">Editar</button>';
                    respuesta += '<button class="delete">Borrar</button>';
                    respuesta += '</div>'

                    respuesta += `<img src="/uploads/${element.img}" alt="Foto">`;
                    respuesta += '</article>';
            })
        } 
            else { 
                respuesta += '<h1>No hay mensajes registrados</h1>';
            }   

            document.getElementById("aux").innerHTML = respuesta;
    }).catch(err => {
        console.log(err);
    });
};