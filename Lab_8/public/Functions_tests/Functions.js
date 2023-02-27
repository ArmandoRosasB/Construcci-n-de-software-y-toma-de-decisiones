function contador(arr){
    let conteo = [0, 0, 0]

    arr.forEach(element => {
        if(element < 0){
            conteo[0]++;
        }
        else if (element === 0){
            conteo[1]++;
        }
        else{
            conteo[2]++;
        }
    });

    return conteo;
}

function promedios(matrix){
    const promedios = [];
    let aux;

    matrix.forEach(row => {
        aux = 0;
        row.forEach(element =>{
            aux+= element;
        })
        promedios.push(aux / row.length)
    })

    return promedios;
}

function inverso(number){
    let aux = 0;
    let unit;

    while(number > 0){
        unit = number % 10;
        aux = (aux * 10) + unit;

        number /= 10;
        number = Math.floor(number);
    }

    return aux;
}


// Comprobar funcion contador
const button1 = document.getElementById("test1");
button1.onclick = () => {
    const case1 = [12, 1, 3, 5, 6, 0, 0, -2];
    const case2 = [-4, 1, 0, 5, -5, 0, 0, -2];
    const case3 = [12, -7, 3, 0, 0, 0, 0, -2];

    console.assert(contador(case1).toString() == [1, 2, 5].toString(), "No paso este caso");

    console.assert(contador(case2).toString() == [3, 3, 2].toString(), "No paso este caso");

    console.assert(contador(case3).toString() == [2, 4, 2].toString(), "No paso este caso");


    document.getElementById("exito1").innerHTML = "Revisa la consola para ver si hay errores";
    
}

// Comprobar funcion contador
const button2 = document.getElementById("test2");
button2.onclick = () => {
    const case1 = [[8, 8.5, 9],[10, 10, 10],[10, 9.5, 9]];
    const case2 = [[7, 7.5, 8],[9, 9, 9],[0, 0, 0]];
    const case3 = [[7],[9, 9],[0]];

    console.assert(promedios(case1).toString() == [8.5, 10, 9.5].toString(), "No paso este caso");

    console.assert(promedios(case2).toString() == [7.5, 9, 0].toString(), "No paso este caso");

    console.assert(promedios(case3).toString() == [7, 9, 0].toString(), "No paso este caso");

    document.getElementById("exito2").innerHTML = "Revisa la consola para ver si hay errores";
}

// Comprobar funcion contador
const button3 = document.getElementById("test3");
button3.onclick = () => {
    const case1 = 1234;
    const case2 = 98765;
    const case3 = 2340;

    console.assert(inverso(case1) == 4321, "No paso este caso");

    console.assert(inverso(case2) == 56789, "No paso este caso");

    console.assert(inverso(case3) == 432, "No paso este caso");

    document.getElementById("exito3").innerHTML = "Revisa la consola para ver si hay errores";
}


const randomButton1 = document.getElementById("ran1");
randomButton1.onclick = () => {
    const arr = [];
    const size = 2 + Math.floor(Math.random() * 3);

    document.getElementById("res1").innerHTML = "<p>"

    for(let i = 0; i < size; i++){
        let aux = -5 + Math.floor(Math.random() * 10);
        arr.push(aux);
        document.getElementById("res1").innerHTML += `${aux}, `;
    }

    const res = contador(arr);
    document.getElementById("res1").innerHTML += ` => <br><br>Negatives: ${res[0]}<br>Zeros: ${res[1]}<br>Positives: ${res[2]}</p>`;

}

const randomButton2 = document.getElementById("ran2");
randomButton2.onclick = () => {
    const matrix = [];
    const row = 2 + Math.floor(Math.random() * 3);
    const col = 2 + Math.floor(Math.random() * 3);

    const table = document.getElementById("table");
    table.innerHTML = "";

    for(let i = 0; i < row; i++){
        let trow = table.insertRow();
        let arr = [];
        for(let j = 0; j < col; j++){
            let aux = -5 + Math.floor(Math.random() * 10);
            arr.push(aux);
            trow.innerHTML += `<td>${aux}, </td>`;
        }
        matrix.push(arr);       
    }

    const res = promedios(matrix);
    document.getElementById("res2").innerHTML = ' => Averages: ';
    res.forEach(element => {
        document.getElementById("res2").innerHTML += `${element.toFixed(2)}, ` 
    });

}

const randomButton3 = document.getElementById("ran3");
randomButton3.onclick = () => {
    const num = 1000 + Math.floor(Math.random() * 1000);

    let result = document.getElementById("res3");
    result.innerHTML = `<p> ${num} => ${inverso(num)}</p>`;

}

