# BiteSplit

### Group food ordering, without the math fight at the end.

A collaborative web app where a group orders from one shared cart in real time — and the bill splits itself, to the rupee, before anyone pays.

> **One line for the portfolio grid:** *Turned the messiest part of group food ordering — the "who owes what" — into a self-resolving, real-time checkout.*

---

## Snapshot

| | |
|---|---|
| **My role** | UI/UX Designer & Frontend Developer |
| **Type** | Self-initiated proof of concept (web app) |
| **Timeline** | 1-week sprint |
| **Build** | Designed and built end-to-end, solo, with AI pair-programming |
| **Stack** | React 18 · TypeScript · Tailwind CSS · Framer Motion · Socket.io · Node.js / Express |

**What I owned:** the whole thing — problem framing, user flow, UI design, the visual system, and the frontend implementation. I drove the full-stack build (including the real-time backend and the split-bill logic) using AI as a pair-programmer, which is how a one-person team shipped a working multi-user product in a week.

---

## The problem

Ordering food for a group is a coordination tax that everyone has paid and nobody enjoys. It breaks down in three predictable places:

**1. One person becomes the human order form.**
The "host" collects everyone's picks over chat, repeats them back, fixes the inevitable "wait, no onions" correction, and types it all into a single account. Items get missed. The order goes in late.

**2. The host eats the bill — literally and financially.**
They pay upfront, then have to back-calculate what each person owes *including* their fair slice of delivery fee, taxes, and tip. Then comes the awkward part: chasing people for ₹230 three days later. The host quietly absorbs the rounding, the forgotten payments, the "I'll get you next time."

**3. Nobody can see the shared cart.**
Regular delivery apps are single-device. No one knows what's already been added, so you get duplicate fries and a lopsided order — all decided blind, over text.

---

## The goal

Replace the group chat + spreadsheet + IOU ritual with a single shared session where:

- anyone can join from their own phone with **zero signup**,
- everyone sees the **same live cart** as it's built,
- and the bill **splits itself correctly** before checkout — so the host is never out of pocket and no one has to do mental math.

---

## How it works — the flow

The whole experience is one continuous session, from "let's order" to "it's on its way."

```
 Host starts a session ──► gets a shareable room code (e.g. HZBZ6F)
            │
            ▼
 Guests join with just a name ──────────► everyone lands in the same room
            │
            ▼
 Pick a restaurant ──► loads that restaurant's live menu
            │
            ▼
 Shared cart, updated in real time ◄──── (Socket.io broadcasts every change)
   • each person's items grouped under their name
   • no duplicates, no guessing
            │
            ▼
 Host locks the cart ──► Split engine computes every share
            │
            ▼
 Each member reviews & approves their own share
            │
            ▼
 Host pays the total ──► Live order tracking
```

### Screen-by-screen

**1 · Join in one field.**
The entry screen asks for one thing: your name. No account, no password, no app install. Guests opening an invite link see the session code pre-filled and just tap *Join Group*. Removing every step here was deliberate — friction at the door is why group tools die before they start.
*(see `assets/01-start.png`, `assets/03-join.png`)*

**2 · Pick where you're ordering from.**
A clean restaurant grid with rating, prep time, and distance — familiar enough that nobody needs instructions. Choosing a restaurant loads *that restaurant's* real menu, not a generic template.
*(see `assets/02-restaurants.png`)*

**3 · The shared cart is the centerpiece.**
The menu sits on the left with search and category filters (All · Burgers · Sides · Salads · Drinks); the **Shared Cart** sits on the right and is the heart of the product. Items are grouped per person — *Rexon's items*, *Your items* — so everyone sees exactly who ordered what, live, as it happens. Every add, remove, and quantity change broadcasts instantly to all devices via Socket.io. Guests see *"Waiting for host to checkout,"* which sets the right expectation about who's driving.
*(see `assets/04-menu-cart.png`)*

**4 · The bill splits itself.**
At checkout the host gets **Individual Shares** with a **Proportional / Equal** toggle, a tip selector (0–30%), and a transparent breakdown — item total, delivery fee, taxes, and the grand total. Every member reviews their own number and taps *Approve Share*. The host can't pay until everyone's approved — the UI literally says *"2 members haven't approved yet"* and keeps the pay button disabled until they have.
*(see `assets/05-bill-host.png`, `assets/06-bill-guest-approved.png`, `assets/08-bill-all-approved.png`)*

**5 · Order placed, tracked together.**
Once paid, everyone lands on a confirmation with a live tracking timeline — *Preparing → Picked up → Arriving → Delivered* — plus the participant list and the total paid. The shared experience holds all the way through delivery.
*(see `assets/09-order-success.png`)*

---

## Key design decisions

**Make the cart the hero, not the menu.**
In a solo food app the menu is the star. In a *group* app, the shared cart is the whole reason you're here — so I gave it persistent real estate (a sticky sidebar on desktop, a slide-up sheet on mobile) instead of hiding it behind a button. Seeing the group's order assemble in real time is the "aha."

**Borrow a visual language people already trust.**
I leaned into a high-contrast, familiar food-delivery aesthetic — clean white surfaces, a confident orange accent, green veg-indicators, and clear typography. Group ordering involves money and other people; novelty here would cost trust. Familiarity buys instant comfort.

**Mobile-first, but built for two contexts at once.**
Guests almost always join on their phones; the host often checks out on a laptop. So the layout is genuinely fluid — the cart is a thumb-friendly bottom sheet on mobile and a structural sidebar on desktop, not one design squeezed into the other.

**No minimum order.**
I removed any artificial minimum-order floor. Someone wanting just a ₹520 side of fries is a real, valid group member — the product should serve the lightest order as gracefully as the biggest.

**The host is a referee, not a gatekeeper.**
The host controls *flow* (lock cart, start checkout, pay) but not *people's choices*. Members approve their own shares. That split keeps one person from babysitting the whole order while still giving the group a clear, accountable finish line.

---

## The hard part: getting the money exactly right

A bill splitter that's off by a rupee isn't a rounding quirk — it's a broken promise, because the host is the one who absorbs the gap. This was the part I cared most about getting right.

- **Floating-point money is a trap.** In plain JS/TS, `0.1 + 0.2` is `0.30000000000000004`. Doing currency math on floats means small errors that compound across several people and several line items. So calculations run on **integers in the smallest unit** (paise), and only convert back to rupees for display.

- **The split has to *reconcile*.** Whether you pick Proportional or Equal, the sum of everyone's individual shares has to equal the invoice total exactly — `subtotal + delivery + taxes + tip`, to the last decimal. Naive per-person rounding leaves a stray rupee floating; the engine assigns it deterministically so the parts always add up to the whole.
  - *Proportional* — you pay for your own items, plus your fair percentage of the shared delivery/taxes/tip.
  - *Equal* — the whole bill divides evenly across the group.

- **The guarantee:** the host is **never** left covering a discrepancy, on either split mode. That's the entire emotional point of the product, encoded in the math.

In the demo run, a ₹3,758 cart became a ₹5,022 total split as ₹2,756 + ₹2,266 — and those two shares add back to ₹5,022 exactly. That reconciliation is the feature.

---

## Edge cases I designed for

Real groups are chaotic, so the unhappy paths got real attention:

- **Host switches restaurant mid-session** → all carts and totals clear instantly on every screen, so a burger menu can't contaminate a sushi order.
- **A guest refreshes or drops connection** → the room state is preserved and they rejoin straight back into their own cart, nothing lost.
- **Cart locked at checkout** → once the host starts checkout, adds/removes freeze, so no one can sneak in an item *after* the shares are calculated.
- **Someone leaves the group** → everyone's split is recomputed live for the remaining members.

---

## Outcome

A working, multi-user proof of concept built solo in a week — from a blank page to real-time sync, a self-reconciling split engine, and a full join-to-delivery flow.

**What it proves:**
- **Coordination drops from ~15 minutes of chat to seconds** of everyone tapping on their own phone.
- **The host's anxiety is designed out** — accurate shares, visible approvals, and a guarantee they're never short.
- It's a **credible model** for adding native group ordering to consumer delivery apps, where it mostly doesn't exist.

---

## What I learned

- **In a multiplayer product, the shared state *is* the product.** Most of the design effort went into making "what is everyone doing right now" obvious and trustworthy — not into individual screens.
- **Trust lives in the details that don't demo well.** The disabled pay button, the per-person grouping, the rupee that always reconciles — none of it is flashy, and all of it is why someone would actually use this with their real money and real friends.
- **AI pair-programming let one designer own the full stack.** I could hold the product and design vision end-to-end and still ship a real-time backend and a precise financial engine — my job became deciding *what's correct and what feels right*, and directing the build toward it.

## If I took it further

- Native in-app payments with automatic settlement, so members pay their share directly instead of the host fronting it.
- Saved groups and reorder ("same as last Friday").
- Per-item dietary tags and allergen filters surfaced in the shared cart.
- Light persistence so a session survives a closed tab, not just a refresh.

---

*Designed and built by Visvesvaran K — UI/UX Designer & Frontend Developer.*
