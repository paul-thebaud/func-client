// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const { resolve } = require('path');
const { transpileCodeblocks } = require('remark-typescript-tools');
const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'FuncClient',
  tagline: 'Functional programming oriented client for TS and JS, with strong typing and tree-shaking capabilities.',
  url: 'https://paul-thebaud.github.io',
  baseUrl: '/func-client/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  organizationName: 'paul-thebaud',
  projectName: 'func-client',
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
          editUrl: 'https://github.com/paul-thebaud/func-client/tree/main/website/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  plugins: [
    ['docusaurus-plugin-typedoc', {
      id: 'api-func-client',
      entryPoints: [
        '../src/core.ts',
        '../src/http.ts',
        '../src/json.ts',
        '../src/jsonapi.ts',
        '../src/rest.ts',
        '../src/blueprints.ts',
      ],
      tsconfig: '../tsconfig.json',
      out: 'api/func-client',
      sidebar: { position: 5, categoryLabel: 'API Reference' },
    }],
  ],
  themeConfig:
  /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'FuncClient',
        items: [
          {
            to: '/docs/about',
            position: 'left',
            label: 'About',
          },
          {
            to: '/docs/getting-started',
            position: 'left',
            label: 'Documentation',
          },
          {
            href: 'https://github.com/paul-thebaud/func-client',
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
                label: 'About',
                to: '/docs/about',
              },
              {
                label: 'Getting started',
                to: '/docs/getting-started',
              },
              {
                label: 'Essentials',
                to: '/docs/category/essentials',
              },
              {
                label: 'Advanced',
                to: '/docs/category/advanced',
              },
              {
                label: 'FAQ',
                to: '/docs/faq',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/paul-thebaud/func-client',
              },
              {
                href: 'https://www.npmjs.com/package/func-client',
                label: 'NPM',
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
