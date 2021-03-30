export interface ICollectionResponse {
  Id: number
  Name: string
  Description: any
  Searchable: boolean
  Highlight: boolean
  DateFrom: string
  DateTo: string
  TotalProducts: number
  Type: string
}
export interface ICollectionPayload {
  Name: string
  Searchable: boolean
  Highlight: boolean
  DateFrom: string
  DateTo: string
}

export interface ISubCollectionResponse {
  Id: number
  CollectionId: number
  Name: string
  Type: string
  PreSale: boolean
  Release: boolean
}

export interface ISubCollectionPayload {
  CollectionId: number
  Name: string
  Type: string
  PreSale: boolean
  Release: boolean
}

export interface IBrand {
  Active: boolean
  AdWordsRemarketingCode: string
  Id: number
  Keywords: string
  LinkId: string
  LomadeeCampaignCode: string
  MenuHome: boolean
  Name: string
  Score: string | null
  SiteTitle: string
  Text: string
}

export interface ISKUPayload {
  Id: number
  ProductId: string
  IsActive: boolean
  Name: string
  RefId: string
  Height: number
  Length: number
  Width: number
  WeightKg: number
  PackagedHeight: number
  PackagedLength: number
  PackagedWidth: number
  PackagedWeightKg: number
  ModalId: number
  CubicWeight: number
  IsKit: boolean
  CreationDate: any
  RewardValue: any
  EstimatedDateArrival: any
  ManufacturerCode: string
  CommercialConditionId: number
  MeasurementUnit: string
  UnitMultiplier: number
  ModalType: any
  KitItensSellApart: boolean
}

export interface ISKUKitPayload {
  StockKeepingUnitParent: number
  StockKeepingUnitId: number
  Quantity: number
  UnitPrice: number
}

export interface CreateProductData {
  Id: number
  Name: string
  DepartmentId: number
  CategoryId: number
  BrandId: number
  LinkId: string
  RefId: string
  IsVisible: boolean
  Description: string
  DescriptionShort: string
  ReleaseDate: string
  KeyWords: string
  Title: string
  IsActive: boolean
  TaxCode: string | null
  MetaTagDescription: string
  SupplierId: number | null
  ShowWithoutStock: boolean
  AdWordsRemarketingCode: null
  LomadeeCampaignCode: null
  Score: number | null
}

export interface CreateProductResponse {
  Id: number
  Name: string
  DepartmentId: number
  CategoryId: number
  BrandId: number
  LinkId: string
  RefId: string
  IsVisible: boolean
  Description: string
  DescriptionShort: string
  ReleaseDate: string
  KeyWords: string
  Title: string
  IsActive: boolean
  TaxCode: string | null
  MetaTagDescription: string
  SupplierId: number | null
  ShowWithoutStock: boolean
  AdWordsRemarketingCode: null
  LomadeeCampaignCode: null
  Score: number | null
}

export interface AssociateSKUAttachmentData {
  AttachmentId: number
  SkuId: number
}

export interface AssociateSKUAttachmentResponse {
  Id: number
  AttachmentId: number
  SkuId: number
}

export interface CreateSKUFileData {
  IsMain: boolean
  Label: string
  Name: string
  Text: string | null
  Url: string
}

export interface CreateSKUFileResponse {
  Id: number
  SkuId: number
  Name: string
  IsMain: boolean
  Label: string
}

export interface CreateAttachmentData {
  Name: string
  IsRequired: boolean
  IsActive: boolean
  Domains: Domain[]
}

export interface Domain {
  FieldName: string
  MaxCaracters: string
  DomainValues: string
}

export interface CreateAttachmentResponse extends CreateAttachmentData {
  Id: number
}
