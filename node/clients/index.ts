import { IOClients } from '@vtex/api'

import BenefitClient from './BenefitClient'
import CatalogClient from './CatalogClient'
import GatewayClient from './GatewayClient'
import LogisticsClient from './LogisticsClient'
import MasterdataClient from './MasterdataClient'
import PricingClient from './PricingClient'
import CheckoutClient from './CheckoutClient'
import CreditClient from './CreditClient'

export class Clients extends IOClients {
  public get masterdataClient() {
    return this.getOrSet('masterdataClient', MasterdataClient)
  }

  public get catalogClient() {
    return this.getOrSet('catalogClient', CatalogClient)
  }

  public get logisticsClient() {
    return this.getOrSet('logisticsClient', LogisticsClient)
  }

  public get pricingClient() {
    return this.getOrSet('pricingClient', PricingClient)
  }

  public get benefitClient() {
    return this.getOrSet('benefitClient', BenefitClient)
  }

  public get gatewayClient() {
    return this.getOrSet('gatewayClient', GatewayClient)
  }

  public get checkoutClient() {
    return this.getOrSet('checkoutClient', CheckoutClient)
  }

  public get creditClient() {
    return this.getOrSet('creditClient', CreditClient)
  }
}
