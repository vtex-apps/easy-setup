export interface IOrderFormConfiguration {
  paymentConfiguration: IPaymentConfiguration
  taxConfiguration: ITaxConfiguration
  minimumQuantityAccumulatedForItems: number
  decimalDigitsPrecision: number
  minimumValueAccumulated: number
  apps: IApps[]
  allowMultipleDeliveries: boolean
  allowManualPrice: boolean
  maxNumberOfWhiteLabelSellers: number
  maskFirstPurchaseData: boolean
  recaptchaValidation: boolean
  maskStateOnAddress: boolean
}

export interface IPaymentConfiguration {
  requiresAuthenticationForPreAuthorizedPaymentOption: boolean
  allowInstallmentsMerge: boolean
  blockPaymentSession: boolean
  paymentSystemToCheckFirstInstallment: boolean
  defaultPaymentSystemToApplyOnUserOrderForm: boolean
}

export interface ITaxConfiguration {
  url: string
  authorizationHeader: string
  allowExecutionAfterErrors: boolean
  integratedAuthentication: boolean
  appId: string
}

export interface IApps {
  fields: string[]
  id: string
  major: number
}

export interface IOrderConfiguration {
  erpEndpoint: string
  workflowName: string
  shortageTimeoutCancellation: number
  allowOrderEdition: boolean
}
