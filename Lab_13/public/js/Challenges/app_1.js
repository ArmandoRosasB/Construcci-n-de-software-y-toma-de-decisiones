// Cuadrados y Cubos

//Funciones
function addRow(number){
    let tablebody = document.getElementById("tbody");
    let newRow = tablebody.insertRow();
    
    newRow.innerHTML = `
        <td>${number}</td>
        <td>${Math.pow(number, 2)}</td>
        <td>${Math.pow(number, 3)}</td>`
    ;

    if (number % 2 == 0){
        newRow.style.background = "#34393c";
    }
 
}


let flag = false;
let numero_magico;


while (!flag){ // Comprobamos que el usuario entregue un numero
    numero_magico = prompt("Porfavor digita un numero");
    numero_magico = Number.parseInt(numero_magico);

    if (Number.isNaN(numero_magico) || numero_magico < 1 || numero_magico > 100){
        console.error("Introduce un valor entero mayor o igual a 1 y menor a 100");
        alert("Introduce un valor entero mayor o igual a 1")
    }
    else {
        flag = true;
    }
}


for(let i = 1; i <= numero_magico; i++){
    addRow(i);
}

