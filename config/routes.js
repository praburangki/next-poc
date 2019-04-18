/**
 * Define custom routes with different pathname depends on language or with slug.
 */
const customRoutes = [
  {
    paths: {
      en: "/about",
      id: "/tentang"
    }
  },
  {
    paths: {
      en: "/contact",
      id: "/kontak"
    }
  },
  {
    paths: {
      en: "/post/:id",
      id: "/pos/:id"
    },
    options: {
      asPathname: "/post/_id"
    }
  }
];

module.exports = { customRoutes };
