const ok = (message, data = null, meta = undefined) => ({
  success: true,
  message,
  data,
  ...(meta ? { meta } : {})
});

module.exports = { ok };
