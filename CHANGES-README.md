# What was fixed

## 1. "Menu resets for other visitors"

**Root cause:** the site stored the menu in `localStorage`. `localStorage`
lives inside *one browser on one device* — it isn't shared between
visitors, even though the code comment implied same-site was enough. So:

- The admin's browser saved the edited menu → the admin sees it.
- Every other visitor's browser has nothing in `localStorage` yet → they
  fall back to the hard-coded `DEFAULT_PRODUCTS` in the file, which looks
  like "it reset."

**Fix:** added optional cloud sync via **Firebase Firestore only** (no
Firebase Storage — see note below on why). When `firebase-config.js` is
filled in with your own Firebase project:

- `admin.html` writes every save to one shared Firestore document.
- `index.html` (the storefront) subscribes to that same document and
  updates live for every visitor, on every device, no reload needed.
- `localStorage` is still used as a fast local cache / offline fallback,
  it's just no longer the source of truth.

**If you don't set up Firebase**, nothing breaks — both pages fall back to
the exact old local-only behavior. You just won't get cross-device sync.

### To finish setup (~5 minutes, free, no credit card)
Open `firebase-config.js` — it has step-by-step instructions in the
comments (create a Firebase project, add a Web app, turn on Firestore
Database in test mode, paste in the config values it gives you). Once
that file has your real values, both pages pick it up automatically.

## 2. Uploaded photos aren't compressed

Logo, banner, and food photo uploads used to be stored as raw, full-size
base64 straight from the file picker — a phone photo can easily be 3-8MB,
which eats through `localStorage`'s ~5MB-per-browser quota fast (or bloats
a Firestore document).

**Fix:** added `compressImage()` in `admin.html`. Every upload is now
drawn onto an off-screen canvas, downscaled (logo → max 400px, product
photos → max 800px, banner → max 1000px), and re-encoded as WebP (falls
back to JPEG if the browser can't do WebP) at ~70-75% quality — typically
shrinking a multi-MB photo down to well under 150KB.

The compressed image is then stored as an inline data URI, either in the
shared Firestore document (cloud mode) or in `localStorage` (local-only
mode) — same compression benefit either way.

## Why no Firebase Storage

Firebase Storage used to be free too, but as of Feb 2026 Google requires
a linked billing account (the paid "Blaze" plan) just to create a Storage
bucket — even if your actual usage stays at $0. Since you asked for a
free-only setup, this project skips Storage entirely and keeps compressed
photos inside Firestore instead, which remains free with no credit card
on the "Spark" plan.

**One tradeoff to know:** Firestore documents cap out at 1MB total. With
compression this comfortably fits a full menu (a few dozen items, a
couple photos each, plus logo/banner). The admin panel will warn you in
a toast notification if you're getting close to that limit — at that
point, trimming a few extra photos per item is the fix. If you ever
outgrow this, upgrading to Firebase Storage (which requires adding
billing) is the natural next step, but most small menus won't need it.
