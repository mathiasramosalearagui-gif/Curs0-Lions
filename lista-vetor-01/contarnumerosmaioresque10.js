let nums = [12, 5, 22, 2, 10, 7, 18, 32]
let a = 0

for (let i = 0; i < nums.length; i++) {
    if (nums[i]> 10) {
        a = a + nums[i]
    }
}

console.log("A soma de todos os números maiores que 10 é", a)