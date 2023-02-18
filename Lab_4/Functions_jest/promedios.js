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

module.exports = promedios;