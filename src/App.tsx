import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { LoanDetails } from './components/LoanDetails';
import { Expenses } from './components/Expenses';
import { Learning } from './components/Learning';
import { Navigation } from './components/Navigation';
import { AIChatButton } from './components/AIChatButton';

type Page = 'dashboard' | 'loan-details' | 'expenses' | 'learning';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [selectedLoanId, setSelectedLoanId] = useState<string | null>(null);

  const handleViewLoanDetails = (loanId: string) => {
    setSelectedLoanId(loanId);
    setCurrentPage('loan-details');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      
      <main className="max-w-[1400px] mx-auto px-8 py-8">
        {currentPage === 'dashboard' && (
          <Dashboard onViewLoanDetails={handleViewLoanDetails} />
        )}
        {currentPage === 'loan-details' && (
          <LoanDetails loanId={selectedLoanId} onBack={() => setCurrentPage('dashboard')} />
        )}
        {currentPage === 'expenses' && <Expenses />}
        {currentPage === 'learning' && <Learning />}
      </main>

      <AIChatButton />
    </div>
  );
}
