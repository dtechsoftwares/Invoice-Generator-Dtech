
export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

export interface ClientInfo {
  companyName: string;
  contactPerson: string;
  address: string;
  email: string;
}

export interface ProjectInfo {
  projectName: string;
  description: string;
  invoiceNumber: string;
}

export interface InvoiceData {
  logo: string | null;
  currency: string;
  currencySymbol: string;
  watermarkType: 'text' | 'image';
  watermarkText: string;
  watermarkImage: string | null;
  watermarkOpacity: number;
  clientInfo: ClientInfo;
  projectInfo: ProjectInfo;
  issueDate: string;
  dueDate: string;
  lineItems: LineItem[];
  taxRate: number;
  discount: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin';
}
