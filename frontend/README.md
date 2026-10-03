# Sk Niyaz Noor — Portfolio

Personal portfolio for a full-stack engineer and published novelist. It's one editorial-style page with
case-study drawers, live GitHub data, a 3D book cover and a working contact form.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · Resend

## Sections

- **Hero**: role cycler, `~/now` status card, key numbers
- **Selected work**: bento cards with hand-built illustrations. Each opens a full case study (bottom sheet on mobile, side drawer on desktop)
- **Experience**: timeline, education and certifications
- **The novel**: *Coffee?* with a flip-able 3D cover, store links and recent writing
- **GitHub**: public repos and a language breakdown from the GitHub API, revalidated daily, with a static fallback
- **Skills** and **Contact** (Resend-powered form with server-side validation and HTML escaping)

All content lives in [`src/data/portfolio.ts`](src/data/portfolio.ts).

## Development

```bash
cp .env.example .env.local   # add your RESEND_API_KEY
npm install
npm run dev
```

## Resume

The resume is written as print-tuned HTML in [`resume/resume.html`](resume/resume.html). To regenerate the PDF
served at `/pdf/Sk-Niyaz-Noor-Resume.pdf` (needs Google Chrome):

```bash
./resume/build.sh
```
