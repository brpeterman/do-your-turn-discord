"use strict";

const HTTP = require('http');
const LosslessJSON = require('lossless-json');

class GmrClient {
    constructor(config) {
        this._apiKey = config.gmr.apiKey;
        this._endpoint = config.gmr.endpoint;
        this._referencePlayerId = config.gmr.referencePlayerId;
        this._gameId = config.gmr.gameId;
        this._playersMap = config.gmr.players;
        this._lastPlayer = null;
    }

    getLastPlayer() {
        return this._lastPlayer;
    }

    getCurrentTurn() {
        return new Promise((resolve, reject) => {
            this._fetchGameStatus().then(status => {
                const gmrPlayer = status.Games.find(game => game.GameId.value === this._gameId).CurrentTurn.UserId.value;
                this._lastPlayer = this._playersMap[gmrPlayer];
                resolve(this._playersMap[gmrPlayer]);
            });
        });
    }

    _fetchGameStatus() {
        return new Promise((resolve, reject) => {
            HTTP.get(`${this._endpoint}/GetGamesAndPlayers?playerIDText=${this._referencePlayerId}&authKey=${this._apiKey}`, (response) => {
                if (response.statusCode !== 200) {
                    reject(`Error fetching game status: ${response.statusCode}`);
                }

                let rawData = '';
                response.on('data', data => rawData += data);
                response.on('end', () => {
                    resolve(LosslessJSON.parse(rawData));
                });
            });
        });
    }
}

module.exports = GmrClient;
