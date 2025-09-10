"use client";
import React, { useState } from "react";
import { Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import styles from "./CatagorySetup.module.css";

const initialTableData = [
  {
    id: 1,
    scsId: "01",
    categoryName: "Farmer",
    isServiceProvider: "No",
    isActive: "Yes",
    status: "Approved",
    createdDate: "01-01-2025",
    lastModifiedDate: "01-01-2025 12:00:00",
    modifiedBy: "@shahzad"
  },
  {
    id: 2,
    scsId: "02",
    categoryName: "Trader",
    isServiceProvider: "No",
    isActive: "Yes", 
    status: "Approved",
    createdDate: "01-01-2025",
    lastModifiedDate: "01-01-2025 12:05:00",
    modifiedBy: "@shahzad"
  }
];

export default function SCSCategorySetupPage() {
  const [tableData, setTableData] = useState(initialTableData);
  
  // Calculate initial SCS ID based on existing data
  const getNextSCSId = () => {
    const maxId = Math.max(...initialTableData.map(item => parseInt(item.scsId)));
    return String(maxId + 1).padStart(2, '0');
  };
  
  const [formData, setFormData] = useState({
    scsId: getNextSCSId(),
    categoryName: "Agri-Input Vendor",
    isServiceProvider: "Yes",
    activeStatus: "Yes"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Get current timestamp
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric'
    }) + ' ' + currentDate.toLocaleTimeString('en-GB', { hour12: false });
    
    // Get next ID (highest current ID + 1)
    const nextId = Math.max(...tableData.map(item => item.id)) + 1;
    
    // Create new table entry
    const newEntry = {
      id: nextId,
      scsId: formData.scsId,
      categoryName: formData.categoryName,
      isServiceProvider: formData.isServiceProvider,
      isActive: formData.activeStatus,
      status: "Approved", // Default status for new entries
      createdDate: currentDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit', 
        year: 'numeric'
      }),
      lastModifiedDate: formattedDate,
      modifiedBy: "@shahzad" // Current user
    };
    
    // Add to table data
    setTableData(prev => [...prev, newEntry]);
    
    // Reset form and generate new SCS ID
    const newSCSId = String(parseInt(formData.scsId) + 1).padStart(2, '0');
    setFormData({
      scsId: newSCSId,
      categoryName: "",
      isServiceProvider: "Yes",
      activeStatus: "Yes"
    });
    
    console.log('Form submitted and added to table:', newEntry);
  };

  const handleCancel = () => {
    // Generate next available SCS ID for the form
    const maxId = Math.max(...tableData.map(item => parseInt(item.scsId)));
    const nextSCSId = String(maxId + 1).padStart(2, '0');
    setFormData({
      scsId: nextSCSId,
      categoryName: "",
      isServiceProvider: "Yes",
      activeStatus: "Yes"
    });
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Supply Chain Stakeholder (SCS) Category Setup</h1>
      
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formRow}>
          <Label className={styles.label}>Supply Chain Stakeholder ID (Auto)</Label>
          <Input 
            className={`${styles.input} ${styles.inputDisabled}`}
            value={formData.scsId}
            disabled 
            readOnly
          />
        </div>
        
        <div className={styles.formRow}>
          <Label className={styles.label}>SCS Category Name</Label>
          <Input 
            className={styles.input}
            value={formData.categoryName}
            onChange={(e) => setFormData(prev => ({ ...prev, categoryName: e.target.value }))}
            placeholder="Enter SCS category name"
          />
        </div>
        
        <div className={styles.formRow}>
          <Label className={styles.label}>Is Service Provider?</Label>
          <RadioGroup
            value={formData.isServiceProvider}
            onValueChange={(value) => setFormData(prev => ({ ...prev, isServiceProvider: value }))}
            className={styles.radioGroup}
          >
            <div className={styles.radioItem}>
              <RadioGroupItem value="Yes" id="serviceProvider-yes" className={styles.radioInput} />
              <Label htmlFor="serviceProvider-yes" className={styles.radioLabel}>Yes</Label>
            </div>
            <div className={styles.radioItem}>
              <RadioGroupItem value="No" id="serviceProvider-no" className={styles.radioInput} />
              <Label htmlFor="serviceProvider-no" className={styles.radioLabel}>No</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className={styles.formRow}>
          <Label className={styles.label}>Active Status</Label>
          <RadioGroup
            value={formData.activeStatus}
            onValueChange={(value) => setFormData(prev => ({ ...prev, activeStatus: value }))}
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
              <TableHead className={styles.th}>Action</TableHead>
              <TableHead className={styles.th}>SCS ID</TableHead>
              <TableHead className={styles.th}>SCS Category Name</TableHead>
              <TableHead className={styles.th}>Is Service Provider?</TableHead>
              <TableHead className={styles.th}>Is Active</TableHead>
              <TableHead className={styles.th}>Status</TableHead>
              <TableHead className={styles.th}>Created Date</TableHead>
              <TableHead className={styles.th}>Last Modified Date</TableHead>
              <TableHead className={styles.th}>Modified By</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map(row => (
              <TableRow key={row.id} className={styles.tr}>
                <TableCell className={`${styles.td} ${styles.actionTd}`}>
                  <button className={styles.editBtn} title="Edit">
                    <Pencil size={16} color="#375515"/>
                  </button>
                </TableCell>
                <TableCell className={styles.td}>{row.scsId}</TableCell>
                <TableCell className={styles.td}>{row.categoryName}</TableCell>
                <TableCell className={styles.td}>{row.isServiceProvider}</TableCell>
                <TableCell className={styles.td}>{row.isActive}</TableCell>
                <TableCell className={styles.td}>
                  <span className={`${styles.statusBadge} ${row.status === "Approved" ? styles.approved : styles.rejected}`}>
                    {row.status}
                  </span>
                </TableCell>
                <TableCell className={styles.td}>{row.createdDate}</TableCell>
                <TableCell className={styles.td}>{row.lastModifiedDate}</TableCell>
                <TableCell className={styles.td}>{row.modifiedBy}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
