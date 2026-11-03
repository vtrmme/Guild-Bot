export interface LocalizationData {
  roles: {
    gm: string;
    officer: string;
    warrior: string;
    initiate: string;
    hc: string;
    sc: string;
  };
  categories: {
    info: string;
    community: string;
    pd2: string;
    voice: string;
  };
  channels: {
    rules: string;
    announcements: string;
    guides: string;
    chat: string;
    trophy: string;
    vault: string;
    trade: string;
    uber: string;
    partySc: string;
    partyHc: string;
    voiceLobby: string;
    voiceMapping: string;
    voiceUbers: string;
  };
  rulesEmbed: {
    title: string;
    description: string;
    fields: { name: string; value: string }[];
    footer: string;
  };
  setupSuccess: string;
  setupError: string;
}

export const localizations: Record<string, LocalizationData> = {
  es: {
    roles: {
      gm: "👑 Guild Master",
      officer: "🛡️ Officer",
      warrior: "⚔️ Warrior",
      initiate: "🛡️ Initiate",
      hc: "🔥 Hardcore",
      sc: "💧 Softcore"
    },
    categories: {
      info: "📌 INFORMACIÓN GENERAL",
      community: "💬 COMUNIDAD & CHAT",
      pd2: "⚔️ LADDER & TRADE PD2",
      voice: "🔊 CANALES DE VOZ"
    },
    channels: {
      rules: "📜-reglas-y-normas",
      announcements: "📢-anuncios-guild",
      guides: "📚-guias-y-links",
      chat: "💬-chat-general",
      trophy: "🏆-trophy-case",
      vault: "📦-guild-vault-log",
      trade: "🔀-trade-interno",
      uber: "💀-servicio-uber-dclone",
      partySc: "💧-party-finder-sc",
      partyHc: "🔥-party-finder-hc",
      voiceLobby: "🔊 Salón Principal",
      voiceMapping: "🔊 Mapeo & Leveling",
      voiceUbers: "🔊 Bossing & Ubers"
    },
    rulesEmbed: {
      title: "📜 Reglas Oficiales de la Guild | Project Diablo 2",
      description: "Bienvenidos a la Guild. Para mantener una comunidad sana y organizada, todos los miembros deben seguir estas normas:",
      fields: [
        { name: "1. Respeto Mutuo", value: "Cero tolerancia a la toxicidad, insultos o discriminación en canales de voz y texto." },
        { name: "2. Trade Interno Justo", value: "Prioriza el comercio dentro de la guild a precios razonables. Queda prohibido el estafado (scam) a compañeros." },
        { name: "3. Uso del Guild Vault", value: "Registra los ítems depositados y retirados en el canal correspondiente. No acapares recursos de uso común." },
        { name: "4. Servicios de Ubers/DClone", value: "Si solicitas ayuda para Bosses de endgame, respeta el reparto de loot pactado antes de abrir el portal." },
        { name: "5. Seguridad en Hardcore", value: "Juega limpio y no expongas a compañeros deliberadamente a situaciones de muerte en modo HC." }
      ],
      footer: "Project Diablo 2 Guild System • ¡Buena suerte en la Ladder!"
    },
    setupSuccess: "✅ La infraestructura del servidor de la Guild ha sido creada con éxito en Español.",
    setupError: "❌ Ocurrió un error al ejecutar la configuración del servidor."
  },
  en: {
    roles: {
      gm: "👑 Guild Master",
      officer: "🛡️ Officer",
      warrior: "⚔️ Warrior",
      initiate: "🛡️ Initiate",
      hc: "🔥 Hardcore",
      sc: "💧 Softcore"
    },
    categories: {
      info: "📌 GENERAL INFORMATION",
      community: "💬 COMMUNITY & CHAT",
      pd2: "⚔️ PD2 LADDER & TRADE",
      voice: "🔊 VOICE CHANNELS"
    },
    channels: {
      rules: "📜-rules-and-info",
      announcements: "📢-guild-announcements",
      guides: "📚-guides-and-links",
      chat: "💬-general-chat",
      trophy: "🏆-trophy-case",
      vault: "📦-guild-vault-log",
      trade: "🔀-internal-trade",
      uber: "💀-uber-dclone-service",
      partySc: "💧-party-finder-sc",
      partyHc: "🔥-party-finder-hc",
      voiceLobby: "🔊 Main Lounge",
      voiceMapping: "🔊 Mapping & Leveling",
      voiceUbers: "🔊 Bossing & Ubers"
    },
    rulesEmbed: {
      title: "📜 Official Guild Rules | Project Diablo 2",
      description: "Welcome to the Guild. To maintain a healthy and structured community, all members must abide by the following rules:",
      fields: [
        { name: "1. Mutual Respect", value: "Zero tolerance for toxicity, insults, or harassment across text and voice channels." },
        { name: "2. Fair Internal Trade", value: "Prioritize guild mates for trading at reasonable rates. Scamming members will result in an immediate ban." },
        { name: "3. Guild Vault Usage", value: "Log any high-tier items deposited or withdrawn in the designated channel. Do not hoard shared resources." },
        { name: "4. Uber/DClone Services", value: "Agree on loot allocation before opening portals for endgame boss services." },
        { name: "5. Hardcore Safety", value: "Play clean and avoid intentionally endangering teammates during HC runs." }
      ],
      footer: "Project Diablo 2 Guild System • Good luck on the Ladder!"
    },
    setupSuccess: "✅ Guild server infrastructure successfully created in English.",
    setupError: "❌ An error occurred while running the server setup."
  }
};