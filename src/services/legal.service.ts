// src/services/legal.service.ts

import axiosInstance from '@/utils/axiosInstance';
import { API_CONFIG } from '@/config/api.config';
import type { ApiResponse } from '@/types';

// ── Shared ────────────────────────────────────────────────────────────────────

interface LegalContact {
    company: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    email: string;
}

// ── Privacy Policy ────────────────────────────────────────────────────────────

interface PolicySubsection {
    id: string;
    title: string;
    content: string;
}

interface PolicySection {
    id: number;
    title: string;
    content?: string;
    subsections?: PolicySubsection[];
    items?: string[];
    contact?: LegalContact;
}

export interface PrivacyPolicyData {
    title: string;
    companyName: string;
    websiteUrl: string;
    lastUpdated: string;
    effectiveDate: string;
    sections: PolicySection[];
}

// ── Terms of Service ──────────────────────────────────────────────────────────

interface TosSubsection {
    id: string;
    title: string;
    content?: string;
    contact?: LegalContact;
}

interface TosSection {
    id: number;
    title: string;
    content?: string;
    subsections?: TosSubsection[];
}

export interface TermsData {
    title: string;
    version: string;
    lastRevised: string;
    effectiveDate: string;
    companyName: string;
    websiteUrl: string;
    sections: TosSection[];
}

// ── Service ───────────────────────────────────────────────────────────────────

export const legalService = {
    getPrivacyPolicy: () =>
        axiosInstance.get<ApiResponse<PrivacyPolicyData>>(
            API_CONFIG.ENDPOINTS.LEGAL.PRIVACY_POLICY
        ),

    getTermsOfService: () =>
        axiosInstance.get<ApiResponse<TermsData>>(
            API_CONFIG.ENDPOINTS.LEGAL.TERMS_OF_SERVICE
        ),
};