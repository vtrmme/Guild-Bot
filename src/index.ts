import { Client, GatewayIntentBits, REST, Routes, Events } from "discord.js";
import express from "express";
import dotenv from "dotenv";
import { commands, handleSvSetup, handleAnnounce } from "./commands";

dotenv.config();

const TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const PORT = process.env.PORT || 3000;

if (!TOKEN || !CLIENT_ID) {
  console.error("❌ Missing DISCORD_TOKEN or CLIENT_ID environment variables.");
  process.exit(1);
}

// 1. Keep-Alive Express Server for Render Free Tier
const app = express();
app.get("/", (_req, res) => {
  res.send("PD2 Guild Bot is running live!");
});
app.listen(Number(PORT), "0.0.0.0", () => {
  console.log(`🌐 Keep-alive server listening on port ${PORT}`);
});

// 2. Initialize Discord Client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages
  ]
});

// 3. Register Slash Commands
const rest = new REST({ version: "10" }).setToken(TOKEN);

async function registerCommands() {
  try {
    console.log("🔄 Registering global slash commands...");
    await rest.put(
      Routes.applicationCommands(CLIENT_ID as string),
      { body: commands.map(cmd => cmd.toJSON()) }
    );
    console.log("✅ Slash commands registered successfully.");
  } catch (error) {
    console.error("❌ Failed to register slash commands:", error);
  }
}

// 4. Client Event Listeners
client.once(Events.ClientReady, async (c) => {
  console.log(`🤖 Logged in as ${c.user.tag}`);
  await registerCommands();
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "svsetup") {
    await handleSvSetup(interaction);
  } else if (interaction.commandName === "announce") {
    await handleAnnounce(interaction);
  }
});

client.login(TOKEN);