let nums = [2,4,6,8,10,12]
let c = 0
let a = false
let b = 0

for (let i = 0; i < nums.length; i++) {
    c = nums[i]
    b = i + 1

    if (c  > nums[b] ) {
        console.log("Não crescente")
        a = false
        break;
    } else {
        a = true
    }
}

if (a === true) {
    console.log("Crescente")
}
