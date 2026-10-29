# MIHA Technologies site

## ClydeOS context

- Inside ClydeOS, read [the root router](../../../AGENTS.md).
    - Shared project contract: [projects/AGENTS.md](../../AGENTS.md).
    - Project pointer: [MIHA-Technologies.md](../../notes/MIHA-Technologies.md).
- A standalone clone uses this file and its own site files.
    - `CLAUDE.md` imports only `AGENTS.md`.
    - This marketing site is separate from `miha-demos`.
    - Keep their release targets and source ownership separate.

Static marketing site for MIHA Technologies. Plain HTML pages, no framework.

- Repo: `MIHA2954/MIHA-Technologies`.
- Pages: `index`, `about`, `services`, `portfolio`, `contact`, `404`, and `solutions/*.html`.
- Server bits: `api/contact.php` and `functions/api/`. Redirects in `_redirects`.
- Scripts: `scripts/generate-solutions.js` and `scripts/site-header.js`.
- `GEMINI.MD` is a Gemini-specific agent policy. It is not the rules for Claude Code or Codex.

## Commands

- `npm run dev`: serves the folder on port 3000
- No test suite exists. Check pages in a browser.

## Rules

- Check `scripts/generate-solutions.js` before hand-editing `solutions/*.html`. A regenerate can overwrite the edit.
- Keep `sitemap.xml` and `robots.txt` in step when a page is added or removed.
- NEVER commit `.env`. `.env.example` lists the names.
