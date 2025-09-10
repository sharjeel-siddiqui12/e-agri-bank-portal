"use client";
import React, { useState } from "react";
import { Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import styles from "./personStakeholder.module.css";

const initialTableData = [
  {
    id: 1,
    mappingId: "10-01",
    personType: "Individual",
    subCategory: "Single",
    scsCategory: "Farmer",
    isServiceProvider: "No",
    activeStatus: "Yes",
    createdDate: "01-01-2025 12:00:00",
    lastModifiedDate: "01-01-2025 12:00:00",
    approvedBy: "@Shahzad",
    status: "Approved"
  }
];

// Demo data for dropdowns (only approved items)
const approvedPersonTypes = [
  { value: "Individual", label: "Individual" },
  { value: "Corporate", label: "Corporate" }
];

const approvedSubCategories = [
  { value: "Single", label: "Single" },
  { value: "Private", label: "Private" },
  { value: "Public-Listed", label: "Public-Listed" }
];

const approvedSCSCategories = [
  { value: "Farmer", label: "Farmer" },
  { value: "Trader", label: "Trader" },
  { value: "Agri-Input Vendor", label: "Agri-Input Vendor" }
];

export default function PersonStakeholderMappingPage() {
  const [tableData, setTableData] = useState(initialTableData);
  
  // Calculate initial Mapping ID based on existing data
  const getNextMappingId = () => {
    if (tableData.length === 0) return "10-02";
    const lastMappingId = tableData[tableData.length - 1].mappingId;
    const [prefix, suffix] = lastMappingId.split('-');
    const nextSuffix = String(parseInt(suffix) + 1).padStart(2, '0');
    return `${prefix}-${nextSuffix}`;
  };
  
  const [formData, setFormData] = useState({
    mappingId: getNextMappingId(),
    personType: "Individual",
    subCategory: "Single",
    scsCategory: "Trader",
    isServiceProvider: "No",
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
      mappingId: formData.mappingId,
      personType: formData.personType,
      subCategory: formData.subCategory,
      scsCategory: formData.scsCategory,
      isServiceProvider: formData.isServiceProvider,
      activeStatus: formData.activeStatus,
      createdDate: formattedDate,
      lastModifiedDate: formattedDate,
      approvedBy: "@Shahzad",
      status: "Approved"
    };
    
    // Add to table data
    setTableData(prev => [...prev, newEntry]);
    
    // Reset form and generate new Mapping ID
    const newMappingId = getNextMappingId();
    setFormData({
      mappingId: newMappingId,
      personType: "Individual",
      subCategory: "Single", 
      scsCategory: "Trader",
      isServiceProvider: "No",
      activeStatus: "Yes"
    });
    
    console.log('Form submitted and added to table:', newEntry);
  };

  const handleCancel = () => {
    // Generate next available Mapping ID for the form
    const newMappingId = getNextMappingId();
    setFormData({
      mappingId: newMappingId,
      personType: "Individual",
      subCategory: "Single",
      scsCategory: "Trader",
      isServiceProvider: "No",
      activeStatus: "Yes"
    });
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Person - Stakeholder Mapping</h1>
      
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formRow}>
          <Label className={styles.label}>Mapping ID</Label>
          <Input 
            className={`${styles.input} ${styles.inputDisabled}`}
            value={formData.mappingId}
            disabled 
            readOnly
          />
        </div>
        
        <div className={styles.formRow}>
          <div className={styles.labelContainer}>
            <Label className={styles.label}>Person Type</Label>
            <span className={styles.labelNote}>Only Approved</span>
          </div>
          <Select
            value={formData.personType}
            onValueChange={(value) => setFormData(prev => ({ ...prev, personType: value }))}
          >
            <SelectTrigger className={styles.input} m->
              <SelectValue placeholder="Select person type" />
            </SelectTrigger>
            <SelectContent>
              {approvedPersonTypes.map(type => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Label className={styles.subLabel}>Sub-Category</Label>
          <Select
            value={formData.subCategory}
            onValueChange={(value) => setFormData(prev => ({ ...prev, subCategory: value }))}
          >
            <SelectTrigger className={styles.input}>
              <SelectValue placeholder="Select sub-category" />
            </SelectTrigger>
            <SelectContent>
              {approvedSubCategories.map(category => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className={styles.formRow}>
          <div className={styles.labelContainer}>
            <Label className={styles.label}>SCS Category</Label>
            <span className={styles.labelNote}>Only Approved</span>
          </div>
          <Select
            value={formData.scsCategory}
            onValueChange={(value) => setFormData(prev => ({ ...prev, scsCategory: value }))}
          >
            <SelectTrigger className={styles.input}>
              <SelectValue placeholder="Select SCS category" />
            </SelectTrigger>
            <SelectContent>
              {approvedSCSCategories.map(category => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
              <TableHead className={styles.th}>Mapping ID</TableHead>
              <TableHead className={styles.th}>Person Type</TableHead>
              <TableHead className={styles.th}>Sub-Category</TableHead>
              <TableHead className={styles.th}>SCS Category</TableHead>
              <TableHead className={styles.th}>Is Service Provider</TableHead>
              <TableHead className={styles.th}>Active Status</TableHead>
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
                <TableCell className={styles.td}>{row.mappingId}</TableCell>
                <TableCell className={styles.td}>{row.personType}</TableCell>
                <TableCell className={styles.td}>{row.subCategory}</TableCell>
                <TableCell className={styles.td}>{row.scsCategory}</TableCell>
                <TableCell className={styles.td}>{row.isServiceProvider}</TableCell>
                <TableCell className={styles.td}>{row.activeStatus}</TableCell>
                <TableCell className={styles.td}>{row.createdDate}</TableCell>
                <TableCell className={styles.td}>{row.lastModifiedDate}</TableCell>
                <TableCell className={styles.td}>{row.approvedBy}</TableCell>
                <TableCell className={styles.td}>
                  <span className={`${styles.statusBadge} ${row.status === "Approved" ? styles.approved : styles.rejected}`}>
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
