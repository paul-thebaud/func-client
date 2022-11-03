---
sidebar_position: 1
---

# Introduction

## What is Func Model?

**Func Model** is a simple functional programming oriented API client. It is
framework-agnostic and can integrate with any Web app using Javascript or
Typescript.

- Modular, highly extensible and fully treeshakable
- Ready to use functions to integrate with any [JSON:API](https://jsonapi.org/)
- Strongly typed everywhere, with generics typings on models, actions, etc.
- Dependency free (JSON:API adapter is based
  on [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API))
- (coming soon) Fully linted, tested and documented

## How those it work?

### Short explanation

Purpose of Func Model is to let you declare models object containing attributes
and relationships (called a schema). Those model can also contain custom
getters, setters, methods or properties.

Once your model are defined, you can use them through your declared action
factory. The action factory is a configured base context for all your API
interactions which you need to declare (this avoids useless functions or class
being in your production bundle if you do not use them).

With this action factory, you can run API action (GET, POST, etc.) using context
changers and runners.

```javascript
// post.js - We declare a post model with the provided schema and extensions.
export default makeModel('posts', {
  // The schema to interact with our API.
  title: attr({ default: '' }),
  description: attr(),
  comments: hasMany(),
  createdAt: attr(dateTransformer()),
  publishedAt: attr(dateTransformer()),
}, {
  // Our extensions function for the model.
  get isPublished() {
    return !!this.publishedAt;
  },
});

// main.js - We use this post schema through our configured action factory.
import action from './your/project/action';
import Post from './your/project/post';

const posts = await action()
  .use(forModel(Post))
  .use(include('comments'))
  .run(all());

posts[0].title; // "Hello World"
posts[0].comments; // `Comment` model instances as an array.

await action().run(update(
  fill(posts[0], { title: 'Hello from Func Model' }),
));

posts[0].title; // "Hello from Func Model"
```

### Benefits of functional programming

The way you will declare your models and run your action is called functional
programming. The base model and action objects are very small, and you are
interacting with those using functions. This way, if you do not use a feature of
Func Model (such as `HasMany` relations or `fields` JSON:API param), it won't be
included in your final production bundle thanks to treeshaking.

### For Typescript, strong types works!

Keeping types when using functional programming might be a little tricky when
using Typescript. Func Model is designed with generic types where it is useful,
allowing your model interaction or action context changes to be strictly typed.

If we take the previous example and transform it to Typescript, we have a lot of
benefits:

```typescript
// post.js - We declare the Post model using class to be able to only import
// types when relating the Post model in other models,
// such as the following Comment import.
import type Comment from './your/project/comment';

export default class Post extends makeModel('posts', {
  // Title attribute is infered as string from default value.
  title: attr({ default: '' }),
  // We can also pass a custom type.
  description: attr<string>(),
  comments: hasMany<Comment>(),
  // Infered as `Date` from transformer.
  createdAt: attr(dateTransformer()),
  // We may also override the infered type from transformer.
  publishedAt: attr<Date | null>(dateTransformer()),
}, {
  get isPublished() {
    // `this` context is available with the correct typing in extensions.
    // Here, `this.publishedAt` is a nullable Date.
    return !!this.publishedAt;
  },
}) {
  shortenDescription() {
    // We can also use a strongly typed `this` inside the class body.
    return this.description.substring(0, 50);
  }
}

// main.js
import action from './your/project/action';
import Post from './your/project/post';

const posts = await action()
  // We are telling the action context is now for the Post model.
  .use(forModel(Post))
  // We can now use this action context to strongly type context changers params.
  // As an example, `include` is typed for deep dotted relations, such as:
  // "comments", "comments.author", "comments.author.favoritePosts", etc.
  .use(include('comments'))
  .run(all());

posts[0].title; // Type: `string`
posts[0].comments; // Type: `Comment[]`

// Strong types are available everywhere, even in small helpers such as `fill`.
await action().run(update(
  fill(posts[0], { title: 'Hello from Func Model' }),
));

posts[0].title; // "Hello from Func Model"
```
