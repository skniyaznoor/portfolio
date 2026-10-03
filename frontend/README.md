# Sk Niyaz Noor — Portfolio (Niyazion)

An Instagram-style portfolio for a full-stack engineer and published novelist. Every Instagram feature is
a working part of the portfolio:

| Instagram | Portfolio |
| --- | --- |
| **Feed** | Each project is a carousel post (cover, highlights, stack, links). Double-tap to like, save, share |
| **Stories** | Full-screen viewer with progress bars, tap or hold controls and seen state: what I'm building now, *Coffee?*, AI work, HellBall, experience, stack |
| **Post** | The full case study shown as pinned comments. Shareable at `/p/[slug]` |
| **Profile** | Bio, story highlights, and Posts / Reels / GitHub (live API) / Saved / Writing tabs, plus a resume download |
| **Reels** | Animated, vertically snapping reels per project |
| **Explore & Search** | Filterable grid and a slide-out search across projects, skills and stories |
| **Messages** | A DM chat that emails the full conversation to me through Resend. If a visitor leaves before sharing an email, what they wrote is still delivered (`sendBeacon`) |
| **Notifications** | Career milestones as an activity feed |
| **Create** (`/create`) | Ask me anything, project inquiry, hiring or book feedback, with a live post preview |

Also included: light/dark mode, a guided tour (More → Take the tour), and a mobile layout with Instagram's
bottom tab bar.

The editorial (non-Instagram) design lives on the `new-portfolio` branch.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · Resend

Content lives in [`src/data/portfolio.ts`](src/data/portfolio.ts) (projects, experience, skills, book) and
[`src/data/instagram.ts`](src/data/instagram.ts) (stories, highlights, activity).

## Email notifications

Messages, Create and story replies all go through `POST /api/contact`. Set the variables in
`.env.example`. Without a verified domain, Resend only delivers to the email address that owns the
account, so `CONTACT_TO_EMAIL` must be that address (or verify a domain to send anywhere).

## Development

```bash
cp .env.example .env.local   # add your RESEND_API_KEY
npm install
npm run dev
```

## Resume

The resume is written as print-tuned HTML in [`resume/resume.html`](resume/resume.html). To regenerate
`public/pdf/Sk-Niyaz-Noor-Resume.pdf` (needs Google Chrome):

```bash
./resume/build.sh
```
