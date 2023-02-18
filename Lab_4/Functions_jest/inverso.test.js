const inverso = require('./inverso')

test('Properly reverting a number', () =>{
    expect(
        inverso(1234)
    ).toBe(
        4321
    )

    expect(
        inverso(8765)
    ).toBe(
        5678
    )

    expect(
        inverso(1987)
    ).toBe(
        7891
    )

})