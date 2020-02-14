//invoices.json
invoices = {
    "customer": "MDT",
    "performance": [
        {
            "playId": "Гамлет",
            "audience": 55,
            "type": "tragedy"
        },
        {
            "playId": "Ромео и Джульетта",
            "audience": 35,
            "type": "tragedy"
        },
        {
            "playId": "Отелло",
            "audience": 40,
            "type": "comedy"
        }
    ],
};

function invoicing(invoices) {
    let totalPrice = 0;
    let totalBonus = 0;
    let comedyBonus = 0;
    let counterComedy = 0;
    const numberFormat = new Intl.NumberFormat("ru-RU",
        {
            style: "currency", currency: "RUB",
            minimumFractionDigits: 2
        });

    let result = `Счет для ${invoices.customer}\n`;
    for (let performance of invoices.performance) {
        let currentPrise = 0;

        switch (performance.type) {
            case "tragedy":
                currentPrise = 40000;
                if (performance.audience > 30) {
                    currentPrise += 1000 * (performance.audience - 30);
                }
                break;
            case "comedy":
                currentPrise = 30000;
                if (performance.audience > 20) {
                    currentPrise += 10000 + 500 * (performance.audience - 20);
                }
                comedyBonus += Math.floor(performance.audience / 5);
                counterComedy++;
                // thisPrise += 300 * performance.audience; ???
                break;
            default:
                throw new Error(`неизвестный тип: ${performance.type}`);
        }
        result += `${performance.playId}: ${numberFormat.format(currentPrise)} (${performance.audience} мест)\n`;
        totalPrice += currentPrise;
        totalBonus += Math.max(performance.audience - 30, 0);
    }

// Дополнительный бонус за каждые 10 комедий
    (counterComedy === 10) ? (totalBonus += comedyBonus) : null;

    result += `Итого с вас: ${numberFormat.format(totalPrice)}\nВы заработали ${totalBonus} бонусов\n`;
    return result;
}

console.log(invoicing(invoices));

