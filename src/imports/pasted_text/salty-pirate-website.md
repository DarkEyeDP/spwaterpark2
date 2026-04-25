Create a full multi-page website for **Salty Pirate Water Park**, a seasonal family water park located in Emerald Isle, North Carolina.

The site should feel like a polished, modern beach attraction website with a tasteful pirate theme. It should not feel childish or overly cartoonish. It should feel professional, coastal, fun, and family-friendly.

## Core Goal

Build a website that helps visitors quickly answer:

1. Are they open?
2. Is today a good day to go?
3. What does it cost?
4. What is there to do?
5. How do I get there?

The site should drive attendance, reduce repeated Facebook questions, support seasonal updates, and build excitement before and during the operating season.

---

# Tech Direction

Use a modern React-style frontend structure.

Suggested stack:

| Layer | Choice |
|---|---|
| Framework | React 18 |
| Build | Vite |
| Language | TypeScript |
| Routing | React Router |
| Styling | Tailwind CSS |
| Components | shadcn/ui, Radix primitives, optional Material UI |
| Icons | Lucide React, optional MUI Icons |
| Animation | Motion / Framer Motion |
| Maps | React Leaflet or styled static map section |
| Forms | React Hook Form |
| Notifications | Sonner |
| Date Utilities | date-fns |

Do not overcomplicate the implementation. Build the site in a way that can be expanded later.

---

# Brand Style

## Visual Theme

Use a **pirate beach water park** visual identity.

The design should combine:

- Emerald Isle beach energy
- Tropical water park excitement
- Pirate adventure accents
- Clean modern usability
- Family-friendly polish

## Color Palette

Use a coastal pirate-inspired palette:

- Deep ocean navy
- Aqua / turquoise water
- Seafoam green
- Warm sand
- Weathered parchment
- Sun-washed cream
- Coral / pirate red accent
- Dark driftwood brown
- Gold treasure accent

The site should feel bright and summery, not dark and gloomy.

## Typography

Use **Cinzel** as a decorative pirate-inspired heading font.

Pair it with a clean, highly readable body font such as:

- Inter
- Nunito Sans
- Lato
- Source Sans 3

Use Cinzel for:
- Hero headings
- Section titles
- Special pirate-themed labels
- Feature callouts

Use the body font for:
- Navigation
- Cards
- Details
- Pricing
- FAQ
- Operational information

## Texture and Shape Language

Use tasteful pirate paper and nautical details:

- Ripped parchment section edges
- Torn paper cards
- Rope dividers
- Compass icons
- Subtle wave separators
- Weathered map textures
- Soft shadows
- Rounded cards
- Wooden sign accents used sparingly

Do not make everything parchment. Use it as an accent layer.

---

# Voice and Copy Style

Use clear, useful copy with light pirate flavor.

The writing should be understandable to families and tourists. Add pirate personality in small touches, not every sentence.

Good examples:
- "Set sail for summer fun."
- "The crew returns Memorial Day weekend."
- "Chart your course to Emerald Isle."
- "Captain’s Forecast"
- "Today’s Park Status"
- "Explore the Park"
- "Nearby Treasures"

Avoid overusing phrases like:
- Ahoy
- Matey
- Arrr
- Ye
- Avast

Use them rarely, if at all.

Important: Avoid em dashes and en dashes unless absolutely necessary. Use commas, periods, colons, or parentheses instead.

---

# Site Structure

Create a multi-page site with the following pages:

1. Home
2. Plan Your Visit
3. Explore the Park
4. Pricing and Passes
5. Nearby Fun
6. Updates
7. Contact

Use a clean responsive navigation bar with desktop and mobile menu states.

---

# Global Components

Create reusable components for:

## Header / Navigation
- Logo area with placeholder for uploaded branding files
- Navigation links
- CTA button: "Plan Your Visit"
- Mobile hamburger menu
- Sticky behavior on scroll
- Subtle translucent ocean/navy background

## Live Park Status Banner
A prominent banner that can show:

- Open Today
- Closed
- Weather Delay
- Opening Soon
- Season Closed

Include visual status indicators:
- Green for open
- Yellow for weather delay
- Red for closed
- Blue/gold for opening soon

## Weather Intelligence Card
Create a module titled:

**Captain’s Forecast**

It should show:
- Current recommendation
- Temperature placeholder
- Rain chance placeholder
- Short plain-English recommendation

Example recommendation states:
- Perfect day to visit
- Still worth it
- Weather may impact experience
- Check back before heading out

Include a note that this can later connect to a weather API.

## Countdown Component
Create a countdown timer for:

**Memorial Day Weekend 2026**

Use copy like:
- "Countdown to Opening Day"
- "The crew returns soon"
- "Set sail with us Memorial Day weekend"

The countdown should have large number blocks:
- Days
- Hours
- Minutes
- Seconds

## CTA Button Styles
Create primary and secondary CTA styles:

Primary:
- Coral or pirate red
- Gold hover accent
- Strong contrast

Secondary:
- Navy or transparent with outline
- Aqua hover effect

## Footer
Include:
- Salty Pirate Water Park
- Emerald Isle, NC
- Facebook
- Instagram
- Contact placeholder
- Quick links
- Small pirate-themed signoff

---

# Page 1: Home

The homepage should be strong, visual, and conversion-focused.

## Hero Section

Include:
- Large hero headline:
  "Set Sail for Summer Fun"
- Subheadline:
  "Salty Pirate Water Park is returning for another season of family fun in Emerald Isle, NC."
- CTA buttons:
  - "Plan Your Visit"
  - "Explore the Park"
- Background:
  - Use placeholder water park image, ocean texture, or pirate ship illustration
  - Add wave overlay or parchment edge transition

Include a floating or embedded status card:
- Opening Soon
- Countdown to Memorial Day Weekend 2026
- Follow for updates

## Quick Decision Section

Create 3 to 4 cards that answer:

- Park Status
- Hours
- Pricing
- Directions

These cards should be visible early and optimized for mobile.

## Should I Go Today Section

Use the **Captain’s Forecast** component.

Include a short explanation:
"Before you pack the towels, check today’s forecast and park status."

Add placeholder weather recommendation logic.

## Park Highlights Section

Create cards for:

1. Three Big Drop Slides
2. Three Longer Mat-Ridden Hill Slides
3. Kids Splash Adventure Zone
4. Family Seating and Relaxation Areas

Each card should include:
- Icon or image placeholder
- Short description
- Small pirate-themed label

## Interactive Map Preview

Add a section introducing the future illustrated top-view park map.

Text:
"Explore the park before you arrive."

Include:
- Placeholder for top-view illustrated park map
- Hotspot-style mockups
- CTA to Explore the Park page

## Pricing Teaser

Show key pricing as attractive value cards:

- Ages 6 and Up: $22
- Ages 3 to 5: $17
- Adults using kiddie pool: $7 with full-price admission
- After 4PM tickets: $12 Tuesday through Sunday
- Weekly pass: $60
- Season passes: $125 ages 6 and up, $85 ages 3 to 5
- Military and First Responder discounts

Add CTA:
"View Pricing and Passes"

## Nearby Fun Teaser

Section title:
"Make a Full Day of Emerald Isle"

Explain that the website will highlight nearby restaurants, shops, beaches, and local attractions.

Add placeholder business cards:
- Eat Nearby
- Shop Nearby
- Explore Nearby

## Social Follow Section

Include:
- Instagram and Facebook buttons
- Placeholder feed cards
- Text:
"Follow the crew for opening announcements, weather updates, and summer fun."

---

# Page 2: Plan Your Visit

This page should be practical and easy to scan.

Sections:

## Hero
Title:
"Plan Your Visit"

Subtitle:
"Everything your crew needs before heading to Salty Pirate Water Park."

## Hours

Use current known information:

- Monday: 11AM to 5PM
- Tuesday through Sunday: 10AM to 6PM

Add note:
"Seasonal hours may change due to weather, staffing, or special events. Check the live status before heading out."

## Location and Directions

Include:
- Emerald Isle, NC location
- Map placeholder
- CTA: "Get Directions"

## What to Bring

Cards:
- Towels
- Sunscreen
- Swimwear
- Water-friendly shoes
- Change of clothes
- Patience for busy summer days

## What to Expect

Include:
- Family-friendly water park
- Big slides
- Mat slides
- Kids splash zone
- Seasonal operations
- Weather-sensitive operations

## FAQ

Include accordion-style FAQ:

- Are tickets sold online?
  Answer: Tickets are currently sold at the park only.

- What happens if the weather changes?
  Answer: Check the live status and weather module before arriving.

- Is there a discount after 4PM?
  Answer: Yes, day tickets are $12 after 4PM Tuesday through Sunday.

- Do you offer military or first responder discounts?
  Answer: Yes, $2 off day tickets and $10 off season passes.

---

# Page 3: Explore the Park

This page should be the most immersive.

## Hero
Title:
"Explore the Park"

Subtitle:
"Tap the map, discover the slides, and plan your first stop."

## Interactive Park Map Section

Include a large placeholder for a future custom top-view illustrated map.

Design the map container to support clickable hotspots.

Potential hotspots:
- Big Drop Slides
- Hill Mat Slides
- Kids Splash Adventure Zone
- Main Pool Area
- Lounge and Seating Area
- Ticket Entrance
- Rest Area

Desktop behavior:
- Hover hotspots
- Show tooltip cards
- Highlight selected area

Mobile behavior:
- Tap hotspot
- Open bottom sheet or slide-up card
- Swipe between attraction cards

## Attraction Detail Cards

Create cards for each major attraction:

### Three Big Drop Slides
Description:
"Three fast, exciting slides for bigger kids and thrill seekers."

### Three Longer Mat-Ridden Hill Slides
Description:
"Longer rides from the top of the hill, built for racing, gliding, and repeat runs."

### Kids Splash Adventure Zone
Description:
"A cute splash area built for younger pirates and families."

### Pool and Landing Areas
Description:
"Cool off, splash around, and regroup between adventures."

## Family Guidance

Add simple badges:
- Best for young kids
- Best for bigger kids
- Good for families
- High energy
- Relax and watch

---

# Page 4: Pricing and Passes

This page should sell value, not just list prices.

## Hero
Title:
"Pricing and Passes"

Subtitle:
"Choose the best way for your crew to enjoy the park."

## Day Tickets

Cards:
- Ages 6 and Up: $22
- Ages 3 to 5: $17
- Adults Using Kiddie Pool: $7, must be combined with full-price admission

## Best Value Section

Highlight:
- Weekly Pass: $60 for 7 consecutive days
- Season Pass Ages 6 and Up: $125
- Season Pass Ages 3 to 5: $85

Use labels:
- Best for vacationing families
- Best for locals
- Best repeat visit value

## After 4PM Deal

Prominent callout:
"After 4PM tickets are $12 Tuesday through Sunday."

Make this feel like a smart insider tip.

## Discounts

Military and First Responder Discounts:
- $2 off day ticket
- $10 off season pass

Use patriotic but subtle styling.

## Payment Note

Add placeholder:
"Tickets sold at the park only."

---

# Page 5: Nearby Fun

This page should support local business integration.

## Hero
Title:
"Nearby Treasures"

Subtitle:
"Make a full day of Emerald Isle with food, shopping, beach time, and local stops close to the park."

## Purpose

Explain:
"Salty Pirate Water Park is part of a larger Emerald Isle experience. This page will help families discover nearby businesses and activities before or after their visit."

## Business Categories

Create cards for:

- Food and Restaurants
- Ice Cream and Treats
- Shopping
- Beach Access
- Rainy Day Activities
- Family Attractions
- Local Lodging

## Featured Local Business Cards

Use placeholder cards that can later be replaced with actual partners.

Each card:
- Business name placeholder
- Category
- Distance placeholder
- Short description
- Button: "Learn More"

## Future Sponsored Feature

Add a tasteful section:
"Featured Treasure of the Month"

Explain that local partners may be highlighted here in the future.

Do not make it feel spammy. Make it feel like a local guide.

---

# Page 6: Updates

This page should support announcements.

## Hero
Title:
"Captain’s Updates"

Subtitle:
"Opening announcements, weather notes, season updates, and special messages from the crew."

## Announcement Feed

Create cards for:
- Opening Day Coming Soon
- Weather Update
- New Season Info
- Holiday Weekend Hours
- Special Promotion

Each update card should include:
- Title
- Date
- Category
- Short summary
- Read more link or expandable state

## Social Reminder

Add:
"Fast updates are also shared on Facebook and Instagram."

---

# Page 7: Contact

## Hero
Title:
"Contact the Crew"

Subtitle:
"Questions before you visit? Reach out or follow along for the latest updates."

## Contact Info

Include placeholders:
- Phone
- Email
- Address
- Facebook
- Instagram

## Contact Form

Fields:
- Name
- Email
- Message
- Reason for contact

Use React Hook Form style structure if code is generated.

## Map

Include simple map placeholder.

---

# Automation and Future Integration Notes

Build UI placeholders and component architecture for these future capabilities:

## Live Status Automation
- Staff-controlled status override
- Optional automated weather recommendations
- Status displayed globally across site

## Weather API
Likely future API:
- National Weather Service API
- OpenWeather API as possible alternative

Weather logic should support:
- temperature
- precipitation probability
- storm alerts
- operating recommendation

## Off-Season Experience
Future version of the website can transform into:

**The Salty Pirate Adventure**

This would include:
- Pirate ship sailing between islands
- Interactive story nodes
- Local business sponsored islands
- Weekly or monthly rotating stories
- Potential revenue stream from local business placements

Do not fully build this now, but create visual hints and flexible sections that can evolve into it later.

---

# Accessibility Requirements

Make the site accessible and readable.

Requirements:
- Strong color contrast
- Keyboard-friendly navigation
- Clear focus states
- Alt text placeholders
- Large mobile tap targets
- Responsive layouts
- Semantic HTML structure
- Avoid tiny text

---

# Mobile Requirements

Mobile is the priority.

Most users will be tourists or families checking from a phone.

Mobile experience should include:
- Sticky bottom CTA or status button
- Easy access to directions
- Tap-friendly cards
- No hover-only features
- Map uses tap interaction and bottom sheet
- Fast page loading feel

---

# Animation Requirements

Use subtle Motion / Framer Motion effects.

Examples:
- Gentle wave motion
- Floating pirate ship illustration
- Cards fade upward on scroll
- Hotspots pulse lightly
- Countdown numbers animate softly
- Mobile menu slides in

Do not over-animate. Keep performance strong.

---

# Content Rules

- No em dashes unless absolutely necessary.
- No en dashes unless absolutely necessary.
- Keep copy clear and useful.
- Use pirate tone lightly and tastefully.
- Avoid cheesy pirate overload.
- Make everything easy for parents and tourists to understand.

---

# Deliverable Expectations

Generate a polished, multi-page website starter with:

- React components
- Responsive layout
- Pirate beach design system
- Tailwind styling
- Page routing
- Placeholder content
- Placeholder image areas
- Status and countdown components
- Interactive map section placeholder
- Pricing cards
- Nearby business card system
- Updates feed layout
- Contact form layout

The final result should look like a premium website concept for a local seasonal water park that can realistically be built, launched, and expanded over time.