"use client";
import React, { useState } from "react";
import { Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import styles from "./UomSetup.module.css";

const categoryOptions = [
  { value: "Mass", label: "Mass" },
  { value: "Length", label: "Length" },
  { value: "Volume", label: "Volume" },
  { value: "Area", label: "Area" }
];

const initialTableData = [
  {
    id: 1,
    categoryCode: "1",
    categoryName: "Mass",
    isActive: "Yes",
    createdDate: "01-01-2025 12:00:00",
    lastModifiedDate: "01-01-2025 12:00:00",
    approvedBy: "@Shahzad",
    status: "Pending"
  }
];

export default function UomSetupPage() {
  const [tableData, setTableData] = useState(initialTableData);
  const [formData, setFormData] = useState({
    categoryCode: "2",
    categoryName: "Mass",
    isActive: "Yes"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }) + ' ' + currentDate.toLocaleTimeString('en-GB', { hour12: false });
    const nextId = Math.max(...tableData.map(item => item.id)) + 1;
    const newEntry = {
      id: nextId,
      categoryCode: formData.categoryCode,
      categoryName: formData.categoryName,
      isActive: formData.isActive,
      createdDate: formattedDate,
      lastModifiedDate: formattedDate,
      approvedBy: "@Shahzad",
      status: "Pending"
    };
    setTableData(prev => [...prev, newEntry]);
    setFormData({
      categoryCode: (parseInt(formData.categoryCode) + 1).toString(),
      categoryName: "Mass",
      isActive: "Yes"
    });
  };

  const handleCancel = () => {
    setFormData({
      categoryCode: (parseInt(formData.categoryCode) + 1).toString(),
      categoryName: "Mass",
      isActive: "Yes"
    });
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>UoM Setup</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formRow}>
          <Label className={styles.label}>Category Code (Auto)</Label>
          <Input
            className={`${styles.input} ${styles.inputDisabled}`}
            value={formData.categoryCode}
            disabled
            readOnly
          />
        </div>
        <div className={styles.formRow}>
          <Label className={styles.label}>Category Name</Label>
          <Select
            value={formData.categoryName}
            onValueChange={value => setFormData(prev => ({ ...prev, categoryName: value }))}
          >
            <SelectTrigger className={styles.input}>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {categoryOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className={styles.formRow}>
          <Label className={styles.label}>Is Active</Label>
          <RadioGroup
            value={formData.isActive}
            onValueChange={value => setFormData(prev => ({ ...prev, isActive: value }))}
            className={styles.radioGroup}
          >
            <div className={styles.radioItem}>
              <RadioGroupItem value="Yes" id="active-yes" className={styles.radioInput} />
              <Label htmlFor="active-yes" className={styles.radioLabel}>Yes</Label>
            </div>
            <div className={styles.radioItem}>
              <RadioGroupItem value="No" id="active-no" className={styles.radioInput} />
              <Label htmlFor="active-no" className={styles.radioLabel}>No</Label>
            </div>
          </RadioGroup>
        </div>
        <div className={styles.buttonRow}>
          <Button type="submit" className={styles.saveBtn}>Save</Button>
          <Button type="button" variant="outline" className={styles.cancelBtn} onClick={handleCancel}>Cancel</Button>
        </div>
      </form>
      <div className={styles.tableWrap}>
        <Table className={styles.table}>
          <TableHeader>
            <TableRow>
              <TableHead className={styles.th}>Action</TableHead>
              <TableHead className={styles.th}>Category Code</TableHead>
              <TableHead className={styles.th}>Category Name</TableHead>
              <TableHead className={styles.th}>Is Active?</TableHead>
              <TableHead className={styles.th}>Created date</TableHead>
              <TableHead className={styles.th}>Last Modified date</TableHead>
              <TableHead className={styles.th}>Approved by</TableHead>
              <TableHead className={styles.th}>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map(row => (
              <TableRow key={row.id} className={styles.tr}>
                <TableCell className={`${styles.td} ${styles.actionTd}`}>
                  <button className={styles.editBtn} title="Edit">
                    <Pencil size={16} />
                  </button>
                </TableCell>
                <TableCell className={styles.td}>{row.categoryCode}</TableCell>
                <TableCell className={styles.td}>{row.categoryName}</TableCell>
                <TableCell className={styles.td}>{row.isActive}</TableCell>
                <TableCell className={styles.td}>{row.createdDate}</TableCell>
                <TableCell className={styles.td}>{row.lastModifiedDate}</TableCell>
                <TableCell className={styles.td}>{row.approvedBy}</TableCell>
                <TableCell className={styles.td}>
                  <span className={`${styles.statusBadge} ${row.status === "Approved" ? styles.approved : styles.pending}`}>
                    {row.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
