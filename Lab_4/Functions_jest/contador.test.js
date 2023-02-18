const contador = require('./contador')

test('Properly counting the positive, negative and zero values in an array', () =>{
    expect(
        contador([3, 2, 1, 0, -1, -2, -3])
    ).toStrictEqual({
        negative: 3,
        zeros: 1,
        positive: 3
    })

    expect(
        contador([3, 2, 1, 0, -1])
    ).toStrictEqual({
        negative: 1,
        zeros: 1,
        positive: 3
    })

    expect(
        contador([3])
    ).toStrictEqual({
        negative: 0,
        zeros: 0,
        positive: 1
    })

})