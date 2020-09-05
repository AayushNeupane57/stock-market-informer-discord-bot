require("dotenv").config();
const Discord = require("discord.js");
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
const fs = require("fs");
const { fetchAndSave } = require("./utils/modifyNews");
const mongoose = require("./utils/mongoose");

bot.login(TOKEN);

bot.on("ready", () => {
  console.log("logged in");
  const commandFiles = fs
    .readdirSync("./commands")
    .filter((file) => file.endsWith(".js"));
  bot.commands = new Discord.Collection();
  for (const file of commandFiles) {
    let command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
  }
});

bot.on("message", (msg) => {
  console.log("before executing");
  if (msg.content === "help") {
    bot.commands.get("help").execute(msg);
  }
  if (msg.content === "ipo") {
    bot.commands.get("ipo").execute(msg);
  }
  if (msg.content === "summary") {
    bot.commands.get("summary").execute(msg);
  }
  if (
    msg.content === "topgainers" ||
    msg.content == "topGainers" ||
    msg.content == "top-gainers"
  ) {
    bot.commands.get("topGainers").execute(msg);
  }
});
mongoose.init();
