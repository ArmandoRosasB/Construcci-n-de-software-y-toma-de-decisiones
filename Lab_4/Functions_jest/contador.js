function contador(arr){
    let conteo = {
        negative: 0,
        zeros: 0,
        positive: 0
    };

    arr.forEach(element => {
        if(element < 0){
            conteo.negative++;
        }
        else if (element === 0){
            conteo.zeros++;
        }
        else{
            conteo.positive++;
        }
    });

    return conteo;
}

module.exports = contador;

