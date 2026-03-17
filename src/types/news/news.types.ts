// src/types/news/news.types.ts

export interface NewsTickerSentiment {
  ticker: string;
  relevance_score: string;
  ticker_sentiment_score: string;
  ticker_sentiment_label: string;
}

export interface NewsTopic {
  topic: string;
  relevance_score: string;
}

export interface NewsItem {
  title: string;
  url: string;
  time_published: string;
  authors: string[];
  summary: string;
  banner_image?: string;
  source: string;
  category_within_source?: string;
  source_domain?: string;
  topics?: NewsTopic[];
  overall_sentiment_score?: number;
  overall_sentiment_label?: string;
  ticker_sentiment?: NewsTickerSentiment[];
}

export interface NewsResponse {
  items: string;
  sentiment_score_definition: string;
  relevance_score_definition: string;
  feed: NewsItem[];
}