
import React from 'react';
import type { InvoiceData } from '../types';
import { CheckIcon } from './Icons';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoiceData: InvoiceData;
  updateField: <K extends keyof InvoiceData>(field: K, value: InvoiceData[K]) => void;
}

const CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'CAD', symbol: 'CA$', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'GHS', symbol: 'GH₵', name: 'Ghanaian Cedi' },
];

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, invoiceData, updateField }) => {
  if (!isOpen) return null;

  const handleCurrencyChange = (code: string) => {
    const currency = CURRENCIES.find(c => c.code === code);
    if (currency) {
      updateField('currency', code);
      updateField('currencySymbol', currency.symbol);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm print:hidden">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="bg-brand-blue px-6 py-4 flex justify-between items-center">
          <h3 className="text-xl font-bold text-white">Settings</h3>
          <button onClick={onClose} className="text-blue-200 hover:text-white text-2xl">&times;</button>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Currency Selector */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Currency</label>
            <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto pr-1">
              {CURRENCIES.map((curr) => (
                <button
                  key={curr.code}
                  onClick={() => handleCurrencyChange(curr.code)}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg border transition-all ${
                    invoiceData.currency === curr.code
                      ? 'border-brand-blue bg-blue-50 text-brand-blue'
                      : 'border-gray-200 hover:border-brand-blue hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full font-bold text-gray-700">
                      {curr.symbol}
                    </span>
                    <div className="text-left">
                        <p className="font-semibold">{curr.code}</p>
                        <p className="text-xs text-gray-500">{curr.name}</p>
                    </div>
                  </div>
                  {invoiceData.currency === curr.code && <span className="text-brand-blue"><CheckIcon /></span>}
                </button>
              ))}
            </div>
          </div>
          
          {/* Default Tax Rate */}
           <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Default Tax Rate (%)</label>
            <input 
                type="number" 
                value={invoiceData.taxRate}
                onChange={(e) => updateField('taxRate', Number(e.target.value))}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-blue focus:border-brand-blue sm:text-sm bg-white text-gray-900"
            />
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4 flex justify-end">
          <button
            onClick={onClose}
            className="bg-brand-blue hover:bg-blue-900 text-white font-bold py-2 px-6 rounded-lg transition duration-200 shadow-sm"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
