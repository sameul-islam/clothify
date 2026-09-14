# SEPY — MASTER PROJECT CONTEXT & AI HANDOFF DOCUMENT

> **Purpose of this document**
>
> This document is the primary technical and architectural context for the SEPY project.
>
> Any AI, developer, or future maintainer working on SEPY should be able to understand the project's identity, architecture, current implementation, completed features, security decisions, development workflow, known limitations, and remaining roadmap from this document alone.
>
> The project already exists and is actively developed. **Do not restart, rebuild, or replace the existing architecture unnecessarily.**
>
> The correct approach is:
>
> **Inspect → Understand → Modify only what is necessary → Test → Confirm → Continue**

---

# ==================================================

# 1. PROJECT IDENTITY

# ==================================================

## Project Name

**SEPY**

## Project Type

**Real-business-ready luxury fashion e-commerce website**

SEPY is being developed as a serious, production-oriented fashion e-commerce platform, not merely as a demo or tutorial project.

The long-term goal is to make SEPY suitable for a real fashion business.

## Design Direction

SEPY should maintain:

* Luxury aesthetic
* Minimal design
* Clean UI
* Premium visual language
* Modern UX
* Editorial fashion aesthetic
* Responsive desktop experience
* Responsive mobile experience
* Maintainable architecture
* Secure backend logic
* Real-business-ready foundations

The visual direction should remain premium and restrained rather than becoming unnecessarily complex.

---

# ==================================================

# 2. IMPORTANT AI / DEVELOPER INSTRUCTIONS

# ==================================================

Any AI or developer continuing SEPY must follow these rules.

## Existing Codebase Must Be Preserved

Do NOT:

* Restart the project
* Create a new project
* Replace the existing architecture unnecessarily
* Rebuild already completed features
* Create duplicate systems for functionality that already exists
* Move or rename files without a real architectural reason
* Replace working code only for stylistic reasons
* Introduce unnecessary libraries
* Introduce unnecessary abstractions

The project is already substantially developed.

The correct workflow is:

```text
Inspect
   ↓
Understand
   ↓
Modify only what is necessary
   ↓
Test
   ↓
Confirm
   ↓
Continue
```

---

## Development Style

The developer is still learning web development.

Therefore:

* Explain concepts in beginner-friendly language.
* Use Bengali for explanations when appropriate.
* Keep code and technical terms in English.
* Give exact file paths.
* Explain what needs to change.
* Explain why the change is necessary.
* Avoid unnecessary abstraction.
* Avoid overengineering.
* Divide large features into small logical steps.
* Provide testing instructions after each step.
* Do not dump an entire large feature at once when it can be implemented incrementally.
* Wait for confirmation before moving to the next major step.

When the developer says:

**“সফল হয়েছে” / “কাজ করছে”**

consider that implementation step successfully completed and continue to the next logical step.

If an error occurs:

1. Diagnose the existing error.
2. Identify the affected file/code.
3. Explain the cause.
4. Provide the smallest appropriate fix.
5. Test again.

---

# ==================================================

# 3. TECHNOLOGY STACK

# ==================================================

## Frontend

SEPY currently uses:

* React `19.2.6`
* Vite `8.0.12`
* React Router DOM `7.16.0`
* Redux Toolkit `2.12.0`
* React Redux `9.3.0`
* Axios `1.16.1`
* Tailwind CSS `4.3.0`
* `@tailwindcss/vite` `4.3.0`
* React Icons `5.6.0`

Development tooling includes:

* ESLint
* `@vitejs/plugin-react`
* React Hooks ESLint plugin
* React Refresh ESLint plugin

Frontend package manager configuration is defined in the frontend `package.json`.

---

## Backend

SEPY currently uses:

* Node.js
* Express `5.2.1`
* MongoDB
* Mongoose `9.6.3`
* dotenv `17.4.2`
* CORS `2.8.6`
* slugify `1.6.9`
* bcryptjs `3.0.3`
* jsonwebtoken `9.0.3`

Development tooling:

* nodemon `3.1.14`

### Authentication libraries

The current authentication implementation uses:

```text
bcryptjs
jsonwebtoken
```

The backend `package.json` also currently contains `bcrypt`, but the implemented authentication controller uses `bcryptjs`.

This duplicate dependency should not be used to introduce a second password-hashing system. It can be cleaned up later if appropriate.

---

## Frontend and Backend Separation

Frontend and backend are maintained separately.

Conceptually:

```text
SEPY
│
├── Frontend
│   └── React + Vite
│
└── Backend
    └── Node + Express + MongoDB
```

---

# ==================================================

# 4. FRONTEND ARCHITECTURE

# ==================================================

Current major frontend structure:

```text
src/
│
├── app/
│   └── store.js
│
├── components/
│   ├── Navbar/
│   │   ├── Navbar.jsx
│   │   ├── IconBtn.jsx
│   │   ├── MegaMenu.jsx
│   │   ├── SearchOverlay.jsx
│   │   ├── MobileDrawer.jsx
│   │   └── navbarData.js
│   │
│   ├── OrderStatus.jsx
│   └── other homepage components
│
├── features/
│   ├── auth/
│   │   ├── authSlice.js
│   │   └── authThunks.js
│   │
│   ├── products/
│   │   ├── productSlice.js
│   │   ├── productThunks.js
│   │   ├── ProductCard.jsx
│   │   ├── ProductGallery.jsx
│   │   ├── ProductInfo.jsx
│   │   ├── ProductVariants.jsx
│   │   └── ProductPurchase.jsx
│   │
│   └── cart/
│       ├── cartSlice.js
│       └── CartDrawer.jsx
│
├── pages/
│   ├── Home.jsx
│   ├── ProductsPage.jsx
│   ├── ProductDetailsPage.jsx
│   ├── Cart.jsx
│   ├── Checkout.jsx
│   ├── OrderConfirmation.jsx
│   ├── MyOrders.jsx
│   ├── Login.jsx
│   └── Register.jsx
│
├── services/
│   ├── axios.js
│   ├── productApi.js
│   ├── orderApi.js
│   └── authApi.js
│
└── App.jsx
```

The exact current structure should always be checked before modifying files.

Do not assume that a future version of the project has exactly the same structure if the actual code differs.

---

# ==================================================

# 5. BACKEND ARCHITECTURE

# ==================================================

Current major backend structure:

```text
src/
│
├── models/
│   ├── product.model.js
│   ├── order.model.js
│   └── user.model.js
│
├── controllers/
│   ├── product.controller.js
│   ├── order.controller.js
│   └── auth.controller.js
│
├── routes/
│   ├── product.routes.js
│   ├── order.routes.js
│   └── auth.routes.js
│
├── middleware/
│   └── auth.middleware.js
│
├── app.js
└── server.js
```

The backend uses CommonJS modules.

The backend `package.json` contains:

```json
{
  "type": "commonjs"
}
```

---

# ==================================================

# 6. FRONTEND ROUTING

# ==================================================

Current routes include:

```text
/
```

Homepage.

```text
/products
```

Centralized product listing.

```text
/product/:slug
```

Product details.

```text
/cart
```

Cart page.

```text
/checkout
```

Checkout.

```text
/order-confirmation/:id
```

Order confirmation / individual order view.

```text
/my-orders
```

Authenticated customer's orders.

```text
/login
```

Login.

```text
/register
```

Registration.

---

# ==================================================

# 7. PRODUCT MODEL

# ==================================================

Current Product model contains:

```text
title
slug
description
price
images
gender
sizes
colors
category
stock
discount
featured
bestSeller
newArrival
rating
numReviews
timestamps
```

Gender values:

```text
men
women
unisex
```

---

# ==================================================

# 8. PRODUCT API

# ==================================================

Current product routes:

```text
POST /api/products

GET /api/products

GET /api/products/:slug

GET /api/products/:slug/related
```

`GET /api/products` supports:

* featured
* bestSeller
* newArrival
* category
* gender
* search
* limit
* page
* sort
* minPrice
* maxPrice

## Search

Search currently uses the product title.

Search is case-insensitive.

---

## Sorting

Supported sorting values:

```text
price-low
price-high
rating
```

Default sorting is newest.

---

## Pagination

Pagination is implemented.

The API returns pagination information used by the frontend.

---

## Related Products

The related products endpoint is implemented:

```text
GET /api/products/:slug/related
```

---

# ==================================================

# 9. PRODUCT LISTING ARCHITECTURE

# ==================================================

SEPY intentionally does NOT create a separate listing page for every gender/category.

There is one centralized product listing page:

```text
/products
```

URL query parameters control the listing.

Examples:

```text
/products

/products?gender=women

/products?gender=men

/products?gender=unisex

/products?category=dresses

/products?featured=true

/products?bestSeller=true

/products?newArrival=true

/products?search=linen

/products?sort=price-low

/products?sort=price-high

/products?minPrice=...

/products?maxPrice=...

/products?page=2
```

Filters can be combined:

```text
/products?gender=women&category=dresses&page=2
```

## Architectural Decision

The URL is the source of truth for:

* Search
* Gender
* Category
* Sort
* Price filters
* Featured
* Best seller
* New arrival
* Pagination

Redux manages the fetched product/application state.

This centralized architecture must be preserved.

---

# ==================================================

# 10. PRODUCT DETAILS

# ==================================================

Route:

```text
/product/:slug
```

Product cards navigate using the product slug.

Product Details currently:

* Fetches the single product
* Handles loading state
* Handles error state
* Renders ProductGallery
* Renders ProductInfo
* Renders ProductVariants
* Renders ProductPurchase

This functionality is complete and tested.

---

# ==================================================

# 11. PRODUCT GALLERY

# ==================================================

ProductGallery is complete.

Features:

* Main product image
* Thumbnail images
* Thumbnail click changes main image
* Active thumbnail indicator
* Hover zoom
* Mobile responsive behavior
* Fallback when image is unavailable
* Single-image behavior

---

# ==================================================

# 12. PRODUCT VARIANTS

# ==================================================

ProductVariants supports:

* Size
* Color

Example sizes:

```text
S
M
L
XL
```

Example colors:

```text
Black
White
Gray
```

If a product has no sizes, the size selector is not shown.

If a product has no colors, the color selector is not shown.

Variant selection is handled through the existing product details flow.

---

# ==================================================

# 13. PRODUCT PURCHASE

# ==================================================

ProductPurchase is complete.

Features:

* Stock checking
* Quantity selector
* Maximum quantity limited by available stock
* Out-of-stock handling
* Required size selection when applicable
* Required color selection when applicable
* Add to Bag

Cart item structure includes:

```text
cartItemId
productId
slug
title
image
price
selectedSize
selectedColor
quantity
```

`cartItemId` is variant-specific.

Conceptually:

```text
product + selectedSize + selectedColor
```

Therefore:

```text
Product A + L + Gray
```

and:

```text
Product A + XL + White
```

are separate cart items.

---

# ==================================================

# 14. REDUX STORE

# ==================================================

Current Redux store contains:

```js
reducer: {
  products: productReducer,
  cart: cartReducer,
  auth: authReducer,
}
```

Redux is currently responsible for:

```text
products
cart
authentication state
```

The authentication system was added without replacing the existing product/cart architecture.

---

# ==================================================

# 15. PRODUCT REDUX

# ==================================================

Current product state includes:

```text
products
loading
error
product
productLoading
productError
currentPage
totalPages
totalProducts
```

Filters include:

```text
search
gender
category
sort
minPrice
maxPrice
featured
bestSeller
newArrival
```

Current thunks:

```text
getProducts
getSingleProduct
```

Current API services include:

```text
fetchProducts(params)
fetchSingleProduct(slug)
```

The product Redux system is working.

---

# ==================================================

# 16. CART REDUX

# ==================================================

Cart Redux is complete.

localStorage key:

```text
sepy-cart
```

Cart state:

```js
{
  items: []
}
```

Actions:

```text
addToCart
removeFromCart
updateCartQuantity
clearCart
```

Behavior:

If the same:

```text
product + size + color
```

is added again:

* Quantity increases.

If the variant is different:

* A separate cart item is created.

Cart persists after browser refresh through localStorage.

This has been tested successfully.

---

# ==================================================

# 17. CART PAGE

# ==================================================

Route:

```text
/cart
```

Features:

* Empty cart state
* Continue Shopping
* Product image
* Product title
* Price
* Size
* Color
* Quantity
* Increase quantity
* Decrease quantity
* Remove item
* Subtotal
* Cart summary
* Checkout navigation

Tested successfully.

---

# ==================================================

# 18. NAVBAR CART COUNT

# ==================================================

Navbar reads cart items from Redux.

It calculates total quantity.

Example:

```text
Product A = 2
Product B = 1
```

Cart badge:

```text
3
```

This is working.

---

# ==================================================

# 19. CART DRAWER / MINI CART

# ==================================================

CartDrawer is connected to the Navbar cart icon.

Features:

* Overlay
* Slide-in drawer
* Cart items
* Product image
* Title
* Price
* Size
* Color
* Quantity
* Increase quantity
* Decrease quantity
* Remove item
* Subtotal
* Empty state
* Navigate to Cart
* Navigate to Checkout

Quantity and remove controls have been tested successfully.

---

# ==================================================

# 20. CHECKOUT PAGE

# ==================================================

Route:

```text
/checkout
```

Checkout is connected to the authenticated order flow.

Current controlled fields:

```text
name
email
phone
address
city
postalCode
country
```

Default country:

```text
Bangladesh
```

Current payment method:

```text
cod
```

Current UI includes:

* Empty cart handling
* Customer and Shipping Information
* Full Name
* Email
* Phone
* Address
* City
* Postal Code
* Order Summary
* Cart items
* Quantity
* Subtotal
* Shipping
* Total
* Payment method
* Form validation
* Loading state
* Submit protection
* Order error display

---

# ==================================================

# 21. CHECKOUT AUTHENTICATION

# ==================================================

Checkout is protected at the frontend level.

If the user is not authenticated and attempts to access:

```text
/checkout
```

the frontend redirects the user to:

```text
/login
```

The backend also protects order creation using authentication middleware.

Therefore the checkout/order flow has both:

```text
Frontend authentication check
```

and:

```text
Backend authentication protection
```

The backend remains the authoritative security boundary.

---

# ==================================================

# 22. CHECKOUT FORM VALIDATION

# ==================================================

The checkout form validates:

* Name
* Email
* Phone
* Address
* City
* Postal Code

Field errors are cleared when the corresponding field changes.

An order-level error message is shown if order creation fails.

Loading state:

```text
Processing Order...
```

is displayed during submission.

Repeated submission is prevented while processing.

---

# ==================================================

# 23. USER MODEL

# ==================================================

Current file:

```text
src/models/user.model.js
```

Current User model fields:

```text
name
email
password
role
timestamps
```

Role values:

```text
customer
admin
```

Default role:

```text
customer
```

Email is:

* required
* unique
* lowercase
* trimmed

Password is required.

Passwords are hashed before being stored.

Plain-text passwords are never returned through the authentication API.

---

# ==================================================

# 24. AUTHENTICATION SYSTEM

# ==================================================

Authentication is now implemented.

The authentication system contains:

```text
Register
Login
Password hashing
JWT
Authentication middleware
Current-user endpoint
Frontend auth state
Token persistence
Logout
Protected order routes
```

Authentication uses:

```text
bcryptjs
jsonwebtoken
```

---

# ==================================================

# 25. REGISTER API

# ==================================================

Route:

```text
POST /api/auth/register
```

Registration requires:

```text
name
email
password
```

Email is normalized using:

```text
lowercase + trim
```

The backend:

1. Validates required fields.
2. Normalizes email.
3. Checks whether the email already exists.
4. Hashes the password with bcrypt.
5. Creates the user.
6. Returns safe user information.

The password is not returned in the response.

Duplicate email returns a conflict response.

Registration has been tested successfully.

---

# ==================================================

# 26. LOGIN API

# ==================================================

Route:

```text
POST /api/auth/login
```

Login requires:

```text
email
password
```

The backend:

1. Normalizes email.
2. Finds the user.
3. Compares the submitted password against the hashed password.
4. Rejects invalid credentials with a generic authentication error.
5. Creates a JWT for successful authentication.

JWT payload includes:

```text
userId
role
iat
exp
```

Token expiration:

```text
7 days
```

The login response contains:

```text
success
message
token
user
```

The password is never returned.

Login has been tested successfully.

---

# ==================================================

# 27. AUTHENTICATION MIDDLEWARE

# ==================================================

File:

```text
src/middleware/auth.middleware.js
```

The middleware expects:

```text
Authorization: Bearer <token>
```

It:

1. Reads the Authorization header.
2. Verifies the Bearer format.
3. Extracts the token.
4. Verifies the JWT using `JWT_SECRET`.
5. Stores decoded user information in:

```text
req.user
```

If authentication fails:

```text
401 Unauthorized
```

is returned.

---

# ==================================================

# 28. CURRENT USER API

# ==================================================

Route:

```text
GET /api/auth/me
```

This route is protected by the authentication middleware.

It confirms that the supplied JWT is valid and returns the authenticated user information stored in the JWT context.

This endpoint has been tested successfully.

---

# ==================================================

# 29. FRONTEND AUTH STATE

# ==================================================

Frontend authentication is managed through Redux.

File:

```text
src/features/auth/authSlice.js
```

Current state includes:

```text
token
user
isAuthenticated
loading
error
```

Actions include:

```text
setCredentials
logout
clearAuthError
```

Async operations include:

```text
register
login
getCurrentUser
```

---

# ==================================================

# 30. FRONTEND AUTH SERVICES

# ==================================================

File:

```text
src/services/authApi.js
```

Current services:

```text
registerUser(userData)

loginUser(loginData)

fetchCurrentUser()
```

These communicate with:

```text
/api/auth/register
/api/auth/login
/api/auth/me
```

---

# ==================================================

# 31. AXIOS AUTHENTICATION

# ==================================================

File:

```text
src/services/axios.js
```

The Axios instance uses:

```text
http://localhost:5000/api
```

as the current development API base URL.

A request interceptor checks:

```text
localStorage.getItem("sepy-token")
```

If a token exists, it automatically sends:

```text
Authorization: Bearer <token>
```

with the request.

This allows protected frontend API calls to use the authenticated session automatically.

---

# ==================================================

# 32. AUTH TOKEN PERSISTENCE

# ==================================================

Frontend token storage key:

```text
sepy-token
```

After successful login, the token is stored in localStorage.

On application startup:

```text
App.jsx
   ↓
Check sepy-token
   ↓
If token exists
   ↓
getCurrentUser()
```

Therefore authenticated state survives a browser refresh.

This has been tested successfully.

---

# ==================================================

# 33. EXPIRED / INVALID TOKEN CLEANUP

# ==================================================

If an existing token is invalid or expired during application startup:

```text
getCurrentUser()
   ↓
authentication failure
   ↓
localStorage.removeItem("sepy-token")
```

This prevents a stale token from remaining indefinitely in localStorage.

The Redux authentication state is also cleared when current-user authentication fails.

---

# ==================================================

# 34. LOGOUT

# ==================================================

Logout is implemented.

Logout behavior:

```text
User clicks Logout
       ↓
localStorage.removeItem("sepy-token")
       ↓
Redux logout()
       ↓
token cleared
user cleared
isAuthenticated = false
```

After logout:

* The user is no longer authenticated.
* Refresh does not restore the previous session.
* Protected frontend pages redirect appropriately.

Logout has been tested successfully.

---

# ==================================================

# 35. NAVBAR ACCOUNT SYSTEM

# ==================================================

The Navbar account icon is authentication-aware.

When logged out:

```text
User icon
   ↓
/login
```

When logged in:

```text
User icon
   ↓
Account menu
   ├── My Orders
   └── Logout
```

The existing luxury Navbar architecture and styling are preserved.

This is intentionally a small account UI for the current stage.

A larger account dashboard can be added later.

---

# ==================================================

# 36. ORDER MODEL

# ==================================================

Backend Order model is implemented.

## User Ownership

Orders now contain a reference to the authenticated user:

```text
user
```

This connects an order to its owner.

---

## Customer Information

```text
name
email
phone
address
city
postalCode
country
```

---

## Order Items

```text
product
title
slug
image
selectedSize
selectedColor
quantity
price
```

---

## Pricing

```text
subtotal
shipping
tax
total
```

---

## Order Status

```text
pending
confirmed
processing
shipped
delivered
cancelled
```

---

## Payment Status

```text
pending
paid
failed
refunded
```

---

## Payment Method

```text
cod
card
bkash
nagad
```

Timestamps are enabled.

---

# ==================================================

# 37. ORDER CREATION API

# ==================================================

Endpoint:

```text
POST /api/orders
```

This endpoint is protected.

The authenticated user's identity comes from:

```text
req.user.userId
```

The backend does NOT trust the frontend to determine the order owner.

Order ownership is assigned server-side.

---

## Backend order creation flow

The backend:

1. Authenticates the user.
2. Receives product IDs and requested quantities.
3. Verifies each product exists.
4. Verifies requested quantities.
5. Verifies stock.
6. Verifies selected size when the product has sizes.
7. Verifies selected color when the product has colors.
8. Fetches the authoritative product price from MongoDB.
9. Calculates subtotal.
10. Calculates shipping.
11. Calculates tax.
12. Calculates total.
13. Deducts inventory transactionally.
14. Creates the order using the authenticated user.
15. Commits the transaction.

This flow has been successfully tested.

---

# ==================================================

# 38. ORDER PRICE SECURITY

# ==================================================

IMPORTANT:

Frontend cart price is NOT the authoritative price.

The backend fetches the product from MongoDB and uses:

```text
product.price
```

for final order calculation.

This prevents a client from simply modifying the frontend price and submitting an incorrect order total.

This principle must remain in future development.

---

# ==================================================

# 39. STOCK VALIDATION

# ==================================================

Backend verifies stock before creating an order.

If requested quantity exceeds available stock:

```text
Order rejected
```

This has been tested successfully.

---

# ==================================================

# 40. TRANSACTIONAL STOCK DEDUCTION

# ==================================================

Stock deduction uses a MongoDB transaction.

Conceptually:

```text
Start Transaction
       ↓
Check/update stock for every item
       ↓
If any item fails
       ↓
Abort Transaction
       ↓
No partial stock deduction
```

If all stock updates succeed:

```text
Create Order
       ↓
Commit Transaction
```

This protects multi-product orders from partially updating inventory.

The transactional implementation has been tested successfully.

---

# ==================================================

# 41. ORDER ROUTES

# ==================================================

Current order routes:

```text
POST /api/orders
GET /api/orders
GET /api/orders/my
GET /api/orders/:id
```

Authentication:

```text
POST /api/orders
    → protected

GET /api/orders/my
    → protected

GET /api/orders/:id
    → protected

GET /api/orders
    → legacy email-based development endpoint
```

IMPORTANT:

`/my` must remain before `/:id` in the Express route definition.

---

# ==================================================

# 42. MY ORDERS API

# ==================================================

Endpoint:

```text
GET /api/orders/my
```

This endpoint is protected.

The backend reads:

```text
req.user.userId
```

and returns only orders belonging to that authenticated user.

Conceptually:

```text
Logged-in User
      ↓
JWT
      ↓
req.user.userId
      ↓
Order.find({ user: userId })
      ↓
Only that user's orders
```

Orders are sorted newest-first.

This is the current production-oriented customer order architecture.

The endpoint has been tested successfully.

---

# ==================================================

# 43. MY ORDERS PAGE

# ==================================================

Route:

```text
/my-orders
```

Frontend file:

```text
src/pages/MyOrders.jsx
```

The current page is authentication-based.

It does NOT ask the customer to enter an email.

When authenticated:

```text
fetchMyOrders()
      ↓
GET /api/orders/my
```

The page displays:

* Account heading
* User name
* Order history
* Order count
* Order ID
* Order date
* Order status
* Payment status
* Item count
* Total
* Product preview
* Quantity
* Selected size
* Selected color
* View Order
* Continue Shopping

States include:

* Loading
* Error
* Empty orders
* Orders available

This has been successfully tested.

---

# ==================================================

# 44. LEGACY EMAIL ORDER LOOKUP

# ==================================================

An older endpoint still exists:

```text
GET /api/orders?email=...
```

Frontend service:

```text
fetchOrdersByEmail(email)
```

This was the original development-stage order lookup system.

It is NOT the current authenticated My Orders architecture.

The current customer flow uses:

```text
GET /api/orders/my
```

The legacy email-based endpoint should eventually be removed after confirming that no remaining part of the application depends on it.

Do not reintroduce email-based arbitrary order lookup as the primary customer order architecture.

---

# ==================================================

# 45. SINGLE ORDER API / ORDER OWNERSHIP SECURITY

# ==================================================

Endpoint:

```text
GET /api/orders/:id
```

This endpoint is protected.

The backend verifies:

```text
order._id = requested ID
```

AND:

```text
order.user = authenticated user ID
```

Conceptually:

```text
Authenticated User
       ↓
Requested Order ID
       ↓
Find order where:
_id = requested ID
AND
user = authenticated user
       ↓
Return order
```

If the order does not belong to the authenticated user:

```text
404 Order not found
```

This prevents one customer from accessing another customer's order simply by knowing an order ID.

This security behavior has been tested successfully.

---

# ==================================================

# 46. ORDER CONFIRMATION

# ==================================================

Route:

```text
/order-confirmation/:id
```

After successful checkout, the frontend navigates to:

```text
/order-confirmation/${data.order._id}
```

The Order Confirmation page fetches the order from the backend rather than relying only on temporary frontend state.

This makes the page refresh-safe.

The page displays:

* Success state
* Order ID
* Order date
* Order status
* Payment status
* Order items
* Pricing
* Delivery information
* Payment information

For COD:

```text
You will pay when your order is delivered.
```

The order endpoint is authenticated and ownership-protected.

---

# ==================================================

# 47. ORDER API SERVICE

# ==================================================

Current frontend order API service:

```text
createOrder(orderData)

fetchSingleOrder(id)

fetchOrdersByEmail(email)

fetchMyOrders()
```

Corresponding endpoints:

```text
POST /api/orders

GET /api/orders/:id

GET /api/orders?email=...

GET /api/orders/my
```

`fetchOrdersByEmail()` is legacy and should eventually be removed after usage is confirmed.

---

# ==================================================

# 48. ORDER STATUS COMPONENT

# ==================================================

Reusable component:

```text
src/components/OrderStatus.jsx
```

It centralizes order status presentation.

Supported statuses:

```text
pending
confirmed
processing
shipped
delivered
cancelled
```

Currently used in My Orders.

It can later be reused in:

* Order Confirmation
* Admin Orders
* Admin Order Details

The goal is to avoid duplicated status styling.

---

# ==================================================

# 49. CURRENT CUSTOMER ORDER FLOW

# ==================================================

The current verified customer flow is:

```text
Homepage
    ↓
Product Listing
    ↓
Search / Filter / Sort / Pagination
    ↓
Product Details
    ↓
Select Variant
    ↓
Add to Cart
    ↓
Cart
    ↓
Login
    ↓
Checkout
    ↓
Submit Order
    ↓
JWT Authentication
    ↓
Backend Validation
    ↓
Backend Price Verification
    ↓
Stock Validation
    ↓
MongoDB Transaction
    ↓
Stock Deduction
    ↓
Order Creation
    ↓
Order Confirmation
    ↓
My Orders
    ↓
Authenticated Individual Order
```

This is a major completed milestone and should be preserved.

---

# ==================================================

# 50. CURRENT VERIFIED AUTH FLOW

# ==================================================

The current authentication flow is:

```text
Register
    ↓
Password Hashing
    ↓
User Created
    ↓
Login
    ↓
Password Verification
    ↓
JWT Issued
    ↓
Token Stored in localStorage
    ↓
Redux Auth State
    ↓
Axios Bearer Token
    ↓
Protected API Requests
    ↓
Current User Verification
    ↓
Authenticated Customer
```

Logout:

```text
Logout
    ↓
Remove sepy-token
    ↓
Clear Redux Auth State
    ↓
Unauthenticated
```

---

# ==================================================

# 51. CURRENT COMPLETE / TESTED FEATURES

# ==================================================

## Homepage

✅ Complete

## Navbar

✅ Complete for current stage

## Hero

✅ Complete

## Collection Showcase

✅ Complete

## Featured Products

✅ Complete

## Best Sellers

✅ Complete

## Product Listing

✅ Complete

## URL Filtering

✅ Complete

## Search

✅ Complete

## Sorting

✅ Complete

## Pagination

✅ Complete

## Product Details

✅ Complete

## Product Gallery

✅ Complete

## Product Information

✅ Complete

## Product Variants

✅ Complete

## Product Purchase

✅ Complete

## Redux Product State

✅ Complete

## Redux Cart

✅ Complete

## Cart Persistence

✅ Complete

## Cart Page

✅ Complete

## Cart Quantity Controls

✅ Complete

## Cart Remove

✅ Complete

## Navbar Cart Count

✅ Complete

## Cart Drawer

✅ Complete

## Cart Drawer Quantity / Remove

✅ Complete

## Checkout UI

✅ Complete

## Checkout Form State

✅ Complete

## Checkout Validation

✅ Complete

## Checkout Authentication Protection

✅ Complete

## COD Flow

✅ Complete

## User Model

✅ Complete

## Password Hashing

✅ Complete

## Register API

✅ Complete

## Login API

✅ Complete

## JWT Authentication

✅ Complete

## Authentication Middleware

✅ Complete

## Current User API

✅ Complete

## Frontend Auth Redux

✅ Complete

## Auth Persistence

✅ Complete

## Logout

✅ Complete

## Invalid Token Cleanup

✅ Complete

## Authenticated Order Creation

✅ Complete

## Order Model

✅ Complete

## Backend Order Validation

✅ Complete

## Backend Price Verification

✅ Complete

## Stock Validation

✅ Complete

## Transactional Stock Deduction

✅ Complete

## Order Confirmation

✅ Complete

## Refresh-safe Order Confirmation

✅ Complete

## Authenticated My Orders API

✅ Complete

## Authenticated My Orders Page

✅ Complete

## Single Order Ownership Security

✅ Complete

## Navbar Account Flow

✅ Complete for current stage

## Reusable OrderStatus

✅ Complete

---

# ==================================================

# 52. CURRENT PROJECT STATE

# ==================================================

SEPY is NOT at the beginning.

A substantial full-stack customer e-commerce flow is already complete.

Current major state:

```text
Frontend
    ↓
Homepage                    ✅
Product System              ✅
Search / Filtering          ✅
Cart System                 ✅
Checkout                    ✅
Authentication              ✅
Order Creation              ✅
Inventory Deduction         ✅
Order Confirmation          ✅
My Orders                   ✅
Order Ownership Security    ✅
```

The customer-side core e-commerce foundation is now substantially complete.

---

# ==================================================

# 53. WHAT IS CURRENTLY NOT COMPLETE

# ==================================================

The following areas are still unfinished or only partially implemented:

```text
Wishlist
Account/Profile system
Address management
Advanced Order Details UX
Admin Authentication / Authorization
Admin Dashboard
Admin Product Management
Admin Order Management
Admin Inventory Management
Customer Management
Real Payment Gateway
Production API configuration
Production deployment
Production hardening
Advanced SEO
Performance optimization
Advanced accessibility
Monitoring
Backup strategy
```

These must not be described as completed until they are actually implemented and tested.

---

# ==================================================

# 54. CURRENT LEGACY / CLEANUP ITEMS

# ==================================================

Some development-stage code remains and should be cleaned carefully later.

## Legacy email order lookup

Current backend:

```text
GET /api/orders?email=...
```

Current frontend service:

```text
fetchOrdersByEmail(email)
```

These should eventually be removed after confirming there are no remaining dependencies.

---

## Duplicate bcrypt dependency

The backend package currently contains:

```text
bcrypt
bcryptjs
```

The implemented authentication system uses:

```text
bcryptjs
```

The unused duplicate dependency can be cleaned later.

Do not introduce two password hashing systems.

---

## Old environment secrets

Environment variables must never be committed to source control.

The backend `.gitignore` includes:

```text
.env
```

The `.env` file has been removed from normal Git tracking and secrets were rotated during the security cleanup.

Future development must keep secrets in environment variables.

---

# ==================================================

# 55. PAYMENT ROADMAP

# ==================================================

Current payment method:

```text
COD
```

The Order model already supports:

```text
cod
card
bkash
nagad
```

but actual gateway integration is NOT implemented yet.

The intended future payment options are:

```text
Cash on Delivery
bKash
Nagad
Card / Visa / Mastercard
```

Payment gateway integration should NOT be started before authentication, order ownership, admin architecture, and core order management are stable.

Future payment implementation should use an appropriate payment gateway.

Raw card details should not be manually handled by the application.

Payment status should eventually be tied to verified gateway callbacks/webhooks where appropriate.

---

# ==================================================

# 56. FUTURE ACCOUNT SYSTEM

# ==================================================

The current account UI is intentionally small.

Future account architecture may include:

```text
Account
├── Profile
├── My Orders
├── Order Details
├── Addresses
├── Wishlist
└── Logout
```

This should be implemented incrementally.

Do not overbuild the account system before the underlying requirements are clear.

---

# ==================================================

# 57. FUTURE WISHLIST SYSTEM

# ==================================================

Wishlist is currently not implemented as a real system.

The Navbar currently contains a wishlist indicator as part of the existing UI, but the actual wishlist backend/state system is still a future feature.

Future wishlist architecture may include:

```text
Product
   ↓
Add to Wishlist
   ↓
Wishlist State
   ↓
Wishlist Page
```

For a real-business implementation, persistent wishlist ownership should eventually be connected to the authenticated user.

---

# ==================================================

# 58. FUTURE ADMIN SYSTEM

# ==================================================

Admin functionality is NOT yet implemented.

The User model already supports:

```text
customer
admin
```

The future admin architecture should use both:

```text
Authentication
+
Role Authorization
```

Admin functionality is expected to include:

```text
Admin Dashboard
      ↓
Orders
Products
Customers
Inventory
```

Potential features:

* View all orders
* View order details
* Update order status
* Update payment status
* Product management
* Add product
* Edit product
* Delete product
* Stock management
* Customer management
* Basic dashboard statistics
* Low-stock visibility

Admin routes must be protected.

Customer users must not be able to access admin operations.

---

# ==================================================

# 59. FUTURE ADMIN AUTHORIZATION

# ==================================================

The current JWT contains:

```text
userId
role
```

This prepares the project for role-based authorization.

Future concept:

```text
JWT
 ↓
Authentication Middleware
 ↓
Authenticated User
 ↓
Role Check
 ↓
admin?
 ↓
Allow / Deny
```

Do not treat the presence of a frontend admin UI as security.

Authorization must always be enforced on the backend.

---

# ==================================================

# 60. PRODUCTION HARDENING ROADMAP

# ==================================================

Before real production launch, consider:

## Authentication Security

* JWT handling
* Token lifecycle
* Authorization
* Role protection
* Secure authentication failures

## API Security

* Input validation
* Rate limiting
* Secure headers
* CORS configuration
* Request validation
* Error handling
* Logging

## Database

* Appropriate indexes
* Query optimization
* Data integrity
* Backup strategy

## Order Security

* Customer ownership
* Inventory consistency
* Order status rules
* Transaction safety

## Payment Security

* Gateway verification
* Webhook verification
* Payment status consistency
* Idempotency where appropriate

## Frontend

* Loading states
* Error states
* Empty states
* Image optimization
* Accessibility
* Mobile UX
* Performance

## SEO

* Page metadata
* Product metadata
* Open Graph information
* Search engine indexing strategy
* Structured data where appropriate

## Deployment

* Production environment variables
* Production API URL
* Production MongoDB
* Frontend deployment
* Backend deployment
* HTTPS
* Domain configuration
* Monitoring

---

# ==================================================

# 61. DEVELOPMENT ROADMAP

# ==================================================

The recommended roadmap from the current state is:

## Phase 1 — Core Customer E-commerce

### Status

**Substantially complete**

Includes:

* Products
* Search
* Filtering
* Sorting
* Pagination
* Product details
* Variants
* Cart
* Checkout
* COD
* Orders
* Inventory validation
* Transactional stock deduction
* Authentication
* My Orders
* Order ownership security

---

## Phase 2 — Customer Experience

### Current / Next Focus

Recommended sequence:

```text
Order Details UX
      ↓
Account / Profile
      ↓
Wishlist
      ↓
Address Management
      ↓
Search / Filter UX polish
```

---

## Phase 3 — Admin Foundation

```text
Admin Authentication
      ↓
Role Authorization
      ↓
Admin Layout
      ↓
Admin Dashboard
```

---

## Phase 4 — Admin Business Management

```text
Products
   ↓
Inventory
   ↓
Orders
   ↓
Customers
   ↓
Statistics
```

---

## Phase 5 — Payment Integration

```text
COD
   ↓
bKash
   ↓
Nagad
   ↓
Card
```

Payment integration should be implemented carefully after the order architecture is stable.

---

## Phase 6 — Production Hardening

```text
Security
   ↓
Performance
   ↓
SEO
   ↓
Accessibility
   ↓
Monitoring
   ↓
Deployment
```

---

# ==================================================

# 62. IMPORTANT ARCHITECTURAL DECISIONS

# ==================================================

## Product Listing

Use one centralized:

```text
/products
```

page with URL query parameters.

Do not create unnecessary separate product pages for every category or gender.

---

## Cart

Current architecture:

```text
Redux + localStorage
```

Do not replace it without a clear architectural reason.

---

## Product Price

Backend MongoDB product price is authoritative.

Never trust frontend price for final order calculation.

---

## Inventory

Stock must be verified on the backend.

Multi-item stock updates should remain transactional.

---

## Orders

Orders are persistent backend records.

Order Confirmation should fetch order data from the backend.

---

## Customer Orders

Customer order access should be based on authenticated user identity.

The legacy email-based lookup is not the production customer-order architecture.

---

## Authentication

Authentication is already implemented.

Do not rebuild authentication from scratch.

Extend the existing:

```text
authSlice
authThunks
authApi
auth.middleware
auth.controller
auth.routes
```

architecture.

---

## Payment

COD first.

Gateway payments later.

---

# ==================================================

# 63. SECURITY PRINCIPLES

# ==================================================

The following principles must be preserved:

### Never trust frontend pricing

The backend calculates final order pricing.

### Never trust frontend stock

The backend verifies stock.

### Never trust frontend user identity

The backend derives the authenticated user from the JWT.

### Never expose passwords

Passwords are hashed and never returned in API responses.

### Never expose another user's orders

Order ownership is checked using authenticated user identity.

### Never put secrets in source code

Secrets belong in environment variables.

### Never treat frontend role checks as security

Admin authorization must be enforced by the backend.

### Keep transactions for inventory consistency

Multi-item order stock deduction should remain transactional.

---

# ==================================================

# 64. CURRENT IMPORTANT FILES

# ==================================================

## Frontend Authentication

```text
src/features/auth/authSlice.js
src/features/auth/authThunks.js
src/services/authApi.js
src/services/axios.js
src/pages/Login.jsx
src/pages/Register.jsx
```

## Frontend Orders

```text
src/services/orderApi.js
src/pages/Checkout.jsx
src/pages/OrderConfirmation.jsx
src/pages/MyOrders.jsx
src/components/OrderStatus.jsx
```

## Frontend State

```text
src/app/store.js
```

## Navbar

```text
src/components/Navbar/Navbar.jsx
```

## Backend Authentication

```text
src/models/user.model.js
src/controllers/auth.controller.js
src/routes/auth.routes.js
src/middleware/auth.middleware.js
```

## Backend Orders

```text
src/models/order.model.js
src/controllers/order.controller.js
src/routes/order.routes.js
```

## Backend Products

```text
src/models/product.model.js
src/controllers/product.controller.js
src/routes/product.routes.js
```

## Backend Entry

```text
src/app.js
src/server.js
```

---

# ==================================================

# 65. CURRENT API OVERVIEW

# ==================================================

## Products

```text
POST /api/products
GET /api/products
GET /api/products/:slug
GET /api/products/:slug/related
```

---

## Authentication

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

---

## Orders

```text
POST /api/orders
GET  /api/orders
GET  /api/orders/my
GET  /api/orders/:id
```

Authentication requirements:

```text
POST /api/orders
    → Protected

GET /api/orders/my
    → Protected

GET /api/orders/:id
    → Protected

GET /api/orders
    → Legacy email-based development endpoint
```

---

# ==================================================

# 66. CURRENT LOCAL STORAGE

# ==================================================

## Cart

```text
sepy-cart
```

Purpose:

```text
Persist cart items across browser refreshes.
```

---

## Authentication

```text
sepy-token
```

Purpose:

```text
Persist JWT authentication across browser refreshes.
```

The authentication token is removed during logout and invalid-token cleanup.

---

# ==================================================

# 67. CURRENT ENVIRONMENT / SECRET RULES

# ==================================================

Environment variables are used for sensitive backend configuration.

The backend `.gitignore` includes:

```text
.env
```

Secrets must never be committed to Git.

Important values such as:

```text
MONGODB_URI
JWT_SECRET
```

must remain environment variables.

Never place real secrets inside:

* README
* frontend source
* backend source
* public configuration
* Git commits

---

# ==================================================

# 68. CURRENT PROJECT MATURITY

# ==================================================

SEPY should currently be understood as:

```text
Early Prototype
        ❌
        
Basic Demo
        ❌

Substantial Full-Stack Foundation
        ✅

Customer E-commerce MVP Foundation
        ✅

Production-Ready Business Platform
        ⏳
```

The customer-facing core flow is substantially functional.

The project is not yet fully production-ready because major business systems such as:

* Admin
* Payment gateways
* Advanced account management
* Production hardening
* Deployment
* Monitoring

remain unfinished.

---

# ==================================================

# 69. IMMEDIATE NEXT DEVELOPMENT TARGET

# ==================================================

The next recommended development target is:

## Order Details / Customer Experience Refinement

Before moving deeply into Admin, the customer-side experience should be completed further.

Recommended sequence:

```text
Current Authentication + Orders
          ↓
Order Details UX
          ↓
Account / Profile
          ↓
Wishlist
          ↓
Address Management
          ↓
Customer Experience Polish
          ↓
Admin Authentication
```

Each feature should still be implemented incrementally.

---

# ==================================================

# 70. HOW AN AI SHOULD CONTINUE FROM THIS DOCUMENT

# ==================================================

When receiving this document, the AI should assume:

> SEPY already exists and is actively developed.

The AI should NOT respond with:

* “Let's create a new React project.”
* “Let's start from scratch.”
* “Let's rebuild the backend.”
* “Let's replace Redux.”
* “Let's create a new architecture.”
* “Let's rebuild authentication.”

Instead:

```text
Read this document
      ↓
Understand the current architecture
      ↓
Identify the next logical task
      ↓
Inspect the relevant existing file
      ↓
Make the smallest appropriate change
      ↓
Test
      ↓
Wait for confirmation
      ↓
Continue
```

If exact current code is needed but not available, ask the developer for that specific file.

Do not guess the current implementation when exact code matters.

---

# ==================================================

# 71. FINAL MASTER HANDOFF SUMMARY

# ==================================================

SEPY is a real-business-oriented luxury fashion e-commerce project built with:

```text
React
Vite
Redux Toolkit
Axios
Tailwind CSS
Node.js
Express
MongoDB
Mongoose
JWT
bcryptjs
```

The project already contains a functioning customer-side e-commerce foundation.

The current verified flow is:

```text
Browse Products
      ↓
Search / Filter / Sort / Pagination
      ↓
Product Details
      ↓
Variants
      ↓
Add to Cart
      ↓
Cart
      ↓
Login
      ↓
Checkout
      ↓
Authenticated Order
      ↓
Backend Validation
      ↓
Backend Price Verification
      ↓
Stock Validation
      ↓
Transactional Stock Deduction
      ↓
Order Creation
      ↓
Order Confirmation
      ↓
My Orders
      ↓
Authenticated Individual Order
```

Authentication is now implemented:

```text
Register
   ↓
Password Hashing
   ↓
Login
   ↓
JWT
   ↓
Protected Routes
   ↓
Current User
   ↓
Persistent Login
   ↓
Logout
```

Order ownership is now secured:

```text
Authenticated User
       ↓
User ID
       ↓
Only that user's orders
```

The legacy email-based order lookup remains only as development-era functionality and should eventually be removed after confirming no remaining dependency.

The next major project direction is:

```text
Customer Experience
      ↓
Admin Authentication
      ↓
Admin Authorization
      ↓
Admin Dashboard
      ↓
Products / Orders / Inventory / Customers
      ↓
Payment Integration
      ↓
Production Hardening
      ↓
Deployment
      ↓
Real Business Launch
```

The project must continue incrementally.

**Never restart the project unless the developer explicitly requests a complete rebuild.**

**Never replace working architecture without a real reason.**

**Always inspect first, modify minimally, test, confirm, and continue.**
