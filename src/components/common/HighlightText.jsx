import { getHighlightedParts } from '@utils/highlightText'

function HighlightText({ text, query, className }) {
  const parts = getHighlightedParts(text, query)

  return (
    <span className={className}>
      {parts.map((part, index) =>
        part.highlight ? (
          <mark
            key={index}
            className="rounded bg-primary-100 px-0.5 font-semibold text-primary-800"
          >
            {part.text}
          </mark>
        ) : (
          <span key={index}>{part.text}</span>
        ),
      )}
    </span>
  )
}

export default HighlightText
