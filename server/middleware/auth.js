module.exports = {
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      res.send(true);
    } else {
      res.send(false);
    }
  },
};
