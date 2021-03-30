const AttachmentData: IAttachmentPayload = {
  Id: 3,
  Name: 'T-Shirt Customization',
  IsRequired: false,
  IsActive: true,
  Domains: [
    {
      FieldName: 'T-Shirt Name',
      MaxCaracters: '15',
      DomainValues: '[]',
    },
  ],
}

const SubscriptionData: IAttachmentPayload = {
  Id: 4,
  Name: 'vtex.subscription.subscription',
  IsRequired: false,
  IsActive: true,
  Domains: [
    {
      FieldName: 'vtex.subscription.key.frequency',
      MaxCaracters: '15',
      DomainValues: '1 month',
    },
    {
      FieldName: 'vtex.subscription.key.purchaseday',
      MaxCaracters: '15',
      DomainValues: '1,15,28',
    },
  ],
}

const SkuAttachmentData = (skuId: number, attachmentId: number) => ({
  SkuId: skuId,
  AttachmentId: attachmentId,
})

export interface IDomain {
  FieldName: string
  MaxCaracters: string
  DomainValues: string
}

export interface IAttachmentResponse {
  Name: string
  Id: number
  IsRequired: boolean
  IsActive: boolean
  Domains: IDomain[]
}

export interface IAttachmentPayload {
  Id: number
  Name: string
  IsRequired: boolean
  IsActive: boolean
  Domains: IDomain[]
}

export { AttachmentData, SubscriptionData, SkuAttachmentData }
