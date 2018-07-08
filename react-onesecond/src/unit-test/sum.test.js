import { sum, fetchData } from "./sum"
let name = "";
beforeEach(() => {
    name = "i am init";
})

test('test sum function 1+2 = 3', () => {
    console.log(name);
    name = "i am first test"
    expect(sum(1, 2)).toBe(3);
})

test('test callback function', (done) => {
    console.log(name);
    function callback(data) {
        expect(data).toBe('i am fetched data')
        done()
    }
    fetchData(callback)
})

describe(`describe describe`, () => {
    test(`this is a test in describe`, () => {
        console.log(name)
    })
})