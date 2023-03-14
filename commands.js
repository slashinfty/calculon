import { Collection } from "discord.js";

const SlashCommands = new Collection();

SlashCommands.set('daily-forecast', async interaction => {
    const day = parseInt(interaction.options.getString('day'));
    const response = await fetch('https://api.weather.gov/gridpoints/LWX/110,94/forecast');
    const data = await response.json();
    try {
        const periods = data.properties.periods;
        const today = new Date(Date.now());
        const advance = (7 + day - today.getDay()) % 7;
        const filtered = periods.filter(period => today.getDate() + advance === new Date(period.startTime).getDate() && new Date(period.startTime).getHours() >= 6);
        let response = filtered.reduce((str, per, i) => str += `${i === 0 ? '' : '\n'}${per.name}: ${per.detailedForecast}`, '');
        await interaction.reply({
            content: response,
            ephemeral: false
        });
    } catch (e) {
        console.error(e);
        await interaction.reply({
            content: 'Sorry, there was a problem. Please try again.',
            ephemeral: true
        });
    }
});

SlashCommands.set('hourly-forecast', async interaction => {
    const hours = Math.min(interaction.options.getInteger('hours'), 24);
    const response = await fetch('https://api.weather.gov/gridpoints/LWX/110,94/forecast/hourly');
    const data = await response.json();
    try {
        const periods = data.properties.periods;
        let response = '';
        for (let i = 0; i < hours; i++) {
            if (i !== 0) response += '\n';
            const period = periods[i];
            const hour = parseInt(/(?<=T)\d+(?=:)/.exec(period.startTime)[0]);
            response += `${hour % 12 === 0 ? 12 : hour % 12}${Math.floor(hour / 12) === 1 ? 'PM' : 'AM'} - Temp: ${period.temperature}${period.temperatureUnit} - Wind: ${period.windSpeed} - Forecast: ${period.shortForecast}`;
        }
        await interaction.reply({
            content: response,
            ephemeral: false
        });
    } catch (e) {
        console.error(e);
        await interaction.reply({
            content: 'Sorry, there was a problem. Please try again.',
            ephemeral: true
        });
    }
});

SlashCommands.set('search-emby', async interaction => {
    try {
        const userResponse = await fetch(`${process.env.EMBY_IP}/emby/Users/Public`);
        const userData = await userResponse.json();
        const userId = userData.find(user => user['Name'] === process.env.EMBY_NAME)['Id'];
        console.log(`userId:${userId}`);
        const mediaResponse = await fetch(`${process.env.EMBY_IP}/emby/Users/${userId}/Views?IncludeExternalContent=false`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const mediaData = await mediaResponse.json();
        const mediaId = mediaData.find(media => media['Name'] === interaction.options.getString('type'))['Id'];
        console.log(`mediaId:${mediaId}`);
        const itemResponse = await fetch(`${process.env.EMBY_IP}/emby/Users/${userId}/Items?ParentId=${mediaId}&api_key=${process.env.EMBY_API}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const itemData = await itemResponse.json();
        console.log(`itemData length: ${itemData.length}`);
        const title = interaction.options.getString('title');
        const itemResult = itemData.filter(item => item['Name'].toLowerCase().includes(title.toLowerCase()));
        let response = itemResult.length === 0 ? `No results for ${title}` : `Found the following results for ${title}: ${itemResult.reduce((str, item) => str + `\n${item['Name']}`, '')}`;
        await interaction.reply({
            content: response,
            ephemeral: false
        });
    } catch (e) {
        console.error(e);
        await interaction.reply({
            content: 'Sorry, there was a problem. Please try again.',
            ephemeral: true
        });
    }
});

export { SlashCommands };