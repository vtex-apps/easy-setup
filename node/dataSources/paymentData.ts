const AffiliationData = [
  {
    implementation: 'Vtex.PaymentGateway.Connectors.PromissoryConnector',
    name: 'Promissory',
    configuration: [
      {
        name: 'ExpiryDays',
        value: '7',
      },
      {
        name: 'isSelfAuthorized',
        value: 'false',
      },
    ],
  },
  {
    implementation: 'Vtex.PaymentGateway.Connectors.TestConnector',
    name: 'Credit Cards',
    configuration: [
      {
        name: 'OperationTime',
        value: '1000',
      },
      {
        name: 'applePay_MerchantId',
        value: '',
      },
      {
        name: 'applePay_MerchantCertificate',
        value: null,
      },
      {
        name: 'applePay_MerchantPassword',
        value: '',
      },
      {
        name: 'SamsungPayServiceId',
        value: '',
      },
    ],
  },
  {
    implementation:
      'Vtex.PaymentGateway.Connectors.PaymentProvider.PaymentProviderConnector_CreditControlV2',
    name: 'CreditControlV2',
    configuration: [
      {
        name: 'connectorName',
        value: 'CreditControlV2',
      },
      {
        name: 'ApplicationAuthenticationLink',
        value:
          'https://projetosuvinil.vtexpayments.com.br/payment-provider/authenticate-app?environment=stable',
      },
      {
        name: 'appKey',
        value: 'APP-KEY',
      },
      {
        name: 'appToken',
        value: 'APP-TOKEN',
      },
      {
        name: 'applicationId',
        value: 'vtex',
      },
      {
        name: 'requiresDocument',
        value: 'false',
      },
      {
        name: 'useAntifraud',
        value: 'false',
      },
      {
        name: 'useEarlySecurityCapture',
        value: '0',
      },
      {
        name: 'configReturnRedirectUrl',
        value: '',
      },
    ],
  },
]

const PaymentConditionData = (affiliationId: any) => {
  return [
    {
      name: 'Promissory',
      enabled: true,
      installmentsService: false,
      externalInterest: false,
      paymentSystem: {
        id: 201,
        name: 'Promissory',
        implementation: 'Vtex.PaymentGateway.Promissory.PromissoryPayment',
      },
      deadlines: [],
      cobrand: {
        name: {
          name: null,
        },
      },
      cardLevel: {
        name: {
          name: null,
        },
      },
      connector: {
        affiliationId,
      },
      hasConnector: false,
      antifraud: {
        affiliationId: null,
      },
      hasAntifraud: false,
      isDefault: false,
      salesChannels: null,
      hasSalesChannels: false,
      issuer: {},
      hasIssuer: false,
      hasCobrand: false,
      hasCardLevel: false,
      hasCountry: false,
      condition: null,
      hasPullRate: false,
      excludedBinsRanges: '',
      multiMerchantList: null,
      hasMultiMerchantList: false,
      hasDate: false,
      hasRecurrency: 0,
      hasInstallmentOptions: false,
      installmentOptions: null,
      quickActions: {
        areOpen: false,
      },
      isPromissory: true,
      isCreditControlPaymentSystem: false,
      beginDate: null,
      endDate: null,
      dateIntervals: null,
    },
    {
      name: 'Visa',
      enabled: true,
      installmentsService: false,
      externalInterest: false,
      paymentSystem: {
        id: 2,
        name: 'Visa',
        implementation: 'Vtex.PaymentGateway.CreditCard.Visa',
      },
      deadlines: [],
      cobrand: {
        name: {
          name: null,
        },
      },
      cardLevel: {
        name: {
          name: null,
        },
      },
      connector: {
        affiliationId,
      },
      hasConnector: false,
      antifraud: {
        affiliationId: null,
      },
      hasAntifraud: false,
      isDefault: false,
      salesChannels: null,
      hasSalesChannels: false,
      issuer: null,
      hasIssuer: false,
      hasCobrand: false,
      hasCardLevel: false,
      country: null,
      hasCountry: false,
      condition: null,
      hasPullRate: false,
      excludedBinsRanges: '',
      multiMerchantList: null,
      hasMultiMerchantList: false,
      hasDate: false,
      hasRecurrency: 0,
      hasInstallmentOptions: false,
      installmentOptions: null,
      quickActions: {
        areOpen: false,
      },
      isPromissory: false,
      isCreditControlPaymentSystem: false,
      beginDate: null,
      endDate: null,
      dateIntervals: null,
    },
    {
      name: 'Customer Credit',
      enabled: true,
      installmentsService: false,
      externalInterest: false,
      paymentSystem: {
        id: 64,
        name: 'Customer Credit',
        implementation: 'Vtex.PaymentGateway.Promissory.CreditControlPayment',
      },
      deadlines: [
        {
          paymentOptions: [
            {
              days: 15,
              interestRate: 0,
            },
          ],
        },
        {
          paymentOptions: [
            {
              days: 30,
              interestRate: 0,
            },
          ],
        },
        {
          paymentOptions: [
            {
              days: 15,
              interestRate: 1,
            },
            {
              days: 30,
              interestRate: 1,
            },
          ],
        },
        {
          paymentOptions: [
            {
              days: 15,
              interestRate: 1.5,
            },
            {
              days: 30,
              interestRate: 1.5,
            },
            {
              days: 45,
              interestRate: 1.5,
            },
          ],
        },
      ],
      cobrand: {
        name: {
          name: null,
        },
      },
      cardLevel: {
        name: {
          name: null,
        },
      },
      connector: {
        affiliationId,
      },
      hasConnector: false,
      antifraud: {
        affiliationId: null,
      },
      hasAntifraud: false,
      isDefault: false,
      salesChannels: null,
      hasSalesChannels: false,
      issuer: {},
      hasIssuer: false,
      hasCobrand: false,
      hasCardLevel: false,
      hasCountry: false,
      condition: null,
      hasPullRate: false,
      excludedBinsRanges: '',
      multiMerchantList: null,
      hasMultiMerchantList: false,
      hasDate: false,
      hasRecurrency: 0,
      hasInstallmentOptions: true,
      installmentOptions: {
        installments: [
          {
            interestRate: 0,
            quantity: 1,
          },
          {
            interestRate: 1,
            quantity: 2,
          },
          {
            interestRate: 1.5,
            quantity: 3,
          },
        ],
        interestRateMethod: 2,
        minimumInstallmentValue: 0,
        dueDateType: 0,
      },
      quickActions: {
        areOpen: false,
      },
      isPromissory: false,
      isCreditControlPaymentSystem: true,
      installmentsLength: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      hasInstallmentTax: true,
      beginDate: null,
      endDate: null,
      dateIntervals: null,
    },
  ]
}

const PromissoryData = {
  name: 'Promissory',
  id: 201,
  description: '',
  configuration: [
    {
      type: 'Text',
      regex: null,
      domain: null,
      mask: null,
      hint: 'Promissory description',
      hidden: false,
      friendlyName: 'Promissory',
      target: '_self',
      prefix: null,
      isReadOnly: false,
      adminOnly: false,
      isRequired: true,
      name: 'name',
      value: 'Promissory',
    },
    {
      type: 'Text',
      regex: null,
      domain: null,
      mask: null,
      hint: 'Promissory description',
      hidden: false,
      friendlyName: 'Promissory Description',
      target: '_self',
      prefix: null,
      isReadOnly: false,
      adminOnly: false,
      isRequired: false,
      name: 'description',
      value: 'Promissory Description',
    },
    {
      type: 'Text',
      regex: null,
      domain: null,
      mask: null,
      hint: 'Escreva o número de dias para expiração dos pagamentos',
      hidden: false,
      friendlyName: 'Expiring Days',
      target: '_self',
      prefix: null,
      isReadOnly: false,
      adminOnly: false,
      isRequired: true,
      name: 'expiryDays',
      value: '5',
    },
    {
      type: 'Select',
      regex: null,
      domain: [
        {
          domainText: 'Yes',
          domainValue: 'true',
          disabled: false,
        },
        {
          domainText: 'No',
          domainValue: 'false',
          disabled: false,
        },
      ],
      mask: null,
      hint: 'Se utilizará para autorizar automáticamente um pagamento.',
      hidden: false,
      friendlyName: 'Self Authorization',
      target: '_self',
      prefix: null,
      isReadOnly: false,
      adminOnly: false,
      isRequired: true,
      name: 'isSelfAuthorized',
      value: 'false',
    },
    {
      type: 'Select',
      regex: null,
      domain: [
        {
          domainText: '0',
          domainValue: '0',
          disabled: false,
        },
        {
          domainText: '5',
          domainValue: '5',
          disabled: false,
        },
        {
          domainText: '10',
          domainValue: '10',
          disabled: false,
        },
        {
          domainText: '15',
          domainValue: '15',
          disabled: false,
        },
        {
          domainText: '30',
          domainValue: '30',
          disabled: false,
        },
        {
          domainText: '50',
          domainValue: '50',
          disabled: false,
        },
        {
          domainText: '70',
          domainValue: '70',
          disabled: false,
        },
        {
          domainText: '80',
          domainValue: '80',
          disabled: false,
        },
        {
          domainText: '100',
          domainValue: '100',
          disabled: false,
        },
      ],
      mask: null,
      hint: 'Margen porcentual para cambiar el valor del pago',
      hidden: false,
      friendlyName: 'Change Margin',
      target: '_self',
      prefix: null,
      isReadOnly: false,
      adminOnly: false,
      isRequired: false,
      name: 'changeMargin',
      value: '0',
    },
  ],
  implementation: 'Vtex.PaymentGateway.Promissory.PromissoryPayment',
  friendlyName: 'Custom Payment',
  isConfigured: false,
  type: 'promissories',
}

export { AffiliationData, PaymentConditionData, PromissoryData }
