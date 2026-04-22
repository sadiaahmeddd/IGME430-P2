const appPage = (req, res) => res.render('app');

const notFound = (req, res) => res.status(404).render('notFound');

module.exports = {
  appPage,
  notFound,
};