# do-your-turn-discord

This is a Discord bot that pings users when their [GMR](https://www.multiplayerrobot.com) turn comes up.

It is dead simple and does not scale to multiple games, guilds, or channels.

## Configuration

Drop a config file into `configuration/config.json`. It looks like this:

```json
{
    "gmr": {
        "apiKey": "API key from GMR",
        "endpoint": "http://multiplayerrobot.com/api/Diplomacy",
        "referencePlayerId": "GMR ID of any player in the game you want to monitor",
        "gameId": "ID of the game to monitor",
        "players": {
            "76561197967998342": { // GMR id of a player in the game
                "friendlyName": "Rein", // A display name so you can keep track of all these IDs. Not used.
                "discordId": "161282472624128001" // ID of the corresponding user in Discord
            },
            "76561197993457891": {
                "friendlyName": "Zyrjello",
                "discordId": "102499714120826880"
            },
            "76561197993798090": {
                "friendlyName": "Asimir",
                "discordId": "234441482113777664"
            },
            "76561198024953688": {
                "friendlyName": "Ersuis",
                "discordId": "155058083112943616"
            },
            "76561198027089728": {
                "friendlyName": "Xavier",
                "discordId": "239527336997945345"
            }
        }
    },
    "discord": {
        "token": "Auth token for your Discord bot",
        "guildId": "ID of the guild where the below channel is located",
        "channelId": "Channel to ping when the current turn changes"
    }
}
```

### Where do I get all these IDs?

#### GMR

1. In GMR, find your game. Its ID will be in the URL.
1. Inspect the HTML element holding a user's avatar on your game page. The user ID should be in there somewhere (it probably starts with 76). You can get the IDs of everyone in the game this way.

#### Discord

1. In the Discord settings, turn on developer mode.
1. Right-click on whatever thing you want the ID of and click "Copy ID".
