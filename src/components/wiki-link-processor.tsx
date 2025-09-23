"use client"

import { useCallback } from "react"

interface WikiLinkProcessorProps {
  content: string
  onLinkClick: (noteTitle: string) => void
}

export function WikiLinkProcessor({ content, onLinkClick }: WikiLinkProcessorProps) {
  const processWikiLinks = useCallback(
    (text: string) => {
      // Match [[note-title]] pattern
      const wikiLinkRegex = /\[\[([^\]]+)\]\]/g
      const parts = []
      let lastIndex = 0
      let match

      while ((match = wikiLinkRegex.exec(text)) !== null) {
        // Add text before the link
        if (match.index > lastIndex) {
          parts.push(text.slice(lastIndex, match.index))
        }

        // Add the clickable link
        const noteTitle = match[1]
        parts.push(
          <button
            key={match.index}
            onClick={() => onLinkClick(noteTitle)}
            className="text-blue-600 hover:text-blue-800 underline font-medium"
          >
            {noteTitle}
          </button>,
        )

        lastIndex = match.index + match[0].length
      }

      // Add remaining text
      if (lastIndex < text.length) {
        parts.push(text.slice(lastIndex))
      }

      return parts.length > 1 ? parts : text
    },
    [onLinkClick],
  )

  return <div>{processWikiLinks(content)}</div>
}
