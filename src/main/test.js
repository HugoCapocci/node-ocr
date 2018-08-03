const parser = require('./parser');

const bigText = `.; Les Dunes Sa 1 f\n
01 / 08 / 2018 12: 42: 14 pg,\n 
‘ TPV DoubïeRampe VM Société: SG_\n
… Service: DUNE5 Badge: 859947 % â\n
Ticket: 109 Tar1f: GROUPE SG “\n
1 Wok Asia 3, 61 €\n
1 Fruit'bar petit bodega 1,39 €\n
Toto]prestations 5, 00 €\n
1 Adm 80 Les Dunes 5, 35 €\n
1 Sub Les Dunes —5, 35 €\n
A payer 5, 00 €\n
ëï Dont TVA 10,00 % 0,45 €\n
È Ancien so1de 39, 51 €\n
3 Nouveau 30100 34, 51 €\n
ä BûN APPETIT`;

describe('parse data for MVP', () => {
  it('Should return date', () => {
    expect(parser.getDate('01/08/2018 12:42:14 pg,')).toEqual('01/08/2018');
    expect(parser.getDate('01-08-2018 12:42:14 pg,')).toEqual('01-08-2018');
  });

  it('Should return total amount', () => {
    expect(parser.getTotalAmount('A payer 5, 20 €')).toEqual(5.2);

    expect(parser.getTotalAmount('Total 72.00$')).toEqual(72);

    expect(parser.getTotalAmount('Pay 72.53 £')).toEqual(72.53);

    expect(parser.getTotalAmount('Pay 72.53 £')).toEqual(72.53);

    expect(parser.getTotalAmount('Total TTC Dû 13,00')).toEqual(13);

    expect(parser.getTotalAmount(bigText)).toEqual(5);

  });

  it('Should return name', () => {
    expect(parser.getName(bigText)).toEqual('Les Dunes Sa');
  });

  it('Should return currency', () => {
    expect(parser.getCurrency('Prix en €')).toEqual('euro');
    expect(parser.getCurrency(bigText)).toEqual('euro');

    expect(parser.getCurrency('Total in $')).toEqual('dollar');
  });

  it('Shoud return TVA', () => {
    expect(parser.getTva(bigText)).toEqual({
      rate: '10,00 %',
      amount: '0,45 €'
    });
  });
});
