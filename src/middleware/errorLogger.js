const fs = require('fs').promises;
const path = require('path');

async function errorLogger(err, req, res, next) {
    const logDir = path.join(process.cwd(), 'logs');
    const logFile = path.join(logDir, 'error.log');

    try {
        if (!fs.existsSync(logDir)) {
            await fs.mkdir(logDir, { recursive: true });
        }

        const logEntry = `
Time: ${new Date().toISOString()}
Error: ${err.message}
Stack: ${err.stack}
Request Path: ${req.path}
Request Method: ${req.method}
-----------------
`;

        await fs.appendFile(logFile, logEntry);
    } catch (error) {
        console.error('Failed to log error:', error);
    }

    next(err);
}

module.exports = errorLogger;