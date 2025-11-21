
import React from 'react';
import type { UseInvoiceReturn } from '../hooks/useInvoice';
import { TrashIcon, PlusIcon, UploadIcon } from './Icons';

type InvoiceFormProps = UseInvoiceReturn;

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <fieldset className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
    <legend className="text-lg font-semibold text-brand-blue mb-4 px-2">{title}</legend>
    <div className="space-y-4">
      {children}
    </div>
  </fieldset>
);

const FormInput: React.FC<{ label: string; type?: string; value: string | number; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder?: string; step?: string; min?: string; }> = 
  ({ label, type = 'text', value, onChange, placeholder, step, min }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        step={step}
        min={min}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm bg-white text-gray-900"
      />
    </div>
);

const InvoiceForm: React.FC<InvoiceFormProps> = ({
  invoiceData,
  updateField,
  updateClientInfo,
  updateProjectInfo,
  handleLineItemChange,
  addLineItem,
  removeLineItem,
  handleLogoUpload,
  handleWatermarkUpload
}) => {
  return (
    <form className="space-y-6">
      <Section title="Branding">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Company Logo</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md bg-white">
            <div className="space-y-1 text-center">
              <UploadIcon />
              <div className="flex text-sm text-gray-600">
                <label htmlFor="logo-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-brand-orange hover:text-orange-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-brand-blue">
                  <span>Upload a file</span>
                  <input id="logo-upload" name="logo-upload" type="file" className="sr-only" onChange={handleLogoUpload} accept="image/*" />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4 mt-4">
           <label className="block text-sm font-medium text-gray-700 mb-2">Watermark</label>
           <div className="flex items-center space-x-4 mb-4">
              <label className="inline-flex items-center">
                <input 
                  type="radio" 
                  className="form-radio text-brand-blue" 
                  name="watermarkType" 
                  checked={invoiceData.watermarkType === 'text'} 
                  onChange={() => updateField('watermarkType', 'text')} 
                />
                <span className="ml-2 text-sm text-gray-700">Text</span>
              </label>
              <label className="inline-flex items-center">
                <input 
                  type="radio" 
                  className="form-radio text-brand-blue" 
                  name="watermarkType" 
                  checked={invoiceData.watermarkType === 'image'} 
                  onChange={() => updateField('watermarkType', 'image')} 
                />
                <span className="ml-2 text-sm text-gray-700">Image</span>
              </label>
           </div>

           {invoiceData.watermarkType === 'text' ? (
             <FormInput 
               label="Watermark Text" 
               value={invoiceData.watermarkText} 
               onChange={e => updateField('watermarkText', e.target.value)} 
               placeholder="DTECH" 
             />
           ) : (
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Watermark Image</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md bg-white">
                  <div className="space-y-1 text-center">
                    <UploadIcon />
                    <div className="flex text-sm text-gray-600">
                      <label htmlFor="watermark-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-brand-orange hover:text-orange-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-brand-blue">
                        <span>Upload a file</span>
                        <input id="watermark-upload" name="watermark-upload" type="file" className="sr-only" onChange={handleWatermarkUpload} accept="image/*" />
                      </label>
                    </div>
                  </div>
                </div>
             </div>
           )}

           <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Opacity: {invoiceData.watermarkOpacity}%
              </label>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={invoiceData.watermarkOpacity} 
                onChange={e => updateField('watermarkOpacity', Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-blue"
              />
           </div>
        </div>
      </Section>
      
      <Section title="Client Information">
        <FormInput label="Company Name" value={invoiceData.clientInfo.companyName} onChange={e => updateClientInfo('companyName', e.target.value)} placeholder="Client Co." />
        <FormInput label="Contact Person" value={invoiceData.clientInfo.contactPerson} onChange={e => updateClientInfo('contactPerson', e.target.value)} placeholder="Jane Doe" />
        <FormInput label="Address" value={invoiceData.clientInfo.address} onChange={e => updateClientInfo('address', e.target.value)} placeholder="123 Main St, City" />
        <FormInput label="Email" type="email" value={invoiceData.clientInfo.email} onChange={e => updateClientInfo('email', e.target.value)} placeholder="client@example.com" />
      </Section>

      <Section title="Project & Invoice Details">
        <FormInput label="Invoice Number" value={invoiceData.projectInfo.invoiceNumber} onChange={e => updateProjectInfo('invoiceNumber', e.target.value)} placeholder="INV-001" />
        <FormInput label="Project Name" value={invoiceData.projectInfo.projectName} onChange={e => updateProjectInfo('projectName', e.target.value)} placeholder="Website Redesign" />
        <FormInput label="Project Description" value={invoiceData.projectInfo.description} onChange={e => updateProjectInfo('description', e.target.value)} placeholder="Description of services" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormInput label="Issue Date" type="date" value={invoiceData.issueDate} onChange={e => updateField('issueDate', e.target.value)} />
          <FormInput label="Due Date" type="date" value={invoiceData.dueDate} onChange={e => updateField('dueDate', e.target.value)} />
        </div>
      </Section>

      <Section title="Line Items">
        {invoiceData.lineItems.map((item, index) => (
          <div key={item.id} className="grid grid-cols-12 gap-2 p-3 bg-gray-50 rounded-md border">
            <div className="col-span-12 sm:col-span-5">
              <label className="block text-xs font-medium text-gray-600">Description</label>
              <input type="text" value={item.description} onChange={e => handleLineItemChange(index, 'description', e.target.value)} placeholder="Service description" className="w-full block px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-brand-blue focus:border-brand-blue sm:text-sm bg-white text-gray-900" />
            </div>
            <div className="col-span-6 sm:col-span-2">
              <label className="block text-xs font-medium text-gray-600">Hrs/Qty</label>
              <input type="number" value={item.quantity} onChange={e => handleLineItemChange(index, 'quantity', e.target.value)} className="w-full block px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-brand-blue focus:border-brand-blue sm:text-sm bg-white text-gray-900" min="0" />
            </div>
            <div className="col-span-6 sm:col-span-2">
              <label className="block text-xs font-medium text-gray-600">Rate</label>
              <input type="number" value={item.rate} onChange={e => handleLineItemChange(index, 'rate', e.target.value)} className="w-full block px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-brand-blue focus:border-brand-blue sm:text-sm bg-white text-gray-900" min="0" />
            </div>
            <div className="col-span-10 sm:col-span-2 flex items-end">
              <p className="w-full text-right text-gray-700 font-medium">{invoiceData.currencySymbol}{(item.quantity * item.rate).toFixed(2)}</p>
            </div>
            <div className="col-span-2 sm:col-span-1 flex items-end">
              <button type="button" onClick={() => removeLineItem(index)} className="text-red-500 hover:text-red-700">
                <TrashIcon />
              </button>
            </div>
          </div>
        ))}
        <button type="button" onClick={addLineItem} className="flex items-center gap-2 w-full justify-center text-sm font-semibold text-brand-blue border-2 border-brand-blue rounded-lg py-2 hover:bg-brand-blue hover:text-white transition duration-200">
          <PlusIcon />
          Add Item
        </button>
      </Section>

      <Section title="Totals">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormInput label="Tax Rate (%)" type="number" value={invoiceData.taxRate} onChange={e => updateField('taxRate', Number(e.target.value))} min="0" />
          <FormInput label={`Discount (${invoiceData.currencySymbol})`} type="number" value={invoiceData.discount} onChange={e => updateField('discount', Number(e.target.value))} min="0" />
        </div>
      </Section>
    </form>
  );
};
export default InvoiceForm;
