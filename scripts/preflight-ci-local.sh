#!/bin/bash
set -e
ROOT_DIR=$(pwd)
GIT_HASH=$(git rev-parse --short HEAD)
TEMP_WORKTREE=".preflight-ci-local-$GIT_HASH"
TEMP_BRANCH="preflight-ci-local-$GIT_HASH"

# cleanup on completed
cleanup() {
  cd "$ROOT_DIR"
  
  echo "Cleanup..."
  git worktree remove -f "$TEMP_WORKTREE" > /dev/null 2>&1 || true
  git branch -D "$TEMP_BRANCH" > /dev/null 2>&1 || true
}

trap cleanup EXIT

# create worktree
echo "====== Start checking the build on temp worktree ======"
git worktree add -b "$TEMP_BRANCH" "$TEMP_WORKTREE" HEAD
cd "$TEMP_WORKTREE"

# ------- ci build steps ------------
# following the build process must follow the gitlab-ci file
# ref: https://git.sginfra.net/sgsinfra/gitlab-ci/-/blob/main/gitlab-ci/development-center-vulcanus.yml?ref_type=heads
echo "[1/2] Installing dependencies..."
npm ci --quiet

echo "[2/2] Building..."
npm run build
# ------------------------

echo "====== Build success ======"