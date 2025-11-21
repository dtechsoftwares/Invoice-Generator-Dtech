
import React, { useState } from 'react';
import { useInvoice } from './hooks/useInvoice';
import { useAuth } from './hooks/useAuth';
import InvoiceForm from './components/InvoiceForm';
import InvoicePreview from './components/InvoicePreview';
import { PrintIcon, SettingsIcon } from './components/Icons';
import { AuthForms } from './components/AuthForms';
import { SettingsModal } from './components/SettingsModal';

const App: React.FC = () => {
  const invoiceHook = useInvoice();
  const { isAuthenticated, user, login, register, logout, isLoading } = useAuth();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  if (isLoading) {
      return (
          <div className="min-h-screen flex items-center justify-center bg-gray-100">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue"></div>
          </div>
      );
  }

  if (!isAuthenticated) {
      return <AuthForms onLogin={login} onRegister={register} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 print:bg-white print:min-h-0">
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        invoiceData={invoiceHook.invoiceData} 
        updateField={invoiceHook.updateField}
      />

      <header className="bg-brand-blue text-white shadow-md print:hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold hidden sm:block">DTech Invoice</h1>
            <h1 className="text-2xl font-bold sm:hidden">DTech</h1>
            <span className="text-xs bg-blue-800 px-2 py-1 rounded-full text-blue-100">Admin: {user?.name}</span>
          </div>
          <div className="flex items-center gap-3">
            <button
                onClick={() => setIsSettingsOpen(true)}
                className="flex items-center gap-2 text-sm text-blue-200 hover:text-white transition px-3 py-2 rounded-lg hover:bg-blue-800"
                title="Settings"
            >
                <SettingsIcon />
                <span className="hidden sm:inline">Settings</span>
            </button>
             <button
                onClick={logout}
                className="text-sm text-blue-200 hover:text-white transition px-3"
            >
                Logout
            </button>
            <button
                onClick={handlePrint}
                className="flex items-center gap-2 bg-brand-orange hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
            >
                <PrintIcon />
                <span className="hidden sm:inline">Print PDF</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8 print:p-0 print:m-0 print:w-full print:max-w-none">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 print:block">
          <div className="lg:col-span-2 print:hidden">
            <InvoiceForm {...invoiceHook} />
          </div>
          <div className="lg:col-span-3 print:w-full">
            <div className="sticky top-8 print:static">
              <InvoicePreview invoiceData={invoiceHook.invoiceData} calculatedValues={invoiceHook.calculatedValues} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
