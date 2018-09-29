"use strict";

const DiscordClient = require('./src/discord-client');
const GmrClient = require('./src/gmr-client');
const config = require('./configuration/config.json');

const discordClient = new DiscordClient(config);
let pollInterval = null;

process.on('unhandledRejection', error => {
    throw error;
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
        });
    }, 60000);
});
