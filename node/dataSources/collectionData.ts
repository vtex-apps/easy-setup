const CollectionData = {
  DateFrom: '2010-01-01T00:00:00',
  DateTo: '2070-01-01T00:00:00',
  Highlight: false,
  Name: 'All',
  Searchable: true,
}

const SubCollectionData = (collectionId: any) => {
  return {
    CollectionId: collectionId,
    Name: 'Brand',
    PreSale: false,
    Release: false,
    Type: 'Inclusive',
  }
}

const BrandSubCollectionData = {
  BrandId: 9280,
}

interface ICollectionResponse {
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

interface ISubCollectionResponse {
  Id: number
  CollectionId: number
  Name: string
  Type: string
  PreSale: boolean
  Release: boolean
}

export {
  ICollectionResponse,
  ISubCollectionResponse,
  BrandSubCollectionData,
  CollectionData,
  SubCollectionData,
}
