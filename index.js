"use strict";

const DiscordClient = require('./src/discord-client');
const GmrClient = require('./src/gmr-client');
const config = require('./configuration/config.json');
const Logger = require('./src/logger');

const discordClient = new DiscordClient(config);
let pollInterval = null;

process.on('unhandledRejection', error => {
    Logger.error(error.message, {stackTrace: error.stack});
});

process.on('SIGINT', () => {
    clearInterval(pollInterval);
    discordClient.disconnect();
    process.exit(0);
});

discordClient.connect().then(() => {
    const gmrClient = new GmrClient(config);
    pollInterval = setInterval(() => {
        let lastPlayer = gmrClient.getLastPlayer();
        gmrClient.getCurrentTurn().then(player => {
            if (player !== lastPlayer) {
                discordClient.reportTurn(player.discordId, config.gmr.gameId);
            }
        }).catch(error => {
            Logger.warn(`Failed to retrieve game from GMR. Retrying at next opportunity. Error message: ${error.message}`);
        });
    }, 60000);
});
