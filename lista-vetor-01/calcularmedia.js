let nums = [1, 2, 3, 4, 5]
let c = 0
let b = 0

for (let i = 0; i < nums.length; i++) {
    c = c + nums[i]
}

let a = c / nums.length

console.log("A média é:", a)
