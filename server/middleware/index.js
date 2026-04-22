const requiresLogin = (req, res, next) => {
    if (!req.session.account) {
      return res.status(401).json({ error: 'Login required.' });
    }
  
    return next();
  };
  
  const requiresLogout = (req, res, next) => {
    if (req.session.account) {
      return res.redirect('/app');
    }
  
    return next();
  };
  
  const requiresSecure = (req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https' && process.env.NODE_ENV === 'production') {
      return res.redirect(`https://${req.hostname}${req.url}`);
    }
  
    return next();
  };
  
  const bypassSecure = (req, res, next) => next();
  
  module.exports.requiresLogin = requiresLogin;
  module.exports.requiresLogout = requiresLogout;
  module.exports.requiresSecure = process.env.NODE_ENV === 'production' ? requiresSecure : bypassSecure;