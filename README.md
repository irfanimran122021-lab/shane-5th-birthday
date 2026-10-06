# Shane’s fifth birthday invitation

A completely separate, original birthday project. No wedding invitation files were read, changed, or reused.

## Start and build

Requires Node.js 20+ and npm.

```sh
npm install
npm run dev
```

Open http://127.0.0.1:4173. Refresh the page after editing files.

```sh
npm test
npm run build
npm run preview
```

The project uses lightweight, dependency-free HTML, CSS and JavaScript. The static production site is in `dist/`. Local fonts and the optimized watercolor illustration require no third-party requests when guests open the invitation.

## Vercel

Import this folder as a new Vercel project (or run the Vercel CLI from this folder).
Use framework preset **Other**, build command **npm run build**, and output directory **dist**. These defaults are already in `vercel.json`. Deploy the generated website, not the source folder as an unbuilt static site.

The project is ready to deploy but has not been published to a Vercel account.

## RSVP demo and connection

**The current RSVP form is a clearly labeled preview. It does not send or save personal data.** The yes/no, counts, validation, animated confirmation, and edit-response flows work.

Connect the form by updating `RSVP_ENDPOINT` in `public/rsvp-service.js`. The endpoint must accept JSON over HTTPS, allow your deployed origin through CORS when necessary, validate data on the server, and return a successful HTTP status only after recording the reply. Formspree or another service may need an adapter in this file to match its API. Keep credentials on a server, never in these public files.

The payload is:

```json
{
  "event": "shane-fifth-birthday-2026",
  "name": "Guest Name",
  "attendance": "yes",
  "adults": 2,
  "children": 1,
  "totalGuests": 3,
  "message": "Happy birthday, Shane!"
}
```

Declines use zero for all guest counts. The guest count supports up to 50 adults and 50 children; adjust the form and validation together if needed. No RSVP deadline, contact number, or party end time was invented.

## Files

- `public/index.html`: opening envelope and document metadata.
- `public/app.js`: reusable decorative components, invitation sections, opening sequence, scroll reveals and form interactions.
- `public/styles.css`: responsive design, paper textures, envelope geometry and motion.
- `public/event.js`: event configuration, timezone-aware countdown, RSVP validation.
- `public/rsvp-service.js`: the replaceable RSVP adapter.
- `public/assets/`: optimized artwork, locally hosted fonts and font licenses.
- `tests/event.test.mjs`: date/time, countdown and RSVP behavior checks.

The countdown uses November 20, 2026, 4:30 PM in Georgetown (UTC−04:00). It stops at zero when the celebration begins.

## Accessibility and browser behavior

Touch and keyboard seal opening, visible focus, semantic labels, native form validation, focus transfer to the invitation and confirmation, and reduced-motion support are included. Reduced-motion preferences skip the staged opening and stop decorative movement.

Where supported, an optional WebMCP tool can prepare the same RSVP form for review; it never sends the response. Browsers without WebMCP use the normal invitation with no extra requirements.

Browser checks covered desktop and 390, 360 and 320 pixel widths in Chromium, including envelope opening, both RSVP choices, guest totals, edit/replay, countdown changes, image loading and horizontal overflow. These are browser viewport tests, not physical iPhone or Android device tests.

## Artwork

Built-in image generation created one original transparent watercolor illustration, optimized to a 255 KB WebP for the site. Animals gently sway and appear with the card; they are a single painted ensemble, not individually rigged 3D characters. The exact generation prompt is in `ARTWORK.md`.

Fonts: Cormorant Garamond and Manrope, with SIL Open Font License files in `public/assets/`.

WebMCP browser validation was unavailable in the test browser; the optional enhancement is feature-detected and does not affect the tested guest flow. All six automated behavior tests passed, as did npm installation, development startup and the production build.
