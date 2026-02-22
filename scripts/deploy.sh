#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

cd "$PROJECT_DIR"

echo "==> Starting GitHub Pages deployment..."

# Detect repository name from git remote for basePath
REPO_NAME=""
REMOTE_URL=$(git remote get-url origin 2>/dev/null || echo "")
if [ -n "$REMOTE_URL" ]; then
  REPO_NAME=$(echo "$REMOTE_URL" | sed -E 's/.*\/([^\/]+?)(\.git)?$/\1/')
  echo "    Detected repo: $REPO_NAME"
fi

# Check if this is a user/org site (username.github.io) - no basePath needed
IS_USER_SITE=false
if echo "$REPO_NAME" | grep -qE '\.github\.io$'; then
  IS_USER_SITE=true
  REPO_NAME=""
  echo "    User/org site detected - no basePath needed"
fi

# Set basePath for project pages
if [ -n "$REPO_NAME" ] && [ "$IS_USER_SITE" = false ]; then
  export NEXT_PUBLIC_BASE_PATH="/$REPO_NAME"
  echo "    Using basePath: /$REPO_NAME"
else
  export NEXT_PUBLIC_BASE_PATH=""
fi
export STATIC_EXPORT=1

# Temporarily move API routes (not supported in static export)
API_DIR="app/api"
API_BACKUP="_api_backup"
if [ -d "$API_DIR" ]; then
  echo "==> Temporarily moving API routes for static build..."
  mv "$API_DIR" "$API_BACKUP"
fi

# Restore API routes on exit (even if build fails)
cleanup() {
  if [ -d "$API_BACKUP" ]; then
    echo "==> Restoring API routes..."
    mv "$API_BACKUP" "$API_DIR"
  fi
}
trap cleanup EXIT

# Build the static site
echo "==> Building static site..."
npm run build

# Add .nojekyll to prevent GitHub Pages Jekyll processing
touch out/.nojekyll

# Deploy to gh-pages branch
echo "==> Deploying to gh-pages branch..."
cd out

git init
git checkout -b gh-pages
git add -A
git commit -m "Deploy $(date '+%Y-%m-%d %H:%M:%S')"

# Get the remote URL from the parent repo
cd "$PROJECT_DIR"
REMOTE=$(git remote get-url origin 2>/dev/null || echo "")

if [ -z "$REMOTE" ]; then
  echo "ERROR: No git remote 'origin' found. Please add one first:"
  echo "  git remote add origin https://github.com/USERNAME/REPO.git"
  exit 1
fi

cd out
git push -f "$REMOTE" gh-pages:gh-pages

cd "$PROJECT_DIR"
rm -rf out/.git

echo ""
echo "==> Deployed successfully!"
if [ "$IS_USER_SITE" = true ]; then
  echo "    Site will be live at: https://$(echo "$REMOTE" | sed -E 's/.*github\.com[:\/]([^\/]+).*/\1/').github.io/"
else
  echo "    Site will be live at: https://$(echo "$REMOTE" | sed -E 's/.*github\.com[:\/]([^\/]+).*/\1/').github.io/$REPO_NAME/"
fi
echo ""
echo "    Make sure GitHub Pages is configured to deploy from the 'gh-pages' branch"
echo "    in your repo Settings > Pages."
