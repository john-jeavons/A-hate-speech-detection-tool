export interface AnalysisResult {
  label: string;
  score: number;
}

export interface ChatMessage {
  role: 'user' | 'model' | 'system';
  text: string;
  timestamp: Date;
}

export enum AppTab {
  ANALYZER = 'analyzer',
  CHATBOT = 'chatbot',
  RESOURCES = 'resources'
}

// Types for Hugging Face API response
export type HFResponse = AnalysisResult[][];
