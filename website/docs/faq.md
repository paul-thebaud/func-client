---
sidebar_position: 8
---

# FAQ

If you have any questions, feel free to ask them on our
[GitHub Issues page](https://github.com/paul-thebaud/func-client/issues).

## Why are we not using big `Model` and `Builder` classes?

In a lot of frameworks, modeling the data and building the query are done
through two main classes: the `Model` and the `Builder`.

The goal of FuncClient is to provide a lot of simple function to affect model
instances or their context. If all of those functions were included in classes,
it will be in your final production bundle even if you are not using them.
Thanks to the way FuncClient works, **all unused models helpers or actions
enhancers/runners can be tree shaken.**

## Is it strongly typed?

**Yes!** FuncClient makes great use of Typescript generics to provide strongly
typed models objects and contexts changes.

Here are a short example of the capabilities reusing the previous examples:

```typescript title="post.ts"
import { makeModel, attr, hasMany, toDate } from 'func-client/core';

class Post extends makeModel('posts', {
  title: attr({ default: '' }), // Infered to string.
  description: attr<string>(), // Custom types are also supported.
  createdAt: attr(toDate()), // Infered from transformers.
  publishedAt: attr<Date | null>(toDate()),
  comments: hasMany<Comment>(),
  // `this` context is available and strongly typed in definition methods.
  get isPublished() {
    return !!this.publishedAt;
  },
}) {
  // `this` context is also available and strongly typed in class methods.
  shortenDescription() {
    return this.description.substring(0, 50);
  }
}
```

Strongly typed models are used by context enhancers to provide strongly typed
parameters.

```typescript
const posts = await action()
  // We are telling the action context is now for the Post model.
  .use(model(Post))
  // We can now use this action context to strongly type context enhancer params.
  // As an example, `include` is typed for deep dotted relations, such as:
  // "comments", "comments.author", "comments.author.favoritePosts", etc.
  .use(include('comments'))
  // As another example, `fields` is typed for direct attributes or relationships of the model.
  .use(fields('title', 'description', 'comments'))
  .run(all());
```

## Why classes are used for models in Typescript?

We extend the `makeModel` call when using Typescript to be able to
only `import type` of the class type when typing our relations.

**This prevents dependency cycles.**

```typescript title="comment.ts"
export default class Comment extends makeModel('posts') {
}
```

```typescript title="post.ts"
// Notice the `import type` usage instead of simple `import`.
import type Comment from './comment';

export default class Post extends makeModel('posts', {
  comments: hasMany<Comment>(),
}) {
}
```

## What our the downsides of FuncClient approach?

When declaring models, there are no clear downside of the functional
programming, as `this` context is still available in definition and classes
body.

But, since we are not building the action factory for you, you must initialize
this factory yourself with the things you need: an adapter, a serializer, etc.
Don't worry, the process is still pretty simple thanks to blueprints.

In addition, you cannot just use `action().model(Post).all()` because those
function must be imported to be used. We are thinking of a way to simply extends
the action with reusable function, but that's not currently possible regarding
the way Typescript manage types (generics of context enhancers and runners
would be lost).
