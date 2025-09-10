"use client";
import React, { useState } from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import styles from "./kycMappingApproval.module.css";

const pendingApprovalData = [
  {
    id: 1,
    docId: "5",
    documentName: "Agriculture Passbook",
    maxUploadSize: "5",
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
    docId: "1",
    documentName: "CNIC- Front",
    maxUploadSize: "5",
    activeStatus: "Yes",
    createdDate: "01-01-2025 12:00:00",
    lastModifiedDate: "01-01-2025 12:00:00",
    approvedBy: "@Shahzad",
    status: "Approved"
  },
  {
    id: 2,
    docId: "2",
    documentName: "CNIC- Back",
    maxUploadSize: "5",
    activeStatus: "Yes",
    createdDate: "01-01-2025 12:00:00",
    lastModifiedDate: "01-01-2025 12:00:00",
    approvedBy: "@Shahzad",
    status: "Approved"
  }
];

export default function KYCDocumentSetupApprovalPage() {
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
      <h1 className={styles.heading}>KYC Document Setup - Approve</h1>
      
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
                  <TableHead className={styles.th}>Doc ID</TableHead>
                  <TableHead className={styles.th}>Document Name</TableHead>
                  <TableHead className={styles.th}>Max Upload Size (MBs)</TableHead>
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
                    <TableCell className={styles.td}>{row.docId}</TableCell>
                    <TableCell className={styles.td}>{row.documentName}</TableCell>
                    <TableCell className={styles.td}>{row.maxUploadSize}</TableCell>
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
              Approve
            </Button>
            <Button 
              onClick={handleReject}
              variant="outline"
              className={styles.rejectBtn}
            >
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
                <TableHead className={styles.th}>Doc ID</TableHead>
                <TableHead className={styles.th}>Document Name</TableHead>
                <TableHead className={styles.th}>Max Upload Size (MBs)</TableHead>
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
                  <TableCell className={styles.td}>{row.docId}</TableCell>
                  <TableCell className={styles.td}>{row.documentName}</TableCell>
                  <TableCell className={styles.td}>{row.maxUploadSize}</TableCell>
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
