const clearCookie = async (req, res) => {
  res.clearCookie("token", { maxAge: 0 }).send({ success: true });
};

module.exports = clearCookie;
