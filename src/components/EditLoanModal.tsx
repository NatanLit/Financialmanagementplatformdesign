import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent } from './ui/dialog';

interface Loan {
  id: string;
  name: string;
  totalAmount: number;
  remaining: number;
  monthlyPayment: number;
  interestRate: number;
}

interface EditLoanModalProps {
  loan: Loan;
  onClose: () => void;
  onSave: (loanData: any) => void;
}

export function EditLoanModal({ loan, onClose, onSave }: EditLoanModalProps) {
  const [loanName, setLoanName] = useState(loan.name);
  const [loanAmount, setLoanAmount] = useState(loan.totalAmount.toString());
  const [interestRate, setInterestRate] = useState(loan.interestRate.toString());
  const [monthlyPayment, setMonthlyPayment] = useState(loan.monthlyPayment.toString());
  const [termType, setTermType] = useState('месяцы');
  const [apr, setApr] = useState(loan.interestRate.toString());

  const handleSave = () => {
    onSave({
      id: loan.id,
      loanName,
      loanAmount,
      interestRate,
      monthlyPayment,
      termType,
      apr,
    });
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-lg p-0 gap-0">
        <div className="p-6 pb-0">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-gray-900">Изменить займ</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-700 mb-2 block">
                Название займа
              </label>
              <Input
                placeholder="Например: Ипотека"
                value={loanName}
                onChange={(e) => setLoanName(e.target.value)}
                className="border-blue-200 focus:border-blue-400"
              />
            </div>

            <div>
              <label className="text-sm text-gray-700 mb-2 block">
                Сумма займа
              </label>
              <Input
                type="number"
                placeholder="0"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                className="border-blue-200 focus:border-blue-400"
              />
            </div>

            <div>
              <label className="text-sm text-gray-700 mb-2 block">
                Годовая ставка (%)
              </label>
              <Input
                type="number"
                placeholder="0"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="border-blue-200 focus:border-blue-400"
              />
            </div>

            <div>
              <label className="text-sm text-gray-700 mb-2 block">
                Рекомендуемая ежемесячная оплата
              </label>
              <Input
                type="number"
                placeholder="0"
                value={monthlyPayment}
                onChange={(e) => setMonthlyPayment(e.target.value)}
                className="border-blue-200 focus:border-blue-400"
              />
            </div>

            <div>
              <label className="text-sm text-gray-700 mb-2 block">
                Срок выплаты
              </label>
              <Select value={termType} onValueChange={setTermType}>
                <SelectTrigger className="border-blue-200 focus:border-blue-400">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="месяцы">месяцы</SelectItem>
                  <SelectItem value="годы">годы</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm text-gray-700 mb-2 block">
                APR
              </label>
              <Input
                type="number"
                placeholder="0"
                value={apr}
                onChange={(e) => setApr(e.target.value)}
                className="border-blue-200 focus:border-blue-400"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3 p-6 bg-gray-50 rounded-b-2xl">
          <Button
            variant="outline"
            className="flex-1 border-gray-300 hover:bg-gray-100"
            onClick={onClose}
          >
            Отменить
          </Button>
          <Button
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleSave}
          >
            Сохранить изменения
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
