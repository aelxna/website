---
filename: ghostty-distrobox.md
title: Achieving Ghostty Shell Integration in Distrobox
date: '2026/02/21'
---

(Based on [this guide](https://www.ericst.ch/comp/ghostty-distrobox-integration/). The script from this blog post was further modified as I saw fit, but most of the credit goes to that guide.)

Create the following script on your host (`~/.ghostty-cache`):
```bash
#! /usr/bin/env bash

# Ghostty shell integration for Bash with full resources caching
GHOSTTY_CACHE_DIR="$HOME/.cache/ghostty"
GHOSTTY_RESOURCES_CACHE="$GHOSTTY_CACHE_DIR/resources-copy"

if [ -n "$GHOSTTY_RESOURCES_DIR" ]; then
    # Create cache directory if it doesn't exist
    if [ ! -d "$GHOSTTY_CACHE_DIR" ]; then
        mkdir -p "$GHOSTTY_CACHE_DIR"
    fi

    # Copy entire resources directory if source is newer or cache doesn't exist
    if [ -d "$GHOSTTY_RESOURCES_DIR" ]; then
        GHOSTTY_SYNC_TIMESTAMP="$GHOSTTY_CACHE_DIR/last-resource-sync"
        NEEDS_SYNC=false

        # Check if cache doesn't exist or if source is newer than our last sync
        if [ ! -d "$GHOSTTY_RESOURCES_CACHE" ] || [ ! -f "$GHOSTTY_SYNC_TIMESTAMP" ]; then
            NEEDS_SYNC=true
        elif [ -n "$(find "$GHOSTTY_RESOURCES_DIR" -newer "$GHOSTTY_SYNC_TIMESTAMP" -print -quit 2>/dev/null)" ]; then
            NEEDS_SYNC=true
        fi

        if [ "$NEEDS_SYNC" = true ]; then
            # Remove old cache and copy fresh
            rm -rf "$GHOSTTY_RESOURCES_CACHE"
            cp -r "$GHOSTTY_RESOURCES_DIR" "$GHOSTTY_RESOURCES_CACHE"
            # Update sync timestamp
            touch "$GHOSTTY_SYNC_TIMESTAMP"
        fi
    fi

    # Clean up variables
    unset GHOSTTY_SYNC_TIMESTAMP NEEDS_SYNC
fi

unset GHOSTTY_CACHE_DIR GHOSTTY_RESOURCES_CACHE
```
Run the script by placing this line in your **host** shell's config (in my case `~/.config/fish/config.fish`):
```fish
$HOME/.ghostty-cache
```
Finally, in your container's shell config, source the corresponding shell integration script from the cache:
```bash
# .zshrc

export HOST_HOME=/run/host/home/$USER
# Ghostty shell integration for Bash with full resources caching
export GHOSTTY_RESOURCES_DIR=$HOST_HOME/.cache/ghostty/resources-copy
builtin source "$GHOSTTY_RESOURCES_DIR/shell-integration/zsh/ghostty-integration"
```
This basically copies the host's ghostty resources folder to somewhere the container can access, and it just kind of works! Ghostty will now show your directory, say which command you're running, and understand that it can exit when you're just in the shell.