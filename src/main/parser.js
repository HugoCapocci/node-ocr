const filterWorlds = (line) => {
  return line
    .split(' ')
    .filter(element =>
      element.length > 1 && /\w+/.test(element)
    )
    .join(' ');
};

module.exports = {
  getDate: (line) => {
    const dateRes = line.match(/(\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4})/m);
    if (!dateRes) return null;

    const dateFound = dateRes[0];
    return dateFound; 
  },
  getTotalAmount: (bigText) => {
    const lines = bigText.split('\n');

    let lineToPay = lines.find(line => {
      return line.toLowerCase().includes('pay');
    });

    if (!lineToPay) {
      lineToPay = lines.find(line => {
        return line.toLowerCase().includes('total')
      });
    }
    if (!lineToPay) return null;

    const pattern = /(\d*[,.]\s?\d*)/m;
    const result = lineToPay.match(pattern);
    if (!result) return null;

    const amount = result[1]
      .replace(' ', '')
      .replace(',', '.');
    return parseFloat(amount);
  },
  getName: (bigText) => {
    const lines = bigText.split('\n');
    return filterWorlds(lines[0]);
  },
  getCurrency: (bigText) => {
    const refs = [
      {
        pattern : '€|euro',
        currency : 'euro'
      },
      {
        pattern: '$|dollar',
        currency: 'dollar'
      }
    ];

    return refs.find(({ pattern }) =>
      new RegExp(pattern, 'i').test(bigText)
    ).currency;
  },
  getTva: (bigText) => {
    // let tvaLine = bigText.split('\n').find(line =>
    //   /tva/i.test(line)
    // );
    const results = bigText.match(/(\d*(,\d*)?\s?%).(\d*(,\d*)\s?€)/);
    if (!results) return null;
    const rate = results[1];
    const amount = results[3];

    console.log('rate: ', rate);
    console.log('amount: ', amount);

    return {
      rate,
      amount
    }
  }
}