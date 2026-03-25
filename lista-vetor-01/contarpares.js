let nums = [15, 18, 9, 7, 19, 4, 22, 52]
let a = 0

for (let i = 0; i < nums.length; i++) {
    if (nums[i] % 2 === 0) {
        a = a + 1
    }
}

console.log(a)
