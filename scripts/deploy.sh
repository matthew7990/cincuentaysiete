#!/usr/bin/env bash
# Deploy a GitHub Pages: build + push del dist/ a la branch gh-pages.
# Uso: npm run deploy
set -euo pipefail
cd "$(dirname "$0")/.."

npm run build -- --base=/cincuentaysiete/

cd dist
# vite vacia dist/ en cada build (borra el .git interno): se re-inicializa
git init -b gh-pages
git add -A
git -c user.name="matthew7990" -c user.email="matthew7990@users.noreply.github.com" \
  commit -m "build $(date +%F-%H%M)" --quiet
git remote get-url origin >/dev/null 2>&1 || \
  git remote add origin https://github.com/matthew7990/cincuentaysiete.git
git push -f origin gh-pages
echo "Deploy OK - https://matthew7990.github.io/cincuentaysiete/"
