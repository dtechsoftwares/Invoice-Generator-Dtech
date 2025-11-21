
import React, { useState, useMemo } from 'react';
import type { InvoiceData, LineItem, ClientInfo, ProjectInfo } from '../types';

const getInitialDate = (offsetDays: number = 0): string => {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  return date.toISOString().split('T')[0];
};

const generateUUID = () => {
  // A simple and effective polyfill for crypto.randomUUID
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const INITIAL_DATA: InvoiceData = {
  logo: null,
  currency: 'USD',
  currencySymbol: '$',
  watermarkType: 'text',
  watermarkText: 'DTECH',
  watermarkImage: null,
  watermarkOpacity: 15,
  clientInfo: {
    companyName: '',
    contactPerson: '',
    address: '',
    email: '',
  },
  projectInfo: {
    projectName: '',
    description: '',
    invoiceNumber: '1',
  },
  issueDate: getInitialDate(),
  dueDate: getInitialDate(30),
  lineItems: [
    { id: generateUUID(), description: 'Software Development', quantity: 40, rate: 100 },
    { id: generateUUID(), description: 'UI/UX Design', quantity: 25, rate: 80 },
  ],
  taxRate: 5,
  discount: 0,
};

export interface UseInvoiceReturn {
  invoiceData: InvoiceData;
  updateField: <K extends keyof InvoiceData>(field: K, value: InvoiceData[K]) => void;
  updateClientInfo: (field: keyof ClientInfo, value: string) => void;
  updateProjectInfo: (field: keyof ProjectInfo, value: string) => void;
  handleLineItemChange: (index: number, field: keyof LineItem, value: string | number) => void;
  addLineItem: () => void;
  removeLineItem: (index: number) => void;
  handleLogoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleWatermarkUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  calculatedValues: {
    subtotal: number;
    taxAmount: number;
    grandTotal: number;
  };
}

export const useInvoice = (): UseInvoiceReturn => {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>(INITIAL_DATA);

  const updateField = <K extends keyof InvoiceData>(field: K, value: InvoiceData[K]) => {
    setInvoiceData(prev => ({ ...prev, [field]: value }));
  };
  
  const updateClientInfo = (field: keyof ClientInfo, value: string) => {
    setInvoiceData(prev => ({
        ...prev,
        clientInfo: { ...prev.clientInfo, [field]: value }
    }));
  };
  
  const updateProjectInfo = (field: keyof ProjectInfo, value: string) => {
    setInvoiceData(prev => ({
        ...prev,
        projectInfo: { ...prev.projectInfo, [field]: value }
    }));
  };

  const handleLineItemChange = (index: number, field: keyof LineItem, value: string | number) => {
    const updatedLineItems = invoiceData.lineItems.map((item, i) => {
        if (i === index) {
            return {
                ...item,
                [field]: field === 'description' ? value : (Number(value) || 0)
            };
        }
        return item;
    });
    updateField('lineItems', updatedLineItems);
  };

  const addLineItem = () => {
    const newItem: LineItem = { id: generateUUID(), description: '', quantity: 1, rate: 0 };
    updateField('lineItems', [...invoiceData.lineItems, newItem]);
  };

  const removeLineItem = (index: number) => {
    const updatedLineItems = invoiceData.lineItems.filter((_, i) => i !== index);
    updateField('lineItems', updatedLineItems);
  };
  
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateField('logo', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleWatermarkUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateField('watermarkImage', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const subtotal = useMemo(() => {
    return invoiceData.lineItems.reduce((acc, item) => acc + item.quantity * item.rate, 0);
  }, [invoiceData.lineItems]);

  const taxAmount = useMemo(() => {
    return (subtotal * invoiceData.taxRate) / 100;
  }, [subtotal, invoiceData.taxRate]);

  const grandTotal = useMemo(() => {
    return subtotal + taxAmount - invoiceData.discount;
  }, [subtotal, taxAmount, invoiceData.discount]);
  
  const calculatedValues = { subtotal, taxAmount, grandTotal };

  return {
    invoiceData,
    updateField,
    updateClientInfo,
    updateProjectInfo,
    handleLineItemChange,
    addLineItem,
    removeLineItem,
    handleLogoUpload,
    handleWatermarkUpload,
    calculatedValues
  };
};
