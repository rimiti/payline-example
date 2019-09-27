const soap = require('soap');

const url = 'https://homologation.payline.com/V4/services/WebPaymentAPI?wsdl';
const { PAYLINE_USERNAME,  PAYLINE_PASSWORD, PAYLINE_CONTRACT } = process.env;

const data = {
    version: '19',
    payment: {
        amount: 100,
        currency: 978,
        action: 100,
        mode: 'CPT',
        contractNumber: PAYLINE_CONTRACT
    },
    order: {
        ref: '123',
        country: 'FR',
        amount: 6000,
        currency: 978,
        date: '07/04/2016 11:00',
    },
    returnURL: 'https://.com/payment?return',
    cancelURL: 'https://example.com/payment?cancel',
    selectedContractList: [PAYLINE_CONTRACT],
    buyer: {
    }
};


soap.createClient(url, function(err, client) {
    client.setSecurity(new soap.BasicAuthSecurity(PAYLINE_USERNAME, PAYLINE_PASSWORD));

    client.doWebPayment(data,(err, result) => {
        console.log(result);
    });
});


