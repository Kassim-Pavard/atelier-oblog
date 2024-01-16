/**
 * @param {Error} err
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {express.Response}
 */
// eslint-disable-next-line no-unused-vars
export default (err, req, res, next) => {
  const errObject = err;
  const status = errObject.httpStatus || 500;
  if (status === 500) {
    console.error(errObject);
    errObject.message = 'Internal Server Error';
  }
  if (errObject.format === 'html') {
    return res.status(status).render('error', { error: errObject });
  }
  return res.status(status).json({ error: errObject.message });
};
