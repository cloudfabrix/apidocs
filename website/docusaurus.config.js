// @ts-check
/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'RDAF Platform API Documentation',
  tagline: 'Interactive API reference powered by Scalar',
  favicon: 'img/favicon.ico',
  url: 'https://cloudfabrix.github.io',
  baseUrl: '/apidocs/',
  organizationName: 'fabrix-ai',
  projectName: 'apidocs',
  trailingSlash: false,
  onBrokenLinks: 'throw',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        blog: false,
        theme: {},
      }),
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'RDAF Platform API Documentation',
        logo: {
          alt: 'Fabrix',
          src: 'img/logo.svg',
        },
        items: [
          { type: 'custom-apiVersionSelector', position: 'left' },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Fabrix',
            items: [
              { label: 'Fabrix.ai', href: 'https://www.fabrix.ai' },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Fabrix.ai`,
      },
    }),
};

module.exports = config;
