
# Lux Addons — Historic Overhaul

A three-act upgrade that turns the site from a beautiful landing page into a living product hub: real cloud-backed stats, a newsroom, and a top-to-bottom premium pass.

## Act I — Cloud backbone (Lovable Cloud)

Enable Lovable Cloud and add three tables (all with RLS + GRANTs):

- **`addons`** — one row per product (GRFX, Citizen, BloodFX, SoundFX, Sound Mk2, Sound Heavy, Reshade). Fields: `slug`, `name_en`, `name_ar`, `description_ar`, `image_url`, `status` (`active` | `inactive` | `coming_soon`), `chapter`, `order_index`, `updated_at`. Public `SELECT` for anon.
- **`announcements`** — the newsroom. Fields: `title_ar`, `title_en`, `body_ar`, `tag` (`update` | `release` | `event` | `news`), `image_url`, `published_at`, `pinned`. Public `SELECT` where `published_at <= now()`.
- **`site_stats`** — single-row derived counters cached for hero display (`total_addons`, `active_addons`, `inactive_addons`, `total_downloads`, `last_computed_at`). Refreshed by a server function on demand.

Admin writes go through server functions guarded by a `user_roles` table + `has_role('admin')` (per platform security rules — roles are never on profiles).

Seed the tables from a migration with the current 7 addons and 3 launch announcements so the site never renders empty.

## Act II — New surfaces on the page

Reorganize the home page into a clearer narrative:

```text
Hero  →  Live Stats Bar  →  Announcements  →  Roadmap  →  Team  →  Streams  →  Oracle (AI)  →  Footer
```

1. **Live Stats Bar** (under hero)
   - 4 tiles pulled from `site_stats`: Total Addons · Active · In Development · Community Members.
   - Cloud-driven count-up animation (same easing as the Kick strip) with a subtle "last updated Xm ago" line.
   - Ambient shimmer + gold hairline on hover.

2. **Announcements / Latest News**
   - New route `/news` plus a "featured 3" strip on the home page.
   - Manuscript-style news cards: date rail on the right (Arabic), tag chip (update/release/event), title, 2-line excerpt, hover elevation.
   - Individual news page `/news/$slug` with full body, share buttons, SEO head().
   - Pinned announcement gets a gold ribbon.

3. **Roadmap becomes data-driven**
   - Reads from `addons` table instead of hardcoded array.
   - Each card shows a real status badge: `Active` (emerald pulse) / `In Dev` (amber) / `Planned` (muted).
   - New filter chips at the top (All / Active / Coming Soon).

4. **Command Palette (⌘K)**
   - Global search across addons, announcements, admins, and pages.
   - Keyboard-first, glassy overlay, recent + suggested sections.

## Act III — Premium polish pass

Elements that make the site feel truly high-end:

- **Cinematic scroll**: section-reveal with masked fades, parallax on the knight backdrop, GPU-accelerated blur-in for cards.
- **Gold micro-interactions**: buttons and chips gain an animated hairline sweep on hover (already scoped by tokens — no hardcoded colors).
- **Cursor spotlight** on the hero and news cards (subtle radial gradient following the pointer).
- **Ambient audio toggle** (optional, off by default) — soft medieval ambience matching the knight theme.
- **Custom OG images per route** — hero + news pages get proper social previews.
- **Loading shell**: replace flashes of empty state with skeleton cards that match the final layout.
- **Motion discipline**: unify all easings on `easeOutExpo` / `easeInOutQuint`, respect `prefers-reduced-motion`.
- **Density mode** for the roadmap (compact grid vs. cinematic list) saved to localStorage.

## Technical section

- **Data reads**: public routes call publishable-key server fns (narrow `TO anon` SELECT policies). No admin client on public reads.
- **Writes / admin**: `createServerFn` + `requireSupabaseAuth` + `has_role('admin')` gate. Admin dashboard at `/_authenticated/admin` for editing addons and posting announcements.
- **Stats refresh**: a `refresh_site_stats()` SQL function + a public server fn that calls it; triggered on addon/announcement mutations and on a stale read (>5 min).
- **Realtime**: subscribe the stats bar and announcement strip to Supabase Realtime so the site updates without refresh when admins publish news.
- **Caching**: TanStack Query with `ensureQueryData` in loaders; 60s `staleTime` for stats, 5 min for news list.
- **SEO**: per-route `head()` with unique title/description; `/news/$slug` derives `og:image` from the announcement.
- **Design tokens only**: no `bg-white`/`text-black`; new tokens (`--color-status-active`, `--color-status-dev`, `--gradient-newsroom`, `--shadow-premium`) added to `src/styles.css`.

## Rollout order

1. Enable Cloud, create tables + RLS + seeds, generate types.
2. Build server fns (`getSiteStats`, `listAnnouncements`, `getAnnouncement`, `listAddons`, admin mutations).
3. Wire the home page: Live Stats Bar + Announcements strip + data-driven Roadmap.
4. Ship `/news` and `/news/$slug` with full SEO.
5. Command Palette + cursor spotlight + motion pass.
6. Admin console under `/_authenticated/admin`.
7. Final QA: reduced-motion, mobile, dark contrast, Lighthouse.

## Open choices for you

- **Admin access**: should *you* be the only admin (I grant your account the `admin` role on first login), or a fixed allow-list of emails?
- **Announcements language**: Arabic-first only, or bilingual (AR + EN toggle)?
- **Ambient audio**: include the medieval ambience toggle, or skip it?
- **Command Palette**: yes to ⌘K global search, or leave it for a later pass?

Reply with your picks (or just say "go" and I'll take Arabic-first, admin = your account, no audio, yes ⌘K) and I start with Act I immediately.
