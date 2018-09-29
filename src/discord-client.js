"use strict";

const Discord = require('discord.js');

class DiscordClient {
    constructor(config) {
        this._token = config.discord.token;
        this._guildId = config.discord.guildId;
        this._channelId = config.discord.channelId;
        this._initializeClient();
    }

    _initializeClient() {
        this._client = new Discord.Client();
    }

    _getUser(userId) {
        return this._client.guilds.get(this._guildId).members.get(userId);
    }

    _buildGameLink(gameId) {
        return `http://multiplayerrobot.com/Game/Details/${gameId}`
    }

    connect() {
        return this._client.login(this._token);
    }

    disconnect() {
        this._client.destroy();
    }

    reportTurn(userId, gameId) {
        this._client.channels.get(this._channelId).send(`${this._getUser(userId)}: do your turn! ${this._buildGameLink(gameId)}`);
    }
}

module.exports = DiscordClient;
