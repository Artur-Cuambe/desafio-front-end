/**
 * Utility functions for formatting data
 */

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

/**
 * Format currency values
 */
export function formatCurrency(
  value: number,
  currency: string = "USD"
): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Format numbers with thousand separators
 */
export function formatNumber(value: number, decimals: number = 0): string {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/**
 * Format dates
 */
export function formatDate(
  date: string | Date,
  format: string = "MMM D, YYYY"
): string {
  return dayjs(date).format(format);
}

/**
 * Format datetime
 */
export function formatDateTime(
  date: string | Date,
  format: string = "MMM D, YYYY h:mm A"
): string {
  return dayjs(date).format(format);
}

/**
 * Format relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(date: string | Date): string {
  return dayjs(date).fromNow();
}

/**
 * Calculate days until expiry
 */
export function daysUntilExpiry(expiryDate: string | Date): number {
  return dayjs(expiryDate).diff(dayjs(), "day");
}

/**
 * Format expiry status
 */
export function formatExpiryStatus(expiryDate: string | Date): string {
  const days = daysUntilExpiry(expiryDate);

  if (days < 0) {
    return `Expired ${Math.abs(days)} days ago`;
  } else if (days === 0) {
    return "Expires today";
  } else if (days === 1) {
    return "Expires tomorrow";
  } else if (days <= 7) {
    return `Expires in ${days} days`;
  } else {
    return formatDate(expiryDate);
  }
}

/**
 * Format percentage
 */
export function formatPercentage(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Truncate text
 */
export function truncate(text: string, length: number = 50): string {
  if (text.length <= length) return text;
  return text.substring(0, length) + "...";
}

/**
 * Format enum values to readable strings
 */
export function formatEnumValue(value: string): string {
  return value
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Get file size formatted
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
}

/**
 * Calculate variance percentage
 */
export function calculateVariancePercentage(
  systemQty: number,
  countedQty: number
): number {
  if (systemQty === 0) return 0;
  return ((countedQty - systemQty) / systemQty) * 100;
}

/**
 * Format alert level to color class
 */
export function getAlertLevelColor(level: string): string {
  const colors: Record<string, string> = {
    NORMAL: "green",
    LOW: "yellow",
    CRITICAL: "red",
    OUT_OF_STOCK: "red",
  };
  return colors[level] || "gray";
}

/**
 * Format severity to color class
 */
export function getSeverityColor(severity: string): string {
  const colors: Record<string, string> = {
    LOW: "blue",
    MEDIUM: "yellow",
    HIGH: "orange",
    CRITICAL: "red",
  };
  return colors[severity] || "gray";
}

/**
 * Format quality status to color
 */
export function getQualityStatusColor(status: string): string {
  const colors: Record<string, string> = {
    GOOD: "green",
    FAIR: "yellow",
    POOR: "orange",
    EXPIRED: "red",
    QUARANTINED: "purple",
  };
  return colors[status] || "gray";
}

/**
 * Format stock take status to color
 */
export function getStockTakeStatusColor(status: string): string {
  const colors: Record<string, string> = {
    DRAFT: "gray",
    IN_PROGRESS: "blue",
    COMPLETED: "green",
    CANCELLED: "red",
    APPROVED: "purple",
  };
  return colors[status] || "gray";
}

export function formateDatePT(date, locale = "pt-PT") {
  return new Date(date).toLocaleDateString(locale, {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
