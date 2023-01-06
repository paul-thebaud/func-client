import Link from '@docusaurus/Link';
import CodeBlock from '@theme/CodeBlock';
import React from 'react';
import ArrowRightSvg from '../../icons/arrow-right.svg';
import styles from './styles.module.css';

const ExempleList = [
  {
    title: 'Define your models',
    description: 'FuncModel provides a simple way to define your models, which may combine attributes, relations or custom properties and methods.',
    link: { to: '/docs/essentials/models', text: 'Learn more about models' },
    code: `
import { makeModel, attr, hasOne } from 'func-client/core';
import type User from './User';

export default class Post extends makeModel('posts', {
  title: attr<string>(),
  content: attr<string>(),
  author: hasOne<User>(),
  get titleWithAuthor() {
    return \`\${this.title} by \${this.author.name}\`;
  },
}) {}
    `.trim(),
  },
  {
    title: 'Play with your models',
    description: 'Once your models are ready, you can define an action factory which you will use to run actions over your models. FuncModel proposes many functions to run action, from classic CRUD to custom actions...',
    link: { to: '/docs/essentials/actions', text: 'Learn more about actions' },
    code: `
import { find, update, include, oneOrFail, oneOrCurrent } from 'func-client/core';
import Post from './post';
import action from './action';

const post = await action()
  .use(find(Post, 123))
  .use(include('author'))
  .run(oneOrFail());

fill(post, { title: 'Hello World!' });

const updatedPost = await action()
  .use(update(post))
  .run(oneOrCurrent());
    `.trim(),
  },
];

function Example({ title, description, link, code }) {
  return (
    <div className="margin-bottom--lg">
      <div className="text--center">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <CodeBlock language="ts">{code}</CodeBlock>
      <div className="text--right">
        <Link
          className={`button bg--primary-gradient ${styles.examplesBtn}`}
          to={link.to}
        >
          {link.text}
          <ArrowRightSvg className={styles.examplesBtnSvg} />
        </Link>
      </div>
    </div>
  );
}

export default function HomepageExamples() {
  console.log(styles.examples);
  return (
    <section>
      <div className={`${styles.examples} container`}>
        <div className="padding-horiz--md">
          {ExempleList.map((props, idx) => (
            <Example key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
