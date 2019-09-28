const soap = require('soap');

const url = 'https://homologation.payline.com/V4/services/WebPaymentAPI?wsdl';
const { PAYLINE_USERNAME,  PAYLINE_PASSWORD, PAYLINE_CONTRACT } = process.env;

const data = {
  version: 21,
  payment: {
    amount: 100,
    currency: 978,
    action: 101,
    mode: 'CPT',
    contractNumber: '1234567_1'
  },
  returnURL: 'http://localhost:3010/confirmation/postmanFakeOrderId',
  cancelURL: 'http://localhost:3010/payment',
  order: {
    ref: 'test',
    amount: 100,
    currency: 978,
    date: '09/09/2019 15:38',
    deliveryExpectedDate: '10/10/2019'
  },
  selectedContractList: { selectedContract: '1234567_1' },
  buyer: {
    lastName: 'TEST',
    firstName: 'Charlotte',
    email: 'Charlotte.ROBERTCRO@monext.net',
    shippingAdress: {
      name: 'Home',
      firstName: 'Jane',
      lastName: 'DOE',
      street1: '7 place Ronde',
      cityName: 'Marseille',
      zipCode: '13005',
      country: 'FR',
      phone: '0491000000',
      county: '5eme arr.',
      phoneType: '0'
    },
    billingAddress: {
      name: 'Monext',
      firstName: 'John',
      lastName: 'DOE',
      street1: '260, rue Claude Nicolas Ledoux',
      cityName: 'Aix-en-Provence Cedex 3',
      zipCode: '13593',
      country: 'FR',
      phone: '0442000000',
      phoneType: '0'
    },
    accountCreateDate: '10/02/09',
    accountAverageAmount: 3609,
    accountOrderCount: 15,
    mobilePhone: '0600000000',
    customerId: 'JohnDOE_20090210',
    legalStatus: 1,
    legalDocument: 5,
    birthDate: '1980-01-20',
    fingerprintID: '65w4765xf45qs4fmjslgkj354q354'
  },
  owner: {
    lastName: 'DOE',
    firstName: 'John',
    billingAddress: {
      street: '260, rue Claude Nico',
      cityName: 'Aix-en-Provence Cedex 3',
      zipCode: '13593',
      country: 'FR',
      phone: '0442000000'
    },
    issueCardDate: '0118'
  },
  merchantName: 'tictactrip'
};


soap.createClient(url, function(err, client) {
  client.setSecurity(
    new soap.BasicAuthSecurity(PAYLINE_USERNAME, PAYLINE_PASSWORD)
  );

  client.doWebPayment(data, (err, result) => {
    console.log(result);
  });
});
