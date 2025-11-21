
import React from 'react';
import type { InvoiceData } from '../types';

interface InvoicePreviewProps {
    invoiceData: InvoiceData;
    calculatedValues: {
        subtotal: number;
        taxAmount: number;
        grandTotal: number;
    }
}

const YourCompanyInfo = {
    name: "DTech Softwares",
    address: "789 Tech Avenue, Silicon Valley, CA 94043",
    email: "contact@dtechsoftwares.com",
    phone: "+1 (555) 123-4567",
    website: "www.dtechsoftwares.com",
};

const bankDetails = {
    bankName: "Global Tech Bank",
    accountHolder: "DTech Softwares LLC",
    accountNumber: "123-456-7890",
    swiftCode: "GTBUSB33",
};

const InvoicePreview: React.FC<InvoicePreviewProps> = ({ invoiceData, calculatedValues }) => {
    const { logo, clientInfo, projectInfo, issueDate, dueDate, lineItems, currencySymbol } = invoiceData;
    const { subtotal, taxAmount, grandTotal } = calculatedValues;

    return (
        <div id="invoice-preview" className="bg-white p-8 md:p-12 rounded-lg shadow-lg relative overflow-hidden print:overflow-visible print:shadow-none print:rounded-none print:p-10 print:w-full print:max-w-none">
            {/* Watermark Layer */}
            <div 
                className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none"
                style={{ opacity: invoiceData.watermarkOpacity / 100 }}
            >
                {invoiceData.watermarkType === 'text' ? (
                    <p className="text-gray-900 text-[120px] md:text-[180px] font-black uppercase transform -rotate-45 select-none whitespace-nowrap">
                        {invoiceData.watermarkText}
                    </p>
                ) : invoiceData.watermarkImage ? (
                    <img 
                        src={invoiceData.watermarkImage} 
                        alt="Watermark" 
                        className="w-3/4 h-auto object-contain transform -rotate-45"
                    />
                ) : null}
            </div>
            
            {/* Content Layer */}
            <div className="relative z-10">
                {/* Header */}
                <header className="flex justify-between items-start pb-8 border-b-2 border-gray-100">
                    <div className="w-2/3">
                        {logo ? (
                            <img src={logo} alt="Company Logo" className="w-32 h-auto mb-4" />
                        ) : (
                            <div className="w-32 h-16 bg-gray-200 flex items-center justify-center text-gray-400 rounded-md mb-4 print:hidden">
                                Logo
                            </div>
                        )}
                        <h1 className="text-2xl font-bold text-brand-blue">{YourCompanyInfo.name}</h1>
                        <p className="text-gray-500 text-sm">{YourCompanyInfo.address}</p>
                        <p className="text-gray-500 text-sm">{YourCompanyInfo.email} | {YourCompanyInfo.phone}</p>
                    </div>
                    <div className="text-right">
                        <h2 className="text-4xl font-bold text-gray-700 uppercase">Invoice</h2>
                        <p className="text-gray-500 mt-2"># {projectInfo.invoiceNumber}</p>
                    </div>
                </header>

                {/* Client and Date Info */}
                <section className="grid grid-cols-2 gap-8 my-8">
                    <div>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Bill To</h3>
                        <p className="font-bold text-gray-800">{clientInfo.companyName || 'Client Company'}</p>
                        <p className="text-gray-600">{clientInfo.contactPerson || 'Contact Person'}</p>
                        <p className="text-gray-600">{clientInfo.address || 'Client Address'}</p>
                        <p className="text-gray-600">{clientInfo.email || 'client@email.com'}</p>
                    </div>
                    <div className="text-right">
                        <div className="mb-4">
                            <p className="text-sm font-semibold text-gray-500">Issue Date</p>
                            <p className="font-medium text-gray-800">{issueDate}</p>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-500">Due Date</p>
                            <p className="font-medium text-gray-800">{dueDate}</p>
                        </div>
                    </div>
                </section>
                
                <section className="my-8">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Project</h3>
                    <p className="font-bold text-gray-800">{projectInfo.projectName || 'Project Name'}</p>
                    <p className="text-gray-600 text-sm">{projectInfo.description || 'Project Description'}</p>
                </section>

                {/* Line Items Table */}
                <section>
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-brand-blue text-white print:bg-blue-900 print:text-white" style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}>
                                <th className="p-3 font-semibold uppercase text-sm w-1/2 rounded-l-md print:rounded-none">Description</th>
                                <th className="p-3 font-semibold uppercase text-sm text-center">Hours/Qty</th>
                                <th className="p-3 font-semibold uppercase text-sm text-right">Rate</th>
                                <th className="p-3 font-semibold uppercase text-sm text-right rounded-r-md print:rounded-none">Line Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lineItems.map((item, index) => (
                                <tr key={item.id} className="border-b border-gray-100">
                                    <td className="p-3">{item.description}</td>
                                    <td className="p-3 text-center">{item.quantity}</td>
                                    <td className="p-3 text-right">{currencySymbol}{item.rate.toFixed(2)}</td>
                                    <td className="p-3 text-right font-medium text-gray-800">{currencySymbol}{(item.quantity * item.rate).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

                {/* Totals Section */}
                <section className="flex justify-end mt-8">
                    <div className="w-full max-w-xs space-y-2">
                        <div className="flex justify-between text-gray-600">
                            <span>Subtotal</span>
                            <span>{currencySymbol}{subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Tax ({invoiceData.taxRate}%)</span>
                            <span>{currencySymbol}{taxAmount.toFixed(2)}</span>
                        </div>
                        {invoiceData.discount > 0 && (
                            <div className="flex justify-between text-gray-600">
                                <span>Discount</span>
                                <span>-{currencySymbol}{invoiceData.discount.toFixed(2)}</span>
                            </div>
                        )}
                        <div className="border-t border-gray-300 pt-2 mt-2"></div>
                        <div className="flex justify-between font-bold text-xl text-brand-orange print:text-orange-600" style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}>
                            <span>Grand Total</span>
                            <span>{currencySymbol}{grandTotal.toFixed(2)}</span>
                        </div>
                    </div>
                </section>

                {/* Payment Info */}
                <section className="mt-12 border-t-2 border-gray-100 pt-8">
                    <h3 className="text-md font-semibold text-gray-700 mb-2">Payment Details</h3>
                    <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-md print:bg-transparent print:p-0">
                        <p><strong>Bank:</strong> {bankDetails.bankName}</p>
                        <p><strong>Account Holder:</strong> {bankDetails.accountHolder}</p>
                        <p><strong>Account Number:</strong> {bankDetails.accountNumber}</p>
                        <p><strong>SWIFT/BIC:</strong> {bankDetails.swiftCode}</p>
                        <p className="mt-2">Accepted methods: Bank Transfer, PayPal, Wise.</p>
                    </div>
                </section>

                {/* Footer */}
                <footer className="mt-12 text-center text-sm text-gray-500">
                    <p className="font-semibold mb-2">Thank you for your business!</p>
                    <p>Terms & Conditions: 1.5% monthly interest on overdue invoices. All amounts are in {invoiceData.currency}.</p>
                    <p className="mt-4 font-bold">[Your Name], CEO, DTech Softwares</p>
                </footer>
            </div>
        </div>
    );
};

export default InvoicePreview;
