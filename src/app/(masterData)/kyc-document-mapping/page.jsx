"use client";
import React, { useState } from "react";
import { Pencil, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import styles from "./kycMapping.module.css";

const initialTableData = [
  {
    id: 1,
    kycMapId: "10-01-1",
    documentType: "CNIC - Front",
    personType: "Individual",
    subCategory: "Single",
    scsCategory: "Farmer",
    isMandatory: "Yes",
    isActive: "Yes",
    createdDate: "01-01-2025 12:00:00",
    lastModifiedDate: "01-01-2025 12:00:00",
    approvedBy: "@Shahzad",
    status: "Pending"
  },
  {
    id: 2,
    kycMapId: "10-01-2",
    documentType: "CNIC - Back",
    personType: "Individual",
    subCategory: "Single",
    scsCategory: "Farmer",
    isMandatory: "Yes",
    isActive: "Yes",
    createdDate: "01-01-2025 12:00:00",
    lastModifiedDate: "01-01-2025 12:00:00",
    approvedBy: "@Shahzad",
    status: "Approved"
  }
];

// Demo data for dropdowns (only approved items)
const approvedDocumentTypes = [
  { value: "CNIC Front", label: "CNIC Front" },
  { value: "CNIC Back", label: "CNIC Back" },
  { value: "Zarat Passbook", label: "Zarat Passbook" },
  { value: "Agriculture Passbook", label: "Agriculture Passbook" }
];

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

export default function KYCDocumentMappingPage() {
  const [tableData, setTableData] = useState(initialTableData);
  const [selectedDocumentTypes, setSelectedDocumentTypes] = useState(['CNIC Front', 'CNIC Back', 'Zarat Passbook']);
  
  // Calculate initial KYC Document Mapping ID based on existing data
  const getNextMappingId = () => {
    if (tableData.length === 0) return "10-01-1";
    return "10-01-1"; // Fixed ID as shown in the image
  };
  
  const [formData, setFormData] = useState({
    mappingId: getNextMappingId(),
    documentType: "",
    personType: "Individual",
    subCategory: "Single",
    scsCategory: "Farmer",
    isMandatory: "Yes",
    activeStatus: "Yes"
  });

  const handleDocumentTypeSelect = (value) => {
    if (!selectedDocumentTypes.includes(value)) {
      setSelectedDocumentTypes(prev => [...prev, value]);
    }
  };

  const removeDocumentType = (typeToRemove) => {
    setSelectedDocumentTypes(prev => prev.filter(type => type !== typeToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (selectedDocumentTypes.length === 0) {
      alert("Please select at least one document type");
      return;
    }
    
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
      kycMapId: formData.mappingId,
      documentType: selectedDocumentTypes.join(', '),
      personType: formData.personType,
      subCategory: formData.subCategory,
      scsCategory: formData.scsCategory,
      isMandatory: formData.isMandatory,
      isActive: formData.activeStatus,
      createdDate: formattedDate,
      lastModifiedDate: formattedDate,
      approvedBy: "@Shahzad",
      status: "Pending"
    };
    
    // Add to table data
    setTableData(prev => [...prev, newEntry]);
    
    // Reset form and generate new ID
    setFormData({
      mappingId: "10-01-1",
      documentType: "",
      personType: "Individual",
      subCategory: "Single",
      scsCategory: "Farmer",
      isMandatory: "Yes",
      activeStatus: "Yes"
    });
    setSelectedDocumentTypes([]);
    
    console.log('Form submitted and added to table:', newEntry);
  };

  const handleCancel = () => {
    // Reset form
    setFormData({
      mappingId: "10-01-1",
      documentType: "",
      personType: "Individual",
      subCategory: "Single",
      scsCategory: "Farmer",
      isMandatory: "Yes",
      activeStatus: "Yes"
    });
    setSelectedDocumentTypes([]);
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>KYC Document Mapping</h1>
      
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formRow}>
          <Label className={styles.label}>KYC Document Mapping ID (Auto)</Label>
          <Input 
            className={`${styles.input} ${styles.inputDisabled}`}
            value={formData.mappingId}
            disabled 
            readOnly
          />
        </div>
        
        <div className={styles.formRow}>
          <Label className={styles.label}>Document Type</Label>
          <div className={styles.documentTypeContainer}>
            <Select onValueChange={handleDocumentTypeSelect}>
              <SelectTrigger className={styles.input}>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {approvedDocumentTypes.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {selectedDocumentTypes.length > 0 && (
              <div className={styles.documentTypeTags}>
                {selectedDocumentTypes.map(type => (
                  <div key={type} className={styles.documentTypeTag}>
                    <span>{type}</span>
                    <button
                      type="button"
                      onClick={() => removeDocumentType(type)}
                      className={styles.removeTagBtn}
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className={styles.formRow}>
          <div className={styles.labelContainer}>
            <Label className={styles.label}>Person Type</Label>
            <span className={styles.labelNote}>Only Approved</span>
          </div>
          <div className={styles.doubleSelectContainer}>
            <Select
              value={formData.personType}
              onValueChange={(value) => setFormData(prev => ({ ...prev, personType: value }))}
            >
              <SelectTrigger className={styles.selectInput}>
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
            
            <div className={styles.subCategoryContainer}>
              <Label className={styles.subLabel}>Sub-Category</Label>
              <Select
                value={formData.subCategory}
                onValueChange={(value) => setFormData(prev => ({ ...prev, subCategory: value }))}
              >
                <SelectTrigger className={styles.selectInput}>
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
          </div>
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
          <Label className={styles.label}>Is Mandatory?</Label>
          <RadioGroup
            value={formData.isMandatory}
            onValueChange={(value) => setFormData(prev => ({ ...prev, isMandatory: value }))}
            className={styles.radioGroup}
          >
            <div className={styles.radioItem}>
              <RadioGroupItem value="Yes" id="mandatory-yes" className={styles.radioInput} />
              <Label htmlFor="mandatory-yes" className={styles.radioLabel}>Yes</Label>
            </div>
            <div className={styles.radioItem}>
              <RadioGroupItem value="No" id="mandatory-no" className={styles.radioInput} />
              <Label htmlFor="mandatory-no" className={styles.radioLabel}>No</Label>
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
              <TableHead className={styles.th}>KYC Map ID</TableHead>
              <TableHead className={styles.th}>Document Type</TableHead>
              <TableHead className={styles.th}>Person Type</TableHead>
              <TableHead className={styles.th}>Sub-Category</TableHead>
              <TableHead className={styles.th}>SCS Category</TableHead>
              <TableHead className={styles.th}>Is Mandatory?</TableHead>
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
                <TableCell className={styles.td}>{row.kycMapId}</TableCell>
                <TableCell className={styles.td}>{row.documentType}</TableCell>
                <TableCell className={styles.td}>{row.personType}</TableCell>
                <TableCell className={styles.td}>{row.subCategory}</TableCell>
                <TableCell className={styles.td}>{row.scsCategory}</TableCell>
                <TableCell className={styles.td}>{row.isMandatory}</TableCell>
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