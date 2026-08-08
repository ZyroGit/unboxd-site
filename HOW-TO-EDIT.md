# Un-Boxd — How to Edit Your Site

You only ever need to touch **one file**: `products-data.js`
Everything else (design, layout) lives in files you shouldn't need to open.

## Add a product

1. Open `products-data.js` in any text editor (Notepad, VS Code, even TextEdit).
2. Copy one of the existing blocks — from `{` to `},` — and paste it into the list.
3. Change the values:

```js
{
  name: "Birthday Surprise Box",
  price: 500,
  image: "https://example.com/your-photo.jpg",
  description: "Balloons, cake pops, and a personalized card.",
  badge: "New",
  inStock: true
}
```

4. Save the file.

## Remove a product

Delete its whole block (from `{` to the matching `},`) and save.

## Change a price or description

Find the product, edit the text between the quotes (or the number for price), save.

## Mark something sold out

Change `inStock: true` to `inStock: false`. The card will show "Sold Out" and the WhatsApp button turns off automatically.

## Add a badge

Set `badge: "New"` or `badge: "Limited"` — or `badge: ""` (empty) for no badge.

## Product images

You're using **image URLs** (no file uploads needed). Paste a direct link to an image — it should end in `.jpg`, `.png`, or `.webp`. If a link doesn't work, the card will show a placeholder automatically so the page never breaks.

Good free places to host images if you don't have your own: Imgur, or your Instagram/Facebook post's direct image link.

## Your WhatsApp number & Instagram

At the bottom of `products-data.js`:

```js
const STORE_SETTINGS = {
  whatsappNumber: "201000000000",   // country code + number, digits only
  instagramHandle: "unboxd.eg"      // without the @
};
```

Update these once and every "Order on WhatsApp" button across the site uses them automatically — including a pre-filled message with the product name and price.

## Getting it live

1. Go to [netlify.com](https://netlify.com) and sign up (free).
2. Drag the whole `unboxd` folder onto the Netlify dashboard.
3. Netlify gives you a live link immediately (e.g. `un-boxd.netlify.app`). You can add your own domain later under **Site settings → Domain management**.

**To update the live site after editing `products-data.js`:** just drag the folder onto Netlify again — it redeploys in seconds. (Or if you want auto-updates without re-dragging every time, tell me and I'll set the site up connected to GitHub instead.)
