# Easy Setup

Easy Setup is an app to rapid seed and setup resources for a working VTEX development environment with Brands, Categories, Products, Skus (including price and inventory), Payments, Logistics and B2B Features.

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=2 orderedList=false} -->

<!-- code_chunk_output -->

- [:warning: Before Proceeding](#warning-before-proceeding)
- [Installation](#installation)
- [Usage](#usage)
- [Resources](#resources)
- [Support](#support)

<!-- /code_chunk_output -->

---

## :warning: Before Proceeding

**HEADS UP!** WE STRONGLY ADVISE THAT YOU DO NOT RUN EASY SETUP ON A PRODUCTION ENVIRONMENT. IT WILL MAKE IRREVERSIBLE CHANGES AND MAY BREAK YOUR STORE.

---

## Installation

Install the app using Toolbelt:

```sh
vtex install beightoneagency.easy-setup
```

Or visit: `https://{{account}}.myvtex.com/admin/apps/beightoneagency.easy-setup/install` and follow the instructions.

## Usage

After installing the app follow the steps:

Go to: **STORE SETUP** &rarr; **Easy Setup** (`https://{{account}}.myvtex.com/admin/easy-setup`), on the right sidebar, select the resources you want Easy Setup to seed/configure and click "Start Easy Setup"

![Screen Shot 2021-02-25 at 09.42.26](/docs/assets/Screen%20Shot%202021-02-25%20at%2009.42.26.png)

Click "I Understand" button in "Are you sure you want proceed?" dialog

![Screen Shot 2021-02-25 at 09.44.10](/docs/assets/Screen%20Shot%202021-02-25%20at%2009.44.10.png)

Wait a few secods for the seed to complete.

![Screen Shot 2021-02-25 at 09.44.40](/docs/assets/Screen%20Shot%202021-02-25%20at%2009.44.40.png)

![Screen Shot 2021-02-25 at 09.45.09](/docs/assets/Screen%20Shot%202021-02-25%20at%2009.45.09.png)

If you get an error message for some of the resources, try again this time only selecting the troublesome resources.

If the error persists contact support.

## Resources

### Users

This resource creates some users with priceTables data.

<details>
  <summary>View Sample Data</summary>

```
E-mail: john@email.com
PriceTable: platinum

E-mail: steven@email.com
PriceTable: gold

E-mail: chris@email.com
PriceTable: silver
```

</details>

### Brands

This resource creates one brand.

<details>
  <summary>View Sample Data</summary>

```
Name: Brand (9280)
```

</details>

### Collection

This resource creates a collection with all products.

<details>
  <summary>View Sample Data</summary>

```
Name: All
Type: Inclusive
BrandId: 9280 (Brand)
```

</details>

### Categories

This resource creates seven categories.

<details>
  <summary>View Sample Data</summary>

```
Name: Apparel             (9281)
Name: Food and beverage   (9282)
Name: Sporting            (9283)
Name: Agribusiness        (9284)
Name: Home Appliance      (9285)
Name: Computer & Software (9286)
Name: Power tools         (9287)
```

</details>

### Fields

This resource creates a group with two fields containing a variety of fieldvalues for two specifics categories.

<details>
  <summary>View Sample Data</summary>

```
Group: Specifications

Category: Apparel (9281)
Field: Clothes Size
Field Values: S, M, L and XL

Category: Sporting (9283)
Field: Shoes Size
Field Values: 8, 8.5, 9, 9.5 and 10
```

</details>

### Products

This resource creates a sort of products, skus and set the specifications, images and attachments (customization and subscription).

<details>
  <summary>View Sample Data</summary>

```
Category: Apparel (9281)
Products:

    Name: adidas Men's Performance Polo - Blast Blue (880001)
    Skus:
        Name: S     (880010)
        Name: M     (880011)
        Name: L     (880012)
        Name: XL    (880013)

    Name: adidas Men's Performance Polo - Green Night (880002)
    Skus: [{
        Name: S     (880020)
        Name: M     (880021)
        Name: L     (880022)
        Name: XL    (880023)

    Name: adidas Women's Microdot Polo - Night Indigo (880003)
    Skus:
        Name: S     (880030)
        Name: M     (880031)
        Name: L     (880032)
        Name: XL    (880033)

    Name: adidas Women's Microdot Polo - True Pink (880004)
    Skus:
        Name: S     (880040)
        Name: M     (880041)
        Name: L     (880042)
        Name: XL    (880043)

Category: Food and beverage (9282)
Products:

    Name: Yellow Onions (10 lbs.) (880026)
    Sku: _same name_ (880260)

    Name: Cauliflower Fresh (880027)
    Sku: _same name_ (880270)

    Name: Asparagus Green Conventional (880028)
    Sku: _same name_ (880280)

    Name: Fresh Hass Avocadoes (880029)
    Sku: _same name_ (880290)

    Name: Fresh Coconuts (880030)
    Sku: _same name_ (880300)

    Name: Whole Watermelon Mini Fresh (880031)
    Sku: _same name_ (880310)

    Name: Navel Oranges Grown Large Fresh (880032)
    Sku: _same name_ (880320)

    Name: Navel Oranges Grown Large Fresh, Pack of 10 (880039)
    SkuKit: _same name_ (880390)
    SkuComponents: 10un of Navel Oranges Grown Large Fresh

Category: Sporting (9283)
Products:

    Name: Nike Men's Roshe G Spikeless Golf Shoes (880005)
    Skus:
        Name: 8     (880050)
        Name: 8.5   (880051)
        Name: 9     (880052)
        Name: 9.5   (880053)
        Name: 10    (880054)

    Name: Nike Men's Air Max 1 G Spikeless Golf Shoes (880006)
    Skus:
        Name: 8     (880060)
        Name: 8.5   (880061)
        Name: 9     (880062)
        Name: 9.5   (880063)
        Name: 10    (880064)

    Name: Nike Air Max 270 G Spikeless Golf Shoes (880007)
    Skus:
        Name: 8     (880070)
        Name: 8.5   (880071)
        Name: 9     (880072)
        Name: 9.5   (880073)
        Name: 10    (880074)

    Name: Skechers Women's Go Golf Drive 4 Dogs At Play Spikeless Golf Shoes (880008)
    Skus:
        Name: 8     (880080)
        Name: 8.5   (880081)
        Name: 9     (880082)
        Name: 9.5   (880083)
        Name: 10    (880084)

Category: Agribusiness (9284)
Products:

    Name: 2020 APACHE AS1040 (880033)
    Sku: _same name_ (880330)

    Name: 2 POST CANOPY (880034)
    Sku: _same name_ (880340)

    Name: 2020 AMACSA PH390 (880035)
    Sku: _same name_ (880350)

    Name: Faceplate Combine Snout (880036)
    Sku: _same name_ (880360)

    Name: 2016 MK MARTIN ENT MKGB788 Blades/Box Scraper (880037)
    Sku: _same name_ (880370)

    Name: 1998 JOHN DEERE 8400T (880038)
    Sku: _same name_ (880380)

Category: Home Appliance (9285)
Products:

    Name: Weber 45010001 Spirit II E-310 3-Burner Liquid Propane Grill, Black (880021)
    Sku: _same name_ (880210)

    Name: iRobot Roomba 675 Robot Vacuum-Wi-Fi Connectivity, Works with Alexa, Good for Pet Hair, Carpets, Hard Floors, Self-Charging (880022)
    Sku: _same name_ (880220)

    Name: ALROCKET Dehumidifier 35oz(1000ml) Small Dehumidifier for 2100 Cubic Feet (260 sq ft) Portable and Compact Ultra Quiet (880023)
    Sku: _same name_ (880230)

    Name: McCulloch MC1375 Canister Steam Cleaner with 20 Accessories (880024)
    Sku: _same name_ (880240)

    Name: Cuisinart GR-4N 5-in-1 Griddler (880025)
    Sku: _same name_ (880250)

Category: Computer & Software (9286)
Products:

    Name: Acer Aspire Z24-890-UA91 AIO Desktop - Windows 10 (880015)
    Sku: _same name_ (880150)

    Name: Lenovo IdeaCentre AIO 3 - Windows 10 (880016)
    Sku: _same name_ (880160)

    Name: Acer Aspire TC-885-UA92 Desktop - Windows 10 (880017)
    Sku: _same name_ (880170)

    Name: CYBERPOWERPC Gamer Xtreme VR Gaming PC - Windows 10 (880018)
    Sku: _same name_ (880180)

    Name: Acer Aspire 5 Slim Laptop - Windows 10 (880019)
    Sku: _same name_ (880190)

    Name: Jumper EZbook X3 Windows 10 Laptop (880020)
    Sku: _same name_ (880200)

    Name: Acer Aspire z24 890 + Acer Aspire ATC 885 (880040)
    SkuKit: _same name_ (880400)
    SkuComponents:  1un of Acer Aspire Z24-890-UA91 AIO Desktop - Windows 10 (880015)
                    1un of Acer Aspire TC-885-UA92 Desktop - Windows 10 (880017)

Category: Power tools (9287)
Products:

    Name: BLACK+DECKER 20V MAX Drill & Home Tool Kit, 68 Piece (LDX120PK),Black/Orange (880009)
    Sku: _same name_ (880090)

    Name: BLACK+DECKER 20V MAX Cordless Drill / Driver with 30-Piece Accessories (LD120VA) (880010)
    Sku: _same name_ (880100)

    Name: BLACK+DECKER 20V Max Cordless Chainsaw, 10-Inch, Tool Only (LCS1020B) (880011)
    Sku: _same name_ (880110)

    Name: BLACK+DECKER 20V MAX Cordless Drill Combo Kit, 2-Tool (BD2KITCDDI),Black/Orange Impact Combo Kit (880012)
    Sku: _same name_ (880120)

    Name: BLACK+DECKER 20V MAX 5-1/2-Inch Cordless Circular Saw, Tool Only (BDCCS20B) (880013)
    Sku: _same name_ (880130)

    Name: BLACK+DECKER 20V MAX 5-1/2-Inch Cordless Circular Saw (BDCCS20C) (880014)
    Sku: _same name_ (880140)
```

</details>

### Attachments

#### Customization

<details>
  <summary>View Sample Data</summary>

```
Name: T-Shirt Customization (T-Shirt Name - 15 characters)
Products: adidas Men's Performance Polo - Blast Blue (880001)
```

</details>

#### Subscription

It is mandatory to [follow these additional steps](https://help.vtex.com/tutorial/como-configurar-assinatura-v2--1FA9dfE7vJqxBna9Nft5Sj#2-how-to-install-the-subscription-app) to enable subscription.

<details>
  <summary>View Sample Data</summary>

```
Name: Subscription
Products: All from category Food and beverage (9282)
```

</details>

### Logistics

This resource update the logistics module using the preset dock, warehouse and carrier.

<details>
  <summary>View Sample Data</summary>

```
Freight Values:
    Country: BRA
    ZipCodeStart: 0
    ZipCodeEnd: 9999999

    Country: USA
    ZipCodeStart: 0
    ZipCodeEnd: 99999999

Docks:
    Name: Doca Principal (1)
    Country: BRA

    Name: Main Dock (2)
    Country: USA

Warehouse:
    Name: Estoque (1_1)
    Docks:
        Doca Principal (1)
        Main Dock (2)
```

</details>

### Pricing

This resource set random prices for some products, custom prices for a few products and sets the price table.

#### Most Products

<details>
  <summary>View Sample Data</summary>

```
ListPrice: 30.00
BasePrice: between 50.00 and 2000.00
Markup: 0%
```

</details>

#### Quantity Prices

<details>
  <summary>View Sample Data</summary>

```
Product: BLACK+DECKER 20V MAX Cordless Drill / Driver with 30-Piece Accessories (LD120VA) (880100)
ListPrice: null
BasePrice: 100.00
FixedPrices:
Minimum Quantity: 1
Value: 100.00

    Minimum Quantity: 10
    Value: 90.00

    Minimum Quantity: 50
    Value: 80.00

    Minimum Quantity: 100
    Value: 70.00
```

</details>

#### Price Tables

<details>
  <summary>View Sample Data</summary>

```
Name: silver
Percentual Modifier: -5%

Name: gold
Percentual Modifier: -10%

Name: platinum
Percentual Modifier: -15%
```

</details>

### Benefits

This resource sets a Progressive Discount benefit.

<details>
  <summary>View Sample Data</summary>

```
Name: Progressive Discount
Conditions:
Start: 2010-01-01
End: 2070-01-01
Collection: All
Benefit:
  Quantity: 5
  Discount: 5%

  Quantity: 10
  Discount: 15%

  Quantity: 15
  Discount: 25%

  Quantity: 20
  Discount: 35%
```

</details>

### Taxes

This resource sets VAT and ICMS taxes.

<details>
  <summary>View Sample Data</summary>

```
Name: VAT
Condition:
Start: 2010-01-01
End: 2070-01-01
Category: Agribusiness (9284)
Tax: 5%

Name: ICMS
Condition:
Start: 2010-01-01
End: 2070-01-01
Category: Agribusiness (9284)
Tax: 12%
```

</details>

### Payment

This resource set 3 affiliations (Promissory, Test and CreditControlV2), the custom payment Promissories and the payment condition using them, the VISA credit card condition and the Customer Credit condition.

<details>
  <summary>View Sample Data</summary>

```
Affiliation: Promissory
Custom Payment: Promissory (201)
Payment Condition: Promissory

Affiliation: Test
Payment Condition: VISA (credit card)

Affiliation: CreditControlV2
Payment Conditions:
15 days (0% interest)
30 days (0% interest)
15 and 30 days (1% interest)
15, 30 and 45 days (1.5% interest)
```

</details>
