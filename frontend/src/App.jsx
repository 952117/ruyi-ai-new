import { useState } from 'react'

function App() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return
    setLoading(true)
    setMessages([...messages, { role: 'user', content: input }])
    
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])
    } catch (err) {
      console.error(err)
    }
    
    setInput('')
    setLoading(false)
  }

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h1>如意 AI</h1>
      <div style={{ border: '1px solid #ccc', height: 400, padding: 10, overflowY: 'auto' }}>
        {messages.map((m, i) => (
          <div key={i} style={{ margin: '10px 0', textAlign: m.role === 'user' ? 'right' : 'left' }}>
            <span style={{ background: m.role === 'user' ? '#007bff' : '#e9ecef', color: m.role === 'user' ? 'white' : 'black', padding: '8px 12px', borderRadius: 15, display: 'inline-block' }}>
              {m.content}
            </span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 10, display: 'flex' }}>
        <input 
          value={input} 
          onChange={e => setInput(e.target.value)} 
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          style={{ flex: 1, padding: 10, border: '1px solid #ccc', borderRadius: 4 }}
          placeholder="输入消息..."
        />
        <button onClick={sendMessage} disabled={loading} style={{ marginLeft: 10, padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', borderRadius: 4 }}>
          {loading ? '发送中...' : '发送'}
        </button>
      </div>
    </div>
  )
}

export default App
