import clsx from 'clsx';
import React from 'react';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'JSON:API ready',
    description: (
      <>
        FuncClient comes with a set of tools to quickly integrate with a
        JSON:API backend.
        <br />
        You may also create your own adapters to integrate with any data sources
        (REST, IndexedDB, etc.).
      </>
    ),
  },
  {
    title: 'Modular and fully tree-shakable',
    description: (
      <>
        Thanks to functional programming, FuncClient can be used in many ways
        to fit your needs and unused functions can be tree-shaken from your
        production build easily.
      </>
    ),
  },
  {
    title: 'Strongly typed',
    description: (
      <>
        FuncClient is built with advanced TypeScript features to propose you
        a secure and clean type experience, thanks to generic types.
      </>
    ),
  },
];

function Feature({ title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
