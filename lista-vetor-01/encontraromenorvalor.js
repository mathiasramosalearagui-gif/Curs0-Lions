let nums = [11, 2, 32, 4, 9]
let c = nums[0]

for (let i = 0; i < nums.length; i++) {
    if (nums[i] < c) {
        c = nums[i]
    }
}

console.log("O menor valor é:", c)