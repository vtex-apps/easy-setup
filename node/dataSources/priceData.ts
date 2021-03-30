import type { UpdatePriceTableData } from '../clients/PricingClient'

const PriceData = {
  listPrice: 3000,
  basePrice: randomNumber(50, 2000),
  markup: 0,
  fixedPrices: [],
}

const CustomPrices = [
  {
    // 880320
    listPrice: 100,
    basePrice: 100,
    markup: 0,
    fixedPrices: [],
  },
  {
    // 880321
    listPrice: 1000,
    basePrice: 1000,
    markup: 0,
    fixedPrices: [],
  },
]

const context = {
  categories: {},
  brands: {},
  stockStatuses: null,
  internalCategories: null,
  markupRange: null,
  dateRange: null,
}

const SILVER_PRICE_TABLE_ID = 'silver'
const GOLD_PRICE_TABLE_ID = 'gold'
const PLATINUM_PRICE_TABLE_ID = 'platinum'

const PriceTableData: UpdatePriceTableData[] = [
  {
    rules: [
      {
        id: 0,
        tradePolicyId: SILVER_PRICE_TABLE_ID,
        percentualModifier: -5,
        dateRangeStatus: null,
        context,
      },
    ],
    tradePolicyId: SILVER_PRICE_TABLE_ID,
  },
  {
    rules: [
      {
        id: 0,
        tradePolicyId: GOLD_PRICE_TABLE_ID,
        percentualModifier: -10,
        dateRangeStatus: null,
        context,
      },
    ],
    tradePolicyId: GOLD_PRICE_TABLE_ID,
  },
  {
    rules: [
      {
        id: 0,
        tradePolicyId: PLATINUM_PRICE_TABLE_ID,
        percentualModifier: -15,
        dateRangeStatus: null,
        context,
      },
    ],
    tradePolicyId: PLATINUM_PRICE_TABLE_ID,
  },
]

const FixedPrice = {
  markup: 30,
  basePrice: 100,
  listPrice: null,
  fixedPrices: [
    {
      tradePolicyId: '1',
      value: 100,
      listPrice: null,
      minQuantity: 1,
    },
    {
      tradePolicyId: '1',
      value: 90,
      listPrice: null,
      minQuantity: 10,
    },
    {
      tradePolicyId: '1',
      value: 80,
      listPrice: null,
      minQuantity: 50,
    },
    {
      tradePolicyId: '1',
      value: 70,
      listPrice: null,
      minQuantity: 100,
    },
  ],
}

function randomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min)
}

export { PriceData, PriceTableData, FixedPrice, CustomPrices }
