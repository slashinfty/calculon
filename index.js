/** Imports */
import * as dotenv from 'dotenv';
import { Client, Events, GatewayIntentBits } from 'discord.js';

import { SlashCommands } from './commands.js';

/** .env */
dotenv.config();

/** Discord */
const discord = new Client({ intents: [GatewayIntentBits.Guilds] });
discord.login(process.env.DISCORD_TOKEN);

/** Listeners */
discord.once(Events.ClientReady, client => {
    console.log(`Logged into Discord as ${client.user.tag}`);
});

discord.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isCommand() || !SlashCommands.has(interaction.commandName)) return;
    SlashCommands.get(interaction.commandName)(interaction);
});