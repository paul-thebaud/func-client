# Planned features

## General features

- [ ] Avoid updating if nothing changed.
- [ ] Change utils functions named keys to optional keys params (defaults to all
  instance keys).
- [ ] Model and relations metadata (loaded, loading, etc.)
- [ ] Tests using vitest

## Conditional consumer

> Note: new when function is done. I should now do helpers
> like `saveWhenChanged`, etc.

Those new consumers will allow to conditionally run actions.

```ts
await action()
  .use(save(post))
  .run(runWhenChanged(oneOrFail()));

await action()
  .use(save(post))
  .run(runWhen(expression, oneOrFail(), defaultValue));
```

## Relations interactions

Provide relations related helpers and actions enhancers/consumers.

### Helpers

```ts
// Check if the post instance has its author relation loaded.
loaded(post, 'author');
```

### Read actions

Those enhancers and consumers will probably be available in the core.

```ts
// Fetch a relation value.
const user = await action()
  .use(relation(post, 'author'))
  .run(oneOrFail());

// Load a relation value on model.
await action().run(load(post, 'author', 'tags'));
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
