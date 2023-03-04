// Calculo mental
function deploy(answer, image, time){
    document.getElementById("Respuesta").innerHTML = 
    `Respuesta <span class = "color">${answer}</span>`;

    document.getElementById("imagen").innerHTML = 
    `<img src = "${image}" alt= "AnswerImage">`;

    document.getElementById("tiempo").innerHTML =
    `<p>Tardaste ${time/1000} segundos en responder</p>`;
}

//img links
const correct = "Media/Stuff/checked.png";
const wrong = "Media/Stuff/cancel.png";

let random_one = 1 + Math.floor(Math.random() * 100) // 1 - 100
let random_two = 1 + Math.floor(Math.random() * 100) // 1 - 100

let start = Date.now();

let answer = Number.parseInt(prompt(`${random_one} + ${random_two} = `));
let end = Date.now();

let time = (end - start);

if (answer == random_one + random_two){
    deploy("Correcta", correct, time);
}

else{
    deploy("Incorrecta", wrong, time);
}



