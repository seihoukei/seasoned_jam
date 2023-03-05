const numbers = [1]

let a = 1
let b = 1
while(b < Infinity){
    numbers.push(b)
    ;[a,b] = [b, a+b]
}
export default class Fibonacci {
    static nth(x) {
        return numbers[x] ?? NaN
    }
}
