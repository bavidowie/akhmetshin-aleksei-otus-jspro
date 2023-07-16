function sum(term) {
    let total = term
    function subSum(b) {
        if (typeof b === 'undefined') {
            return total
        } else {
            total += b
            return subSum
        }
    }
    return subSum
}


console.log(sum(1)(2)(), '3')
console.log(sum(1)(2)(3)(), '6')
console.log(sum(5)(-1)(2)(), '6')
console.log(sum(6)(-1)(-2)(-3)(), '0')