#!/usr/bin/env bash
echo "{\"commit\": \"$(git rev-parse --short HEAD)\"}" > src/lib/assets/commit.json