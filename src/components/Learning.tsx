import { useState } from 'react';
import { MessageSquare, Video, FileText, ThumbsUp, MessageCircle, Calendar, Clock, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { CreatePostModal } from './CreatePostModal';

interface ForumPost {
  id: string;
  author: string;
  avatar: string;
  content: string;
  likes: number;
  comments: number;
  time: string;
}

interface EducationItem {
  id: string;
  title: string;
  type: 'masterclass' | 'live' | 'article';
  date?: string;
  duration?: string;
  participants?: number;
  description: string;
}

export function Learning() {
  const [expandedPost, setExpandedPost] = useState<string | null>(null);
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);

  // Mock forum posts
  const forumPosts: ForumPost[] = [
    {
      id: '1',
      author: 'Асем Нұрланова',
      avatar: 'АН',
      content: 'Поделюсь своим опытом: за 6 месяцев удалось погасить потребительский кредит на 2 года раньше! Главное - вносить даже небольшие дополнительные платежи каждый месяц. Экономия на процентах составила около 180 000 ₸!',
      likes: 24,
      comments: 8,
      time: '2 часа назад',
    },
    {
      id: '2',
      author: 'Ерлан Сапаров',
      avatar: 'ЕС',
      content: 'Вопрос: как лучше распределить дополнительные средства - закрыть мелкий кредит полностью или внести часть в ипотеку? У меня есть потребительский на 500К и ипотека на 10М.',
      likes: 15,
      comments: 12,
      time: '5 часов назад',
    },
    {
      id: '3',
      author: 'Динара Жумабаева',
      avatar: 'ДЖ',
      content: 'Начала отслеживать расходы через платформу - шок! Оказалось, на доставку еды трачу 60К в месяц. Сократила вдвое и теперь эти деньги идут на досрочное погашение кредита.',
      likes: 31,
      comments: 6,
      time: '1 день назад',
    },
  ];

  // Mock education items
  const masterclasses: EducationItem[] = [
    {
      id: 'm1',
      type: 'masterclass',
      title: 'Стратегии досрочного погашения кредитов',
      date: '15 ноября, 2025',
      duration: '90 минут',
      description: 'Узнайте, как эффективно планировать дополнительные платежи и сократить срок кредита.',
    },
    {
      id: 'm2',
      type: 'masterclass',
      title: 'Финансовая грамотность: основы управления долгами',
      date: '20 ноября, 2025',
      duration: '120 минут',
      description: 'Комплексный курс по управлению личными финансами и минимизации долговой нагрузки.',
    },
  ];

  const liveSessions: EducationItem[] = [
    {
      id: 'l1',
      type: 'live',
      title: 'Q&A с финансовым консультантом',
      date: '10 ноября, 18:00',
      participants: 234,
      description: 'Прямой эфир: задайте свои вопросы о кредитах, инвестициях и финансовом планировании.',
    },
    {
      id: 'l2',
      type: 'live',
      title: 'Разбор реальных кейсов: как выбраться из долгов',
      date: '12 ноября, 19:00',
      participants: 189,
      description: 'Анализ успешных историй погашения кредитов от участников сообщества.',
    },
  ];

  const articles: EducationItem[] = [
    {
      id: 'a1',
      type: 'article',
      title: '10 способов сократить ежемесячные расходы',
      description: 'Практические советы по оптимизации бюджета без снижения качества жизни.',
    },
    {
      id: 'a2',
      type: 'article',
      title: 'Как работает рефинансирование кредитов в Казахстане',
      description: 'Подробное руководство по рефинансированию: когда это выгодно и на что обратить внимание.',
    },
    {
      id: 'a3',
      type: 'article',
      title: 'Психология денег: почему мы тратим больше, чем планируем',
      description: 'Разбираем психологические ловушки и учимся принимать осознанные финансовые решения.',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-900">Обучение и сообщество</h1>
        <p className="text-gray-600 mt-1">Учитесь, делитесь опытом и развивайте финансовую грамотность</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Forum Section - Takes 2 columns */}
        <div className="col-span-2 space-y-4">
          <Card className="p-6 border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-gray-900 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                Форум сообщества
              </h2>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setIsCreatePostModalOpen(true)}>
                Создать пост
              </Button>
            </div>

            <div className="space-y-4">
              {forumPosts.map((post) => {
                const isExpanded = expandedPost === post.id;
                const preview = post.content.substring(0, 150);
                const needsExpansion = post.content.length > 150;

                return (
                  <div 
                    key={post.id}
                    className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 flex-shrink-0">
                        {post.avatar}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-gray-900">{post.author}</span>
                          <span className="text-sm text-gray-500">• {post.time}</span>
                        </div>

                        <p className="text-gray-700 mb-3">
                          {isExpanded ? post.content : preview}
                          {needsExpansion && !isExpanded && '...'}
                        </p>

                        {needsExpansion && (
                          <button
                            onClick={() => setExpandedPost(isExpanded ? null : post.id)}
                            className="text-blue-600 hover:text-blue-700 text-sm mb-3"
                          >
                            {isExpanded ? 'Свернуть' : 'Читать далее'}
                          </button>
                        )}

                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <button className="flex items-center gap-1 hover:text-blue-600">
                            <ThumbsUp className="w-4 h-4" />
                            {post.likes}
                          </button>
                          <button className="flex items-center gap-1 hover:text-blue-600">
                            <MessageCircle className="w-4 h-4" />
                            {post.comments}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Education Section - Takes 1 column */}
        <div>
          <Card className="p-6 border-gray-200">
            <h2 className="text-gray-900 mb-4">Образование</h2>

            <Tabs defaultValue="masterclasses" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="masterclasses" className="text-xs">
                  Курсы
                </TabsTrigger>
                <TabsTrigger value="live" className="text-xs">
                  Эфиры
                </TabsTrigger>
                <TabsTrigger value="articles" className="text-xs">
                  Статьи
                </TabsTrigger>
              </TabsList>

              <TabsContent value="masterclasses" className="space-y-3 mt-0">
                {masterclasses.map((item) => (
                  <div key={item.id} className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="flex items-start gap-2 mb-2">
                      <Video className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <h3 className="text-gray-900 text-sm leading-tight">{item.title}</h3>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                    
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {item.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {item.duration}
                      </span>
                    </div>

                    <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      Записаться
                    </Button>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="live" className="space-y-3 mt-0">
                {liveSessions.map((item) => (
                  <div key={item.id} className="p-4 bg-green-50 rounded-lg border border-green-100">
                    <div className="flex items-start gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 flex-shrink-0 animate-pulse" />
                      <h3 className="text-gray-900 text-sm leading-tight">{item.title}</h3>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                    
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {item.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {item.participants} участников
                      </span>
                    </div>

                    <Button size="sm" className="w-full bg-green-600 hover:bg-green-700 text-white">
                      Присоединиться
                    </Button>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="articles" className="space-y-3 mt-0">
                {articles.map((item) => (
                  <div key={item.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className="flex items-start gap-2 mb-2">
                      <FileText className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                      <h3 className="text-gray-900 text-sm leading-tight">{item.title}</h3>
                    </div>
                    
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>

      {/* Create Post Modal */}
      <CreatePostModal isOpen={isCreatePostModalOpen} onClose={() => setIsCreatePostModalOpen(false)} />
    </div>
  );
}