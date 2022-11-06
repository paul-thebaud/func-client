# TODO

- [ ] Move generics of context functions to returned function.
- [ ] Transform model props (e.g. string to date transform)
- [ ] Model props aliasing (e.g. "firstName" sent "first-name")
- [ ] Model relation path aliasing (e.g. "likedPosts" to "liked-posts")
- [ ] Model sync to API or not ("syncTo", "syncFrom" or "sync" for both)
- [ ] Model props tracking (via originals) and "changed" retrieval helper (used when serializing for example)
- [ ] Externalize serialize and deserialize outside of adapter?
- [ ] Adapters errors (404, etc.)
- [ ] Solution to Vite chunks when features from core used by adapter extension
- [ ] Merged params for adapter (fields, include, etc.)
- [ ] Utilities for models (fill, reset, load relation, etc.)
- [ ] Default values of models props (using direct value or supplier)
- [ ] Model and relations metadata (loaded, loading, etc.)
- [ ] Reactivity compatibility (for props and metadata)
- [ ] Relations inverse (post related to author)
- [ ] Docs using docusaurus
- [ ] Tests using vitest
