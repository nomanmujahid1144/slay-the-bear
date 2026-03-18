// src/utils/format.ts
// Generic utility functions for formatting numbers, prices, percentages, etc.

/**
 * Type guard to check if a value is a valid number
 */
const isValidNumber = (value: any): value is number => {
  return typeof value === 'number' && !isNaN(value) && isFinite(value);
};

/**
 * Format a price value with proper null/undefined handling
 * @param value - The price to format (can be number, string, null, or undefined)
 * @param decimals - Number of decimal places (default: 2)
 * @param fallback - Fallback string when value is invalid (default: '-')
 * @returns Formatted price string
 */
export const formatPrice = (
  value: number | string | null | undefined,
  decimals: number = 2,
  fallback: string = '-'
): string => {
  // Handle null, undefined
  if (value === null || value === undefined) {
    return fallback;
  }

  // Convert string to number if needed
  const numValue = typeof value === 'string' ? parseFloat(value) : value;

  // Validate number
  if (!isValidNumber(numValue)) {
    return fallback;
  }

  return numValue.toFixed(decimals);
};

/**
 * Format a change value (dollar amount)
 * @param value - The change amount
 * @param decimals - Number of decimal places (default: 2)
 * @param fallback - Fallback string when value is invalid (default: '-')
 * @returns Formatted change string
 */
export const formatChange = (
  value: number | string | null | undefined,
  decimals: number = 2,
  fallback: string = '-'
): string => {
  if (value === null || value === undefined) {
    return fallback;
  }

  const numValue = typeof value === 'string' ? parseFloat(value) : value;

  if (!isValidNumber(numValue)) {
    return fallback;
  }

  return numValue.toFixed(decimals);
};

/**
 * Format a percentage value
 * @param value - The percentage to format
 * @param decimals - Number of decimal places (default: 2)
 * @param fallback - Fallback string when value is invalid (default: '-')
 * @returns Formatted percentage string (without % symbol)
 */
export const formatPercent = (
  value: number | string | null | undefined,
  decimals: number = 2,
  fallback: string = '-'
): string => {
  if (value === null || value === undefined) {
    return fallback;
  }

  const numValue = typeof value === 'string' ? parseFloat(value) : value;

  if (!isValidNumber(numValue)) {
    return fallback;
  }

  return numValue.toFixed(decimals);
};

/**
 * Format a percentage with sign (+ or -)
 * @param value - The percentage to format
 * @param decimals - Number of decimal places (default: 2)
 * @param fallback - Fallback string when value is invalid (default: '-')
 * @returns Formatted percentage string with sign (e.g., "+5.23%", "-2.45%")
 */
export const formatPercentageWithSign = (
  value: number | string | null | undefined,
  decimals: number = 2,
  fallback: string = '-'
): string => {
  if (value === null || value === undefined) {
    return fallback;
  }

  const numValue = typeof value === 'string' ? parseFloat(value) : value;

  if (!isValidNumber(numValue)) {
    return fallback;
  }

  const sign = numValue >= 0 ? '+' : '';
  return `${sign}${numValue.toFixed(decimals)}%`;
};

/**
 * Format large numbers with K/M/B/T suffixes
 * @param value - The number to format
 * @param decimals - Number of decimal places (default: 2)
 * @param fallback - Fallback string when value is invalid (default: '-')
 * @returns Formatted string with suffix (e.g., "1.5M", "2.3B")
 */
export const formatLargeNumber = (
  value: number | string | null | undefined,
  decimals: number = 2,
  fallback: string = '-'
): string => {
  if (value === null || value === undefined) {
    return fallback;
  }

  const numValue = typeof value === 'string' ? parseFloat(value) : value;

  if (!isValidNumber(numValue)) {
    return fallback;
  }

  const absValue = Math.abs(numValue);
  const sign = numValue < 0 ? '-' : '';

  if (absValue >= 1_000_000_000_000) {
    return `${sign}${(absValue / 1_000_000_000_000).toFixed(decimals)}T`;
  }
  if (absValue >= 1_000_000_000) {
    return `${sign}${(absValue / 1_000_000_000).toFixed(decimals)}B`;
  }
  if (absValue >= 1_000_000) {
    return `${sign}${(absValue / 1_000_000).toFixed(decimals)}M`;
  }
  if (absValue >= 1_000) {
    return `${sign}${(absValue / 1_000).toFixed(decimals)}K`;
  }

  return `${sign}${absValue.toFixed(decimals)}`;
};

/**
 * Format volume (typically uses K/M/B suffixes)
 * @param value - The volume to format
 * @param fallback - Fallback string when value is invalid (default: '-')
 * @returns Formatted volume string
 */
export const formatVolume = (
  value: number | string | null | undefined,
  fallback: string = '-'
): string => {
  return formatLargeNumber(value, 2, fallback);
};

/**
 * Format market cap with appropriate suffix
 * @param value - The market cap to format
 * @param fallback - Fallback string when value is invalid (default: '-')
 * @returns Formatted market cap string
 */
export const formatMarketCap = (
  value: number | string | null | undefined,
  fallback: string = '-'
): string => {
  return formatLargeNumber(value, 2, fallback);
};

/**
 * Format currency with symbol
 * @param value - The amount to format
 * @param currency - Currency symbol (default: '$')
 * @param decimals - Number of decimal places (default: 2)
 * @param fallback - Fallback string when value is invalid (default: '-')
 * @returns Formatted currency string (e.g., "$123.45")
 */
export const formatCurrency = (
  value: number | string | null | undefined,
  currency: string = '$',
  decimals: number = 2,
  fallback: string = '-'
): string => {
  if (value === null || value === undefined) {
    return fallback;
  }

  const numValue = typeof value === 'string' ? parseFloat(value) : value;

  if (!isValidNumber(numValue)) {
    return fallback;
  }

  return `${currency}${numValue.toFixed(decimals)}`;
};

/**
 * Format a number with thousands separators
 * @param value - The number to format
 * @param decimals - Number of decimal places (default: 2)
 * @param fallback - Fallback string when value is invalid (default: '-')
 * @returns Formatted number string with commas (e.g., "1,234,567.89")
 */
export const formatNumberWithCommas = (
  value: number | string | null | undefined,
  decimals: number = 2,
  fallback: string = '-'
): string => {
  if (value === null || value === undefined) {
    return fallback;
  }

  const numValue = typeof value === 'string' ? parseFloat(value) : value;

  if (!isValidNumber(numValue)) {
    return fallback;
  }

  return numValue.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * Format a date to a readable string
 * @param date - The date to format (Date object, timestamp, or date string)
 * @param format - Format type ('short', 'medium', 'long', or 'time')
 * @param fallback - Fallback string when date is invalid (default: '-')
 * @returns Formatted date string
 */
export const formatDate = (
  date: Date | number | string | null | undefined,
  format: 'short' | 'medium' | 'long' | 'time' = 'medium',
  fallback: string = '-'
): string => {
  if (!date) {
    return fallback;
  }

  try {
    const dateObj = new Date(date);
    
    if (isNaN(dateObj.getTime())) {
      return fallback;
    }

    switch (format) {
      case 'short':
        return dateObj.toLocaleDateString();
      case 'medium':
        return dateObj.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        });
      case 'long':
        return dateObj.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          weekday: 'long'
        });
      case 'time':
        return dateObj.toLocaleTimeString();
      default:
        return dateObj.toLocaleDateString();
    }
  } catch {
    return fallback;
  }
};

/**
 * Format a relative time (e.g., "2 hours ago", "3 days ago")
 * @param date - The date to format
 * @param fallback - Fallback string when date is invalid (default: '-')
 * @returns Relative time string
 */
export const formatRelativeTime = (
  date: Date | number | string | null | undefined,
  fallback: string = '-'
): string => {
  if (!date) {
    return fallback;
  }

  try {
    const dateObj = new Date(date);
    
    if (isNaN(dateObj.getTime())) {
      return fallback;
    }

    const now = new Date();
    const diffMs = now.getTime() - dateObj.getTime();
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSeconds < 60) {
      return 'just now';
    } else if (diffMinutes < 60) {
      return `${diffMinutes} minute${diffMinutes === 1 ? '' : 's'} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
    } else if (diffDays < 30) {
      return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
    } else {
      return formatDate(dateObj, 'short', fallback);
    }
  } catch {
    return fallback;
  }
};

/**
 * Safely convert any value to a number
 * @param value - The value to convert
 * @param fallback - Fallback value if conversion fails (default: 0)
 * @returns Number or fallback
 */
export const toNumber = (
  value: any,
  fallback: number = 0
): number => {
  if (value === null || value === undefined) {
    return fallback;
  }

  const numValue = typeof value === 'string' ? parseFloat(value) : Number(value);

  return isValidNumber(numValue) ? numValue : fallback;
};