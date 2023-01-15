import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

const FeatureList = [
  {
    title: 'Remark',
    Svg: require('@site/static/img/remark-logo.svg').default,
    description: (
      <>Remark is a markdown processor powered by plugins part of the unified collective.</>
    ),
    link: 'https://remark.js.org/',
  },
  {
    title: 'MDX',
    Svg: require('@site/static/img/mdx-logo.svg').default,
    description: <>Markdown for the component era.</>,
    link: 'https://mdxjs.com/',
  },
  {
    title: 'ChartJS',
    Svg: require('@site/static/img/chartjs-logo.svg').default,
    description: <>Simple yet flexible JavaScript charting library for the modern web.</>,
    link: 'https://www.chartjs.org/',
  },
];

function Feature({ Svg, title, description, link }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Link href={link}>
          <h3>{title}</h3>
        </Link>
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
