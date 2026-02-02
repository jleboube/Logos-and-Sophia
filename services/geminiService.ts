
import { GoogleGenAI, Type, Chat } from "@google/genai";
import { DailyThought, UserPreferences, HistoryItem } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const fetchDailyThought = async (
  date: string, 
  preferences?: UserPreferences,
  history?: HistoryItem[]
): Promise<DailyThought> => {
  const prefString = preferences ? `
    User Preferences:
    - Biblical Focus: ${preferences.biblicalBooks.length > 0 ? preferences.biblicalBooks.join(', ') : 'Any'}
    - Hermetic Focus: ${preferences.hermeticTexts.length > 0 ? preferences.hermeticTexts.join(', ') : 'Any'}
    - Philosophical/Theurgic Themes: ${preferences.philosophicalThemes.length > 0 ? preferences.philosophicalThemes.join(', ') : 'Any'}
  ` : '';

  const historyString = history && history.length > 0 
    ? `IMPORTANT: Avoid the following topics, verses, and themes that the user has already seen: ${history.map(h => `${h.title} (${h.reference})`).join(', ')}.`
    : '';

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Today's real calendar date is ${date}. Generate a unique "Thought of the Day" for this exact date that bridges four distinct esoteric and sacred realms:
    1. Biblical scripture (Old or New Testament).
    2. Hermetic literature (Corpus Hermeticum, Kybalion, Emerald Tablet, etc.).
    3. Theurgy or High Magic (Neoplatonic theurgy, Renaissance magic, or ritual theory).
    4. The REAL Astrology cycle for ${date} — you MUST use the actual zodiac sun sign, real planetary transits, and true celestial alignments for this specific calendar date. The astrological content must reflect what is genuinely happening in the sky on ${date}, not generic or fabricated alignments.

    ${prefString}
    ${historyString}

    Prioritize the user's preferences if provided. Ensure the connection between all four elements (Bible, Hermeticism, Theurgy, and Astrology) is intricately woven into a coherent and spiritually profound synthesis. The astrological section must be grounded in the actual astronomical positions for ${date}. The tone should be scholarly yet mystical. No repetitions for a full calendar year.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          date: { type: Type.STRING },
          bibleVerse: {
            type: Type.OBJECT,
            properties: {
              reference: { type: Type.STRING },
              text: { type: Type.STRING }
            },
            required: ["reference", "text"]
          },
          hermeticWisdom: {
            type: Type.OBJECT,
            properties: {
              source: { type: Type.STRING },
              belief: { type: Type.STRING }
            },
            required: ["source", "belief"]
          },
          theurgyMagic: {
            type: Type.OBJECT,
            properties: {
              concept: { type: Type.STRING },
              reflection: { type: Type.STRING }
            },
            required: ["concept", "reflection"]
          },
          astrology: {
            type: Type.OBJECT,
            properties: {
              sign: { type: Type.STRING, description: "The dominant zodiac sign or planetary alignment for this date." },
              influence: { type: Type.STRING, description: "A brief description of how this astrological energy influences the daily theme." }
            },
            required: ["sign", "influence"]
          },
          synthesis: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              content: { type: Type.STRING },
              practicalApplication: { type: Type.STRING }
            },
            required: ["title", "content", "practicalApplication"]
          }
        },
        required: ["date", "bibleVerse", "hermeticWisdom", "theurgyMagic", "astrology", "synthesis"]
      }
    }
  });

  const jsonStr = response.text.trim();
  return JSON.parse(jsonStr);
};

export const createChatSession = (thought: DailyThought): Chat => {
  const genAI = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  return genAI.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are the "Guide of the Logos," a wise and scholarly spiritual mentor deeply versed in Biblical theology, Hermeticism, Neoplatonic Theurgy, and Astrology. 
      Your current focus is the wisdom shared for ${thought.date}:
      - Title: ${thought.synthesis.title}
      - Bible: ${thought.bibleVerse.reference} - "${thought.bibleVerse.text}"
      - Hermeticism: ${thought.hermeticWisdom.source} - "${thought.hermeticWisdom.belief}"
      - Theurgy: ${thought.theurgyMagic.concept} - "${thought.theurgyMagic.reflection}"
      - Astrology: ${thought.astrology.sign} - "${thought.astrology.influence}"
      - Synthesis: ${thought.synthesis.content}
      
      Your goal is to help the seeker understand the deep context and mystical connections of this specific day's content, including how the celestial alignments (Astrology) inform the spiritual and material path.
      Speak with authority but kindness. Use slightly elevated, poetic language that fits the "Logos & Sophia" aesthetic. 
      Keep answers concise but profound. If they ask about things unrelated to this spiritual path, gently guide them back to the Logos.`,
    },
  });
};
