// Require the discord.js module
const Discord = require("discord.js");

// Create a new Discord Client
const client = new Discord.Client();

// Import the bot configurations
const { prefix, token } = require("./config.json");

// When the client is ready, run this code
// This event will only trigger one time after logging in
client.once("ready", () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (message) => {
	console.log(message.content);
	if (message.content.startsWith(`${prefix}ping`)) {
		message.channel.send("Pong.");
	} else if (message.content.startsWith(`${prefix}beep`)) {
		message.channel.send("Boop.");
	} else if (message.content === `${prefix}server`) {
		message.channel.send(
			`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`
		);
	} else if (message.content === `${prefix}user-info`) {
		message.channel.send(
			`Your username: ${message.author.username}\nYour ID: ${message.author.id}`
		);
	}
});

// Login to Discord with the app's token
client.login(token);
