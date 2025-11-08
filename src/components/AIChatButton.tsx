import { useState } from 'react';
import { MessageCircle, X, Maximize2, Send, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';

export function AIChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [message, setMessage] = useState('');

  const exampleMessages = [
    { id: 1, text: 'Как быстрее погасить кредит?', type: 'user' },
    { id: 2, text: 'Рекомендую увеличить ежемесячные платежи на 15-20%. Даже небольшие дополнительные взносы существенно сокращают общий срок кредита и экономят на процентах.', type: 'ai' },
    { id: 3, text: 'Какой кредит лучше закрыть первым?', type: 'user' },
    { id: 4, text: 'Обычно выгоднее сначала закрывать кредиты с наибольшей процентной ставкой. В вашем случае - это потребительский кредит с 18,5% годовых.', type: 'ai' },
  ];

  const suggestionButtons = [
    'Рассчитать досрочное погашение',
    'Советы по экономии',
    'Как снизить расходы',
  ];

  if (isFullScreen) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-200 p-4 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-gray-900">AI Финансовый Помощник</h2>
              <p className="text-sm text-gray-500">Всегда готов помочь</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFullScreen(false)}
            className="border-gray-300"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <div className="max-w-3xl mx-auto space-y-4">
            {exampleMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-lg rounded-lg p-4 ${
                    msg.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-gray-200 text-gray-900'
                  }`}
                >
                  {msg.type === 'ai' && (
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-blue-600">AI Assistant</span>
                    </div>
                  )}
                  <p className={msg.type === 'user' ? 'text-white' : 'text-gray-700'}>
                    {msg.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 p-4 bg-white">
          <div className="max-w-3xl mx-auto">
            <div className="flex gap-2 mb-3">
              {suggestionButtons.map((suggestion) => (
                <Button
                  key={suggestion}
                  variant="outline"
                  size="sm"
                  className="border-gray-300 text-sm"
                >
                  {suggestion}
                </Button>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Напишите ваш вопрос..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 border-gray-300"
              />
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center z-40"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Mini Chat Window */}
      {isOpen && !isFullScreen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-2xl z-40 flex flex-col border-gray-200">
          {/* Header */}
          <div className="border-b border-gray-200 p-4 flex items-center justify-between bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              <span>AI Помощник</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsFullScreen(true)}
                className="hover:bg-white/20 p-1 rounded transition-colors"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 p-1 rounded transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {exampleMessages.slice(0, 2).map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 text-sm ${
                    msg.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-gray-200 text-gray-900'
                  }`}
                >
                  {msg.type === 'ai' && (
                    <div className="flex items-center gap-1 mb-1">
                      <Sparkles className="w-3 h-3 text-blue-600" />
                      <span className="text-xs text-blue-600">AI</span>
                    </div>
                  )}
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Suggestions */}
          <div className="px-4 py-2 border-t border-gray-200 bg-white">
            <div className="flex flex-wrap gap-2 mb-2">
              {suggestionButtons.slice(0, 2).map((suggestion) => (
                <Button
                  key={suggestion}
                  variant="outline"
                  size="sm"
                  className="border-gray-300 text-xs"
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 p-3 bg-white rounded-b-lg">
            <div className="flex gap-2">
              <Input
                placeholder="Ваш вопрос..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 border-gray-300 text-sm"
              />
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
}
