import type { ClientsConfig, RecorderState, ServiceContext } from '@vtex/api'
import { LRUCache, method, Service } from '@vtex/api'

import { Clients } from './clients'
import {
  BenefitsMiddleware,
  BrandsMiddleware,
  CategoriesMiddleware,
  CollectionsMiddleware,
  FieldsMiddleware,
  LogisticsMiddleware,
  OrganizationsMiddleware,
  PaymentsMiddleware,
  PopulateMiddleware,
  PricingMiddleware,
  ProductsMiddleware,
  TaxesMiddleware,
  UsersMiddleware,
  CheckoutMiddleware,
  ResellerMiddleware,
} from './middlewares'

export const TIMEOUT_MS = 9999999

// Create a LRU memory cache for the Status client.
// The @vtex/api HttpClient respects Cache-Control headers and uses the provided cache.
const memoryCache = new LRUCache<string, any>({ max: 5000 })

metrics.trackCache('status', memoryCache)

// This is the configuration for clients available in `ctx.clients`.
const clients: ClientsConfig<Clients> = {
  // We pass our custom implementation of the clients bag, containing the Status client.
  implementation: Clients,
  options: {
    // All IO Clients will be initialized with these options, unless otherwise specified.
    default: {
      retries: 10,
      timeout: TIMEOUT_MS,
    },
    // This key will be merged with the default options and add this cache to our Status client.
    status: {
      memoryCache,
    },
  },
}

declare global {
  // We declare a global Context type just to avoid re-writing ServiceContext<Clients, State> in every handler and resolver
  type PopulateContext = ServiceContext<Clients, PopulateState>

  // The shape of our State object found in `ctx.state`. This is used as state bag to communicate between middlewares.
  type PopulateResourceType =
    | 'benefits'
    | 'brands'
    | 'categories'
    | 'collections'
    | 'empty'
    | 'fields'
    | 'logistics'
    | 'payments'
    | 'products'
    | 'prices'
    | 'taxes'
    | 'users'
    | 'subscription'
    | 'organizations'
    | 'checkout'
    | 'reseller'

  interface PopulateState extends RecorderState {
    resources: PopulateResourceType[]
  }
}

// Export a service that defines route handlers and client options.
export default new Service({
  clients,
  routes: {
    populate: method({
      POST: [
        PopulateMiddleware,
        UsersMiddleware,
        BrandsMiddleware,
        CategoriesMiddleware,
        CollectionsMiddleware,
        FieldsMiddleware,
        ProductsMiddleware,
        PricingMiddleware,
        PaymentsMiddleware,
        BenefitsMiddleware,
        TaxesMiddleware,
        LogisticsMiddleware,
        CheckoutMiddleware,
        OrganizationsMiddleware,
        ResellerMiddleware,
      ],
    }),
  },
})
