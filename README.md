# Krish Kumar Dey — Cybersecurity Portfolio

Aspiring SOC Analyst portfolio: B.Tech Computer Science & IT @ Ajeenkya DY Patil University (ADYPU), Pune. Focused on SIEM, Linux, networking, security monitoring, and threat detection.

**Live:** https://krishcybersecurityportfolio.vercel.app

## What's inside

- **3D hero** — interactive WebGL security-network centerpiece (Three.js) with node inspection
- **Hero terminal** — telemetry widget rendered live from `js/portfolio-data.js`
- **SOC telemetry lab** — simulated log stream, topology view, and module stack with category filters (demo data, clearly labeled as simulated)
- **Projects** — case-study cards with 3D tilt + expandable modals (problem → solution → stack → challenges → lessons), linked to real GitHub repos, including a live demo for threat-detection
- **Journey & platforms** — interactive learning timeline plus TryHackMe / Hack The Box / GitHub profile cards
- **Resume page** — `resume.html`, printable to PDF, generated from the same data (no placeholders)
- **Skills visualizer, education card, contact section** with copy-email

## Single source of truth

All copy lives in **`js/portfolio-data.js`** (`PORTFOLIO_DATA`). Sections render from it at load; every renderer is wrapped in try/catch isolation so one bad section can't break the page.

## Run locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

No build step. Static files, deployed to Vercel (`vercel.json`, `cleanUrls: true`).

## Notes for recruiters

- Project statuses are literal (`IN PROGRESS` / `PLANNED`) — nothing is oversold.
- The SOC dashboard stream is simulated telemetry for UI demonstration, labeled as such on the page.
- Contact: krishdey100@gmail.com · [GitHub](https://github.com/OSPANDA5555) · [TryHackMe](https://tryhackme.com/p/krishdey100)
