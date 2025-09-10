"use client";
import React, { useState } from "react";
import { Pencil, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import styles from "./kycDocument.module.css";

const initialTableData = [
  {
    id: 1,
    docId: "1",
    documentName: "CNIC- Front",
    maxUploadSize: "5",
    fileType: ".jpg, .png, .pdf",
    isMandatory: "Specific",
    activeStatus: "Yes",
    createdDate: "01-01-2025 12:00:00",
    lastModifiedDate: "01-01-2025 12:00:00",
    approvedBy: "@Shahzad",
    status: "Approved"
  }
];

const fileTypeOptions = [
  { value: "jpg", label: "JPG" },
  { value: "png", label: "PNG" },
  { value: "pdf", label: "PDF" },
  { value: "doc", label: "DOC" },
  { value: "docx", label: "DOCX" }
];

export default function KYCDocumentSetupPage() {
  const [tableData, setTableData] = useState(initialTableData);
  const [selectedFileTypes, setSelectedFileTypes] = useState(['jpg', 'png', 'pdf']);
  
  // Calculate initial KYC Document ID based on existing data
  const getNextDocumentId = () => {
    if (tableData.length === 0) return "5";
    return (Math.max(...tableData.map(item => parseInt(item.docId))) + 1).toString();
  };
  
  const [formData, setFormData] = useState({
    documentId: getNextDocumentId(),
    documentName: "Agriculture Passbook",
    maxUploadSize: "5",
    fileType: "",
    isMandatory: "No",
    activeStatus: "Yes"
  });

  const handleFileTypeSelect = (value) => {
    if (!selectedFileTypes.includes(value)) {
      setSelectedFileTypes(prev => [...prev, value]);
    }
  };

  const removeFileType = (typeToRemove) => {
    setSelectedFileTypes(prev => prev.filter(type => type !== typeToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (selectedFileTypes.length === 0) {
      alert("Please select at least one file type");
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
    
    // Format file types for display
    const formattedFileTypes = selectedFileTypes.map(type => `.${type}`).join(', ');
    
    // Create new table entry
    const newEntry = {
      id: nextId,
      docId: formData.documentId,
      documentName: formData.documentName,
      maxUploadSize: formData.maxUploadSize,
      fileType: formattedFileTypes,
      isMandatory: formData.isMandatory,
      activeStatus: formData.activeStatus,
      createdDate: formattedDate,
      lastModifiedDate: formattedDate,
      approvedBy: "@Shahzad",
      status: "Approved"
    };
    
    // Add to table data
    setTableData(prev => [...prev, newEntry]);
    
    // Reset form and generate new ID
    const newDocumentId = (parseInt(formData.documentId) + 1).toString();
    setFormData({
      documentId: newDocumentId,
      documentName: "",
      maxUploadSize: "5",
      fileType: "",
      isMandatory: "No",
      activeStatus: "Yes"
    });
    setSelectedFileTypes([]);
    
    console.log('Form submitted and added to table:', newEntry);
  };

  const handleCancel = () => {
    // Generate next available ID for the form
    const nextId = getNextDocumentId();
    setFormData({
      documentId: nextId,
      documentName: "",
      maxUploadSize: "5",
      fileType: "",
      isMandatory: "No",
      activeStatus: "Yes"
    });
    setSelectedFileTypes([]);
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>KYC Document Setup</h1>
      
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formRow}>
          <Label className={styles.label}>KYC Document ID</Label>
          <Input 
            className={`${styles.input} ${styles.inputDisabled}`}
            value={formData.documentId}
            disabled 
            readOnly
          />
        </div>
        
        <div className={styles.formRow}>
          <Label className={styles.label}>Document Name</Label>
          <Input
            className={styles.input}
            value={formData.documentName}
            onChange={(e) => setFormData(prev => ({ ...prev, documentName: e.target.value }))}
            placeholder="Enter document name"
          />
        </div>
        
        <div className={styles.formRow}>
          <Label className={styles.label}>Max Upload Size (MBs)</Label>
          <Input
            className={styles.input}
            value={formData.maxUploadSize}
            onChange={(e) => setFormData(prev => ({ ...prev, maxUploadSize: e.target.value }))}
            placeholder="Enter max upload size"
            type="number"
          />
        </div>
        
        <div className={styles.formRow}>
          <Label className={styles.label}>File Type</Label>
          <div className={styles.fileTypeContainer}>
            <Select onValueChange={handleFileTypeSelect}>
              <SelectTrigger className={styles.input}>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {fileTypeOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {selectedFileTypes.length > 0 && (
              <div className={styles.fileTypeTags}>
                {selectedFileTypes.map(type => (
                  <div key={type} className={styles.fileTypeTag}>
                    <span>{type}</span>
                    <button
                      type="button"
                      onClick={() => removeFileType(type)}
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
          <Label className={styles.label}>Is Mandatory for all</Label>
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
              <TableHead className={styles.th}>Doc ID</TableHead>
              <TableHead className={styles.th}>Document Name</TableHead>
              <TableHead className={styles.th}>Max Upload Size (MBs)</TableHead>
              <TableHead className={styles.th}>File Type</TableHead>
              <TableHead className={styles.th}>Is Mandatory for all</TableHead>
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
                <TableCell className={styles.td}>{row.docId}</TableCell>
                <TableCell className={styles.td}>{row.documentName}</TableCell>
                <TableCell className={styles.td}>{row.maxUploadSize}</TableCell>
                <TableCell className={styles.td}>{row.fileType}</TableCell>
                <TableCell className={styles.td}>{row.isMandatory}</TableCell>
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