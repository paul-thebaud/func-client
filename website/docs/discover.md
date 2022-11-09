---
sidebar_position: 1
---

# Discover

## What is FuncModel?

**FuncModel** is a simple functional programming oriented API client. It is
framework-agnostic and can integrate with any Web app using Javascript or
Typescript.

- Modular, highly extensible and fully tree shakable thanks to functional
  programming. [See the benefits](#why-are-we-not-using-big-model-and-builder-classes)
- Ready to use functions to integrate with any [JSON:API](https://jsonapi.org/)
- Strongly typed everywhere, with generics typings on models, actions, etc.
- Dependency free (JSON:API adapter is based
  on [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API))
- (coming soon) Fully linted, tested and documented

## Some vocabulary

### Model

```javascript
export default makeModel('posts', {
  title: attr({ default: 'Hello world!' }),
  description: attr(),
  createdAt: attr(toDate()),
  publishedAt: attr(toDate()),
  comments: hasMany(),
}, {
  get isPublished() {
    return !!this.publishedAt;
  },
});
```

Models represent the structure of your data. A model is a composed class and can
be instantiated. Models are composed of four things:

- The **type** which uniquely references the model class.
- **Relationships** with other models (has one and has many).
- **Attributes** representing non relationships values (string, date, etc.).
- **Extensions** which add custom features to your model instances (e.g. full
  name getter for a `User` model, etc.).

### Action

```javascript
const posts = await action()
  .use(forModel(Post))
  .use(include('comments'))
  .run(all());

await action()
  .use(destroy(posts[0]))
  .run(raw());
```

Actions are the way you make interaction between your models and an external
API. There are three steps to an action:

- **Creation** using your own action factory (we'll talk about this later).
- **Use** of context enhancers to affect the context of the action (change the
  path, change the affected model, change some query params, etc.).
- **Run** of a context consumer to execute the action and retrieve a result.

The context of the action can be changed to pretty everything and the typings
are correctly propagated, making it a secure and easy way of building action
using Typescript or Javascript.

Context enhancers can be async as they are queued until run of the context
consumer.

## FAQ

### Why are we not using big `Model` and `Builder` classes?

In a lot of frameworks, modeling the data and building the query are done
through two main classes: the `Model` and the `Builder`.

The goal of FuncModel is to provide a lot of simple function to affect model
instances or their context. If all of those functions were included in classes,
it will be in your final production bundle even if you are not using them.
Thanks to the way FuncModel works, **all unused models helpers or actions
enhancers/consumers can be tree shaken.**

### Is it strongly typed?

**Yes!** FuncModel makes great use of Typescript generics to provide strongly
typed models objects and contexts changes.

Here are a short example of the capabilities reusing the previous examples:

```typescript
export default class Post extends makeModel('posts', {
  title: attr({ default: '' }), // Infered to string.
  description: attr<string>(), // Custom types are also supported.
  createdAt: attr(toDate()), // Infered from transformers.
  publishedAt: attr<Date | null>(toDate()),
  comments: hasMany<Comment>(),
}, {
  // `this` context is available and strongly typed in extensions.
  get isPublished() {
    return !!this.publishedAt;
  },
}) {
  // `this` context is also available and strongly typed in classes body.
  shortenDescription() {
    return this.description.substring(0, 50);
  }
}

const posts = await action()
  // We are telling the action context is now for the Post model.
  .use(forModel(Post))
  // We can now use this action context to strongly type context enhancer params.
  // As an example, `include` is typed for deep dotted relations, such as:
  // "comments", "comments.author", "comments.author.favoritePosts", etc.
  .use(include('comments'))
  // As another example, `fields` is typed for direct attributes or relationships of the model.
  .use(fields('title', 'description', 'comments'))
  .run(all());
```

### Why classes are used for models in Typescript?

We extend the `makeModel` call when using Typescript to be able to
only `import type` of the class type when typing our relations.

**This prevents dependency cycles.**

```typescript
// comment.ts
export default class Comment extends makeModel('posts') {
}
// post.ts
import type Comment from './path/to/models/comment';

export default class Post extends makeModel('posts', {
  comments: hasMany<Comment>(),
}) {
}
```

### What our the downsides of FuncModel approach?

When declaring models, there are no clear downside of the functional
programming, as `this` context is still available in extensions and classes
body.

But, since we are not building the action factory for you, you must initialize
this factory yourself with the things you need: an adapter, a serializer, etc.
Don't worry, the process is still pretty simple.

In addition, you cannot just use `action().forModel(Post).all()` because those
function must be imported to be used. We are thinking of a way to simply extends
the action with reusable function, but that's not currently possible regarding
the way Typescript manage types (generics of context enhancers and consumers
would be lost).
