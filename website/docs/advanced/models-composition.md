---
sidebar_position: 2
description: Sharing common features across your models.
---

# Models composition

:::tip What you'll learn
- Creating composables to share features across some of your models
- Creating your own model factory with predefined features for all of your models
:::

Sometimes, you may want to share common features across your models.
To solve this, you may use one of the two solutions proposed by FuncClient:

- [Composition](#composition), to share features across some of your models
- [Factory](#factory), to share features across all of your models

## Composition

When you need to share features across **some** of your models, you should use
composition.

The first step is to create a composable with the features you want to share.
This is done through `makeComposable` and uses the same syntax as `makeModel`.

```javascript title="composables/publishable.js"
import { attr, makeComposable, toDate } from 'func-client/core';

export default makeComposable({
  publishedAt: attr(toDate()),
}, {
  get isDraft() {
    return !this.publishedAt;
  },
});
```

Once your composable is ready, you can extend it when creating your model.

```javascript title="models/post.js"
import { makeModel } from 'func-client/core';
import publishable from '../composables/publishable';

export default class Post extends makeModel('posts').extends(publishable) {
}
```

## Factory

When you need to share features across **all** of your models, you should use
a custom model factory. It will replace the FuncModel's `makeModel` function.

```javascript title="makeModel.js"
import { attr, makeModelFactory, toDate } from 'func-client/core';

export default makeModelFactory({
  createdAt: attr(toDate()),
  updatedAt: attr(toDate()),
}, {
  get wasChangedSinceCreation() {
    return this.createdAt.getTime() === this.updatedAt.getTime();
  },
});
```

Once your factory is ready, you can use in replacement of the classical
`makeModel`, as it will have the same features.

```javascript
import makeModel from './makeModel';

export default class Post extends makeModel('posts') {
}
```
