"use strict";

const DiscordClient = require('./src/discord-client');
const GmrClient = require('./src/gmr-client');
const config = require('./configuration/config.json');
const Logger = require('./src/logger');

const POLL_INTERVAL = 60000;

const discordClient = new DiscordClient(config);
let pollTask = null;

process.on('unhandledRejection', error => {
    Logger.error(`Unhandled rejection: ${error.message}`, {stackTrace: error.stack});
});

process.on('SIGINT', () => {
    clearInterval(pollTask);
    discordClient.disconnect();
    process.exit(0);
});

discordClient.connect().then(() => {
    const gmrClient = new GmrClient(config);
    pollTask = setInterval(() => {
        let lastPlayer = gmrClient.getLastPlayer();
        gmrClient.getCurrentTurn().then(player => {
            if (player !== lastPlayer) {
                discordClient.reportTurn(player.discordId, config.gmr.gameId);
            }
        }).catch(error => {
            Logger.warn(`Failed to retrieve game from GMR. Retrying in ${POLL_INTERVAL} ms. Message: ${error.message}`);
        });
    }, POLL_INTERVAL);
});
