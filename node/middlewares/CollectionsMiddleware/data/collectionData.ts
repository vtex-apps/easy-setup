import type {
  ICollectionPayload,
  ISubCollectionPayload,
} from '../../../clients/CatalogClient/types'

const BrandSubCollectionData = {
  BrandId: 9280,
}

const CollectionData: ICollectionPayload[] = [
  {
    DateFrom: '2010-01-01T00:00:00',
    DateTo: '2070-01-01T00:00:00',
    Highlight: false,
    Name: 'All',
    Searchable: true,
  },
]

const SubCollectionData = (collectionId: number): ISubCollectionPayload => ({
  CollectionId: collectionId,
  Name: 'Brand',
  PreSale: false,
  Release: false,
  Type: 'Inclusive',
})

export { BrandSubCollectionData, CollectionData, SubCollectionData }
