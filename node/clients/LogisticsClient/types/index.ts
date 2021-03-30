export interface IInventoryPayload {
  unlimitedQuantity: boolean
  dateUtcOnBalanceSystem: any
  quantity: number
}

export interface IFreightValuePayload {
  absoluteMoneyCost: string
  country: string
  maxVolume: number
  operationType: number
  pricePercent: number
  pricePercentByWeight: number
  timeCost: string
  weightEnd: number
  weightStart: number
  zipCodeEnd: string
  zipCodeStart: string
  polygon: string
}

export interface IDockPayload {
  pickupStoreInfo: IPickupStoreInfo
  storeId: any
  pickupInStoreInfo: IPickupInStoreInfo
  deliveryFromStoreInfo: IDeliveryFromStoreInfo
  address: IAddress
  location: any
  id: string
  name: string
  priority: number
  dockTimeFake: string
  timeFakeOverhead: string
  salesChannels: [string]
  freightTableIds: [string]
  wmsEndPoint: any
  isActive: boolean
}

interface IPickupStoreInfo {
  isPickupStore: boolean
  storeId: any
  friendlyName: any
  address: IAddress
  additionalInfo: any
  dockId: any
  distance: any
  businessHours: any
  pickupHolidays: any
  sellerId: any
  isThirdPartyPickup: boolean
}

interface IPickupInStoreInfo {
  isActice: boolean
  additionalInfo: any
}

interface IDeliveryFromStoreInfo {
  isActice: boolean
  deliveryRadius: number
  deliveryFee: number
  deliveryTime: string
  maximumWeight: number
}

interface IAddress {
  postalCode: string
  country: ICountry
  city: string
  state: string
  neighborhood: string
  street: string
  number: string
  complement: any
  reference: any
  location: any
}

interface ICountry {
  acronym: string
  name: string
}

export interface IWarehousePayload {
  id: string
  name: string
  warehouseDocks: any
  pickupPointIds: []
  priority: number
  isActive: boolean
}

export interface CreateOrUpdateCarrierData {
  id: string
  slaType: string
  name: string
  scheduledDelivery: boolean
  maxRangeDelivery: number
  dayOfWeekForDelivery: null
  dayOfWeekBlockeds: any[]
  freightValue: any[]
  factorCubicWeight: null
  freightTableProcessStatus: number
  freightTableValueError: null
  modals: any[]
  onlyItemsWithDefinedModal: boolean
  deliveryOnWeekends: boolean
  carrierSchedule: any[]
  maxDimension: MaxDimension
  exclusiveToDeliveryPoints: boolean
  minimunCubicWeight: number
  isPolygon: boolean
  numberOfItemsPerShipment: null
}

export interface MaxDimension {
  weight: number
  height: number
  width: number
  length: number
  maxSumDimension: number
}
