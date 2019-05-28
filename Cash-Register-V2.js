function checkCashRegister(price, cash, cid) {
    //consolodates cash values in register
    var valuesArray = [];
    cid.forEach(function (element) {
        valuesArray.push(element[1])
    })

    //sums cash values in register
    var totalCash = valuesArray.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue;
    })

    //calculating change for customer
    var changeOwed = cash - price;
    const currency = [
        0.01, 0.05, 0.10, 0.25, 1, 5, 10, 20, 100
    ]
    var cash_update = [
        ['PENNY', 0],
        ['NICKEL', 0],
        ['DIME', 0],
        ['QUARTER', 0],
        ['ONE', 0],
        ['FIVE', 0],
        ['TEN', 0],
        ['TWENTY', 0],
        ['ONE HUNDRED', 0],
    ]

    for (var i = cid.length - 1; i >= 0; i--) {
        while (cid[i][1] > cash_update[i][1] && changeOwed >= currency[i]) {
            changeOwed -= currency[i];
            changeOwed = parseFloat(changeOwed.toFixed(4)); //I was getting some weird decimals like .0500000000000002, so toFixed() rounds them appropriately
            cash_update[i][1] += currency[i];
        }
    }

    //another fix for weird decimals 
    var x = 0;
    var len = cash_update.length
    while (x < len) {
        cash_update[x][1] = parseFloat(cash_update[x][1].toFixed(2));
        x++
    }

    //function returns different objects depending upon change and avaiable funds 
    if (changeOwed > 0) {
        console.log({ status: "INSUFFICIENT_FUNDS", change: [] })
        return { status: "INSUFFICIENT_FUNDS", change: [] }
    }
    if (cash - price < totalCash) {
        cash_update = cash_update.filter(function (element) {
            return element[1] > 0
        })
        cash_update = cash_update.reverse()
        console.log({ status: 'OPEN', change: cash_update })
        return { status: 'OPEN', change: cash_update };
    }
    if (cash - price == totalCash) {
        console.log({ status: 'CLOSED', change: cash_update })
        return { status: 'CLOSED', change: cash_update }
    }
    if (cash - price > totalCash) {
        console.log({ status: "INSUFFICIENT_FUNDS", change: [] })
        return { status: "INSUFFICIENT_FUNDS", change: [] }
    }
}



checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])




