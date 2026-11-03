import { 
  SlashCommandBuilder, 
  PermissionFlagsBits, 
  ChatInputCommandInteraction, 
  ChannelType, 
  EmbedBuilder,
  TextChannel,
  Role,
  NonThreadGuildBasedChannel
} from "discord.js";
import { localizations } from "./i18n";

export const commands = [
  new SlashCommandBuilder()
    .setName("svsetup")
    .setDescription("Setup the entire Project Diablo 2 Guild Discord structure.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption(option =>
      option.setName("language")
        .setDescription("Language for channels, roles, and initial embeds.")
        .setRequired(true)
        .addChoices(
          { name: "Español", value: "es" },
          { name: "English", value: "en" }
        )
    ),
  new SlashCommandBuilder()
    .setName("announce")
    .setDescription("Send an official guild announcement.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addStringOption(option => 
      option.setName("title")
        .setDescription("Title of the announcement")
        .setRequired(true)
    )
    .addStringOption(option => 
      option.setName("message")
        .setDescription("Body text of the announcement")
        .setRequired(true)
    )
    .addRoleOption(option => 
      option.setName("ping")
        .setDescription("Optional role to ping with the announcement")
        .setRequired(false)
    )
];

export async function handleSvSetup(interaction: ChatInputCommandInteraction): Promise<void> {
  const guild = interaction.guild;
  if (!guild) return;

  await interaction.deferReply({ ephemeral: true });

  const langKey = interaction.options.getString("language", true);
  const lang = localizations[langKey] || localizations["es"];

  try {
    // 1. Create Roles
    const gmRole = await guild.roles.create({ name: lang.roles.gm, color: 0xFFD700, hoist: true });
    const officerRole = await guild.roles.create({ name: lang.roles.officer, color: 0x9B59B6, hoist: true });
    await guild.roles.create({ name: lang.roles.warrior, color: 0x3498DB, hoist: true });
    await guild.roles.create({ name: lang.roles.initiate, color: 0x95A5A6, hoist: true });
    await guild.roles.create({ name: lang.roles.hc, color: 0xE74C3C, hoist: false });
    await guild.roles.create({ name: lang.roles.sc, color: 0x1ABC9C, hoist: false });

    // 2. Category: INFO
    const catInfo = await guild.channels.create({ name: lang.categories.info, type: ChannelType.GuildCategory });
    
    const rulesChannel = await guild.channels.create({
      name: lang.channels.rules,
      type: ChannelType.GuildText,
      parent: catInfo.id,
      permissionOverwrites: [
        {
          id: guild.roles.everyone.id,
          deny: [PermissionFlagsBits.SendMessages]
        },
        {
          id: gmRole.id,
          allow: [PermissionFlagsBits.SendMessages]
        },
        {
          id: officerRole.id,
          allow: [PermissionFlagsBits.SendMessages]
        }
      ]
    });

    await guild.channels.create({
      name: lang.channels.announcements,
      type: ChannelType.GuildText,
      parent: catInfo.id,
      permissionOverwrites: [
        {
          id: guild.roles.everyone.id,
          deny: [PermissionFlagsBits.SendMessages]
        },
        {
          id: gmRole.id,
          allow: [PermissionFlagsBits.SendMessages]
        },
        {
          id: officerRole.id,
          allow: [PermissionFlagsBits.SendMessages]
        }
      ]
    });

    await guild.channels.create({
      name: lang.channels.guides,
      type: ChannelType.GuildText,
      parent: catInfo.id,
      permissionOverwrites: [
        {
          id: guild.roles.everyone.id,
          deny: [PermissionFlagsBits.SendMessages]
        },
        {
          id: gmRole.id,
          allow: [PermissionFlagsBits.SendMessages]
        },
        {
          id: officerRole.id,
          allow: [PermissionFlagsBits.SendMessages]
        }
      ]
    });

    // Send Rules Embed
    const rulesEmbed = new EmbedBuilder()
      .setTitle(lang.rulesEmbed.title)
      .setDescription(lang.rulesEmbed.description)
      .setColor(0xC0392B)
      .addFields(lang.rulesEmbed.fields)
      .setFooter({ text: lang.rulesEmbed.footer })
      .setTimestamp();

    await (rulesChannel as TextChannel).send({ embeds: [rulesEmbed] });

    // 3. Category: COMMUNITY
    const catCommunity = await guild.channels.create({ name: lang.categories.community, type: ChannelType.GuildCategory });
    await guild.channels.create({ name: lang.channels.chat, type: ChannelType.GuildText, parent: catCommunity.id });
    await guild.channels.create({ name: lang.channels.trophy, type: ChannelType.GuildText, parent: catCommunity.id });
    await guild.channels.create({ name: lang.channels.vault, type: ChannelType.GuildText, parent: catCommunity.id });

    // 4. Category: PD2 LADDER & TRADE
    const catPD2 = await guild.channels.create({ name: lang.categories.pd2, type: ChannelType.GuildCategory });
    await guild.channels.create({ name: lang.channels.trade, type: ChannelType.GuildText, parent: catPD2.id });
    await guild.channels.create({ name: lang.channels.uber, type: ChannelType.GuildText, parent: catPD2.id });
    await guild.channels.create({ name: lang.channels.partySc, type: ChannelType.GuildText, parent: catPD2.id });
    await guild.channels.create({ name: lang.channels.partyHc, type: ChannelType.GuildText, parent: catPD2.id });

    // 5. Category: VOICE CHANNELS
    const catVoice = await guild.channels.create({ name: lang.categories.voice, type: ChannelType.GuildCategory });
    await guild.channels.create({ name: lang.channels.voiceLobby, type: ChannelType.GuildVoice, parent: catVoice.id });
    await guild.channels.create({ name: lang.channels.voiceMapping, type: ChannelType.GuildVoice, parent: catVoice.id });
    await guild.channels.create({ name: lang.channels.voiceUbers, type: ChannelType.GuildVoice, parent: catVoice.id });

    await interaction.editReply({ content: lang.setupSuccess });
  } catch (error) {
    console.error("Setup Error:", error);
    await interaction.editReply({ content: lang.setupError });
  }
}

export async function handleAnnounce(interaction: ChatInputCommandInteraction): Promise<void> {
  const title = interaction.options.getString("title", true);
  const message = interaction.options.getString("message", true);
  const pingRole = interaction.options.getRole("ping") as Role | null;

  const embed = new EmbedBuilder()
    .setTitle(`📢 ${title}`)
    .setDescription(message)
    .setColor(0xF1C40F)
    .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL() })
    .setTimestamp();

  const channel = interaction.channel as NonThreadGuildBasedChannel | null;
  if (!channel || !("send" in channel)) {
    await interaction.reply({ content: "❌ Command must be used in a text channel.", ephemeral: true });
    return;
  }

  const content = pingRole ? `${pingRole}` : undefined;
  await (channel as TextChannel).send({ content, embeds: [embed] });
  await interaction.reply({ content: "✅ Announcement sent successfully.", ephemeral: true });
}