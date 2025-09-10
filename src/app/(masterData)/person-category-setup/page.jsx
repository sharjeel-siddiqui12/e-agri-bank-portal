"use client";
import React, { useState } from "react";
import { Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import styles from "./PersonCategory.module.css";

const initialTableData = [
  {
    id: 10,
    type: "Individual",
    subCategory: "Single",
    status: "Approved",
    isActive: "Yes",
    created: "01-01-2025 12:00:00",
    modified: "01-01-2025 12:00:00",
    user: "@shahzad"
  },
  {
    id: 11,
    type: "Individual",
    subCategory: "Single",
    status: "Rejected",
    isActive: "Yes",
    created: "01-01-2025 12:00:00",
    modified: "01-01-2025 12:00:00",
    user: "@shahzad"
  }
];

export default function PersonCategorySetupPage() {
  const [tableData, setTableData] = useState(initialTableData);
  
  // Calculate initial person ID based on existing data
  const getNextPersonId = () => {
    return (Math.max(...initialTableData.map(item => item.id)) + 1).toString();
  };
  
  const [formData, setFormData] = useState({
    personId: getNextPersonId(),
    personType: "Corporate",
    subCategory: "Private",
    isActive: "Yes"
  });

  const form = useForm({
    defaultValues: formData
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
      type: formData.personType,
      subCategory: formData.subCategory,
      status: "Approved", // Default status for new entries
      isActive: formData.isActive,
      created: formattedDate,
      modified: formattedDate,
      user: "@shahzad" // Current user
    };
    
    // Add to table data
    setTableData(prev => [...prev, newEntry]);
    
    // Reset form and generate new ID
    const newPersonId = (nextId + 1).toString();
    setFormData({
      personId: newPersonId,
      personType: "Corporate",
      subCategory: "Private", 
      isActive: "Yes"
    });
    
    console.log('Form submitted and added to table:', newEntry);
  };

  const handleCancel = () => {
    // Generate next available ID for the form
    const nextId = Math.max(...tableData.map(item => item.id)) + 1;
    setFormData({
      personId: nextId.toString(),
      personType: "Corporate", 
      subCategory: "Private",
      isActive: "Yes"
    });
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Person Category Setup</h1>
      
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formRow}>
          <Label className={styles.label}>Person ID</Label>
          <Input 
            className={`${styles.input} ${styles.inputDisabled}`}
            value={formData.personId}
            disabled 
            readOnly
          />
        </div>
        
        <div className={styles.formRow}>
          <Label className={styles.label}>Person Type</Label>
          <Select
            value={formData.personType}
            onValueChange={(value) => setFormData(prev => ({ ...prev, personType: value }))}
          >
            <SelectTrigger className={styles.input}>
              <SelectValue placeholder="Select person type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Corporate">Corporate</SelectItem>
              <SelectItem value="Individual">Individual</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className={styles.formRow}>
          <Label className={styles.label}>Sub-Category</Label>
          <Select
            value={formData.subCategory}
            onValueChange={(value) => setFormData(prev => ({ ...prev, subCategory: value }))}
          >
            <SelectTrigger className={styles.input}>
              <SelectValue placeholder="Select sub-category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Private">Private</SelectItem>
              <SelectItem value="Single">Single</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className={styles.formRow}>
          <Label className={styles.label}>Active Status</Label>
          <div className={styles.radioRow}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="isActive"
                value="Yes"
                checked={formData.isActive === "Yes"}
                onChange={() => setFormData(prev => ({ ...prev, isActive: "Yes" }))}
              />
              Yes
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="isActive"
                value="No"
                checked={formData.isActive === "No"}
                onChange={() => setFormData(prev => ({ ...prev, isActive: "No" }))}
              />
              No
            </label>
          </div>
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
              <TableHead className={styles.th}>Person ID</TableHead>
              <TableHead className={styles.th}>Person Type</TableHead>
              <TableHead className={styles.th}>Sub-Category</TableHead>
              <TableHead className={styles.th}>Status</TableHead>
              <TableHead className={styles.th}>Is Active</TableHead>
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
                <TableCell className={styles.td}>{row.id}</TableCell>
                <TableCell className={styles.td}>{row.type}</TableCell>
                <TableCell className={styles.td}>{row.subCategory}</TableCell>
                <TableCell className={styles.td}>
                  <span className={`${styles.statusBadge} ${row.status === "Approved" ? styles.approved : styles.rejected}`}>
                    {row.status}
                  </span>
                </TableCell>
                <TableCell className={styles.td}>{row.isActive}</TableCell>
                <TableCell className={styles.td}>{row.created}</TableCell>
                <TableCell className={styles.td}>{row.modified}</TableCell>
                <TableCell className={styles.td}>{row.user}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}