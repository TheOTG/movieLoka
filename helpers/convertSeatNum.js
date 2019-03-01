module.exports = function(seatNum) {
    let row = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']
    let temp
    const divisor = 20
    if(seatNum%divisor === 0) {
        temp = divisor
    } else {
        temp = seatNum%divisor
    }
    return `${row[Math.floor((seatNum-1)/divisor)]}${temp}`
}