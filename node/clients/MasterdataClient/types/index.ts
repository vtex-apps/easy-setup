export interface IMasterdataDocument {
  id: string
  accountId: string
  accountName: string
  dataEntityId: string
}

export interface IMasterdataNewDocument {
  Id: string
  Href: string
}

export interface IMasterdataClientDocumentPayload {
  id: string
  email: string
  document: string
  firstName: string
  lastName: string
  priceTables: string
  isOrgAdmin?: boolean
  organizationId?: string
}

export interface IMasterdataClientDocument {
  userId: string
  email: string
  document: string
  firstName: string
  lastName: string
  priceTables: string
}
