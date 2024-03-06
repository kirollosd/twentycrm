import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import {
  AvailableProduct,
  BillingService,
} from 'src/core/billing/billing.service';
import { ProductInput } from 'src/core/billing/dto/product.input';
import { assert } from 'src/utils/assert';
import { ProductPricesEntity } from 'src/core/billing/dto/product-prices.entity';
import { JwtAuthGuard } from 'src/guards/jwt.auth.guard';
import { AuthUser } from 'src/decorators/auth/auth-user.decorator';
import { User } from 'src/core/user/user.entity';
import { CheckoutSessionInput } from 'src/core/billing/dto/checkout-session.input';
import { SessionEntity } from 'src/core/billing/dto/session.entity';
import { BillingSessionInput } from 'src/core/billing/dto/billing-session.input';

@Resolver()
export class BillingResolver {
  constructor(private readonly billingService: BillingService) {}

  @Query(() => ProductPricesEntity)
  async getProductPrices(@Args() { product }: ProductInput) {
    const stripeProductId = this.billingService.getProductStripeId(product);

    assert(
      stripeProductId,
      `Product '${product}' not found, available products are ['${Object.values(
        AvailableProduct,
      ).join("','")}']`,
    );

    const productPrices =
      await this.billingService.getProductPrices(stripeProductId);

    return {
      totalNumberOfPrices: productPrices.length,
      productPrices: productPrices,
    };
  }

  @Query(() => SessionEntity)
  @UseGuards(JwtAuthGuard)
  async billingPortalSession(
    @AuthUser() user: User,
    @Args() { returnUrlPath }: BillingSessionInput,
  ) {
    return {
      url: await this.billingService.computeBillingPortalSessionURL(
        user.defaultWorkspaceId,
        returnUrlPath,
      ),
    };
  }

  @Mutation(() => SessionEntity)
  @UseGuards(JwtAuthGuard)
  async checkoutSession(
    @AuthUser() user: User,
    @Args() { recurringInterval, successUrlPath }: CheckoutSessionInput,
  ) {
    const stripeProductId = this.billingService.getProductStripeId(
      AvailableProduct.BasePlan,
    );

    assert(
      stripeProductId,
      'BasePlan productId not found, please check your BILLING_STRIPE_BASE_PLAN_PRODUCT_ID env variable',
    );

    const productPrices =
      await this.billingService.getProductPrices(stripeProductId);

    const stripePriceId = productPrices.filter(
      (price) => price.recurringInterval === recurringInterval,
    )?.[0]?.stripePriceId;

    assert(
      stripePriceId,
      `BasePlan priceId not found, please check body.recurringInterval and product '${AvailableProduct.BasePlan}' prices`,
    );

    return {
      url: await this.billingService.computeCheckoutSessionURL(
        user,
        stripePriceId,
        successUrlPath,
      ),
    };
  }
}
