import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import '@fontsource/fira-mono';
import '@fontsource/readex-pro';
import HomepageExamples from '@site/src/components/HomepageExamples';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import React from 'react';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('bg--primary-gradient', 'hero', styles.heroBanner)}>
      <div className="container">
        <h1 className={clsx('hero__title', styles.hero__title)}>{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg margin--sm"
            to="/docs/about"
          >
            Discover
          </Link>
          <Link
            className="button button--secondary button--lg margin--sm"
            to="/docs/getting-started"
          >
            Getting started 🚀
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title="Home"
      description={siteConfig.tagline}
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <HomepageExamples />
      </main>
    </Layout>
  );
}
