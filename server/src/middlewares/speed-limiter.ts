import slowDown from 'express-slow-down';

export const spamLimiter = slowDown({
    windowMs: 0.5 * 60 * 1000,
    delayAfter: 10,
    delayMs: 500
});

export const speedLimiter = slowDown({
    windowMs: 2 * 1000,
    delayAfter: 1,
    delayMs: 300
});