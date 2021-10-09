// Require the necessary discord.js classes
require("dotenv").config();

const { Client, Intents } = require("discord.js");
const axios = require("axios");
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
});

client.once("ready", () => {
  console.log("Ready!");
});

client.on("messageCreate", (message) => {
  if (message) {
    if (message.content.toLowerCase() == "!jokes") {
      axios
        .get("https://api.chucknorris.io/jokes/random")
        .then((data) => message.reply(data.data.value))
        .catch((err) => message.reply("Soory, No more jokes 😥"));
    } else if (message.content.toLowerCase() == "!news") {
      axios
        .get(
          `https://newsapi.org/v2/top-headlines?country=in&apiKey=${process.env.NEWS_API}`
        )
        .then((data) => {
          if (data.data) {
            const articles = data.data.articles;

            for (var i = articles.length - 1; i > 0; i--) {
              var j = Math.floor(Math.random() * (i + 1));
              var temp = articles[i];
              articles[i] = articles[j];
              articles[j] = temp;
            }
            if(data.data.articles[0].description !== null && data.data.articles[0].description.length > 1)
                 message.reply(data.data.articles[0].description);
          }
        })
        .catch((err) => message.reply("Soory, No more news 😥"));
    }
  }
});

client.on("messageDelete", (msg) => {
  msg.channel.send("Stop deleting messages 😑");
});

// Login to Discord with your client's token
client.login(process.env.BOT_TOKEN);
