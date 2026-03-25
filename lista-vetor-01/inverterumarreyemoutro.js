let numsA = [2,32,12,4,9]
let numsB = []
let j = 0;

for (let i = numsA.length - 1; i >= 0; i--) {
    numsB[j] = numsA[i]
    j++
}

console.log(numsB)