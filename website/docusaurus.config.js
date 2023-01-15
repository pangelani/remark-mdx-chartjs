// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const remarkMdxChartJS = require('remark-mdx-chartjs');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'remark-mdx-chartjs',
  tagline: 'ChartJS for the Markdown',
  url: 'https://pangelani.github.io/',
  baseUrl: '/remark-mdx-chartjs',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  trailingSlash: true,
  organizationName: 'pangelani',
  projectName: 'remark-mdx-chartjs',

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
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/pangelani/remark-mdx-chartjs/edit/main/website',
          remarkPlugins: [
            [
              remarkMdxChartJS,
              {
                chartJs: {
                  options: {
                    plugins: { legend: { position: 'top' } },
                    maintainAspectRatio: true,
                  }
                },
                width: 300
              },
            ],
          ],
        },
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
        title: 'remark-mdx-chartjs',
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Docs',
          },
          {
            href: 'https://github.com/pangelani/remark-mdx-chartjs',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `Copyright © ${new Date().getFullYear()} Pablo Angelani. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
