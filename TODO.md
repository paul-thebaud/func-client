# Planned features

## General features

- [ ] Rename package to `func-api-client` or something like this.
- [ ] Extendable base model (to always make timestamped models, etc.).
- [ ] Avoid updating if nothing changed.
- [ ] Model and relations metadata (missing, loading, etc.)
- [ ] Manage errors when users are bypassing types (relations not found, etc.)
- [ ] Rename one letter parameters to real name (`a` to `action`)
- [ ] Tests using vitest

## Documentation

Planned plan for documentation:

- Discover
- Installation
  - Yarn
  - PNPM
  - NPM
  - UMD?
  - Notes?
- Essentials
  - Getting started
  - Models
    - Model factory
    - Schema
      - Attributes
        - Configuration
        - Transform
      - Relations
    - Extensions
- Advanced
  - Configuration
    - Model configuration
  - Models composition
  - Custom transformers

## Conditional consumer

> Note: new when function is done. I should now do helpers
> like `saveWhenChanged`, etc.

Those new consumers will allow to conditionally run actions.

```ts
await action()
  .use(save(post))
  .run(whenChanged(oneOrFail()));

await action()
  .use(save(post))
  .run(when(changed(post), oneOrFail()));

await action()
  .use(save(post))
  .run(when(expression, oneOrFail(), defaultValue));
```

## Relations interactions

Provide relations related helpers and actions enhancers/consumers.

### Helpers

```ts
// Check if the post instance has its author relation missing.
loaded(post, 'author'); // True or false
```

### Read actions

Those enhancers and consumers will probably be available in the core.

```ts
// Fetch a relation value.
const user = await action()
  .use(relation(post, 'author'))
  .run(oneOrFail());

// Load a relation value on model.
await action().run(load(post, ['author', 'tags']));
await action().run(loadMissing(post, 'author', 'tags'));
```

### Write actions

Those consumer will probably be available in the core (with an update on the
serializer).

```ts
// Write relations with model instances.
await action().run(associate(post, 'author', user));
await action().run(dissociate(post, 'author'));
await action().run(attach(post, 'tags', [tag]));
await action().run(sync(post, 'tags', [tag]));
await action().run(detach(post, 'tags', [tag]));
```

### Associated features

Those elements will allow better consumers, such as:

```ts
// Retrieve post from cache, load missing relation.
// OR, if not found, run oneOrFail with included rels.
// This may also check for included fields.
const post = await action()
  .use(find(Post, '<id>'))
  .use(include('author', 'tags'))
  .run(newCachedOr(oneOrFail())); // TODO Find a good name for this.
```

## Relations inverse

Relations inverse allow to define an inverse value when updating a relation.

```ts
const post = await action()
  .use(find(Post, '<id>'))
  .use(include('comments'))
  .run(oneOrFail());
// post.comments[0].commentable is post.
```
