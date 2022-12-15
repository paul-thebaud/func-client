# Planned features

## General features

- [ ] Rename package to `func-api-client` or something like this.
- [ ] Rename one letter parameters to real name (`a` to `action`)
- [ ] Rename model definition generics (`S` to `D`)
- [ ] Generic context (ID, etc.) should not be mentioned in ActionContext type
- [ ] Model and relations metadata (missing, loading, etc.)
- [ ] Manage errors when users are bypassing types (relations not found, etc.)
- [ ] Probably merge "discover" docs in "getting started"
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
    - Best practices (model vs ES6 classes, extensions, etc.)
- Advanced
    - Configuration
        - Model configuration
    - Models composition
    - Custom transformers

## Relations interactions

Provide relations related helpers and actions enhancers/consumers.

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

## Relations inverse

Relations inverse allow to define an inverse value when updating a relation.

```ts
const post = await action()
  .use(find(Post, '<id>'))
  .use(include('comments'))
  .run(oneOrFail());
// post.comments[0].commentable is post.
```
