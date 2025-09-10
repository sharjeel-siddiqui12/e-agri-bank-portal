"use client";

import { useState } from "react";
import styles from "./manualVoucherEntry.module.css";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";

const accountCodeOptions = [
  { value: "1001-GCTP Meezan Bank PKR A/c", label: "1001-GCTP Meezan Bank PKR A/c" },
  { value: "200006-Javed Khan", label: "200006-Javed Khan" },
  { value: "300001-Cash Account", label: "300001-Cash Account" },
  { value: "400001-Supplier Account", label: "400001-Supplier Account" }
];

const accountTypeOptions = [
  { value: "Asset", label: "Asset" },
  { value: "Liability", label: "Liability" },
  { value: "Equity", label: "Equity" },
  { value: "Revenue", label: "Revenue" },
  { value: "Expense", label: "Expense" }
];

const transactionTypeOptions = [
  { value: "Deposit", label: "Deposit" },
  { value: "Withdrawal", label: "Withdrawal" },
  { value: "Transfer", label: "Transfer" },
  { value: "Payment", label: "Payment" }
];

const initialTableData = [
  {
    id: 1,
    voucherId: "12345",
    voucherNo: "12345678",
    voucherDate: "7/24/2023",
    narration: "Narration here",
    debitAmount: "100000",
    creditAmount: "100000",
    status: "Pending"
  },
  {
    id: 2,
    voucherId: "12346",
    voucherNo: "12345679",
    voucherDate: "7/25/2023",
    narration: "Monthly salary payment",
    debitAmount: "50000",
    creditAmount: "50000",
    status: "Approved"
  }
];

export default function ManualVoucherEntryPage() {
  const [tableData, setTableData] = useState(initialTableData);
  const [formData, setFormData] = useState({
    // First row data
    accountCode1: "1001-GCTP Meezan Bank PKR A/c",
    accountType1: "Asset",
    transactionType1: "Deposit",
    debit1: "100000",
    credit1: "0",
    // Second row data
    accountCode2: "200006-Javed Khan",
    accountType2: "Liability",
    transactionType2: "Deposit",
    debit2: "0",
    credit2: "100000"
  });

  const getNextVoucherId = () => {
    return (Math.max(...initialTableData.map(item => parseInt(item.voucherId))) + 1).toString();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Get current timestamp
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric', 
      year: 'numeric'
    });
    
    const newEntry = {
      id: tableData.length + 1,
      voucherId: getNextVoucherId(),
      voucherNo: (parseInt(tableData[tableData.length - 1].voucherNo) + 1).toString(),
      voucherDate: formattedDate,
      narration: "New voucher entry",
      debitAmount: formData.debit1 || formData.debit2,
      creditAmount: formData.credit1 || formData.credit2,
      status: "Pending"
    };
    
    setTableData(prev => [...prev, newEntry]);
    
    // Reset form
    handleCancel();
  };

  const handleCancel = () => {
    setFormData({
      accountCode1: "1001-GCTP Meezan Bank PKR A/c",
      accountType1: "Asset",
      transactionType1: "Deposit",
      debit1: "100000",
      credit1: "0",
      accountCode2: "200006-Javed Khan",
      accountType2: "Liability",
      transactionType2: "Deposit",
      debit2: "0",
      credit2: "100000"
    });
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Manual Voucher Entries</h1>
      
      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Header Row */}
        <div className={styles.headerRow}>
          <Label className={styles.headerLabel}>Account Code</Label>
          <Label className={styles.headerLabel}>Account Type</Label>
          <Label className={styles.headerLabel}>Transaction Type</Label>
          <Label className={styles.headerLabel}>Debit</Label>
          <Label className={styles.headerLabel}>Credit</Label>
        </div>
        
        {/* First Entry Row */}
        <div className={styles.entryRow}>
          <Select
            value={formData.accountCode1}
            onValueChange={(value) => setFormData(prev => ({ ...prev, accountCode1: value }))}
          >
            <SelectTrigger className={styles.input}>
              <SelectValue placeholder="Select account code" />
            </SelectTrigger>
            <SelectContent>
              {accountCodeOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select
            value={formData.accountType1}
            onValueChange={(value) => setFormData(prev => ({ ...prev, accountType1: value }))}
          >
            <SelectTrigger className={styles.input}>
              <SelectValue placeholder="Select account type" />
            </SelectTrigger>
            <SelectContent>
              {accountTypeOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select
            value={formData.transactionType1}
            onValueChange={(value) => setFormData(prev => ({ ...prev, transactionType1: value }))}
          >
            <SelectTrigger className={styles.input}>
              <SelectValue placeholder="Select transaction type" />
            </SelectTrigger>
            <SelectContent>
              {transactionTypeOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Input
            className={styles.input}
            value={formData.debit1}
            onChange={(e) => setFormData(prev => ({ ...prev, debit1: e.target.value }))}
            placeholder="0"
            type="number"
          />
          
          <Input
            className={`${styles.input} ${styles.inputDisabled}`}
            value={formData.credit1}
            disabled
            placeholder="0"
            type="number"
          />
        </div>
        
        {/* Second Entry Row */}
        <div className={styles.entryRow}>
          <Select
            value={formData.accountCode2}
            onValueChange={(value) => setFormData(prev => ({ ...prev, accountCode2: value }))}
          >
            <SelectTrigger className={styles.input}>
              <SelectValue placeholder="Select account code" />
            </SelectTrigger>
            <SelectContent>
              {accountCodeOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select
            value={formData.accountType2}
            onValueChange={(value) => setFormData(prev => ({ ...prev, accountType2: value }))}
          >
            <SelectTrigger className={styles.input}>
              <SelectValue placeholder="Select account type" />
            </SelectTrigger>
            <SelectContent>
              {accountTypeOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select
            value={formData.transactionType2}
            onValueChange={(value) => setFormData(prev => ({ ...prev, transactionType2: value }))}
          >
            <SelectTrigger className={styles.input}>
              <SelectValue placeholder="Select transaction type" />
            </SelectTrigger>
            <SelectContent>
              {transactionTypeOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Input
            className={`${styles.input} ${styles.inputDisabled}`}
            value={formData.debit2}
            disabled
            placeholder="0"
            type="number"
          />
          
          <Input
            className={styles.input}
            value={formData.credit2}
            onChange={(e) => setFormData(prev => ({ ...prev, credit2: e.target.value }))}
            placeholder="0"
            type="number"
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
              <TableHead className={styles.th}>Voucher ID</TableHead>
              <TableHead className={styles.th}>Voucher No.</TableHead>
              <TableHead className={styles.th}>Voucher Date</TableHead>
              <TableHead className={styles.th}>Narration</TableHead>
              <TableHead className={styles.th}>Debit Amount</TableHead>
              <TableHead className={styles.th}>Credit Amount</TableHead>
              <TableHead className={styles.th}>Status</TableHead>
              <TableHead className={styles.th}>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map(row => (
              <TableRow key={row.id} className={styles.tr}>
                <TableCell className={styles.td}>{row.voucherId}</TableCell>
                <TableCell className={styles.td}>{row.voucherNo}</TableCell>
                <TableCell className={styles.td}>{row.voucherDate}</TableCell>
                <TableCell className={styles.td}>{row.narration}</TableCell>
                <TableCell className={styles.td}>{row.debitAmount}</TableCell>
                <TableCell className={styles.td}>{row.creditAmount}</TableCell>
                <TableCell className={styles.td}>
                  <span className={`${styles.statusBadge} ${row.status === "Approved" ? styles.approved : styles.pending}`}>
                    {row.status}
                  </span>
                </TableCell>
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
