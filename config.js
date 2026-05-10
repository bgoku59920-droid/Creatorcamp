/**
 * CreatorCamp — /api/config
 * Vercel Serverless Function
 *
 * Reads environment variables set in Vercel Dashboard and
 * returns them safely to the browser at runtime.
 *
 * NO secrets are baked into the HTML — they all come from here.
 *
 * Vercel Dashboard → Project → Settings → Environment Variables
 * Add every variable listed below.
 */
export default function handler(req, res) {
  /* Only GET */
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  /* Security: only allow same origin (your Vercel domain) */
  res.setHeader('Cache-Control', 'no-store, no-cache');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  res.status(200).json({
    /* ── Firebase Auth + Realtime Database ──────────────────── */
    firebase: {
      apiKey:            process.env.FIREBASE_API_KEY            || '',
      authDomain:        process.env.FIREBASE_AUTH_DOMAIN        || '',
      projectId:         process.env.FIREBASE_PROJECT_ID         || '',
      storageBucket:     process.env.FIREBASE_STORAGE_BUCKET     || '',
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID|| '',
      appId:             process.env.FIREBASE_APP_ID             || '',
      databaseURL:       process.env.FIREBASE_DATABASE_URL       || '',
      // measurementId: process.env.FIREBASE_MEASUREMENT_ID     || '',
    },

    /* ── Zenvy HuggingFace Space ────────────────────────────── */
    zenvy: process.env.ZENVY_HF_URL || 'https://xir-rik-zenvy-ai.hf.space',

    /* ── Community Links ────────────────────────────────────── */
    waCommunity: process.env.WHATSAPP_COMMUNITY_URL || '#',
    waChannel:   process.env.WHATSAPP_CHANNEL_URL   || '#',
    discord:     process.env.DISCORD_URL            || '#',

    /* ── Social ─────────────────────────────────────────────── */
    instagram: process.env.INSTAGRAM_URL || '#',
    twitter:   process.env.TWITTER_URL   || '#',
    youtube:   process.env.YOUTUBE_URL   || '#',
    linkedin:  process.env.LINKEDIN_URL  || '#',

    /* Flag: if any Firebase key is missing, run in demo mode */
    demo: !process.env.FIREBASE_API_KEY,
  });
}
