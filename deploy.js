import * as dotenv from 'dotenv';
import { REST, Routes } from 'discord.js';

import { CommandBuilders } from './builders.js';

dotenv.config();

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log(`Started reloading ${CommandBuilders.length} slash commands`);
        const result = await rest.put(
            Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, process.env.DISCORD_GUILD_ID),
            { body: CommandBuilders }
        );
        console.log(`Reloaded ${result.length} slash commands`);
    } catch (error) {
        console.error(error);
    }
});