import { SlashCommandBuilder } from 'discord.js';

export const CommandBuilders = [
    new SlashCommandBuilder()
        .setName('dailyForecast')
        .setDescription('Forecast for a given day of the week')
        .addStringOption(option => option
            .setName('day')
            .setDescription('Select the day of the week')
            .setRequired(true)
            .addChoices([
                ['0', 'Sunday'],
                ['1', 'Monday'],
                ['2', 'Tuesdays'],
                ['3', 'Wednesday'],
                ['4', 'Thursday'],
                ['5',' Friday'],
                ['6', 'Saturday']
            ])),
    new SlashCommandBuilder()
        .setName('hourlyForecast')
        .setDescription('Forecast for the next set of hours')
        .addIntegerOption(option => option
            .setName('hours')
            .setDescription('Enter a number of hours (up to 24)')
            .setRequired(true)),
    new SlashCommandBuilder()
        .setName('searchEmby')
        .setDescription('Search Emby for a movie or TV show')
        .addStringOption(option => option
            .setName('type')
            .setDescription('Select movie or TV show')
            .setRequired(true)
            .addChoices([
                ['Movies', 'Movie'],
                ['TV shows', 'TV show']
            ]))
        .addStringOption(option => option
            .setName('title')
            .setDescription('Enter the title to search for')
            .setRequired(true))
];