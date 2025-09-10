"use client";
import React, { useState } from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import styles from "./personStakeholderApproval.module.css";

const pendingApprovalData = [
  {
    id: 1,
    mappingId: "10-02",
    personType: "Individual",
    subCategory: "Single", 
    scsCategory: "Trader",
    isServiceProvider: "No",
    activeStatus: "Yes",
    createdDate: "01-01-2025 12:00:00",
    lastModifiedDate: "01-01-2025 12:00:00",
    approvedBy: "@Shahzad",
    status: "Pending",
    selected: false
  }
];

const approvedData = [
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
  },
  {
    id: 2,
    mappingId: "11-01",
    personType: "Corporate",
    subCategory: "Public Listed",
    scsCategory: "Farmer",
    isServiceProvider: "Yes",
    activeStatus: "Yes",
    createdDate: "01-01-2025 12:00:00",
    lastModifiedDate: "01-01-2025 12:00:00",
    approvedBy: "@Shahzad",
    status: "Approved"
  }
];

export default function PersonStakeholderMappingApprovalPage() {
  const [pendingData, setPendingData] = useState(pendingApprovalData);
  const [approvedDataState, setApprovedDataState] = useState(approvedData);
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = (checked) => {
    setSelectAll(checked);
    setPendingData(prev => 
      prev.map(item => ({ ...item, selected: checked }))
    );
  };

  const handleSelectItem = (id, checked) => {
    setPendingData(prev => 
      prev.map(item => 
        item.id === id ? { ...item, selected: checked } : item
      )
    );
  };

  const handleApprove = () => {
    const selectedItems = pendingData.filter(item => item.selected);
    if (selectedItems.length === 0) {
      alert("Please select items to approve");
      return;
    }

    // Move selected items to approved with updated status
    const approvedItems = selectedItems.map(item => ({
      ...item,
      status: "Approved",
      lastModifiedDate: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit', 
        year: 'numeric'
      }) + ' ' + new Date().toLocaleTimeString('en-GB', { hour12: false }),
    }));

    setApprovedDataState(prev => [...prev, ...approvedItems]);
    setPendingData(prev => prev.filter(item => !item.selected));
    setSelectAll(false);
  };

  const handleReject = () => {
    const selectedItems = pendingData.filter(item => item.selected);
    if (selectedItems.length === 0) {
      alert("Please select items to reject");
      return;
    }

    // Remove selected items (rejected items are not kept in this demo)
    setPendingData(prev => prev.filter(item => !item.selected));
    setSelectAll(false);
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Person - Stakeholder Mapping - Approval</h1>
      
      {/* Pending Approvals Section */}
      {pendingData.length > 0 && (
        <div className={styles.section}>
          <div className={styles.tableWrap}>
            <Table className={styles.table}>
              <TableHeader>
                <TableRow>
                  <TableHead className={styles.th}>
                    <Checkbox
                      checked={selectAll}
                      onCheckedChange={handleSelectAll}
                      className={styles.checkbox}
                    />
                    Select
                  </TableHead>
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
                {pendingData.map(row => (
                  <TableRow key={row.id} className={styles.tr}>
                    <TableCell className={styles.td}>
                      <Checkbox
                        checked={row.selected}
                        onCheckedChange={(checked) => handleSelectItem(row.id, checked)}
                        className={styles.checkbox}
                      />
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
                      <span className={`${styles.statusBadge} ${styles.pending}`}>
                        {row.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className={styles.actionButtons}>
            <Button 
              onClick={handleApprove}
              className={styles.approveBtn}
            >
              <Check className={styles.buttonIcon} />
              Approve
            </Button>
            <Button 
              onClick={handleReject}
              variant="outline"
              className={styles.rejectBtn}
            >
              <X className={styles.buttonIcon} />
              Reject
            </Button>
          </div>
        </div>
      )}

      {/* Approved Section */}
      <div className={styles.section}>
        <h2 className={styles.sectionHeading}>Approved</h2>
        
        <div className={styles.tableWrap}>
          <Table className={styles.table}>
            <TableHeader>
              <TableRow>
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
              {approvedDataState.map(row => (
                <TableRow key={row.id} className={styles.tr}>
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
                    <span className={`${styles.statusBadge} ${styles.approved}`}>
                      {row.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}