
export interface UserPreferences {
  biblicalBooks: string[];
  hermeticTexts: string[];
  philosophicalThemes: string[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  picture: string;
}

export interface HistoryItem {
  date: string;
  title: string;
  reference: string;
}

export interface DailyThought {
  date: string;
  bibleVerse: {
    reference: string;
    text: string;
  };
  hermeticWisdom: {
    source: string;
    belief: string;
  };
  theurgyMagic: {
    concept: string;
    reflection: string;
  };
  astrology: {
    sign: string;
    influence: string;
  };
  synthesis: {
    title: string;
    content: string;
    practicalApplication: string;
  };
}

export enum LoadingStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}
