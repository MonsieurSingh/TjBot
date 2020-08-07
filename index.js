// Require the discord.js module
const Discord = require("discord.js");

// Create a new Discord Client
const client = new Discord.Client();

// Import the bot configurations
const { prefix, token } = require("./config.json");

// Import the joke file
const fs = require("fs");
var data = fs.readFileSync("jokes.txt");
var dataArr = data.toString("utf8").split("\n");

// When the client is ready, run this code
// This event will only trigger one time after logging in
client.once("ready", () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (message) => {
	// if (!message.content.startsWith(prefix) || message.author.bot) return;
	const dadJoke = message.content.startsWith("I am");
	const dad = message.content.startsWith("I'm");

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const args1 = message.content.slice(prefix.length).trim();
	const newArgs = args1.split(" ").slice(1).join(" ");
	const newArgs1 = args1.split(" ").slice(2).join(" ");
	const command = args.shift().toLowerCase();

	function DadJoke() {
		function check() {
			if (message.content.startsWith("I am")) {
				return true;
			}
		}
		function check1() {
			if (message.content.startsWith("I am a")) {
				return true;
			}
		}
		if (
			message.content.startsWith("I am" || "i am") &&
			!message.content.startsWith("I am a")
		) {
			message.channel.send("Hi " + newArgs + ", I am Dad");
		} else if (message.content.startsWith("I am a")) {
			message.channel.send("Hi " + newArgs1 + ", I am Dad");
		}
	}
	DadJoke();
	if (command === "ping") {
		message.channel.send("Pong.");
	} else if (command === "beep") {
		message.channel.send("Boop.");
	} else if (command === "server") {
		message.channel.send(
			`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`
		);
	} else if (command === "user-info") {
		message.channel.send(
			`Your username: ${message.author.username}\nYour ID: ${message.author.id}`
		);
	} else if (command === "info") {
		if (!args.length) {
			return message.channel.send(
				`You didn't provide any arguments, ${message.author}!`
			);
		} else if (args[0] === "foo") {
			return message.channel.send("bar");
		}

		message.channel.send(`First argument: ${args[0]}`);
	} else if (command === "kick") {
		if (!message.mentions.users.size) {
			return message.reply(
				"you need to tag a user in order to kick them!"
			);
		}

		const taggedUser = message.mentions.users.first();

		message.channel.send(`You wanted to kick: ${taggedUser.username}`);
	} else if (command === "avatar") {
		if (!message.mentions.users.size) {
			return message.channel.send(
				`Your avatar: <${message.author.displayAvatarURL({
					dynamic: true,
				})}>`
			);
		}

		const avatarList = message.mentions.users.map((user) => {
			return `${user.username}'s avatar: <${user.displayAvatarURL({
				dynamic: true,
			})}>`;
		});

		message.channel.send(avatarList);
	} else if (command === "joke") {
		function jokeNo() {
			var numerall = Math.floor(Math.random() * 1480 + 1);
			message.channel.send(dataArr[numerall] + "\n TJ");
			console.log(numerall);
		}
		jokeNo();
		// } else if (dad || dadJoke) {
		// 	message.channel.send("hi" + " " + args1 + ", I am dad");
	} else if (command === "delete") {
		const amount = parseInt(args[0]) + 1;

		if (isNaN(amount)) {
			return message.reply("that doesn't seem to be a valid number.");
		} else if (amount <= 1 || amount > 100) {
			return message.reply(
				"you need to input a number between 1 and 99."
			);
		}

		message.channel.bulkDelete(amount, true).catch((err) => {
			console.error(err);
			message.channel.send(
				"there was an error trying to prune messages in this channel!"
			);
		});
	}
});

// Login to Discord with the app's token
client.login(token);
