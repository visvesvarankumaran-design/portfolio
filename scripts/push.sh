#!/usr/bin/env bash
# Push to origin using GITHUB_TOKEN from .env, without storing it in git config.
# Usage: ./scripts/push.sh [branch]   (defaults to current branch)
set -euo pipefail

cd "$(dirname "$0")/.."

if [[ ! -f .env ]]; then
  echo "No .env found. Copy .env.example to .env and add your token." >&2
  exit 1
fi

# Load .env
set -a; source .env; set +a

if [[ -z "${GITHUB_TOKEN:-}" || "${GITHUB_TOKEN}" == "your_new_token_here" ]]; then
  echo "GITHUB_TOKEN is not set in .env." >&2
  exit 1
fi

branch="${1:-$(git rev-parse --abbrev-ref HEAD)}"
repo_path="visvesvarankumaran-design/portfolio.git"

# Token is passed inline for this one push only — never written to .git/config.
git push "https://x-access-token:${GITHUB_TOKEN}@github.com/${repo_path}" "HEAD:${branch}"

echo "Pushed HEAD -> ${branch}"
