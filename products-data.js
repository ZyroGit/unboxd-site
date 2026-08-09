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
    price: 299,
    image: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=800",
    description: "Just here to preview how a new product card looks. Safe to remove anytime.",
    badge: "New",
    inStock: true
  },
  {
    name: "The Golden Hour Box",
    price: 650,
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800",
    description: "A curated candle, journal & treat set for a slow evening in.",
    badge: "Best Seller",
    inStock: true
  },
  {
    name: "Say It With Flowers",
    price: 480,
    image: "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?w=800",
    description: "Dried florals wrapped in kraft paper with a handwritten note.",
    badge: "New",
    inStock: true
  },
  {
    name: "Sweet Tooth Crate",
    price: 390,
    image: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=800",
    description: "A mix of imported chocolates and local artisanal sweets.",
    badge: "",
    inStock: true
  },
  {
    name: "The Self-Care Reveal",
    price: 720,
    image: "https://images.unsplash.com/photo-1601049676869-702ea24cfd58?w=800",
    description: "Bath salts, a silk scrunchie, and a scented soy candle.",
    badge: "",
    inStock: true
  },
  {
    name: "Little Black Box",
    price: 550,
    image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=800",
    description: "Minimal jewelry box with a rotating monthly surprise piece.",
    badge: "Limited",
    inStock: false
  },
  {
    name: "Coffee & Company",
    price: 410,
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800",
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
