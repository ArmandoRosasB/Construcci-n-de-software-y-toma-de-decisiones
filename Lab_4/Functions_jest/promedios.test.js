const promedios = require('./promedios')

test('Properly calculating the average of every row in a matrix', () =>{
    expect(
        promedios([[9, 9.5, 10], [7, 7, 10], [10, 10, 10]])
    ).toStrictEqual(
        [9.5, 8, 10]
    )

    expect(
        promedios([[5, 10, 9], [10, 9], [10]])
    ).toStrictEqual(
        [8, 9.5, 10]
    )

    expect(
        promedios([[5, 4, 9], [9], [10]])
    ).toStrictEqual(
        [6, 9, 10]
    )

})