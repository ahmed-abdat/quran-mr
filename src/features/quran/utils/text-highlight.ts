/**
 * Text highlighting utilities for Quran search
 * Provides safe text highlighting without using dangerouslySetInnerHTML
 */

export interface TextSegment {
  text: string;
  isHighlighted: boolean;
}

/**
 * Safely highlights text segments matching a search query
 * @param text - The text to highlight
 * @param query - The search query to highlight
 * @returns Array of text segments with highlight information
 */
export function highlightTextSafely(
  text: string,
  query: string
): TextSegment[] {
  if (!query?.trim()) return [{ text, isHighlighted: false }];

  // Clean the text and query
  const cleanText = text.replace(/[\u06DD].*?[\u06DE]/g, "");
  const cleanQuery = query.trim();

  const segments: TextSegment[] = [];
  const lowerText = cleanText.toLowerCase();
  const lowerQuery = cleanQuery.toLowerCase();

  let lastIndex = 0;
  let index = lowerText.indexOf(lowerQuery);

  while (index !== -1) {
    // Add non-highlighted text before match
    if (index > lastIndex) {
      segments.push({
        text: cleanText.slice(lastIndex, index),
        isHighlighted: false,
      });
    }

    // Add highlighted text
    segments.push({
      text: cleanText.slice(index, index + cleanQuery.length),
      isHighlighted: true,
    });

    lastIndex = index + cleanQuery.length;
    index = lowerText.indexOf(lowerQuery, lastIndex);
  }

  // Add remaining text
  if (lastIndex < cleanText.length) {
    segments.push({
      text: cleanText.slice(lastIndex),
      isHighlighted: false,
    });
  }

  return segments;
}
