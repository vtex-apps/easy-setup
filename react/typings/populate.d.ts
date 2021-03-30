export interface PopulateResponseItem {
  status: 'OK' | 'ERROR'
  results?: any[]
  error?: string
}

export interface PopulateResponse {
  [key: string]: PopulateResponseItem
}
