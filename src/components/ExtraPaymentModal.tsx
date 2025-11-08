import { useState } from 'react';
import { Zap, TrendingDown } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

interface Loan {
  id: string;
  name: string;
  remaining: number;
  monthlyPayment: number;
  interestRate: number;
}

interface ExtraPaymentModalProps {
  loan: Loan;
  onClose: () => void;
}

export function ExtraPaymentModal({ loan, onClose }: ExtraPaymentModalProps) {
  const [extraAmount, setExtraAmount] = useState<string>('');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-KZ').format(amount) + ' ₸';
  };

  // Simple calculation for months saved (this is a simplified version)
  const calculateMonthsSaved = () => {
    if (!extraAmount || parseFloat(extraAmount) <= 0) return 0;
    
    const extra = parseFloat(extraAmount);
    const monthlyRate = loan.interestRate / 100 / 12;
    
    // Simplified calculation: extra payment / monthly payment
    const monthsSaved = Math.floor(extra / loan.monthlyPayment);
    
    return Math.max(1, Math.min(monthsSaved, 12)); // Cap between 1-12 for demo
  };

  const monthsSaved = calculateMonthsSaved();

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-green-600" />
            Дополнительный платёж
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div>
            <p className="text-gray-600 mb-1">Кредит</p>
            <p className="text-gray-900">{loan.name}</p>
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-2 block">
              Сумма дополнительного платежа (₸)
            </label>
            <Input
              type="number"
              placeholder="Введите сумму"
              value={extraAmount}
              onChange={(e) => setExtraAmount(e.target.value)}
              className="border-gray-300"
            />
          </div>

          {monthsSaved > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <TrendingDown className="w-5 h-5 text-green-700" />
                </div>
                <div className="flex-1">
                  <p className="text-green-900 mb-1">Ускорение выплаты</p>
                  <p className="text-green-700">
                    С этим платежом вы закроете кредит на{' '}
                    <span className="font-semibold">{monthsSaved} {monthsSaved === 1 ? 'месяц' : monthsSaved < 5 ? 'месяца' : 'месяцев'}</span>{' '}
                    раньше!
                  </p>
                  <p className="text-sm text-green-600 mt-2">
                    Экономия на процентах: ~{formatCurrency(monthsSaved * loan.monthlyPayment * 0.15)}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Текущий остаток</span>
              <span className="text-gray-900">{formatCurrency(loan.remaining)}</span>
            </div>
            {extraAmount && parseFloat(extraAmount) > 0 && (
              <>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Доп. платёж</span>
                  <span className="text-green-700">-{formatCurrency(parseFloat(extraAmount))}</span>
                </div>
                <div className="border-t border-gray-200 pt-2 flex justify-between">
                  <span className="text-gray-900">Новый остаток</span>
                  <span className="text-gray-900">{formatCurrency(loan.remaining - parseFloat(extraAmount))}</span>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1 border-gray-300"
            onClick={onClose}
          >
            Отмена
          </Button>
          <Button
            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            disabled={!extraAmount || parseFloat(extraAmount) <= 0}
          >
            Применить платёж
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
