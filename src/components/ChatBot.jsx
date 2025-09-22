

import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send } from 'lucide-react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [pop, setPop] = useState(false);
  const [messages, setMessages] = useState([
    { text: 'Hello 👋 How can I help you?', sender: 'bot' }
  ]);
  const [inputText, setInputText] = useState('');
  const chatRef = useRef(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setPop(true);
    setTimeout(() => setPop(false), 150);
  };

  const handleSend = () => {
    if (inputText.trim()) {
      setMessages([...messages, { text: inputText, sender: 'user' }]);
      setInputText('');
      // Simulated bot reply
      setTimeout(() => {
        setMessages(prev => [...prev, { text: "I'm just a demo bot 🤖", sender: 'bot' }]);
      }, 800);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatRef.current && !chatRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div style={styles.container} ref={chatRef}>
      {isOpen && (
        <div style={styles.chatBoxWrapper}>
          <div style={styles.chatBox}>
            <div style={styles.header}>Chat with us!</div>
            <div style={styles.messages}>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  style={{
                    ...styles.messageBubble,
                    alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                    backgroundColor: msg.sender === 'user' ? '#e64f0a' : '#f0f0f0',
                    color: msg.sender === 'user' ? '#fff' : '#000',
                  }}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <div style={styles.inputContainer}>
              <input
                style={styles.input}
                placeholder="Type your message..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button style={styles.sendButton} onClick={handleSend}>
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={toggleChat}
        style={{
          ...styles.chatButton,
          ...(pop ? styles.pop : {}),
        }}
        className="chat-button"
      >
        <MessageSquare />
      </button>
    </div>
  );
};

const styles = {
  container: {
    position: 'fixed',
    bottom: '15px',
    right: '20px',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end', // ensures right alignment
  },
  chatBoxWrapper: {
    marginBottom: '10px', // space between chatbox and button
  },
  chatBox: {
    width: '350px',
    height: '450px',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    backgroundColor: 'rgb(96, 28, 15)',
    color: '#fff',
    padding: '10px',
    fontWeight: 'bold',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
  },
  messages: {
    flex: 1,
    padding: '10px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  messageBubble: {
    maxWidth: '70%',
    padding: '8px 12px',
    borderRadius: '16px',
    fontSize: '14px',
  },
  inputContainer: {
    display: 'flex',
    borderTop: '1px solid #ccc',
  },
  input: {
    flex: 1,
    border: 'none',
    padding: '10px',
    outline: 'none',
    fontSize: '14px',
  },
  sendButton: {
    background: 'none',
    border: 'none',
    padding: '10px',
    cursor: 'pointer',
    color: 'rgb(96, 28, 15)',
  },
  chatButton: {
    backgroundColor: '#e64f0a',
    color: '#fff',
    borderRadius: '50%',
    border: 'none',
    padding: '23px',
    cursor: 'pointer',
    boxShadow: '0 6px 12px rgba(74, 46, 46, 0.2)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  pop: {
    transform: 'scale(1.3)',
  },
};

export default ChatBot;
