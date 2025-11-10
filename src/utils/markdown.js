// Optimized markdown formatting utilities

/**
 * Format markdown text to HTML (optimized version)
 * @param {string} text - Markdown text
 * @returns {string} HTML string
 */
export function formatMarkdown(text) {
  if (!text || typeof text !== 'string') return '';
  
  let html = text;
  
  // Bold: **text**
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  
  // Italic: *text*
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  
  // Line breaks
  html = html.replace(/\n/g, '<br />');
  
  // Process bullet lists efficiently
  const lines = html.split('<br />');
  let inList = false;
  const processed = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();
    
    if (trimmedLine.match(/^[-*]\s/)) {
      const content = trimmedLine.replace(/^[-*]\s/, '');
      if (!inList) {
        processed.push('<ul class="list-disc list-inside">');
        inList = true;
      }
      processed.push(`<li>${content}</li>`);
    } else {
      if (inList) {
        processed.push('</ul>');
        inList = false;
      }
      if (trimmedLine) {
        processed.push(line);
      }
    }
  }
  
  if (inList) {
    processed.push('</ul>');
  }
  
  return processed.join('<br />');
}

/**
 * Parse description text and extract list items
 * @param {string} description - Description text
 * @returns {object} Object with text and items arrays
 */
export function parseDescription(description) {
  if (!description) return { text: '', items: [] };
  
  const lines = description.split('\n').map(line => line.trim()).filter(Boolean);
  const text = [];
  const items = [];
  
  for (const line of lines) {
    // Check if line is a bullet point
    const bulletMatch = line.match(/^[-*+]\s+(.+)$/);
    if (bulletMatch) {
      items.push(bulletMatch[1]);
    } else {
      text.push(line);
    }
  }
  
  return {
    text: text.join(' '),
    items
  };
}
