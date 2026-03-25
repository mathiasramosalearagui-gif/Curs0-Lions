let nums = [22, 12, 8, 4, 5, 15]
let a = 0

for (let i = 0; i < nums.length; i++) {
    if (nums[ i ]> a) {
        a = nums[i]
    }
}

console.log("O maior número é:", a)