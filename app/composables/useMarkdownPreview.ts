/** A run of inline content after parsing bold, italic, or code markers. */
export type MarkdownInlineSegment = {
  type: 'text' | 'strong' | 'em' | 'code'
  content: string
}

/** A single rendered block derived from one input line (or a placeholder when empty). */
export type MarkdownBlock = {
  type: 'heading' | 'list-item' | 'paragraph' | 'placeholder'
  level?: 1 | 2 | 3
  segmentList: MarkdownInlineSegment[]
}

function parseInlineSegmentList(text: string): MarkdownInlineSegment[] {
  const segmentList: MarkdownInlineSegment[] = []
  const inlinePattern = /\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`/g
  let lastIndex = 0
  let match = inlinePattern.exec(text)

  while (match !== null) {
    if (match.index > lastIndex) {
      segmentList.push({ type: 'text', content: text.slice(lastIndex, match.index) })
    }

    if (match[1]) {
      segmentList.push({ type: 'strong', content: match[1] })
    } else if (match[2]) {
      segmentList.push({ type: 'em', content: match[2] })
    } else if (match[3]) {
      segmentList.push({ type: 'code', content: match[3] })
    }

    lastIndex = inlinePattern.lastIndex
    match = inlinePattern.exec(text)
  }

  if (lastIndex < text.length) {
    segmentList.push({ type: 'text', content: text.slice(lastIndex) })
  }

  return segmentList.length > 0 ? segmentList : [{ type: 'text', content: text }]
}

/**
 * Lightweight line-based parser for the notes preview demo.
 * Supports headings, list items, and inline `**bold**`, `*italic*`, `` `code` `` only — not full CommonMark.
 */
export function parseMarkdownBlockList(text: string): MarkdownBlock[] {
  if (!text.trim()) {
    return [{ type: 'placeholder', segmentList: [{ type: 'text', content: '預覽區域...' }] }]
  }

  return text.split('\n').flatMap((line): MarkdownBlock[] => {
    if (!line.trim()) {
      return []
    }

    const headingMatch = line.match(/^(#{1,3}) (.+)$/)
    if (headingMatch) {
      return [
        {
          type: 'heading',
          level: headingMatch[1]!.length as 1 | 2 | 3,
          segmentList: parseInlineSegmentList(headingMatch[2]!),
        },
      ]
    }

    const listItemMatch = line.match(/^- (.+)$/)
    if (listItemMatch) {
      return [
        {
          type: 'list-item',
          segmentList: parseInlineSegmentList(listItemMatch[1]!),
        },
      ]
    }

    return [
      {
        type: 'paragraph',
        segmentList: parseInlineSegmentList(line),
      },
    ]
  })
}

/**
 * Reactive markdown preview for editor content.
 * Re-parses whenever `sourceText` changes; accepts both `Ref` and `ComputedRef`.
 */
export function useMarkdownPreview(sourceText: Ref<string> | ComputedRef<string>) {
  const markdownBlockList = computed(() => parseMarkdownBlockList(toValue(sourceText)))

  return {
    markdownBlockList,
  }
}
