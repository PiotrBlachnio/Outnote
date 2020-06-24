import slowDown from 'express-slow-down';

export const spamLimiter = slowDown({
    windowMs: 0.5 * 60 * 1000,
    delayAfter: 10,
    delayMs: 500
});