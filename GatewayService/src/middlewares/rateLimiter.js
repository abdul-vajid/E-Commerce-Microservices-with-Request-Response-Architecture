import rateLimit from 'express-rate-limit'

const apiLimiter = rateLimit({
  windowMs: 1000, // 1 minute
  max: 1, // 100 requests per minute
  message: "Too many requests from this IP, please try again later"
});

export default apiLimiter
