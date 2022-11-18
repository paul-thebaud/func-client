# TODO

## To do

- [ ] Model sync to API or not ("syncTo", "syncFrom" or "sync" for both)
- [ ] HTTP adapter on adapter (fetch or axios).
- [ ] Avoid updating if nothing changed
- [ ] Utilities for models (fill, reset, etc.)
- [ ] Utilities for relations (load, attach, sync, etc.)
- [ ] Model and relations metadata (loaded, loading, etc.)
- [ ] Relations inverse (post related to author)
- [ ] Tests using vitest

## Done

- [x] Model props aliasing (e.g. "firstName" sent "first-name")
- [x] Hooks for actions only (no global hooks).
- [x] Exists state on instances.
- [x] Use void for callback when not using return value at all
- [x] Find with model param instead of forModel + find (and new forId enhancer)
- [x] Save enhancers (based on $exists)
- [x] Blueprints to create preconfigured actions (full JSON:API, JSON:API read).
- [x] Default values of models props (using direct value or supplier)
- [x] Make model with a config (type, baseURL, etc.).
- [x] Move generics of context functions to returned function.
- [x] Solution for composable with schema and extensions.
- [x] Transform model props (e.g. string to date transform)
- [x] Model relation path aliasing (e.g. "likedPosts" to "liked-posts")
- [x] Model props tracking (via originals) and "changed" retrieval helper (used
  when serializing for example)
- [x] Externalize serialize and deserialize outside of adapter?
- [x] Adapters errors (404, etc.)
- [x] Solution to Vite chunks when features from core used by adapter extension
- [x] Merged params for adapter (fields, include, etc.)
