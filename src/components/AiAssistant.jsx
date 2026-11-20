import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Sparkles } from 'lucide-react'
import { products } from '../data/products.js'

// Mirrors api/assistant.js's fallback so the widget works with zero setup
// in local dev, where Vite doesn't run the serverless function.
function localMatch(message) {
  const words = message
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter((w) => w.length > 2)

  const matches = products
    .filter((p) => {
      const haystack = `${p.vehicle} ${p.category} ${p.brand} ${p.name}`.toLowerCase()
      return words.some((word) => {
        const singular = word.endsWith('s') ? word.slice(0, -1) : word
        return haystack.includes(word) || haystack.includes(singular)
      })
    })
    .slice(0, 3)

  if (matches.length === 0) {
    return "Tell me your vehicle (e.g. Evo X, STI, JDM) and what you're after — turbo, brakes, suspension or exhaust — and I'll point you to the right part."
  }
  return (
    "Based on that, here's what fits:\n" +
    matches.map((p) => `• ${p.name} (${p.brand}) — LKR ${p.price.toLocaleString()}`).join('\n')
  )
}

export default function AiAssistant() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: "Hi! Tell me your vehicle and what you're building toward, and I'll match you to a part from our catalogue.",
    },
  ])
  const scrollRef = useRef(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, open])

  const send = async (e) => {
    e.preventDefault()
    const text = input.trim()
    if (!text || loading) return

    setMessages((prev) => [...prev, { role: 'user', text }])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, products }),
      })
      if (!res.ok) throw new Error('no serverless function in this environment')
      const data = await res.json()
      setMessages((prev) => [...prev, { role: 'assistant', text: data.reply }])
    } catch {
      // Expected in local `npm run dev` — Vite doesn't execute /api functions.
      setMessages((prev) => [...prev, { role: 'assistant', text: localMatch(text) }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="ai-widget">
      {open && (
        <div className="ai-panel">
          <div className="ai-panel-head">
            <span><Sparkles size={15} /> Fitment Assistant</span>
            <button onClick={() => setOpen(false)} aria-label="Close assistant"><X size={16} /></button>
          </div>
          <div className="ai-messages" ref={scrollRef}>
            {messages.map((m, i) => (
              <div className={`ai-msg ai-msg-${m.role}`} key={i}>
                {m.text.split('\n').map((line, j) => <div key={j}>{line}</div>)}
              </div>
            ))}
            {loading && <div className="ai-msg ai-msg-assistant ai-typing">Thinking…</div>}
          </div>
          <form className="ai-input-row" onSubmit={send}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. I have an Evo X, want more turbo response"
            />
            <button type="submit" aria-label="Send" disabled={loading}><Send size={15} /></button>
          </form>
        </div>
      )}
      <button className="ai-fab" onClick={() => setOpen((v) => !v)} aria-label="Open fitment assistant">
        {open ? <X size={20} /> : <MessageCircle size={20} />}
      </button>
    </div>
  )
}
