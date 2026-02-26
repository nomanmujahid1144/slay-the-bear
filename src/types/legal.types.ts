// src/types/legal.types.ts

export interface LegalSubsection {
  title: string;
  content: string;
}

export interface LegalContact {
  company: string;
  address: string;
  email: string;
}

export interface LegalSection {
  title: string;
  subsections?: LegalSubsection[];
  items?: string[];
  contact?: LegalContact;
  content?: string;
}

export interface TermsOfService {
  title: string;
  version: string;
  lastRevised: string;
  sections: LegalSection[];
}

export interface PrivacyPolicy {
  title: string;
  companyName: string;
  lastUpdated: string;
  intro: string;
  websiteUrl: string;
  sections: LegalSection[];
}