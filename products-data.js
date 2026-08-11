/* ============================================================
   UN-BOXD — PRODUCT LIST
   ============================================================
   This is the ONLY file you need to touch to add, remove, or
   change products. Don't edit index.html or style.css for that.

   HOW TO ADD A PRODUCT
   ---------------------
   Copy one block below (from { to },) and paste it into the
   list, then change the values. Keep the commas between blocks.

   FIELDS
   ---------------------
   name        -> Product name shown on the card
   category    -> Must be exactly one of: "Bundles", "Boxes", "Gifts"
   price       -> Number only, no "EGP" or commas (e.g. 450 not "450 EGP")
   image       -> A direct image URL (must end in .jpg/.png/.webp etc,
                  and be a DIRECT link to the image, not a page that
                  contains the image)
   description -> One short line under the name
   badge        -> Optional small tag e.g. "New", "Best Seller", "Limited"
                   Leave as "" (empty quotes) if you don't want a badge
   inStock     -> true = shows "Order on WhatsApp"
                  false = shows "Sold Out" and disables the button

   AFTER EDITING
   ---------------------
   Just save the file. If you're testing on your own computer,
   refresh the page. If the site is already live on Netlify,
   re-upload this file (or push to GitHub) and it updates live.
   ============================================================ */

const PRODUCTS = [
  {
    name: "Test Product — Delete Me",
    category: "Boxes",
    price: 299,
    image: "https://placehold.co/800x640/F1E7D2/7A5A22?text=Test+Product",
    description: "Just here to preview how a new product card looks. Safe to remove anytime.",
    badge: "New",
    inStock: true
  },
  {
    name: "The Golden Hour Box",
    category: "Boxes",
    price: 650,
    image: "https://placehold.co/800x640/D9B872/2A2420?text=Golden+Hour+Box",
    description: "A curated candle, journal & treat set for a slow evening in.",
    badge: "Best Seller",
    inStock: true
  },
  {
    name: "Say It With Flowers",
    category: "Gifts",
    price: 480,
    image: "https://placehold.co/800x640/E3C583/2A2420?text=Say+It+With+Flowers",
    description: "Dried florals wrapped in kraft paper with a handwritten note.",
    badge: "New",
    inStock: true
  },
  {
    name: "Sweet Tooth Crate",
    category: "Bundles",
    price: 390,
    image: "https://placehold.co/800x640/C99A42/2A2420?text=Sweet+Tooth+Crate",
    description: "A mix of imported chocolates and local artisanal sweets.",
    badge: "",
    inStock: true
  },
  {
    name: "The Self-Care Reveal",
    category: "Boxes",
    price: 720,
    image: "https://placehold.co/800x640/B8862E/FAF6ED?text=Self-Care+Reveal",
    description: "Bath salts, a silk scrunchie, and a scented soy candle.",
    badge: "",
    inStock: true
  },
  {
    name: "Little Black Box",
    category: "Gifts",
    price: 550,
    image: "https://placehold.co/800x640/7A5A22/FAF6ED?text=Little+Black+Box",
    description: "Minimal jewelry box with a rotating monthly surprise piece.",
    badge: "Limited",
    inStock: false
  },
  {
    name: "Coffee & Company",
    category: "Bundles",
    price: 410,
    image: "https://placehold.co/800x640/6B4A1C/FAF6ED?text=Coffee+%26+Company",
    description: "Specialty beans, a ceramic mug, and a pack of biscotti.",
    badge: "",
    inStock: true
  }
];

/* ============================================================
   STORE SETTINGS
   ============================================================
   whatsappNumber -> Your WhatsApp number WITH country code,
                      digits only, no + no spaces.
                      Example Egypt: 201234567890
   instagramHandle -> Without the @
   ============================================================ */

const STORE_SETTINGS = {
  whatsappNumber: "201000000000",
  instagramHandle: "unboxd.eg"
};
