let numsA = [2, 5,7,2,2,8,4,6,7,8,]
let x = 0
// o número escolhido como "x" é o "2"

for (let i = 0; i < numsA.length; i++) {
    if (numsA[i] === 2) {
        x = x + 1
    }
}

console.log("O número escolhido repetiu", x, "vezes")