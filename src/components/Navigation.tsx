import { LayoutDashboard, Wallet, TrendingDown, BookOpen } from 'lucide-react';

type Page = 'dashboard' | 'loan-details' | 'expenses' | 'learning';

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const navItems = [
    { id: 'dashboard' as Page, label: 'Главная панель', icon: LayoutDashboard },
    { id: 'expenses' as Page, label: 'Расходы', icon: TrendingDown },
    { id: 'learning' as Page, label: 'Обучение', icon: BookOpen },
  ];

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Wallet className="w-8 h-8 text-blue-600" />
            <span className="text-blue-900">FinTrack KZ</span>
          </div>
          
          <div className="flex gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-gray-500 text-sm">Пользователь</div>
              <div className="text-gray-900">Айгуль К.</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
              АК
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
