# 🛒 বাজার দর | BazarDor

BazarDor is a Bengali web app that shows today's prices of everyday essentials in Bangladesh, such as rice, lentils, oil, vegetables, fish, meat, eggs and spices. It also shows how much each price changed since yesterday.

## Technologies Used

- Next.js (App Router)
- React
- Tailwind CSS
- desy ui
- react hot toaster
- react-marquee-text
- better auth
- mongoDB
- REST API 

## Key Features

1. **Live price ticker:** a scrolling bar with every product's price and change.
2. **Risers and fallers:** the top 6 products whose price went up and down today.
3. **Category navigation:** filter products by category, with the active one highlighted.
4. **Responsive product cards:** emoji, name, unit, price and a coloured change badge.
5. **Bengali-first:** all text, digits and units are shown in Bengali.


# BACKEND_URL=https://api.abcz.workers.dev

## Responsive Design

- Mobile-first layout built with Tailwind CSS breakpoints.
- Product grid: 1 column on mobile, 2 on tablet, 3 on laptop, 4 on large screens.
- Category navigation scrolls horizontally on small screens.
- Long product names are truncated so cards never overflow.
- Works on all common screen sizes, from phones to desktops.
