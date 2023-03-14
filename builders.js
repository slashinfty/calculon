import { SlashCommandBuilder } from 'discord.js';

export const CommandBuilders = [
    new SlashCommandBuilder()
        .setName('daily-forecast')
        .setDescription('Forecast for a given day of the week')
        .addStringOption(option => option
            .setName('day')
            .setDescription('Select the day of the week')
            .setRequired(true)
            .addChoices(
                { name: 'Sunday', value: '0' },
                { name: 'Monday', value: '1' },
                { name: 'Tuesday', value: '2' },
                { name: 'Wednesday', value: '3' },
                { name: 'Thursday', value: '4' },
                { name: 'Friday', value: '5' },
                { name: 'Saturday', value: '6' }
            )).toJSON(),
    new SlashCommandBuilder()
        .setName('hourly-forecast')
        .setDescription('Forecast for the next set of hours')
        .addIntegerOption(option => option
            .setName('hours')
            .setDescription('Enter a number of hours (up to 24)')
            .setRequired(true)).toJSON(),
    /*new SlashCommandBuilder()
        .setName('search-emby')
        .setDescription('Search Emby for a movie or TV show')
        .addStringOption(option => option
            .setName('type')
            .setDescription('Select movie or TV show')
            .setRequired(true)
            .addChoices(
                { name: 'Movie', value: 'Movies' },
                { name: 'TV Show', value: 'TV shows' }
            ))
        .addStringOption(option => option
            .setName('title')
            .setDescription('Enter the title to search for')
            .setRequired(true)).toJSON()*/
];