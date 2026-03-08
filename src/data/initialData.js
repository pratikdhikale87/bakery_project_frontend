const categoryImagePools = {
  cakes: [
    'https://images.unsplash.com/photo-1761637604698-0f9e9d3278ee?fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8Y2FrZSUyMGJha2VyeSUyMHBob3Rvc3xlbnwwfHx8fDE3Nzg3NTA4Mjl8MA&ixlib=rb-4.1.0&q=80&w=4000',
    'https://images.unsplash.com/photo-1696721497046-0dfdf38bd3f4?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000',
    'https://images.unsplash.com/photo-1554907253-5f1d721e3586?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000',
    'https://images.unsplash.com/photo-1761637604809-735817ea2bd2?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000',
    'https://images.unsplash.com/photo-1651307573144-98b6f546761e?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000',
    'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000',
  ],
  pastries: [
    'https://images.unsplash.com/photo-1739652277516-3612b96d176e?fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8cGFzdHJ5JTIwYmFrZXJ5JTIwcGhvdG9zfGVufDB8fHx8MTc3ODc1MDgyOXww&ixlib=rb-4.1.0&q=80&w=4000',
    'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000',
    'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000',
    'https://images.unsplash.com/photo-1481391032119-d89fee407e44?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000',
    'https://images.unsplash.com/photo-1641255106201-7a35839a11c1?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000',
    'https://images.unsplash.com/photo-1641255106024-b5d43f2e5523?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000',
  ],
  biscuits: [
    'https://images.unsplash.com/photo-1509440159596-0249088772ff?fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NXx8Y29va2llcyUyMGJpc2N1aXRzJTIwcGhvdG9zfGVufDB8fHx8MTc3ODc1MDgyOXww&ixlib=rb-4.1.0&q=80&w=4000',
    'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000',
    'https://images.unsplash.com/photo-1590080877035-1db0c7de80ad?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000',
    'https://images.unsplash.com/photo-1599809398227-4e552dac9914?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000',
    'https://images.unsplash.com/photo-1759325400079-3d3d61c2fcd5?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000',
    'https://images.unsplash.com/photo-1744737499164-af9cd9fb9f0f?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000',
  ],
  breads: [
    'https://images.unsplash.com/photo-1598373182133-52452f7691ef?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000',
    'https://images.unsplash.com/photo-1719161148345-c88b05af8186?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000',
    'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000',
    'https://images.unsplash.com/photo-1511690088903-71dc5a49f5e3?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000',
    'https://images.unsplash.com/photo-1771160962771-00186d83364e?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000',
    'https://images.unsplash.com/photo-1661125927901-6eecda3338a3?fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.0.3&q=60&w=3000',
  ],
}

const sizePresets = {
  cakes: [
    { label: 'Half Kg', multiplier: 1 },
    { label: '1 Kg', multiplier: 1.45 },
    { label: '2 Kg', multiplier: 2.6 },
  ],
  pastries: [
    { label: 'Box of 2', multiplier: 1 },
    { label: 'Box of 4', multiplier: 1.8 },
    { label: 'Box of 6', multiplier: 2.45 },
  ],
  biscuits: [
    { label: 'Jar 250g', multiplier: 1 },
    { label: 'Jar 500g', multiplier: 1.75 },
    { label: 'Party Tin', multiplier: 2.4 },
  ],
  breads: [
    { label: '1 Loaf', multiplier: 1 },
    { label: '2 Loaves', multiplier: 1.9 },
    { label: 'Family Pack', multiplier: 2.7 },
  ],
}

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const buildSizes = (category, basePrice) =>
  (sizePresets[category] ?? sizePresets.cakes).map((item) => ({
    label: item.label,
    price: Math.round(basePrice * item.multiplier),
  }))

const buildGallery = (name, category) => {
  const pool = categoryImagePools[category] ?? categoryImagePools.cakes
  const rotation =
    name.split('').reduce((sum, character) => sum + character.charCodeAt(0), 0) % pool.length

  return pool.map((_, index) => pool[(index + rotation) % pool.length])
}

export const categories = [
  {
    id: 'cakes',
    label: 'Cakes',
    shortLabel: 'Cake',
    headline: 'Celebration-ready classics',
    description: 'Layered cakes with smooth icing, custom messages, and premium fillings.',
    image: categoryImagePools.cakes[5],
    stat: '120+ custom orders',
    accentLine: 'Signature celebration centerpieces',
  },
  {
    id: 'pastries',
    label: 'Pastries',
    shortLabel: 'Pastry',
    headline: 'Light, flaky, and indulgent',
    description: 'Fresh pastry boxes for coffee breaks, gifting, and late-night cravings.',
    image: categoryImagePools.pastries[1],
    stat: 'Baked in small batches',
    accentLine: 'Layered, glazed, and coffee-ready',
  },
  {
    id: 'biscuits',
    label: 'Biscuits',
    shortLabel: 'Biscuit',
    headline: 'Tea-time jars and tins',
    description: 'Crunchy, buttery biscuits baked in small batches and sealed for freshness.',
    image: categoryImagePools.biscuits[1],
    stat: 'Travel-safe gift packs',
    accentLine: 'Crunchy jars for gifting and stocking',
  },
  {
    id: 'breads',
    label: 'Breads',
    shortLabel: 'Bread',
    headline: 'Daily essentials from the oven',
    description: 'Artisan loaves, garlic breads, and savory options made for warm service.',
    image: categoryImagePools.breads[0],
    stat: 'Daily oven schedule',
    accentLine: 'Warm loaves with artisan texture',
  },
]

const baseProducts = [
  {
    id: 'berry-velvet-cake',
    name: 'Berry Velvet Cake',
    category: 'cakes',
    basePrice: 749,
    rating: 4.9,
    reviewCount: 142,
    badge: 'Best Seller',
    deliveryTime: '35-45 mins',
    featured: true,
    tagline: 'Soft velvet sponge, berry compote, and silky cocoa cream.',
    description:
      'A celebration cake built with balanced sweetness, juicy berry filling, and a smooth cream finish.',
    highlights: ['Eggless option available', 'Custom message card', 'Cold-chain packed'],
    ingredients: ['Velvet sponge', 'Berry compote', 'Whipped cream', 'Vanilla syrup'],
  },
  {
    id: 'dark-ganache-cake',
    name: 'Dark Ganache Cake',
    category: 'cakes',
    basePrice: 819,
    rating: 4.8,
    reviewCount: 118,
    badge: 'Chef Pick',
    deliveryTime: '40-50 mins',
    featured: true,
    tagline: 'Rich chocolate sponge layered with glossy ganache.',
    description:
      'Deep cocoa flavour, dense crumb, and a glossy finish for birthdays, anniversaries, and office treats.',
    highlights: ['High cocoa blend', 'Sharp chocolate finish', 'Party-size variants'],
    ingredients: ['Chocolate sponge', 'Dark ganache', 'Cocoa nibs', 'Buttercream'],
  },
  {
    id: 'strawberry-mille-feuille',
    name: 'Strawberry Mille Feuille',
    category: 'pastries',
    basePrice: 259,
    rating: 4.7,
    reviewCount: 84,
    badge: 'Fresh Today',
    deliveryTime: '25-30 mins',
    featured: true,
    tagline: 'Crisp puff pastry, vanilla cream, and strawberry glaze.',
    description:
      'A refined pastry box item with crisp layers, glossy strawberry finish, and chilled vanilla cream.',
    highlights: ['Made in small batches', 'Best served chilled', 'Pairs with coffee'],
    ingredients: ['Puff pastry', 'Vanilla diplomat cream', 'Fresh strawberry glaze', 'Powdered sugar'],
  },
  {
    id: 'caramel-croissant-ring',
    name: 'Caramel Croissant Ring',
    category: 'pastries',
    basePrice: 289,
    rating: 4.6,
    reviewCount: 63,
    badge: 'Weekend Special',
    deliveryTime: '30-35 mins',
    featured: false,
    tagline: 'Flaky croissant dough baked with caramel and sea salt.',
    description:
      'Buttery croissant spirals finished with caramel drizzle for a warm, shareable pastry experience.',
    highlights: ['Layered lamination', 'Best served warm', 'Salted caramel finish'],
    ingredients: ['Croissant dough', 'Salted caramel', 'Butter glaze', 'Sea salt flakes'],
  },
  {
    id: 'butter-almond-biscuits',
    name: 'Butter Almond Biscuits',
    category: 'biscuits',
    basePrice: 199,
    rating: 4.8,
    reviewCount: 95,
    badge: 'Tea Favourite',
    deliveryTime: '20-25 mins',
    featured: true,
    tagline: 'Golden bite-sized biscuits with roasted almond crunch.',
    description:
      'Perfect tea-time jars with buttery crumb, clean almond flavour, and a crisp finish.',
    highlights: ['Resealable jar', 'No artificial colours', 'Travel-friendly pack'],
    ingredients: ['Butter', 'Almond flakes', 'Flour', 'Raw sugar'],
  },
  {
    id: 'double-choco-biscuit-box',
    name: 'Double Choco Biscuit Box',
    category: 'biscuits',
    basePrice: 229,
    rating: 4.5,
    reviewCount: 58,
    badge: 'Kids Pick',
    deliveryTime: '20-25 mins',
    featured: false,
    tagline: 'Crunchy cocoa biscuits packed with chocolate chips.',
    description:
      'A richer biscuit box for chocolate cravings with crunchy edges and melt-in-mouth chips.',
    highlights: ['Gift-ready box', 'Crunchy texture', 'Made with premium cocoa'],
    ingredients: ['Cocoa', 'Chocolate chips', 'Butter', 'Brown sugar'],
  },
  {
    id: 'stoneground-sourdough',
    name: 'Stoneground Sourdough',
    category: 'breads',
    basePrice: 179,
    rating: 4.7,
    reviewCount: 51,
    badge: 'Daily Bake',
    deliveryTime: '30-40 mins',
    featured: false,
    tagline: 'Slow-fermented loaf with airy crumb and crisp crust.',
    description:
      'An artisan loaf baked for breakfast tables and sandwich boards with a chewy texture and balanced tang.',
    highlights: ['Naturally fermented', 'Stoneground flour', 'Slices well after resting'],
    ingredients: ['Stoneground flour', 'Starter culture', 'Sea salt', 'Filtered water'],
  },
  {
    id: 'garlic-herb-pull-apart',
    name: 'Garlic Herb Pull Apart',
    category: 'breads',
    basePrice: 219,
    rating: 4.9,
    reviewCount: 74,
    badge: 'Party Side',
    deliveryTime: '25-35 mins',
    featured: true,
    tagline: 'Soft shareable bread finished with garlic butter and herbs.',
    description:
      'A crowd-friendly side bread loaded with garlic butter, parsley, and a glossy oven finish.',
    highlights: ['Great with pasta', 'Soft center', 'Oven-brushed garlic butter'],
    ingredients: ['Milk bread dough', 'Garlic butter', 'Parsley', 'Parmesan dust'],
  },
]

export const seedProducts = baseProducts.map((product) => ({
  ...product,
  slug: slugify(product.name),
  sizes: buildSizes(product.category, product.basePrice),
  images: buildGallery(product.name, product.category),
}))

export const seedOrders = [
  {
    id: 'RSY-4102',
    placedAt: '2026-03-03 16:20',
    status: 'Packed',
    eta: 'Today, 6:45 PM',
    customerName: 'Demo Customer',
    customerEmail: 'demo@rosyoven.com',
    deliveryAddress: '221B Pink Street, Kolkata',
    paymentMethod: 'UPI',
    total: 999,
    items: [
      {
        productId: 'berry-velvet-cake',
        name: 'Berry Velvet Cake',
        size: '1 Kg',
        quantity: 1,
        unitPrice: 999,
      },
    ],
  },
  {
    id: 'RSY-4103',
    placedAt: '2026-03-05 11:05',
    status: 'Out for delivery',
    eta: 'Today, 12:15 PM',
    customerName: 'Demo Customer',
    customerEmail: 'demo@rosyoven.com',
    deliveryAddress: '221B Pink Street, Kolkata',
    paymentMethod: 'Cash on Delivery',
    total: 518,
    items: [
      {
        productId: 'strawberry-mille-feuille',
        name: 'Strawberry Mille Feuille',
        size: 'Box of 2',
        quantity: 2,
        unitPrice: 259,
      },
    ],
  },
]

export const orderStatuses = ['Freshly baked', 'Packed', 'Out for delivery', 'Delivered']

export const deliverySteps = [
  {
    title: 'Freshly baked',
    text: 'Small-batch bakes leave the oven throughout the day, not from old stock.',
  },
  {
    title: 'Safely packed',
    text: 'Protective cake collars, chilled boxes, and freshness seals keep the finish intact.',
  },
  {
    title: 'Rider assigned',
    text: 'Dispatch begins only after the product is quality-checked and route-ready.',
  },
  {
    title: 'Delivered warm',
    text: 'You get live status tracking from your dashboard until the order arrives.',
  },
]

export const testimonials = [
  {
    name: 'Anika Roy',
    role: 'Birthday customer',
    quote:
      'The cake arrived exactly like the pictures, the cream held up perfectly, and delivery was on time.',
  },
  {
    name: 'Rahul Mehta',
    role: 'Office pantry lead',
    quote:
      'We use Cocoa Atelier for team pastry boxes. The quick-buy flow makes repeat ordering very fast.',
  },
  {
    name: 'Sana Qureshi',
    role: 'Weekend regular',
    quote:
      'The dashboard tracking is clear, the biscuit tins travel well, and the quality feels premium.',
  },
]

export const formatCurrency = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)

export const makeProductFromForm = ({ name, category, basePrice, tagline, description }) => {
  const resolvedCategory = categories.some((item) => item.id === category) ? category : 'cakes'
  const parsedPrice = Number.parseInt(basePrice, 10) || 299

  return {
    id: `${slugify(name)}-${Date.now()}`,
    name,
    slug: `${slugify(name)}-${Date.now()}`,
    category: resolvedCategory,
    basePrice: parsedPrice,
    rating: 4.8,
    reviewCount: 12,
    badge: 'New Launch',
    deliveryTime: '30-40 mins',
    featured: false,
    tagline: tagline || 'Freshly added from the admin dashboard.',
    description: description || 'A newly added bakery product ready for storefront display.',
    highlights: ['Admin added item', 'Visible on storefront instantly', 'Editable in future backend'],
    ingredients: ['Bakery base', 'Fresh finish', 'House recipe', 'Seasonal garnish'],
    sizes: buildSizes(resolvedCategory, parsedPrice),
    images: buildGallery(name, resolvedCategory),
  }
}
