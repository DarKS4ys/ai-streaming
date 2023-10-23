'use client';

import { useChat } from 'ai/react';
import { useEffect, useRef } from 'react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const adjustRows = () => {
      if (textareaRef.current) {
        const currentTextarea = textareaRef.current;
        currentTextarea.style.height = 'auto'; // Reset the height
        currentTextarea.style.height = currentTextarea.scrollHeight + 'px';
        if (currentTextarea.scrollHeight >= 200) {
          currentTextarea.style.overflowY = 'auto'; // Add a scrollbar when the height is at least 200px
        } else {
          currentTextarea.style.overflowY = 'hidden'; // Remove the scrollbar when the height is less than 200px
        }
      }
    };

    if (textareaRef.current) {
      textareaRef.current.addEventListener('input', adjustRows);
      adjustRows();
    }
  }, []);

  return (
    <main className="w-full h-screen p-12 flex flex-col items-center justify-end">
      <div className='max-w-[50rem] w-full flex flex-col items-center'>
        <section className="mb-auto">
          {messages.map(m => (
            <div className="mb-4" key={m.id}>
              {m.role === 'user' ? 'User: ' : 'AI: '}
              {m.content}
            </div>
          ))}
        </section>
        <form className="flex gap-2 w-full" onSubmit={handleSubmit}>
          <textarea
            ref={textareaRef}
            className="flex rounded-md p-4 text-black w-full outline-none border resize-none max-h-[200px]"
            value={input}
            onChange={handleInputChange}
            placeholder="Say something..."
            rows={1}
          />
          <button
            className="border border- p-4 rounded-md"
            type="submit"
          >
            Send
          </button>
        </form>
      </div>
    </main>
  );
}