import clsx from 'clsx';
import React from 'react';
import AlarmLightOutlineSvg from '../../icons/alarm-light-outline.svg';
import SwapHorizontalSvg from '../../icons/swap-horizontal.svg';
import ToyBrickOutlineSvg from '../../icons/toy-brick-outline.svg';
import styles from './styles.module.css';

const FeatureList = [
  {
    Icon: SwapHorizontalSvg,
    title: 'REST and JSON:API ready',
    description: (
      <>
        FuncClient comes with a set of tools to quickly integrate with a
        REST or JSON:API backend.
        <br />
        You may also create your own adapters to integrate with any data sources
        (Soap, SQL, IndexedDB, etc.).
      </>
    ),
  },
  {
    Icon: ToyBrickOutlineSvg,
    title: 'Modular and fully tree-shakable',
    description: (
      <>
        With to functional programming, FuncClient can be used in many ways
        to fit your needs and unused functions can be tree-shaken from your
        production build easily.
      </>
    ),
  },
  {
    Icon: AlarmLightOutlineSvg,
    title: 'Strongly typed',
    description: (
      <>
        FuncClient is built with advanced TypeScript features to propose you
        a secure and clean type experience, thanks to generic types.
      </>
    ),
  },
];

function Feature({ Icon, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <div className={`${styles.featureSvgWrapper} gradient-background margin-bottom--lg`}>
          <Icon className={styles.featureSvg} />
        </div>
        <h2>{title}</h2>
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
