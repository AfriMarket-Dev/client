# Rwanda Construction Marketplace — Visual Flow (Pitch)

> **One-line:** Simple Rwanda-only marketplace connecting Buyers and Providers (products & services). No payments — platform facilitates discovery, chat, quotes, agreements, reviews, and reports.

---

## 1) One-slide summary (what to show the client)

- Purpose: connect local buyers with providers for construction materials & services. Platform handles discovery, conversation, offers and post-work reviews — payments happen offline between parties.
- Key value: faster discovery, transparent offers, accountability via reviews & reporting.
- Target: Rwanda — district-filtered, phone-first, Kinyarwanda + English.

---

## 2) Visual Flow Diagram (read left→right)

```
[Buyer] --> (Search Listings) --> [Listing Page] --> (Message Provider) --> [Chat Thread]
                                                       |                             |
                                                       v                             v
                                              (Provider sends Quote)         (Provider updates Listing)
                                                       |                             |
                                                       v                             v
                                              [Quote / Offer] ----> (Buyer Accepts) -> [Agreement Record]
                                                       |                                           |
                                                       v                                           v
                                              (Provider marks Delivered) ----> (Buyer Confirms) -> [Review]

(Any time) --> (Report Listing/Provider) -> [Admin Queue] -> (Admin Action: warn/suspend/remove)
```

_Notes:_ arrows show typical path. Any party can report; admin queue handles moderation.

---

## 3) Swimlane (role-based steps)

**Buyer**

1. Sign up (phone OTP) and choose "Buyer" role.
2. Search by keyword / category / district / rating.
3. Open listing → view provider profile → message provider.
4. Receive Quote → Accept or Reject.
5. Mark job complete → Leave review.
6. Report if problem.

**Provider**

1. Sign up (phone OTP) and choose "Provider" role.
2. Create listing(s) — product or service (title, price guide, images, district).
3. Respond to messages; send Quote/Offer.
4. If accepted, communicate delivery details; mark delivered when done.
5. Receive review; reply publicly if desired.
6. Respond to admin inquiries if reported.

**Admin**

1. View reports queue.
2. Auto-hide listings meeting thresholds.
3. Investigate reports: view evidence, messages, agreements.
4. Take action: warn, suspend, remove listing, reinstate.
5. Maintain audit log of actions.

---

## 4) Minimal Data Model (for visuals)

- **User:** id, role, name, phone, district, verifiedBadge, status
- **Listing:** id, providerId, type, title, priceGuide, district, images, visible
- **Thread/Message:** threadId, senderId, receiverId, content, attachments
- **Quote:** id, listingId, providerId, buyerId, total, timeline, status
- **Agreement:** id, quoteId, buyerId, providerId, status, timestamps
- **Review:** fromUserId, toUserId, rating, comment
- **Report:** reporterId, targetType, reason, evidence, status

---

## 5) Key UX screens for the pitch (order to show in prototype)

1. **Landing and Search page:** search bar, district filter, category chips
2. **Listing card grid:** preview (image, price guide, rating, district)
3. **Listing details:** images, description, provider mini-profile, Message button
4. **Chat/Thread view:** messages, attachments, Send Quote (for providers)
5. **Quote modal / card:** structured offer with Accept button
6. **My Agreements:** active / completed lists
7. **Reviews & Reports form:** simple rating + optional evidence upload
8. **Admin dashboard:** reports queue, quick actions, audit log

---

## 6) Moderation rules (visual bullets to show the client)

- **Auto-hide listing:** 3 unique reports within 7 days → hide pending review.
- **Auto-suspend provider:** 5 unique reports or serious evidence → suspend pending admin.
- **Evidence:** photos, chat logs, agreements are attached to the report.
- **User feedback:** report acknowledged message; outcome shown after admin action.

---

## 7) Implementation notes (tech-light, client-friendly)

- Phone-first: OTP login (trust + low friction).
- Data: single Postgres database; images stored in S3. Keep everything in RWF conventions but price fields are just guidance.
- Chat: simple websocket-backed messages persisted in DB.
- Search: Postgres full-text search + simple filters (district, category, rating).
- No payments: show "Preferred payment methods" as free text on listings.

---

## 8) Slide / Pitch script (short)

- **Slide 1 (Problem):** finding reliable local construction suppliers is slow & risky.
- **Slide 2 (Solution):** our platform — searchable local listings + direct chat + offers + public reviews.
- **Slide 3 (How it works):** Visual Flow Diagram (use the box flow above).
- **Slide 4 (Trust controls):** reporting, admin actions, verification badge.
- **Slide 5 (Go-to-market):** start Kigali → expand other districts → partnership with hardware stores.
- **Slide 6 (Next steps):** build MVP screens, pilot with 50 providers, measure 90-day KPIs.

---

## 9) Attachments / Deliverables I can produce next

- Clean one-slide diagram (PNG or SVG) suitable for client deck.
- 3–5 prototype screens (wireframes) in a mockup order for demo.
- Speaker notes for a 5-minute pitch.
- Printable one-page user flow handout.

---

### Quick decision for you

If you want the slide-ready PNG of the visual flow (diagram + swimlane) I can produce it next. Tell me: **PNG slide** or **wireframe screens** — I’ll export and give you downloadable files and speaker notes.
