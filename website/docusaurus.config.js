// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const { resolve } = require('path');
const { transpileCodeblocks } = require('remark-typescript-tools');
const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'FuncModel',
  tagline: 'Functional programming oriented API client for TS and JS, with strong types capabilities.',
  url: 'https://paul-thebaud.github.io',
  baseUrl: '/func-model/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  organizationName: 'paul-thebaud',
  projectName: 'func-model',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          remarkPlugins: [[transpileCodeblocks, {
            compilerSettings: {
              tsconfig: resolve(__dirname, './docs/tsconfig.json'),
              externalResolutions: {},
            },
          }]],
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/paul-thebaud/func-model/tree/main/website/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
  /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'FuncModel',
        items: [
          {
            type: 'doc',
            docId: 'discover',
            position: 'left',
            label: 'Discover',
          },
          {
            to: '/docs/essentials/getting-started',
            position: 'left',
            label: 'Documentation',
          },
          {
            href: 'https://github.com/paul-thebaud/func-model',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Discover',
                to: '/docs/discover',
              },
              {
                label: 'Essentials',
                to: '/docs/category/essentials',
              },
              {
                label: 'Advanced',
                to: '/docs/category/advanced',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/paul-thebaud/func-model',
              },
            ],
          },
        ],
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
