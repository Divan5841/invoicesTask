const order = {
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
    ]
};


const PERFORMANCE_TYPE = {
    TRAGEDY: "tragedy",
    COMEDY: "comedy"
};

const PERFORMANCE_PRICE = {
    TRAGEDY: 40000,
    COMEDY: 30000
};

const getPrice = (type, audience) => {
    if (type === PERFORMANCE_TYPE.TRAGEDY) {
        if (audience > 30) {
            return PERFORMANCE_PRICE.TRAGEDY + 1000 * (audience - 30);
        }
        return PERFORMANCE_PRICE.TRAGEDY;
    }
    if (type === PERFORMANCE_TYPE.COMEDY) {
        if (audience > 20) {
            return PERFORMANCE_PRICE.COMEDY + 16000 + 800 * (audience - 20);
        }
        return PERFORMANCE_PRICE.COMEDY + audience * 300;
    }
    throw new Error(`Неизвестный тип: ${type}`);
};

const getInvoice = order => {
    let totalPrice = 0;
    let totalBonus = 0;
    let comedyBonus = 0;
    let counterComedy = 0;

    const numberFormat = new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: "RUB",
        minimumFractionDigits: 2
    });

    let result = `Счет для ${order.customer}\n`;

    order.performance.forEach(({type, audience, playId}) => {
        const currentPrice = getPrice(type, audience);

        result = `${result}${playId}: ${numberFormat.format(
            currentPrice
        )} (${audience} мест)\n`;
        totalPrice += currentPrice;
        totalBonus += Math.max(audience - 30, 0);

        if (type === PERFORMANCE_TYPE.COMEDY) {
            comedyBonus += Math.floor(audience / 5);
            counterComedy++;
        }

        if (counterComedy === 10) {
            totalBonus += comedyBonus;
            comedyBonus = 0;
            counterComedy = 0;
        }
    });

    return `${result}Итого с вас: ${numberFormat.format(
        totalPrice
    )}\nВы заработали ${totalBonus} бонусов\n`;
};

console.log(getInvoice((order)));
