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

module.exports = inverso;