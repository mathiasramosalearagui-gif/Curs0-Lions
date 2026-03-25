let nums = [12, 4, 9, 19, 7, 15, 14, 8]
let a = 0

for (let i = 0; i < nums.length; i++) {
    if (nums[i] % 2 === 0) {
        a = a + nums[i]
    }
}

console.log("A soma de todos os pares é:", a)