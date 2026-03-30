let nums = [11, 12, 31, 44, 52]
let c = 0
let c2 = 0
let a = 0

for (let i = 0; i < nums.length; i++) {
    if (c < nums[i]) {
        c = nums[i]
    }

    if (c2 < nums[i] && (c === nums[i]) === false) {
        if (c2 === c) {
            for (let j = nums.length; j >= 0; j--) {
                if (c2 === c) {
                    c2 = nums[j]
                }
            }
        } else {
            c2 = nums[i]
        }
    } else {
        a = 0
        if (c2 < nums[i] && (c >= c2)=== false) {
            c2 = nums[i]
        } else {
            if (nums[a] > c2 && nums[a] < c) {
                c2 = nums[a]
            }
        }


    }

    a++
}

console.log("O maior número é:", c)
console.log("E o segundo maior número é:", c2) 