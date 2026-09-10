import sunflower from "@/assets/p-sunflower.jpg";
import tote from "@/assets/p-tote.jpg";
import keychain from "@/assets/p-daisy-keychain.jpg";
import teddy from "@/assets/p-teddy.jpg";
import coasters from "@/assets/p-coasters.jpg";
import grannyBag from "@/assets/p-granny-bag.jpg";
import flowerPot from "@/assets/p-flowerpot.jpg";
import hair from "@/assets/p-hair.jpg";

export type Category = {
  slug: string;
  name: string;
  description: string;
  image: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  category: string;
  sku: string;
  stock: number;
  images: string[];
  featuredImage: string;
  colors: string[];
  sizes: string[];
  materials: string;
  careInstructions: string;
  estimatedDelivery: string;
  customizable: boolean;
  tags: string[];
  featured: boolean;
  bestseller: boolean;
  newArrival: boolean;
  rating: number;
  reviewCount: number;
  createdAt: string;
};

export const categories: Category[] = [
  {
    slug: "flowers",
    name: "Crochet Flowers",
    description: "Blooms that never wilt, stitched petal by petal.",
    image: sunflower,
  },
  { slug: "bags", name: "Bags", description: "Everyday totes, made to be carried for years.", image: tote },
  { slug: "keychains", name: "Keychains", description: "Little charms for pockets and bags.", image: keychain },
  { slug: "plushies", name: "Plushies", description: "Soft companions with a lot of heart.", image: teddy },
  { slug: "home-decor", name: "Home Decor", description: "Warm touches for your favourite corners.", image: coasters },
  { slug: "accessories", name: "Accessories", description: "Hair clips, scrunchies and small joys.", image: hair },
  {
    slug: "custom-crochet",
    name: "Custom Crochet",
    description: "Something imagined by you, made by us.",
    image: flowerPot,
  },
];

export const products: Product[] = [
  {
    id: "1",
    slug: "crochet-sunflower-bouquet",
    name: "Crochet Sunflower Bouquet",
    shortDescription: "A forever bouquet of hand-stitched sunflowers.",
    description:
      "Nine golden sunflowers with sage leaves, wrapped in kraft paper and finished with jute twine. Each petal is worked by hand, so no two bouquets are ever identical.",
    price: 1499,
    compareAtPrice: 1899,
    category: "flowers",
    sku: "AHC-FLW-001",
    stock: 12,
    images: [sunflower],
    featuredImage: sunflower,
    colors: ["Mustard", "Cream", "Blush"],
    sizes: ["Small (6 stems)", "Medium (9 stems)", "Large (12 stems)"],
    materials: "Premium cotton yarn, floral wire stems, kraft wrap",
    careInstructions: "Dust gently with a soft brush. Spot clean only. Keep away from direct sunlight.",
    estimatedDelivery: "5-8 working days",
    customizable: true,
    tags: ["gifting", "bouquet", "sunflower"],
    featured: true,
    bestseller: true,
    newArrival: false,
    rating: 4.9,
    reviewCount: 64,
    createdAt: "2026-02-10",
  },
  {
    id: "2",
    slug: "handmade-crochet-tote-bag",
    name: "Handmade Crochet Tote Bag",
    shortDescription: "A roomy everyday tote in soft cream cotton.",
    description:
      "Worked in a dense single-crochet stitch so it holds its shape, with reinforced handles and a cotton lining. Fits a laptop, a book and a water bottle with room to spare.",
    price: 1899,
    compareAtPrice: 2299,
    category: "bags",
    sku: "AHC-BAG-002",
    stock: 8,
    images: [tote],
    featuredImage: tote,
    colors: ["Cream", "Beige", "Terracotta"],
    sizes: ["Medium", "Large"],
    materials: "8-ply cotton yarn, cotton lining",
    careInstructions: "Hand wash cold with mild detergent. Dry flat in shade.",
    estimatedDelivery: "6-9 working days",
    customizable: true,
    tags: ["tote", "everyday"],
    featured: true,
    bestseller: true,
    newArrival: false,
    rating: 4.8,
    reviewCount: 41,
    createdAt: "2026-03-02",
  },
  {
    id: "3",
    slug: "crochet-daisy-keychain",
    name: "Crochet Daisy Keychain",
    shortDescription: "A tiny daisy charm for your keys.",
    description:
      "A palm-sized daisy on a sturdy metal ring — the kind of small gift that makes someone smile on an ordinary day.",
    price: 249,
    category: "keychains",
    sku: "AHC-KEY-003",
    stock: 40,
    images: [keychain],
    featuredImage: keychain,
    colors: ["White", "Pink", "Butter"],
    sizes: ["One size"],
    materials: "Cotton yarn, nickel-free ring",
    careInstructions: "Spot clean with a damp cloth.",
    estimatedDelivery: "3-5 working days",
    customizable: false,
    tags: ["gift", "small"],
    featured: false,
    bestseller: true,
    newArrival: true,
    rating: 4.7,
    reviewCount: 118,
    createdAt: "2026-06-18",
  },
  {
    id: "4",
    slug: "crochet-teddy-bear",
    name: "Crochet Teddy Bear",
    shortDescription: "A cuddly bear with a hand-stitched scarf.",
    description:
      "An amigurumi teddy with safety-stitched eyes, generously stuffed and finished with a little terracotta scarf. Safe for little ones.",
    price: 1099,
    compareAtPrice: 1299,
    category: "plushies",
    sku: "AHC-PLU-004",
    stock: 6,
    images: [teddy],
    featuredImage: teddy,
    colors: ["Caramel", "Cream", "Grey"],
    sizes: ["Small (18cm)", "Large (28cm)"],
    materials: "Milk cotton yarn, hypoallergenic fibre fill",
    careInstructions: "Surface wash only. Air dry.",
    estimatedDelivery: "7-10 working days",
    customizable: true,
    tags: ["kids", "amigurumi"],
    featured: true,
    bestseller: false,
    newArrival: true,
    rating: 5,
    reviewCount: 29,
    createdAt: "2026-07-04",
  },
  {
    id: "5",
    slug: "crochet-coaster-set",
    name: "Crochet Coaster Set of 4",
    shortDescription: "Four textured coasters for slow mornings.",
    description:
      "A set of four thick round coasters in warm neutrals — soft under a mug, sturdy enough for daily use.",
    price: 599,
    category: "home-decor",
    sku: "AHC-HOM-005",
    stock: 22,
    images: [coasters],
    featuredImage: coasters,
    colors: ["Sand", "Clay", "Sage"],
    sizes: ["One size"],
    materials: "Chunky cotton yarn",
    careInstructions: "Machine wash in a laundry bag, cold. Dry flat.",
    estimatedDelivery: "4-6 working days",
    customizable: false,
    tags: ["home", "kitchen"],
    featured: false,
    bestseller: true,
    newArrival: false,
    rating: 4.6,
    reviewCount: 53,
    createdAt: "2026-01-22",
  },
  {
    id: "6",
    slug: "crochet-granny-square-bag",
    name: "Crochet Granny Square Bag",
    shortDescription: "A colour-blocked shoulder bag with vintage charm.",
    description:
      "Twelve granny squares joined by hand into a slouchy shoulder bag, with a hidden magnetic closure and inner pocket.",
    price: 2199,
    compareAtPrice: 2599,
    category: "bags",
    sku: "AHC-BAG-006",
    stock: 4,
    images: [grannyBag],
    featuredImage: grannyBag,
    colors: ["Multi Warm", "Multi Pastel"],
    sizes: ["One size"],
    materials: "Cotton blend yarn, fabric lining",
    careInstructions: "Hand wash cold. Reshape while damp.",
    estimatedDelivery: "8-12 working days",
    customizable: true,
    tags: ["vintage", "shoulder bag"],
    featured: true,
    bestseller: false,
    newArrival: true,
    rating: 4.9,
    reviewCount: 17,
    createdAt: "2026-08-01",
  },
  {
    id: "7",
    slug: "crochet-flower-pot",
    name: "Crochet Flower Pot",
    shortDescription: "A potted bloom that lives forever on your desk.",
    description:
      "A small ceramic-look pot filled with hand-crocheted blooms and leaves. A lovely desk companion or housewarming gift.",
    price: 899,
    category: "home-decor",
    sku: "AHC-HOM-007",
    stock: 15,
    images: [flowerPot],
    featuredImage: flowerPot,
    colors: ["Blush", "Cream", "Lavender"],
    sizes: ["One size"],
    materials: "Cotton yarn, terracotta pot, filler",
    careInstructions: "Dust gently. Keep dry.",
    estimatedDelivery: "5-7 working days",
    customizable: true,
    tags: ["desk", "gift"],
    featured: false,
    bestseller: false,
    newArrival: true,
    rating: 4.8,
    reviewCount: 22,
    createdAt: "2026-07-25",
  },
  {
    id: "8",
    slug: "crochet-hair-accessories-set",
    name: "Crochet Hair Accessories Set",
    shortDescription: "Scrunchies and flower clips in soft pastels.",
    description:
      "Two scrunchies and three flower clips, worked in fine cotton so they stay gentle on hair all day.",
    price: 649,
    compareAtPrice: 799,
    category: "accessories",
    sku: "AHC-ACC-008",
    stock: 0,
    images: [hair],
    featuredImage: hair,
    colors: ["Pastel Mix", "Neutral Mix"],
    sizes: ["One size"],
    materials: "Fine cotton yarn, elastic",
    careInstructions: "Hand wash. Dry flat.",
    estimatedDelivery: "3-5 working days",
    customizable: false,
    tags: ["hair", "gift"],
    featured: false,
    bestseller: false,
    newArrival: false,
    rating: 4.5,
    reviewCount: 34,
    createdAt: "2026-05-11",
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const testimonials = [
  {
    name: "Ananya R.",
    location: "Bengaluru",
    rating: 5,
    text: "The sunflower bouquet arrived beautifully packed. My mother cried. Worth every rupee.",
  },
  {
    name: "Ishita M.",
    location: "Pune",
    rating: 5,
    text: "I use the tote every single day and it still looks brand new. The stitching is so even.",
  },
  {
    name: "Rohan K.",
    location: "Delhi",
    rating: 5,
    text: "Ordered a custom teddy with a name on the scarf. They sent progress photos while making it.",
  },
];
