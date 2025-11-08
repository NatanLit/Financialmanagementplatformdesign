import { CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

interface Loan {
  id: string;
  name: string;
  monthlyPayment: number;
}

interface PaymentModalProps {
  loan: Loan;
  onClose: () => void;
  onConfirm: () => void;
}

export function PaymentModal({ loan, onClose, onConfirm }: PaymentModalProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-KZ').format(amount) + ' ₸';
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Подтверждение платежа</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-600 mb-2">Вы собираетесь оплатить ежемесячный платёж по кредиту:</p>
            <p className="text-gray-900 mb-4">{loan.name}</p>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="text-gray-600 text-sm mb-1">Сумма платежа</div>
              <div className="text-gray-900">{formatCurrency(loan.monthlyPayment)}</div>
            </div>

            <p className="text-sm text-gray-500">
              После подтверждения средства будут списаны с вашего счёта
            </p>
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
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            onClick={onConfirm}
          >
            Подтвердить платёж
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
