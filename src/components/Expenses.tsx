import { useState } from 'react';
import { Plus, ShoppingBag, Car, GraduationCap, Home, Coffee, Smartphone, MoreHorizontal } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
}

const CATEGORIES = [
  { id: 'food', label: 'Еда', icon: ShoppingBag, color: '#3b82f6' },
  { id: 'transport', label: 'Транспорт', icon: Car, color: '#8b5cf6' },
  { id: 'education', label: 'Образование', icon: GraduationCap, color: '#10b981' },
  { id: 'housing', label: 'Жильё', icon: Home, color: '#f59e0b' },
  { id: 'entertainment', label: 'Развлечения', icon: Coffee, color: '#ec4899' },
  { id: 'tech', label: 'Технологии', icon: Smartphone, color: '#6366f1' },
  { id: 'other', label: 'Другое', icon: MoreHorizontal, color: '#6b7280' },
];

export function Expenses() {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [viewMode, setViewMode] = useState<'daily' | 'weekly' | 'monthly'>('monthly');

  // Mock expenses data
  const expenses: Expense[] = [
    { id: '1', amount: 15000, category: 'food', description: 'Продукты в магазине', date: '2025-11-07' },
    { id: '2', amount: 8000, category: 'transport', description: 'Бензин', date: '2025-11-06' },
    { id: '3', amount: 25000, category: 'education', description: 'Онлайн курс', date: '2025-11-05' },
    { id: '4', amount: 12000, category: 'food', description: 'Ресторан', date: '2025-11-04' },
    { id: '5', amount: 5000, category: 'entertainment', description: 'Кино', date: '2025-11-03' },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-KZ').format(amount) + ' ₸';
  };

  // Calculate totals by category
  const categoryTotals = CATEGORIES.map(cat => {
    const total = expenses
      .filter(exp => exp.category === cat.id)
      .reduce((sum, exp) => sum + exp.amount, 0);
    return {
      name: cat.label,
      value: total,
      color: cat.color,
    };
  }).filter(cat => cat.value > 0);

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  // Mock bar chart data
  const barChartData = [
    { period: 'Пн', amount: 8500 },
    { period: 'Вт', amount: 12000 },
    { period: 'Ср', amount: 5400 },
    { period: 'Чт', amount: 15600 },
    { period: 'Пт', amount: 9800 },
    { period: 'Сб', amount: 18200 },
    { period: 'Вс', amount: 6300 },
  ];

  const handleAddExpense = () => {
    if (!amount || !category) return;
    // Handle adding expense
    setAmount('');
    setCategory('');
    setDescription('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-900">Расходы</h1>
        <p className="text-gray-600 mt-1">Отслеживайте свои траты и анализируйте привычки</p>
      </div>

      {/* Add Expense Card */}
      <Card className="p-6 border-gray-200">
        <h2 className="text-gray-900 mb-4">Добавить расход</h2>
        
        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className="text-sm text-gray-700 mb-2 block">Сумма (₸)</label>
            <Input
              type="number"
              placeholder="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border-gray-300"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700 mb-2 block">Категория</label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="border-gray-300">
                <SelectValue placeholder="Выберите" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map(cat => (
                  <SelectItem key={cat.id} value={cat.id}>
                    <div className="flex items-center gap-2">
                      <cat.icon className="w-4 h-4" style={{ color: cat.color }} />
                      {cat.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="col-span-2">
            <label className="text-sm text-gray-700 mb-2 block">Описание (опционально)</label>
            <div className="flex gap-2">
              <Input
                placeholder="Например: Покупка продуктов"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border-gray-300 flex-1"
              />
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={handleAddExpense}
              >
                <Plus className="w-4 h-4 mr-2" />
                Добавить
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Summary and Charts Grid */}
      <div className="grid grid-cols-2 gap-6">
        {/* Pie Chart */}
        <Card className="p-6 border-gray-200 bg-[rgb(255,255,255)]">
          <h2 className="text-gray-900 mb-4">Расходы по категориям</h2>
          
          <div className="relative">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={categoryTotals}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  innerRadius={70}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  paddingAngle={2}
                >
                  {categoryTotals.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Center label */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <div className="text-gray-500 text-sm mb-1">Общие расходы</div>
                <div className="text-gray-900">{formatCurrency(totalExpenses)}</div>
              </div>
            </div>
          </div>

          <div className="space-y-2 mt-2">
            {categoryTotals.map((cat) => {
              const percentage = (cat.value / totalExpenses) * 100;
              return (
                <div key={cat.name} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <div 
                    className="w-4 h-4 rounded-sm flex-shrink-0" 
                    style={{ backgroundColor: cat.color }}
                  />
                  <span className="text-gray-700 flex-1">{cat.name}</span>
                  <span className="text-gray-900">{formatCurrency(cat.value)}</span>
                  <span className="text-gray-500 text-sm w-12 text-right">{percentage.toFixed(0)}%</span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Bar Chart */}
        <Card className="p-6 border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-900">Динамика расходов</h2>
            
            <div className="flex gap-2">
              {(['daily', 'weekly', 'monthly'] as const).map((mode) => (
                <Button
                  key={mode}
                  variant={viewMode === mode ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode(mode)}
                  className={viewMode === mode ? 'bg-blue-600 text-white' : 'border-gray-300'}
                >
                  {mode === 'daily' ? 'День' : mode === 'weekly' ? 'Неделя' : 'Месяц'}
                </Button>
              ))}
            </div>
          </div>

          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="period" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                formatter={(value: number) => formatCurrency(value)}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px' 
                }}
              />
              <Bar dataKey="amount" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Recent Expenses */}
      <Card className="p-6 border-gray-200">
        <h2 className="text-gray-900 mb-4">История расходов</h2>
        
        <div className="space-y-3">
          {expenses.map((expense) => {
            const category = CATEGORIES.find(c => c.id === expense.category);
            const Icon = category?.icon || MoreHorizontal;
            
            return (
              <div 
                key={expense.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${category?.color}20` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: category?.color }} />
                  </div>
                  
                  <div>
                    <div className="text-gray-900">{expense.description}</div>
                    <div className="text-sm text-gray-500">{category?.label} • {expense.date}</div>
                  </div>
                </div>

                <div className="text-gray-900">{formatCurrency(expense.amount)}</div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}