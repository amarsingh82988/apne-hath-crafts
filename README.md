# Apne Hath Crochet Boutique

Build a complete, production-ready full-stack e-commerce website for a handmade crochet brand called “Apne Hath Crochet”.

The website must be designed as a premium, warm, handmade, trustworthy crochet brand — not like a generic electronics/fashion store.

1. TECH STACK

Use the following architecture:

Frontend

React.js

Vite

React Router

Tailwind CSS

Modern responsive UI

Component-based architecture

Clean state management

Form validation

Loading states

Skeleton loaders

Toast notifications

Mobile-first responsive design

Backend

Node.js

Express.js

MongoDB

Mongoose

REST API architecture

JWT authentication

Secure HTTP-only cookies where appropriate

bcrypt/password hashing

Nodemailer

Environment variables using .env

External services

Payment gateway: Razorpay

Email: Nodemailer

Image storage: Google Drive API

Database: MongoDB

Authentication: JWT + email OTP verification

Keep the architecture modular so services can be replaced later.

2. BRAND

Brand name:

Apne Hath Crochet

Brand positioning:

A handmade crochet brand selling beautifully handcrafted products made with care.

Brand personality:

Warm

Handmade

Cozy

Elegant

Minimal

Premium

Personal

Trustworthy

Visual direction:

Cream/off-white background

Soft beige

Warm brown

Muted terracotta

Soft pastel accents

Subtle shadows

Rounded cards

Elegant typography

Plenty of whitespace

Soft micro-interactions

Avoid:

Overly bright colors

Corporate-looking layouts

Generic marketplace design

Excessive animations

Cluttered interfaces

Use subtle crochet-inspired visual details where appropriate.

3. WEBSITE STRUCTURE

Create these main pages:

Customer pages

Home

Shop / All Products

Product Details

Category Products

Search Results

Wishlist

Cart

Checkout

Order Success

My Orders

Order Details / Tracking

My Profile

Login

Register

Email OTP Verification

Forgot Password

Reset Password

About Us

Contact Us

FAQ

Shipping Policy

Return / Refund Policy

Privacy Policy

Terms & Conditions

Admin pages

Create a completely separate protected admin dashboard.

Admin pages:

Admin Login

Dashboard

Products

Add Product

Edit Product

Orders

Order Details

Customers

Categories

Coupons

Reviews

Inventory

Homepage / Banner Management

Email / Notification Logs

Admin Profile

Settings

4. HOME PAGE

Create a premium handmade-brand homepage.

Sections:

Hero

Large beautiful crochet lifestyle imagery.

Headline:

Made by Hand, Made with Love.

Supporting text:

“Beautiful crochet creations, thoughtfully handcrafted to add a little more warmth to everyday life.”

Buttons:

Shop Collection
Explore Handmade

Featured Categories

Examples:

Crochet Flowers

Bags

Keychains

Plushies

Home Decor

Accessories

Custom Crochet

Display categories using beautiful cards/images.

Best Sellers

Show product cards with:

Image

Product name

Price

Discount price if available

Rating

Wishlist button

Add to Cart button

Why Apne Hath Crochet?

Show 4 benefits:

Handmade with Love

Premium Materials

Carefully Packed

Made for You

Handmade Story

Create a section explaining the story behind the brand.

Custom Orders

Prominent CTA:

Want Something Made Just for You?

Button:
Request Custom Order

Customer Reviews

Display customer testimonials and ratings.

Instagram / Social Section

Create a visually attractive gallery placeholder that can later be connected to Instagram.

Newsletter

Email subscription section:

“Get cozy updates, new drops & exclusive offers.”

5. PRODUCT SYSTEM

Products must be dynamically loaded from MongoDB.

Product schema should support:

name

slug

description

shortDescription

price

compareAtPrice

discount

category

subcategory

SKU

stock

lowStockThreshold

images

featuredImage

variants

colors

sizes

materials

careInstructions

estimatedDelivery

customizable

customizationInstructions

tags

featured

bestseller

newArrival

active

rating

reviewCount

createdAt

updatedAt

Support multiple product images.

Allow variants where necessary.

Example:

Color:

Cream

Pink

Brown

Size:

Small

Medium

Large

Stock must be tracked per variant when variants exist.

6. GOOGLE DRIVE IMAGE UPLOAD

Implement product image uploading through Google Drive API.

Admin should be able to:

Select multiple images

Upload images

Preview images before upload

Reorder images

Delete images

Set featured image

When an admin uploads product images:

Frontend sends image to backend.

Backend authenticates with Google Drive API.

Backend uploads image to configured Google Drive folder.

Backend obtains the required file information/public URL.

Store the Google Drive file ID and URL in MongoDB.

Product uses the stored image URL.

Do NOT expose Google Drive credentials or service-account credentials in frontend code.

Use environment variables for all Google Drive configuration.

Example environment variables:

GOOGLE_DRIVE_CLIENT_EMAIL
GOOGLE_DRIVE_PRIVATE_KEY
GOOGLE_DRIVE_FOLDER_ID

Create a reusable:

googleDriveService.js

with functions such as:

uploadImage()

deleteImage()

getImageUrl()

Handle upload failures gracefully.

7. AUTHENTICATION

Implement complete authentication.

Customer registration:

Fields:

Name

Email

Phone

Password

Confirm Password

After registration:

Create user.

Generate secure 6-digit OTP.

Store hashed OTP in database.

Set OTP expiration.

Send OTP using Nodemailer.

Redirect user to OTP verification.

User enters OTP.

Verify OTP.

Mark email as verified.

Allow login.

Never store OTP in plaintext.

8. NODEMAILER EMAIL SYSTEM

Create a reusable email service.

Use Nodemailer.

Environment variables:

SMTP_HOST
SMTP_PORT
SMTP_USER
SMTP_PASSWORD
EMAIL_FROM

Create reusable email templates.

Emails required:

Registration OTP

Subject:
“Verify your Apne Hath Crochet account”

Password Reset OTP

Order Confirmation

Include:

Order number

Products

Quantity

Total

Shipping address

Payment status

Payment Confirmation

Order Shipped

Order Out for Delivery

Order Delivered

Order Cancelled

Refund Initiated

Refund Completed

Use clean branded HTML email templates matching Apne Hath Crochet's visual identity.

9. OTP SYSTEM

Implement:

6-digit OTP

Secure random generation

Hashed OTP storage

10-minute expiry

Maximum verification attempts

Resend OTP

Resend cooldown

OTP invalidation after successful verification

OTP types:

EMAIL_VERIFICATION

PASSWORD_RESET

EMAIL_CHANGE

Protect against OTP brute force.

10. LOGIN

Login using:

Email

Password

Support:

Remember session

Logout

Forgot password

Reset password

Email verification requirement

Use JWT authentication.

Implement proper authorization middleware.

Roles:

customer

admin

Never trust role information supplied directly by the frontend.

11. PRODUCT SEARCH AND FILTERING

Shop page must support:

Search

Category

Price range

Sort

Availability

Rating

Color

Size

Sorting:

Featured

Newest

Price low to high

Price high to low

Best selling

Highest rated

Add pagination.

Use backend filtering rather than downloading every product to the frontend.

12. PRODUCT DETAILS PAGE

Show:

Image gallery

Product name

Rating

Reviews count

Price

Original price

Discount

Stock status

Variant selection

Quantity selector

Add to cart

Buy now

Wishlist

Also show:

Description

Materials

Care instructions

Shipping information

Customization information

Reviews

Related products

If a product is customizable, show customization fields.

Example:

“Add your customization request”

Allow customers to enter text.

13. CART

Cart must be fully functional.

Features:

Add product

Remove product

Increase quantity

Decrease quantity

Variant selection

Save for later

Coupon

Subtotal

Discount

Shipping

Tax

Grand total

Prevent customers from adding more quantity than available stock.

Cart should persist for logged-in users.

For guests, persist cart locally and merge it with the customer's account after login.

14. WISHLIST

Implement:

Add to wishlist

Remove from wishlist

Move wishlist item to cart

Wishlist persistence

Wishlist button should appear on product cards and product pages.

15. CHECKOUT

Create a clean multi-step checkout.

Step 1:
Customer information

Step 2:
Shipping address

Fields:

Full name

Phone

Address

Apartment / optional

City

State

Pincode

Country

Step 3:
Order summary

Step 4:
Payment

Step 5:
Order confirmation

Validate pincode and required address fields.

16. RAZORPAY PAYMENT GATEWAY

Integrate Razorpay properly.

Use Razorpay Orders API.

Payment flow:

Customer clicks Pay Now.

Frontend requests backend to create Razorpay order.

Backend calculates the final amount from trusted database values.

Backend creates Razorpay order.

Backend sends order details to frontend.

Frontend opens Razorpay Checkout.

Customer completes payment.

Razorpay returns payment information.

Frontend sends payment response to backend.

Backend verifies Razorpay signature.

Only after successful server-side verification should the order be marked as paid.

Reduce inventory.

Send confirmation email.

Show success page.

NEVER trust the amount or payment status sent by the frontend.

Use environment variables:

RAZORPAY_KEY_ID
RAZORPAY_KEY_SECRET

Never expose RAZORPAY_KEY_SECRET to frontend.

Create:

razorpayService.js

with reusable functions:

createOrder()

verifyPayment()

initiateRefund()

17. PAYMENT STATUS

Support:

pending

processing

paid

failed

refunded

partially_refunded

Store:

razorpayOrderId

razorpayPaymentId

razorpaySignature

paymentMethod

amount

currency

paymentStatus

paidAt

refund information

Implement Razorpay webhook support where appropriate.

Verify webhook signatures server-side.

18. ORDERS

Order schema should include:

orderNumber

user

items

shippingAddress

subtotal

discount

shippingFee

tax

total

coupon

payment

orderStatus

trackingNumber

courier

trackingUrl

statusHistory

notes

createdAt

updatedAt

Generate human-readable order numbers.

Example:

AHC-2026-00001

19. ORDER STATUS

Support:

Order Placed

Payment Confirmed

Processing

Handmade / Preparing

Packed

Shipped

Out for Delivery

Delivered

Cancelled

Return Requested

Returned

Refund Initiated

Refunded

Store every status change in statusHistory.

Each history entry should contain:

status

message

timestamp

updatedBy

20. ORDER TRACKING

Create a beautiful tracking page.

Timeline UI:

✓ Order Placed
✓ Payment Confirmed
✓ Processing
✓ Packed
→ Shipped
○ Out for Delivery
○ Delivered

Display:

Order number

Current status

Tracking number

Courier

Estimated delivery

Timeline

Product summary

Admin can manually update:

status

courier

tracking number

tracking URL

estimated delivery

If a tracking URL exists, show:

Track Shipment

button.

21. ADMIN DASHBOARD

Create a professional admin dashboard.

Dashboard metrics:

Total Revenue

Today's Revenue

Total Orders

Pending Orders

Completed Orders

Total Customers

Total Products

Low Stock Products

Charts:

Revenue over time

Orders over time

Best-selling products

Category performance

Recent orders table.

Low-stock alert section.

22. ADMIN PRODUCT MANAGEMENT

Admin can:

Create product

Edit product

Delete product

Activate/deactivate product

Upload images

Delete images

Reorder images

Set featured image

Add variants

Manage stock

Set discount

Mark bestseller

Mark featured

Mark new arrival

Product creation form should be well organized into sections:

Basic Information

Pricing

Inventory

Images

Variants

Description

Shipping

SEO

Visibility

Add client-side and server-side validation.

23. ADMIN ORDER MANAGEMENT

Admin orders page:

Columns:

Order #

Customer

Date

Items

Total

Payment

Status

Actions

Filters:

Date

Payment status

Order status

Customer

Admin can open order details.

Admin can update:

order status

tracking number

courier

tracking URL

estimated delivery

admin notes

Whenever an important status changes, automatically send an email to the customer.

24. CUSTOMER MANAGEMENT

Admin can view:

Customer name

Email

Phone

Email verification status

Number of orders

Total spent

Registration date

Last order

Admin can view customer order history.

Do not allow admin to view customer passwords.

25. CATEGORY MANAGEMENT

Admin can:

Create category

Edit category

Delete category

Activate/deactivate category

Upload category image

Set category description

Example categories:

Flowers

Bags

Keychains

Plushies

Home Decor

Accessories

Custom Orders

26. COUPONS

Implement coupon management.

Admin can create:

Percentage discount

Fixed discount

Minimum order amount

Maximum discount

Expiry date

Usage limit

Per-user usage limit

Active/inactive status

Customer can enter coupon code at checkout.

Backend must validate coupons securely.

27. INVENTORY

Create inventory management.

Show:

Product

SKU

Variant

Current stock

Low stock threshold

Status

Statuses:

In Stock

Low Stock

Out of Stock

Prevent overselling.

Use atomic inventory updates where appropriate.

28. REVIEWS

Customers can review products they purchased.

Review fields:

Rating

Title

Comment

Only allow verified purchasers to review.

Admin can:

Approve

Hide

Delete reviews

Show average rating on product pages.

29. CUSTOM ORDER FEATURE

Because this is a crochet brand, implement a custom-order request system.

Customer page:

Custom Crochet Request

Fields:

Name

Email

Phone

Product type

Preferred color

Size

Quantity

Budget

Deadline

Description

Reference image upload

Additional notes

Store requests in MongoDB.

Admin can:

View requests

Change status

Add notes

Contact customer

Mark accepted/rejected/completed

Statuses:

New

Reviewing

Quoted

Accepted

In Progress

Completed

Rejected

30. ADMIN HOMEPAGE MANAGEMENT

Admin should be able to manage:

Hero banner

Hero title

Hero description

Hero image

CTA buttons

Featured categories

Featured products

Homepage sections

Do not hardcode these values into React.

Store configurable homepage content in MongoDB.

31. SEO

Implement basic SEO.

Every product should have:

SEO title

SEO description

SEO keywords

SEO-friendly slug

Example:

/product/crochet-sunflower-bouquet

Use proper:

title tags

meta descriptions

Open Graph metadata

semantic HTML

image alt text

32. SECURITY

Implement strong security practices.

Use:

Helmet

CORS configuration

Rate limiting

Input validation

MongoDB sanitization

Password hashing

JWT validation

Role-based authorization

Secure cookies where appropriate

CSRF protection where applicable

File type validation

File size limits

API request validation

Never expose:

database credentials

JWT secrets

Razorpay secret

SMTP password

Google Drive private key

to the frontend.

33. ERROR HANDLING

Create centralized Express error handling.

API responses should have a consistent format.

Example:

Success:

{
"success": true,
"data": {}
}

Error:

{
"success": false,
"message": "Something went wrong"
}

Create useful frontend error states.

Do not expose internal stack traces to customers in production.

34. DATABASE MODELS

Create appropriate Mongoose models.

At minimum:

User

Product

Category

Order

Review

Coupon

Wishlist

Cart

OTP

CustomOrder

HomepageContent

Notification / EmailLog

Use proper references and indexes.

Add indexes for:

email

slug

SKU

orderNumber

product search

order status

createdAt

35. API STRUCTURE

Organize backend like:

server/
config/
controllers/
middleware/
models/
routes/
services/
utils/
validators/
templates/
uploads/
app.js
server.js

Example API routes:

/api/auth/register
/api/auth/login
/api/auth/verify-otp
/api/auth/resend-otp
/api/auth/forgot-password
/api/auth/reset-password

/api/products
/api/products/:id

/api/categories

/api/cart

/api/wishlist

/api/orders
/api/orders/:id

/api/payments/create-order
/api/payments/verify
/api/payments/webhook

/api/reviews

/api/coupons

/api/custom-orders

/api/admin/products
/api/admin/orders
/api/admin/customers
/api/admin/dashboard

36. RESPONSIVE DESIGN

The website must work beautifully on:

Mobile

Tablet

Laptop

Desktop

Pay special attention to mobile checkout.

Admin dashboard should also be usable on tablets and smaller screens.

37. UX REQUIREMENTS

Include:

Loading states

Empty states

Error states

Success states

Confirmation dialogs

Toast notifications

Form validation messages

Disabled button states during API requests

Image loading placeholders

Skeleton loaders

Example:

When adding to cart:

“Added to your cart ♡”

When an item is unavailable:

“Currently unavailable”

38. CART + ORDER EDGE CASES

Handle:

Product becoming unavailable

Stock changing during checkout

Payment failure

Payment success but frontend disconnects

Duplicate payment verification

User refreshing payment page

Coupon expiration

Coupon usage limit reached

Product deleted after being added to cart

Price changing after adding to cart

Duplicate order creation

The backend must always recalculate product prices and stock before creating an order.

Use idempotency / duplicate protection for payment and order processing.

39. ADMIN AUTHORIZATION

Admin dashboard must be protected.

Normal customers must NEVER be able to access admin APIs.

Implement middleware:

protect
adminOnly

Admin role must be verified from the authenticated server-side user record.

40. ENVIRONMENT VARIABLES

Create a .env.example containing:

PORT=
MONGODB_URI=
JWT_SECRET=
JWT_EXPIRES_IN=

RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=

SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=
EMAIL_FROM=

GOOGLE_DRIVE_CLIENT_EMAIL=
GOOGLE_DRIVE_PRIVATE_KEY=
GOOGLE_DRIVE_FOLDER_ID=

FRONTEND_URL=
BACKEND_URL=

Do not hardcode credentials.

41. DEVELOPMENT MODE

Provide clear setup instructions.

README must explain:

Clone project

Install frontend dependencies

Install backend dependencies

Create MongoDB database

Configure .env

Configure Razorpay

Configure Nodemailer

Configure Google Drive API

Run backend

Run frontend

Example commands:

npm install
npm run dev

Also explain how to create the first admin user securely.

42. SEED DATA

Create a seed script that adds:

Admin user

Sample categories

Sample crochet products

Sample reviews

Sample homepage content

Use realistic crochet product examples such as:

Crochet Sunflower Bouquet

Handmade Crochet Tote Bag

Crochet Daisy Keychain

Crochet Teddy Bear

Crochet Flower Pot

Crochet Coaster Set

Crochet Granny Square Bag

Crochet Hair Accessories

Use placeholder images initially.

43. ADMIN UX

Admin interface should feel like a modern SaaS dashboard.

Include:

Sidebar

Top navigation

Breadcrumbs

Search

Filters

Tables

Pagination

Modal dialogs

Dropdowns

Charts

Status badges

Sidebar:

Dashboard
Products
Categories
Orders
Customers
Inventory
Coupons
Reviews
Custom Orders
Homepage
Email Logs
Settings

44. CUSTOMER HEADER

Desktop:

Logo:
Apne Hath Crochet

Navigation:

Home
Shop
Categories
Custom Orders
About
Contact

Right side:

Search
Wishlist
Cart
Account

Mobile:

Hamburger menu

Logo

Search

Wishlist

Cart

45. FOOTER

Footer sections:

Shop

All Products
New Arrivals
Best Sellers
Custom Orders

Help

Contact
FAQ
Shipping
Returns
Track Order

Company

About Us
Our Story

Legal

Privacy Policy
Terms
Refund Policy

Social

Instagram
Facebook
Pinterest

Newsletter signup.

46. IMPORTANT IMPLEMENTATION RULE

Do NOT create a fake frontend-only demo.

I need a real full-stack application.

Buttons must connect to actual API endpoints.

Forms must submit real data.

Authentication must use the backend.

Products must come from MongoDB.

Orders must be stored in MongoDB.

Payments must use Razorpay.

Emails must use Nodemailer.

Images must upload through the backend to Google Drive.

Admin operations must modify the real database.

Order tracking must use actual order status data.

47. API + FRONTEND INTEGRATION

Use a clean service layer on the frontend.

Example:

services/authService.js
services/productService.js
services/orderService.js
services/paymentService.js
services/adminService.js

Do not scatter API calls throughout components.

Use reusable hooks where appropriate.

48. FINAL QUALITY REQUIREMENT

Before considering the project complete, verify the complete flow:

Customer flow

Register
→ Email OTP
→ Verify email
→ Login
→ Browse products
→ Search/filter
→ Product details
→ Add to cart
→ Checkout
→ Address
→ Coupon
→ Razorpay
→ Payment verification
→ Order creation
→ Confirmation email
→ My Orders
→ Order tracking
→ Delivery status email
→ Review product

Admin flow

Admin login
→ Dashboard
→ Create category
→ Create product
→ Upload product images to Google Drive
→ Product appears on storefront
→ Customer places order
→ Admin sees order
→ Admin updates status
→ Adds courier/tracking number
→ Customer sees tracking timeline
→ Customer receives email notifications

Test all major flows and handle failures gracefully.

49. DESIGN DETAILS

The final UI should feel similar to a premium handmade boutique.

Use:

Large product photography

Soft rounded cards

Elegant typography

Warm neutral palette

Subtle hover animations

Smooth transitions

Generous whitespace

Premium product presentation

Mobile-friendly navigation

Do not overdesign.

The products and photography should remain the visual focus.

Use tasteful copy such as:

“Handcrafted with patience.”
“Little things, made by hand.”
“Made slowly. Loved deeply.”
“Crochet pieces made just for you.”

50. DELIVERABLE

Generate the complete application with:

Frontend

Backend

MongoDB models

REST APIs

Authentication

OTP verification

Nodemailer

Razorpay integration

Google Drive image upload

Customer dashboard

Admin dashboard

Product management

Order management

Order tracking

Coupons

Reviews

Wishlist

Cart

Custom orders

Homepage CMS

Security middleware

Validation

Error handling

.env.example

Seed script

README

Make the code clean, modular, maintainable, and production-oriented.

Do not leave core functionality as TODOs or fake mock implementations.

Where external credentials are required, provide the integration code and clearly identify the environment variables that need to be configured.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://apne-hath-crafts.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/3c0453ea-b33c-44e9-a475-00ef686737b9).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
