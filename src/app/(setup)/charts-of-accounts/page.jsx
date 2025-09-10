"use client";
import React, { useState } from "react";
import { Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import styles from "./chartsOfAccounts.module.css";

const initialTableData = [
  {
    id: 1523,
    coaId: "1523",
    accountCode: "2001",
    accountType: "Liability",
    accountDescription: "Bank Charges Payable A/c",
    bank: "Meezan",
    accountNo: "44444444444444444444",
    currency: "PKR",
    openingBalance: "0",
    createdBy: "100201",
    createdDate: "7/24/2023 12:20:01 PM",
    modifiedBy: "0",
    status: "Approved"
  },
  {
    id: 1524,
    coaId: "1524",
    accountCode: "2002",
    accountType: "Asset",
    accountDescription: "Cash Account",
    bank: "HBL",
    accountNo: "33333333333333333333",
    currency: "PKR",
    openingBalance: "50000",
    createdBy: "100201",
    createdDate: "7/24/2023 12:20:01 PM",
    modifiedBy: "0",
    status: "Approved"
  },
  {
    id: 1525,
    coaId: "1525",
    accountCode: "2003",
    accountType: "Liability",
    accountDescription: "Accounts Payable",
    bank: "NBP",
    accountNo: "55555555555555555555",
    currency: "PKR",
    openingBalance: "25000",
    createdBy: "100201",
    createdDate: "7/24/2023 12:20:01 PM",
    modifiedBy: "0",
    status: "Pending"
  }
];

const bankOptions = [
  { value: "Meezan", label: "Meezan" },
  { value: "HBL", label: "HBL" },
  { value: "NBP", label: "NBP" },
  { value: "UBL", label: "UBL" },
  { value: "MCB", label: "MCB" },
  { value: "Standard Chartered", label: "Standard Chartered" }
];

const currencyOptions = [
  { value: "PKR", label: "PKR" },
  { value: "USD", label: "USD" },
  { value: "EUR", label: "EUR" },
  { value: "GBP", label: "GBP" }
];

const accountCategoryOptions = [
  { value: "Assets", label: "Assets" },
  { value: "Liabilities", label: "Liabilities" },
  { value: "Equity", label: "Equity" },
  { value: "Revenue", label: "Revenue" },
  { value: "Expenses", label: "Expenses" }
];

export default function ChartsOfAccountsPage() {
  const [tableData, setTableData] = useState(initialTableData);
  
  // Calculate next GL Account Code
  const getNextGLAccountCode = () => {
    const maxCode = Math.max(...initialTableData.map(item => parseInt(item.accountCode))) + 1;
    return maxCode.toString();
  };
  
  const [formData, setFormData] = useState({
    accountType: "Balance Sheet",
    glAccountCode: getNextGLAccountCode(),
    accountCategory: "Assets",
    accountDescription: "e-Agri Bank Account",
    bank: "Meezan",
    ibanBankAccountNo: "PK89 ---- ----- ----- ----",
    currency: "PKR",
    openingBalance: "0.00",
    manualEntriesAllowed: "Yes",
    createdBy: "Admin",
    createdDate: "[Current Date]"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Get current timestamp
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric', 
      year: 'numeric'
    }) + ' ' + currentDate.toLocaleTimeString('en-US', { hour12: true });
    
    // Get next ID and COA ID
    const nextId = Math.max(...tableData.map(item => item.id)) + 1;
    const nextCoaId = nextId.toString();
    
    // Create new table entry
    const newEntry = {
      id: nextId,
      coaId: nextCoaId,
      accountCode: formData.glAccountCode,
      accountType: formData.accountCategory,
      accountDescription: formData.accountDescription,
      bank: formData.bank,
      accountNo: formData.ibanBankAccountNo.replace(/[\s-]/g, ''),
      currency: formData.currency,
      openingBalance: formData.openingBalance,
      createdBy: "100201",
      createdDate: formattedDate,
      modifiedBy: "0",
      status: "Approved"
    };
    
    // Add to table data
    setTableData(prev => [...prev, newEntry]);
    
    // Reset form with new GL Account Code
    const newGLCode = (parseInt(formData.glAccountCode) + 1).toString();
    setFormData({
      accountType: "Balance Sheet",
      glAccountCode: newGLCode,
      accountCategory: "Assets",
      accountDescription: "e-Agri Bank Account",
      bank: "Meezan",
      ibanBankAccountNo: "PK89 ---- ----- ----- ----",
      currency: "PKR",
      openingBalance: "0.00",
      manualEntriesAllowed: "Yes",
      createdBy: "Admin",
      createdDate: "[Current Date]"
    });
    
    console.log('Form submitted and added to table:', newEntry);
  };

  const handleCancel = () => {
    // Reset form to initial state
    setFormData({
      accountType: "Balance Sheet",
      glAccountCode: getNextGLAccountCode(),
      accountCategory: "Assets",
      accountDescription: "e-Agri Bank Account",
      bank: "Meezan",
      ibanBankAccountNo: "PK89 ---- ----- ----- ----",
      currency: "PKR",
      openingBalance: "0.00",
      manualEntriesAllowed: "Yes",
      createdBy: "Admin",
      createdDate: "[Current Date]"
    });
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Chart of Accounts Setup</h1>
      
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formRowSingle}>
          <Label className={styles.label}>Account Type*</Label>
          <div className={styles.radioGroup}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="accountType"
                value="Balance Sheet"
                checked={formData.accountType === "Balance Sheet"}
                onChange={(e) => setFormData(prev => ({ ...prev, accountType: e.target.value }))}
              />
              Balance Sheet
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="accountType"
                value="Income Statement"
                checked={formData.accountType === "Income Statement"}
                onChange={(e) => setFormData(prev => ({ ...prev, accountType: e.target.value }))}
              />
              Income Statement
            </label>
          </div>
        </div>
        
        <div className={styles.formRowDouble}>
          <Label className={styles.label}>GL Account Code</Label>
          <Input 
            className={styles.input}
            value={formData.glAccountCode}
            onChange={(e) => setFormData(prev => ({ ...prev, glAccountCode: e.target.value }))}
          />
          
          <Label className={styles.labelRight}>Account Category*</Label>
          <Select
            value={formData.accountCategory}
            onValueChange={(value) => setFormData(prev => ({ ...prev, accountCategory: value }))}
          >
            <SelectTrigger className={styles.inputRight}>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {accountCategoryOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className={styles.formRowSingle}>
          <Label className={styles.label}>Account Description*</Label>
          <Input 
            className={styles.inputWide}
            value={formData.accountDescription}
            onChange={(e) => setFormData(prev => ({ ...prev, accountDescription: e.target.value }))}
          />
        </div>
        
        <div className={styles.formRowDouble}>
          <Label className={styles.label}>Bank</Label>
          <Select
            value={formData.bank}
            onValueChange={(value) => setFormData(prev => ({ ...prev, bank: value }))}
          >
            <SelectTrigger className={styles.input}>
              <SelectValue placeholder="Select bank" />
            </SelectTrigger>
            <SelectContent>
              {bankOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Label className={styles.labelRight}>IBAN Bank Account no*</Label>
          <Input 
            className={styles.inputRight}
            value={formData.ibanBankAccountNo}
            onChange={(e) => setFormData(prev => ({ ...prev, ibanBankAccountNo: e.target.value }))}
            placeholder="PK89 ---- ----- ----- ----"
          />
        </div>
        
        <div className={styles.formRowDouble}>
          <Label className={styles.label}>Currency</Label>
          <Select
            value={formData.currency}
            onValueChange={(value) => setFormData(prev => ({ ...prev, currency: value }))}
          >
            <SelectTrigger className={styles.input}>
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              {currencyOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Label className={styles.labelRight}>Opening Balance</Label>
          <Input 
            className={styles.inputRight}
            value={formData.openingBalance}
            onChange={(e) => setFormData(prev => ({ ...prev, openingBalance: e.target.value }))}
            placeholder="0.00"
          />
        </div>
        
        <div className={styles.formRowSingle}>
          <Label className={styles.label}>Manual Entries Allowed?</Label>
          <div className={styles.radioGroup}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="manualEntriesAllowed"
                value="Yes"
                checked={formData.manualEntriesAllowed === "Yes"}
                onChange={(e) => setFormData(prev => ({ ...prev, manualEntriesAllowed: e.target.value }))}
              />
              Yes
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="manualEntriesAllowed"
                value="No"
                checked={formData.manualEntriesAllowed === "No"}
                onChange={(e) => setFormData(prev => ({ ...prev, manualEntriesAllowed: e.target.value }))}
              />
              No
            </label>
          </div>
        </div>
        
        <div className={styles.formRowDouble}>
          <Label className={styles.label}>Created By:</Label>
          <Input 
            className={`${styles.input} ${styles.inputDisabled}`}
            value={formData.createdBy}
            disabled 
            readOnly
          />
          
          <Label className={styles.labelRight}>Created Date:</Label>
          <Input 
            className={`${styles.inputRight} ${styles.inputDisabled}`}
            value={formData.createdDate}
            disabled 
            readOnly
          />
        </div>
        
        <div className={styles.buttonRow}>
          <Button type="submit" className={styles.saveBtn}>
            Save
          </Button>
          <Button type="button" variant="outline" className={styles.cancelBtn} onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </form>
      
      <div className={styles.tableWrap}>
        <Table className={styles.table}>
          <TableHeader>
            <TableRow>
              <TableHead className={styles.th}>COA ID</TableHead>
              <TableHead className={styles.th}>Account Code</TableHead>
              <TableHead className={styles.th}>Account Type</TableHead>
              <TableHead className={styles.th}>Account Description</TableHead>
              <TableHead className={styles.th}>Bank</TableHead>
              <TableHead className={styles.th}>Account no</TableHead>
              <TableHead className={styles.th}>Currency</TableHead>
              <TableHead className={styles.th}>Opening Balance</TableHead>
              <TableHead className={styles.th}>Created By</TableHead>
              <TableHead className={styles.th}>Created Date</TableHead>
              <TableHead className={styles.th}>Modified By</TableHead>
              <TableHead className={styles.th}>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map(row => (
              <TableRow key={row.id} className={styles.tr}>
                <TableCell className={styles.td}>{row.coaId}</TableCell>
                <TableCell className={styles.td}>{row.accountCode}</TableCell>
                <TableCell className={styles.td}>{row.accountType}</TableCell>
                <TableCell className={styles.td}>{row.accountDescription}</TableCell>
                <TableCell className={styles.td}>{row.bank}</TableCell>
                <TableCell className={styles.td}>{row.accountNo}</TableCell>
                <TableCell className={styles.td}>{row.currency}</TableCell>
                <TableCell className={styles.td}>{row.openingBalance}</TableCell>
                <TableCell className={styles.td}>{row.createdBy}</TableCell>
                <TableCell className={styles.td}>{row.createdDate}</TableCell>
                <TableCell className={styles.td}>{row.modifiedBy}</TableCell>
                <TableCell className={`${styles.td} ${styles.actionTd}`}>
                  <button className={styles.editBtn} title="Edit">
                    <Pencil size={16} color="#375515"/>
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
