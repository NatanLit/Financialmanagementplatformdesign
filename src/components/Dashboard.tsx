import { useState } from 'react';
import { Plus, Edit, Trash2, CreditCard, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { CircularProgress } from './CircularProgress';
import { PaymentModal } from './PaymentModal';
import { ExtraPaymentModal } from './ExtraPaymentModal';
import { AddLoanModal } from './AddLoanModal';
import { EditLoanModal } from './EditLoanModal';

interface Loan {
  id: string;
  name: string;
  totalAmount: number;
  remaining: number;
  monthlyPayment: number;
  interestRate: number;
}

interface DashboardProps {
  onViewLoanDetails: (loanId: string) => void;
}

export function Dashboard({ onViewLoanDetails }: DashboardProps) {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showExtraModal, setShowExtraModal] = useState(false);
  const [showAddLoanModal, setShowAddLoanModal] = useState(false);
  const [showEditLoanModal, setShowEditLoanModal] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);

  // Mock data
  const loans: Loan[] = [
    {
      id: '1',
      name: 'Ипотека - Квартира в Алматы',
      totalAmount: 15000000,
      remaining: 12500000,
      monthlyPayment: 150000,
      interestRate: 12.5,
    },
    {
      id: '2',
      name: 'Автокредит - Toyota Camry',
      totalAmount: 5000000,
      remaining: 3200000,
      monthlyPayment: 85000,
      interestRate: 14.0,
    },
    {
      id: '3',
      name: 'Потребительский кредит',
      totalAmount: 1000000,
      remaining: 450000,
      monthlyPayment: 45000,
      interestRate: 18.5,
    },
  ];

  const totalLoans = loans.reduce((sum, loan) => sum + loan.totalAmount, 0);
  const totalRemaining = loans.reduce((sum, loan) => sum + loan.remaining, 0);
  const totalPaid = totalLoans - totalRemaining;
  const overallProgress = (totalPaid / totalLoans) * 100;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-KZ').format(amount) + ' ₸';
  };

  const handlePayMonthly = (loan: Loan) => {
    setSelectedLoan(loan);
    setShowPaymentModal(true);
  };

  const handleApplyExtra = (loan: Loan) => {
    setSelectedLoan(loan);
    setShowExtraModal(true);
  };

  const handleEditLoan = (loan: Loan) => {
    setSelectedLoan(loan);
    setShowEditLoanModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">Панель управления</h1>
          <p className="text-gray-600 mt-1">Обзор ваших финансов</p>
        </div>
        <Button 
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => setShowAddLoanModal(true)}
        >
          <Plus className="w-5 h-5 mr-2" />
          Добавить кредит
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-6">
        <Card className="p-6 border-gray-200">
          <div className="text-gray-600 mb-2">Общая сумма кредитов</div>
          <div className="text-gray-900">{formatCurrency(totalLoans)}</div>
          <div className="text-sm text-gray-500 mt-1">Первоначальная сумма</div>
        </Card>

        <Card className="p-6 border-gray-200">
          <div className="text-gray-600 mb-2">Осталось погасить</div>
          <div className="text-gray-900">{formatCurrency(totalRemaining)}</div>
          <div className="text-sm text-green-600 mt-1">
            Погашено: {formatCurrency(totalPaid)}
          </div>
        </Card>

        <Card className="p-6 border-gray-200">
          <div className="text-gray-600 mb-2">Общий прогресс</div>
          <div className="flex items-center gap-4 mt-4">
            <CircularProgress value={overallProgress} size={80} strokeWidth={8} />
            <div>
              <div className="text-gray-900">{overallProgress.toFixed(1)}%</div>
              <div className="text-sm text-gray-500">Выплачено</div>
            </div>
          </div>
        </Card>
      </div>

      {/* All Loans Section */}
      <div>
        <h2 className="text-gray-900 mb-4">Все кредиты</h2>
        <div className="space-y-4">
          {loans.map((loan) => {
            const progress = ((loan.totalAmount - loan.remaining) / loan.totalAmount) * 100;
            
            return (
              <Card key={loan.id} className="p-6 border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <CircularProgress value={progress} size={60} strokeWidth={6} />
                      
                      <div className="flex-1">
                        <h3 
                          className="text-gray-900 mb-1 cursor-pointer hover:text-blue-600"
                          onClick={() => onViewLoanDetails(loan.id)}
                        >
                          {loan.name}
                        </h3>
                        <div className="flex gap-6 text-sm">
                          <div>
                            <span className="text-gray-600">Общая сумма: </span>
                            <span className="text-gray-900">{formatCurrency(loan.totalAmount)}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Осталось: </span>
                            <span className="text-blue-700">{formatCurrency(loan.remaining)}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Ежемесячный платёж: </span>
                            <span className="text-gray-900">{formatCurrency(loan.monthlyPayment)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="border-gray-300" onClick={() => handleEditLoan(loan)}>
                      <Edit className="w-4 h-4 mr-1" />
                      Изменить
                    </Button>
                    <Button variant="outline" size="sm" className="border-gray-300 text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4 mr-1" />
                      Удалить
                    </Button>
                    <Button 
                      size="sm" 
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => handlePayMonthly(loan)}
                    >
                      <CreditCard className="w-4 h-4 mr-1" />
                      Оплатить месяц
                    </Button>
                    <Button 
                      size="sm" 
                      className="bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => handleApplyExtra(loan)}
                    >
                      <Zap className="w-4 h-4 mr-1" />
                      Доп. платёж
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Modals */}
      {showPaymentModal && selectedLoan && (
        <PaymentModal
          loan={selectedLoan}
          onClose={() => setShowPaymentModal(false)}
          onConfirm={() => {
            setShowPaymentModal(false);
            // Handle payment confirmation
          }}
        />
      )}

      {showExtraModal && selectedLoan && (
        <ExtraPaymentModal
          loan={selectedLoan}
          onClose={() => setShowExtraModal(false)}
        />
      )}

      {showAddLoanModal && (
        <AddLoanModal
          onClose={() => setShowAddLoanModal(false)}
          onSave={(newLoan) => {
            setShowAddLoanModal(false);
            // Handle adding new loan
          }}
        />
      )}

      {showEditLoanModal && selectedLoan && (
        <EditLoanModal
          loan={selectedLoan}
          onClose={() => setShowEditLoanModal(false)}
          onSave={(updatedLoan) => {
            setShowEditLoanModal(false);
            // Handle editing loan
          }}
        />
      )}
    </div>
  );
}