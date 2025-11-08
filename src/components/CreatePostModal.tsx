import { useState } from 'react';
import { X, Image } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent } from './ui/dialog';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreatePostModal({ isOpen, onClose }: CreatePostModalProps) {
  const [content, setContent] = useState('');

  const handlePost = () => {
    if (content.trim()) {
      // Handle post creation
      onClose();
      setContent('');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl p-0 gap-0">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-900">Создать пост</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 flex-shrink-0">
              АК
            </div>

            <div className="flex-1">
              <textarea
                placeholder="Что вы думаете о финансовой грамотности?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full min-h-[120px] p-3 border border-blue-200 rounded-xl resize-none focus:outline-none focus:border-blue-400 text-gray-900 placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <button className="flex items-center gap-2 text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors">
              <Image className="w-5 h-5" />
              <span className="text-sm">Прикрепить изображение</span>
            </button>

            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white px-6"
              onClick={handlePost}
              disabled={!content.trim()}
            >
              Опубликовать
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}