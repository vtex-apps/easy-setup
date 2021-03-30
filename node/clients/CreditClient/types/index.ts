export interface ICreditAccountPayload {
  id: string
  balance: number
  document: string
  status: string
  documentType: string
  creditLimit: number
  updatedAt: string
  createdAt: string
  description: string
  availableCredit: number
  preAuthorizedCredit: number
  email: string
  tolerance: number
  availableBalance: number
}

export interface OpenOrChangeAccountRequest {
  email: string
  creditLimit?: number
  document?: string
  id: string
}

export interface OpenOrChangeAccountResponse {
  id: string
  balance: number
  document: string
  status: string
  documentType: string
  creditLimit: number
  updatedAt: string
  createdAt: string
  description: string
  availableCredit: number
  preAuthorizedCredit: number
  email: string
  tolerance: number
  availableBalance: number
}
