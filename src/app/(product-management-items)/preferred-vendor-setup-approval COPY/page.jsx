"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./PreferredVendorApproval.module.css";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Check, X } from "lucide-react";

// Demo data for pending approval
const pendingApprovalData = [
  {
    id: 1,
    productId: "10-01-01-01",
    productName: "Khush-haal Kisaan",
    inputType: "Seeds",
    preferredVendor: "Syngenta",
    bankCommission: "2.00",
    createdDate: "10-05-2025 12:45:00",
    lastModifiedDate: "11-05-2025 12:45:00",
    approvedBy: "@Shahzad",
    status: "Pending",
    selected: false,
    // Detailed info for routing
    isPublished: false,
  },
  {
    id: 2,
    productId: "10-01-01-02",
    productName: "Green Future Seeds",
    inputType: "Fertilizer",
    preferredVendor: "AgriCorp",
    bankCommission: "1.50",
    createdDate: "9-05-2025 10:30:00",
    lastModifiedDate: "10-05-2025 14:20:00",
    approvedBy: "@Admin",
    status: "Pending",
    selected: false,
    isPublished: false,
  },
  {
    id: 3,
    productId: "10-01-01-03",
    productName: "Crop Protection",
    inputType: "Pesticides",
    preferredVendor: "Bayer",
    bankCommission: "2.25",
    createdDate: "8-05-2025 14:15:00",
    lastModifiedDate: "9-05-2025 11:45:00",
    approvedBy: "@Shahzad",
    status: "Pending",
    selected: false,
    isPublished: false,
  }
];

// Demo data for approved
const approvedData = [
  {
    id: 10,
    productId: "10-01-01-04",
    productName: "Farm Equipment",
    inputType: "Machinery",
    preferredVendor: "John Deere",
    bankCommission: "1.75",
    createdDate: "7-05-2025 12:45:00",
    lastModifiedDate: "15-05-2025 12:45:00",
    approvedBy: "@Shahzad",
    status: "Approved"
  },
  {
    id: 11,
    productId: "10-01-01-05",
    productName: "Irrigation Systems",
    inputType: "Equipment",
    preferredVendor: "Rain Bird",
    bankCommission: "2.50",
    createdDate: "6-05-2025 10:30:00",
    lastModifiedDate: "14-05-2025 16:20:00",
    approvedBy: "@Admin",
    status: "Approved"
  }
];

export default function PreferredVendorApprovalPage() {
  const router = useRouter();
  const [pendingData, setPendingData] = useState(pendingApprovalData);
  const [approvedDataState, setApprovedDataState] = useState(approvedData);
  const [selectAll, setSelectAll] = useState(false);

  const getPublishedState = (productId) => {
    if (typeof window === "undefined") return false;
    try {
      const raw = localStorage.getItem("vendorPublishedStates") || "{}";
      const map = JSON.parse(raw);
      return !!map[productId];
    } catch {
      return false;
    }
  };

  const handleSelectAll = (checked) => {
    setSelectAll(checked);
    setPendingData(pendingData.map(item => ({ ...item, selected: checked })));
  };

  const handleSelectItem = (id, checked) => {
    setPendingData(pendingData.map(item => 
      item.id === id ? { ...item, selected: checked } : item
    ));
    
    const updatedData = pendingData.map(item => 
      item.id === id ? { ...item, selected: checked } : item
    );
    setSelectAll(updatedData.every(item => item.selected));
  };

  const handleApprove = () => {
    const selectedItems = pendingData.filter(item => item.selected);
    if (selectedItems.length === 0) return;
    
    // Move selected items to approved section
    const approvedItems = selectedItems.map(item => ({
      ...item,
      status: "Approved",
      selected: false,
      lastModifiedDate: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()
    }));
    
    setApprovedDataState([...approvedDataState, ...approvedItems]);
    
    // Remove selected items from pending
    setPendingData(pendingData.filter(item => !item.selected));
    setSelectAll(false);
  };

  const handleReject = () => {
    const selectedItems = pendingData.filter(item => item.selected);
    if (selectedItems.length === 0) return;
    
    // For demo purposes, we'll just remove rejected items
    setPendingData(pendingData.filter(item => !item.selected));
    setSelectAll(false);
  };

  const handleRowClick = (vendor) => {
    // Navigate to detail page with vendor data
    const queryParams = new URLSearchParams({
      productId: vendor.productId,
      productName: vendor.productName,
      inputType: vendor.inputType,
      preferredVendor: vendor.preferredVendor,
      bankCommission: vendor.bankCommission || "2.00",
      createdDate: vendor.createdDate,
      lastModifiedDate: vendor.lastModifiedDate,
      approvedBy: vendor.approvedBy,
      status: vendor.status,
      isPublished: String(getPublishedState(vendor.productId))
    }).toString();
    
    router.push(`/preferred-vendor-setup-approval/${vendor.id}?${queryParams}`);
  };

  const selectedCount = pendingData.filter(item => item.selected).length;

  useEffect(() => {
    if (typeof window === "undefined") return;
    let raw = localStorage.getItem("vendorApprovalUpdates");
    if (!raw) return;
    let updates = [];
    try {
      updates = JSON.parse(raw) || [];
    } catch {
      updates = [];
    }
    if (updates.length === 0) return;

    const byId = new Map();
    updates.forEach(u => {
      byId.set(u.vendorId, u);
    });

    setPendingData(prevPending => {
      let newPending = [...prevPending];
      let movedToApproved = [];

      newPending = newPending.filter(item => {
        const upd = byId.get(item.id);
        if (!upd) return true;
        const isApproved = !!upd.isApproved;
        // persist published
        try {
          const rawMap = localStorage.getItem("vendorPublishedStates") || "{}";
          const map = JSON.parse(rawMap);
          map[item.productId] = !!upd.isPublished;
          localStorage.setItem("vendorPublishedStates", JSON.stringify(map));
        } catch {}

        if (isApproved) {
          movedToApproved.push({
            ...item,
            status: "Approved",
            selected: false,
            lastModifiedDate: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()
          });
          return false; // remove from pending
        }
        // staying in pending, update lastModified
        return true;
      });

      if (movedToApproved.length > 0) {
        setApprovedDataState(prevApproved => [...prevApproved, ...movedToApproved]);
      }

      return newPending;
    });

    setApprovedDataState(prevApproved => {
      let newApproved = [...prevApproved];
      let movedToPending = [];

      newApproved = newApproved.filter(item => {
        const upd = byId.get(item.id);
        if (!upd) return true;
        const isApproved = !!upd.isApproved;
        // persist published
        try {
          const rawMap = localStorage.getItem("vendorPublishedStates") || "{}";
          const map = JSON.parse(rawMap);
          map[item.productId] = !!upd.isPublished;
          localStorage.setItem("vendorPublishedStates", JSON.stringify(map));
        } catch {}

        if (!isApproved) {
          movedToPending.push({
            ...item,
            status: "Pending",
            selected: false,
            lastModifiedDate: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()
          });
          return false; // remove from approved
        }
        return true;
      });

      if (movedToPending.length > 0) {
        setPendingData(prevPending => [...prevPending, ...movedToPending]);
      }

      return newApproved;
    });

    // clear processed updates
    localStorage.removeItem("vendorApprovalUpdates");
  }, []);

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Preferred Vendor Setup - Approval</h1>
      
      {/* Pending Approval Section */}
      <div className={styles.section}>
        <div className={styles.tableWrap}>
          <Table className={styles.table}>
            <TableHeader>
              <TableRow>
                <TableHead className={styles.th}>
                  <Checkbox
                    className={styles.checkbox}
                    checked={selectAll}
                    onCheckedChange={handleSelectAll}
                  />
                  Action
                </TableHead>
                <TableHead className={styles.th}>Product ID</TableHead>
                <TableHead className={styles.th}>Product Name</TableHead>
                <TableHead className={styles.th}>Input Type</TableHead>
                <TableHead className={styles.th}>Preferred Vendor</TableHead>
                <TableHead className={styles.th}>Bank Commission</TableHead>
                <TableHead className={styles.th}>Created date</TableHead>
                <TableHead className={styles.th}>Last Modified date</TableHead>
                <TableHead className={styles.th}>Approved by</TableHead>
                <TableHead className={styles.th}>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingData.map(row => (
                <TableRow key={row.id} className={styles.tr} onClick={() => handleRowClick(row)}>
                  <TableCell className={styles.td} onClick={(e) => e.stopPropagation()}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Checkbox
                        className={styles.checkbox}
                        checked={row.selected}
                        onCheckedChange={(checked) => handleSelectItem(row.id, checked)}
                      />
                      <button 
                        className={styles.viewBtn} 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRowClick(row);
                        }}
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                    </div>
                  </TableCell>
                  <TableCell className={styles.td}>{row.productId}</TableCell>
                  <TableCell className={styles.td}>{row.productName}</TableCell>
                  <TableCell className={styles.td}>{row.inputType}</TableCell>
                  <TableCell className={styles.td}>{row.preferredVendor}</TableCell>
                  <TableCell className={styles.td}>{row.bankCommission}%</TableCell>
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
            className={styles.approveBtn} 
            onClick={handleApprove}
            disabled={selectedCount === 0}
          >
            <Check className={styles.buttonIcon} />
            Approve ({selectedCount})
          </Button>
          <Button 
            variant="outline" 
            className={styles.rejectBtn} 
            onClick={handleReject}
            disabled={selectedCount === 0}
          >
            <X className={styles.buttonIcon} />
            Reject ({selectedCount})
          </Button>
        </div>
      </div>
      
      {/* Approved Section */}
      <div className={styles.section}>
        <h2 className={styles.sectionHeading}>Approved</h2>
        <div className={styles.tableWrap}>
          <Table className={styles.table}>
            <TableHeader>
              <TableRow>
                <TableHead className={styles.th}>Action</TableHead>
                <TableHead className={styles.th}>Product ID</TableHead>
                <TableHead className={styles.th}>Product Name</TableHead>
                <TableHead className={styles.th}>Input Type</TableHead>
                <TableHead className={styles.th}>Preferred Vendor</TableHead>
                <TableHead className={styles.th}>Bank Commission</TableHead>
                <TableHead className={styles.th}>Created date</TableHead>
                <TableHead className={styles.th}>Last Modified date</TableHead>
                <TableHead className={styles.th}>Approved by</TableHead>
                <TableHead className={styles.th}>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {approvedDataState.map(row => (
                <TableRow key={row.id} className={styles.tr} onClick={() => handleRowClick(row)}>
                  <TableCell className={styles.td}>
                    <button className={styles.viewBtn} title="View Details" onClick={(e) => { e.stopPropagation(); handleRowClick(row); }}>
                      <Eye size={16} />
                    </button>
                  </TableCell>
                  <TableCell className={styles.td}>{row.productId}</TableCell>
                  <TableCell className={styles.td}>{row.productName}</TableCell>
                  <TableCell className={styles.td}>{row.inputType}</TableCell>
                  <TableCell className={styles.td}>{row.preferredVendor}</TableCell>
                  <TableCell className={styles.td}>{row.bankCommission}%</TableCell>
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