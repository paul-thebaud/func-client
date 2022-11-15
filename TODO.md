# TODO

- [x] Blueprints to create preconfigured actions (full JSON:API, JSON:API read).
- [ ] Exists state on instances.
- [ ] HTTP adapter on adapter (fetch or axios).
- [ ] Hooks for actions only (no global hooks).
- [ ] Make model with a config (type, baseURL, etc.).
- [x] Move generics of context functions to returned function.
- [x] Solution for composable with schema and extensions.
- [x] Transform model props (e.g. string to date transform)
- [ ] Model props aliasing (e.g. "firstName" sent "first-name")
- [ ] Avoid updating if nothing changed
- [x] Model relation path aliasing (e.g. "likedPosts" to "liked-posts")
- [ ] Model sync to API or not ("syncTo", "syncFrom" or "sync" for both)
- [x] Model props tracking (via originals) and "changed" retrieval helper (used
  when serializing for example)
- [x] Externalize serialize and deserialize outside of adapter?
- [x] Adapters errors (404, etc.)
- [x] Solution to Vite chunks when features from core used by adapter extension
- [x] Merged params for adapter (fields, include, etc.)
- [ ] Utilities for models (fill, reset, load relation, etc.)
- [ ] Default values of models props (using direct value or supplier)
- [ ] Model and relations metadata (loaded, loading, etc.)
- [ ] Reactivity compatibility (for props and metadata)
- [ ] Relations inverse (post related to author)
- [ ] Tests using vitest
