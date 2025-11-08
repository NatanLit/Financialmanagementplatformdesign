import { useState } from 'react';
import { ArrowLeft, Calculator } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Progress } from './ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface LoanDetailsProps {
  loanId: string | null;
  onBack: () => void;
}

export function LoanDetails({ loanId, onBack }: LoanDetailsProps) {
  const [extraPayment, setExtraPayment] = useState<string>('');

  // Mock loan data
  const loan = {
    id: loanId,
    name: 'Ипотека - Квартира в Алматы',
    totalAmount: 15000000,
    remaining: 12500000,
    paid: 2500000,
    interestRate: 12.5,
    termMonths: 120,
    monthlyPayment: 150000,
    startDate: '2023-01-15',
  };

  const paidPercentage = (loan.paid / loan.totalAmount) * 100;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-KZ').format(amount) + ' ₸';
  };

  // Mock chart data for planned vs actual
  const chartData = [
    { month: 'Янв', planned: 150000, actual: 150000 },
    { month: 'Фев', planned: 150000, actual: 150000 },
    { month: 'Мар', planned: 150000, actual: 170000 },
    { month: 'Апр', planned: 150000, actual: 150000 },
    { month: 'Май', planned: 150000, actual: 200000 },
    { month: 'Июн', planned: 150000, actual: 150000 },
  ];

  const calculateMonthsSaved = () => {
    if (!extraPayment || parseFloat(extraPayment) <= 0) return 0;
    const extra = parseFloat(extraPayment);
    return Math.floor(extra / loan.monthlyPayment);
  };

  const monthsSaved = calculateMonthsSaved();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={onBack}
          className="border-gray-300"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад
        </Button>
        <div>
          <h1 className="text-gray-900">{loan.name}</h1>
          <p className="text-gray-600 mt-1">Детальная информация о кредите</p>
        </div>
      </div>

      {/* Summary Grid */}
      <div className="grid grid-cols-4 gap-6">
        <Card className="p-6 border-gray-200">
          <div className="text-gray-600 mb-2 text-sm">Общая сумма</div>
          <div className="text-gray-900">{formatCurrency(loan.totalAmount)}</div>
        </Card>

        <Card className="p-6 border-gray-200">
          <div className="text-gray-600 mb-2 text-sm">Выплачено</div>
          <div className="text-green-700">{formatCurrency(loan.paid)}</div>
          <div className="text-sm text-gray-500 mt-1">{paidPercentage.toFixed(1)}%</div>
        </Card>

        <Card className="p-6 border-gray-200">
          <div className="text-gray-600 mb-2 text-sm">Процентная ставка</div>
          <div className="text-gray-900">{loan.interestRate}%</div>
          <div className="text-sm text-gray-500 mt-1">Годовых</div>
        </Card>

        <Card className="p-6 border-gray-200">
          <div className="text-gray-600 mb-2 text-sm">Срок кредита</div>
          <div className="text-gray-900">{loan.termMonths} мес.</div>
          <div className="text-sm text-gray-500 mt-1">10 лет</div>
        </Card>
      </div>

      {/* Progress Section */}
      <Card className="p-6 border-gray-200">
        <h2 className="text-gray-900 mb-4">Прогресс выплаты</h2>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Погашено</span>
              <span className="text-gray-900">{paidPercentage.toFixed(1)}%</span>
            </div>
            <Progress value={paidPercentage} className="h-3" />
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-gray-600 text-sm mb-1">Выплачено</div>
              <div className="text-gray-900">{formatCurrency(loan.paid)}</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-blue-700 text-sm mb-1">Осталось</div>
              <div className="text-blue-900">{formatCurrency(loan.remaining)}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-gray-600 text-sm mb-1">Ежемесячно</div>
              <div className="text-gray-900">{formatCurrency(loan.monthlyPayment)}</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Chart: Planned vs Actual */}
      <Card className="p-6 border-gray-200">
        <h2 className="text-gray-900 mb-4">План vs Факт платежей</h2>
        
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px' 
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="planned" 
              stroke="#93c5fd" 
              strokeWidth={2}
              name="Плановый платёж"
            />
            <Line 
              type="monotone" 
              dataKey="actual" 
              stroke="#2563eb" 
              strokeWidth={2}
              name="Фактический платёж"
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* What-if Calculator */}
      <Card className="p-6 border-gray-200 bg-gradient-to-br from-blue-50 to-white">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <Calculator className="w-5 h-5 text-blue-700" />
          </div>
          <div>
            <h2 className="text-gray-900">Калькулятор "Что если?"</h2>
            <p className="text-gray-600 text-sm mt-1">
              Посмотрите, как дополнительный платёж ускорит выплату кредита
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="text-sm text-gray-700 mb-2 block">
              Сумма дополнительного платежа (₸)
            </label>
            <Input
              type="number"
              placeholder="Например: 500000"
              value={extraPayment}
              onChange={(e) => setExtraPayment(e.target.value)}
              className="border-gray-300 bg-white"
            />
          </div>

          {monthsSaved > 0 && (
            <div className="bg-white rounded-lg p-4 border-2 border-blue-200">
              <div className="text-blue-700 text-sm mb-1">Ускорение</div>
              <div className="text-blue-900 mb-1">
                {monthsSaved} {monthsSaved === 1 ? 'месяц' : monthsSaved < 5 ? 'месяца' : 'месяцев'}
              </div>
              <div className="text-sm text-gray-600">
                Экономия: ~{formatCurrency(monthsSaved * loan.monthlyPayment * 0.12)}
              </div>
            </div>
          )}
        </div>

        {monthsSaved > 0 && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 text-sm">
              💡 Совет: С платежом в {formatCurrency(parseFloat(extraPayment))} вы сократите срок кредита 
              примерно на {monthsSaved} месяцев и сэкономите на процентах!
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}
