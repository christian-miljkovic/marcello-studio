#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "${BASH_SOURCE[0]}")/.."
npm ci
npm install --global @openai/codex@0.145.0
codex --version

printf '\nReady. Start the website: npm run dev -- --hostname 0.0.0.0\n'
printf 'Sign in to Codex manually: codex login --device-auth\n'
