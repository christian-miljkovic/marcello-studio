# Marcello in GitHub Codespaces

Canonical repository: `christian-miljkovic/marcello-studio`, branch **launch-site**.
Read `AGENTS.md` before working. Company, agent and experiment boundaries still apply.

## Create or resume

1. Open [the repository on launch-site](https://github.com/christian-miljkovic/marcello-studio/tree/launch-site).
2. Select **Code → Codespaces → Create codespace on launch-site**. To choose a machine, use **… → New with options** first.
3. Start with **2 cores / 8 GB RAM**, the smallest standard machine. Run the dev server and production build separately; upgrade only if actual usage requires it.
4. Wait for container setup to finish. It installs locked project dependencies and Codex automatically. No local Mac tools are needed.

Resume the same environment from [Your codespaces](https://github.com/codespaces) in any browser. On a phone, open the editor menu and **Terminal → New Terminal**; landscape orientation is easier for terminal work. Open the app from the **Ports** panel in a separate browser tab. Keep port visibility **Private** (the Codespaces default).

The container uses Node 24, npm, git and GitHub CLI. Node 24 satisfies the committed Next.js, AI SDK, Vitest and jsdom requirements. The published project has no Python scripts or requirements, so setup adds no Python tooling. No Dockerfile, CI workflow, external server or agent runtime is needed.

## First-run commands

Run from the repository root:

```bash
node --version
codex --version
npm run lint
npm test
npm run build
npm run dev -- --hostname 0.0.0.0
```

Open forwarded port **3000** from the Ports panel. Stop the server with **Ctrl+C** before building. `npm start -- --hostname 0.0.0.0` runs the production build if needed.

Setup uses `npm ci`, preserving `package-lock.json`. After pulling dependency changes, run `npm ci` again. If initial setup fails, read the creation log and rerun `bash .devcontainer/setup.sh` after resolving the error. Use **Codespaces: Rebuild Container** after changing container configuration. Codex is pinned to `0.145.0`; update that version deliberately in the setup script.

## Codex: manual ChatGPT login

In a second terminal:

```bash
codex login --device-auth
```

Open the URL printed by Codex in your browser, sign in with your ChatGPT account, and enter the one-time code. Enable device-code login in ChatGPT security settings first if prompted; a managed workspace may require its administrator to enable it.

```bash
codex login status
codex
```

ChatGPT subscription authentication does not require an OpenAI API key or switching to API billing. Account plan limits and permissions still apply. Authentication is never performed by setup. Credentials stay in the Codespace's home directory/credential store, outside the repository; never commit or share `~/.codex/auth.json`. A rebuilt or newly created container may require login again.

## Secrets intentionally absent

No OpenAI, OpenRouter, Web3Forms, Vercel or other private credentials are installed, copied from the Mac, or committed. GitHub manages the Codespace's own repository access; no personal GitHub token is needed in this configuration.

The website and checks work without application keys; sketch generation uses its existing fallback. Optional later configuration in **GitHub Settings → Codespaces → Secrets**, scoped to this repository:

- `OPENROUTER_API_KEY`: live sketch generation, consuming that account's credits.
- `OPENROUTER_MODEL`: optional model override (configuration, not a secret).
- `WEB3FORMS_KEY`: server notification delivery in the currently committed app.
- `NEXT_PUBLIC_WEB3FORMS_KEY`: browser form delivery. Despite being stored in settings, any `NEXT_PUBLIC_` value is included in browser code and is not confidential.

Use development credentials where possible. Do not add production Vercel credentials merely to develop, and do not send live form submissions without authorization. No secrets are required for Codex's ChatGPT login. Restart the Codespace after adding Codespaces secrets, then restart the dev server or rebuild for public environment changes.

## Save work and stop

Commit and push intended changes so another Codespace can retrieve them. Uncommitted changes exist only in that Codespace.

From [Your codespaces](https://github.com/codespaces), choose the environment's **… → Stop codespace** when finished. Closing the browser tab is not the same as stopping. To remove it, commit/push or export needed work first, then choose **… → Delete**. Stopping ends active compute use; retained storage still counts against usage. Check account allowances/budgets before creating one; this setup creates no paid resources itself.

## Published-source boundary

At setup, `launch-site` contains the website at the repository root plus the company/agent context. The local Mac's uncommitted `apps/web` migration, Remote Atelier implementation and capture experiment implementations are **not** in this checkout. Codespaces cannot retrieve unpublished files. Publish those separately after review before expecting to work on them here. The root npm commands remain the entry point if the workspace migration is later published.

## Validation at setup (2026-09-24)

A clean export of the published branch passed `npm ci`, lint, all 64 tests and the production build under Node 24. The setup script installed Codex 0.145.0 and its help/version commands launched. The dev server returned HTTP 200 for `/` and `/sketch`; local port 3000 was occupied, so this smoke test used Next's fallback port 3001. A fresh Codespace forwards the default port 3000.

The configuration was checked against the official devcontainer base schema. Docker was not running on the validation Mac, so a complete Linux container build, Codespaces boot and manual ChatGPT sign-in remain first-run checks.

The existing lockfile's npm audit reported 11 vulnerabilities (3 moderate, 7 high, 1 critical, including Next.js). No dependency versions were changed for this environment setup. Review dependency upgrades separately; keep development ports private.

## References

- [GitHub: create a Codespace](https://docs.github.com/en/codespaces/developing-in-a-codespace/creating-a-codespace-for-a-repository)
- [GitHub: machine options](https://docs.github.com/en/codespaces/about-codespaces/what-are-codespaces)
- [OpenAI: authentication and headless device login](https://developers.openai.com/codex/auth/)
