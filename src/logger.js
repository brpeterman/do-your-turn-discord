"use strict";

const Winston = require('winston');

module.exports = Winston.createLogger({
    format: Winston.format.combine(
        Winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        Winston.format.printf(info => {
            if (info.stackTrace) {
                return `${info.timestamp} [${info.level.toUpperCase()}] ${info.message}\n${info.stackTrace}`;
            } else {
                return `${info.timestamp} [${info.level.toUpperCase()}] ${info.message}`
            }
        })
    ),
    transports: [
        new Winston.transports.Console()
    ]
});
