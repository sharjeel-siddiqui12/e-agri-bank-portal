"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./ProductApproval.module.css";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Check, X } from "lucide-react";

// Demo data for pending approval
const pendingApprovalData = [
  {
    id: 1,
    productId: "10-01-01-01",
    category: "Agriculture",
    subCategory: "Agri-Input Loan",
    interest: "8%",
    tenure: "Crop Cycle",
    securityStatus: "No Collateral",
    createdDate: "10-05-2025 12:45:00",
    lastModifiedDate: "11-05-2025 12:45:00",
    approvedBy: "@Shahzad",
    status: "Pending",
    selected: false,
    // Detailed info for routing
    bankName: "Mobilink Micro Finance Bank",
    productName: "Khush-haal Kisaan",
    eligibleAgriInputs: "Fertilizer, Seeds, Pesticides",
    eligibleCrops: "Wheat, Maize, Pesticides",
    geolocation: "Punjab, Sindh",
    loanTerm: "6 Months",
    minValue: "100,000",
    maxValue: "1,500,000 PKR",
    interestMode: "Fixed",
    interestRate: "8%",
    interestTenure: "Crop Cycle",
    charge: "1st charge on underlying crops",
    bankProcessingFee: "2%",
    repaymentCycle: "Once",
    offerValidDate: "Dec 25, 2025",
    documentsRequired: [
      "CNIC Front",
      "CNIC Back",
      "Zarai Passbook",
      "Fard Intiqaal",
      "Khasra Girdawari",
      "Tenancy Agreement",
      "Aks Shajra"
    ]
  },
  {
    id: 2,
    productId: "10-01-01-03",
    category: "Agriculture",
    subCategory: "Equipment Loan",
    interest: "12%",
    tenure: "Crop Cycle",
    securityStatus: "Collateral Required",
    createdDate: "10-05-2025 14:30:00",
    lastModifiedDate: "11-05-2025 15:20:00",
    approvedBy: "@Admin",
    status: "Pending",
    selected: false,
    // Detailed info for routing
    bankName: "UBL Bank",
    productName: "Kamiyab Equipment",
    eligibleAgriInputs: "Machinery, Tools, Equipment",
    eligibleCrops: "All Crops",
    geolocation: "All Pakistan",
    loanTerm: "24 Months",
    minValue: "500,000",
    maxValue: "5,000,000 PKR",
    interestMode: "Reducing Balance",
    interestRate: "12%",
    interestTenure: "Monthly",
    charge: "1st charge on equipment",
    bankProcessingFee: "1.5%",
    repaymentCycle: "Monthly",
    offerValidDate: "Dec 31, 2025",
    documentsRequired: [
      "CNIC Front",
      "CNIC Back",
      "Bank Statements",
      "Income Certificate",
      "Equipment Quotation"
    ]
  }
];

// Demo data for approved products
const approvedData = [
  {
    id: 10,
    productId: "10-01-01-02",
    category: "Agriculture",
    subCategory: "Development Loan",
    interest: "10%",
    tenure: "Crop Cycle",
    securityStatus: "No Collateral",
    createdDate: "9-05-2025 12:45:00",
    lastModifiedDate: "15-05-2025 12:45:00",
    approvedBy: "@Shahzad",
    status: "Approved"
  },
  {
    id: 11,
    productId: "10-01-01-04",
    category: "Agriculture",
    subCategory: "Crop Loan",
    interest: "9%",
    tenure: "Crop Cycle",
    securityStatus: "No Collateral",
    createdDate: "8-05-2025 10:30:00",
    lastModifiedDate: "14-05-2025 16:20:00",
    approvedBy: "@Admin",
    status: "Approved"
  },
  {
    id: 12,
    productId: "10-01-01-05",
    category: "Livestock",
    subCategory: "Cattle Loan",
    interest: "11%",
    tenure: "Annual",
    securityStatus: "Collateral Required",
    createdDate: "7-05-2025 14:15:00",
    lastModifiedDate: "13-05-2025 11:45:00",
    approvedBy: "@Shahzad",
    status: "Approved"
  }
];

export default function ProductApprovalPage() {
  const router = useRouter();
  const [pendingData, setPendingData] = useState(pendingApprovalData);
  const [approvedDataState, setApprovedDataState] = useState(approvedData);
  const [selectAll, setSelectAll] = useState(false);

  const getPublishedState = (productId) => {
    if (typeof window === "undefined") return false;
    try {
      const raw = localStorage.getItem("productPublishedStates") || "{}";
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

  const handleRowClick = (product) => {
    // Navigate to detail page with product data
    const queryParams = new URLSearchParams({
      productId: product.productId,
      bankName: product.bankName || '',
      productName: product.productName || '',
      category: product.category,
      subCategory: product.subCategory,
      eligibleAgriInputs: product.eligibleAgriInputs || '',
      eligibleCrops: product.eligibleCrops || '',
      geolocation: product.geolocation || '',
      loanTerm: product.loanTerm || '',
      minValue: product.minValue || '',
      maxValue: product.maxValue || '',
      interestMode: product.interestMode || '',
      interestRate: product.interestRate || product.interest,
      interestTenure: product.interestTenure || product.tenure,
      securityStatus: product.securityStatus,
      charge: product.charge || '',
      bankProcessingFee: product.bankProcessingFee || '',
      repaymentCycle: product.repaymentCycle || '',
      offerValidDate: product.offerValidDate || '',
      documentsRequired: JSON.stringify(product.documentsRequired || []),
      status: product.status,
      isPublished: String(getPublishedState(product.productId))
    }).toString();
    
    router.push(`/product-approval/${product.productId}?${queryParams}`);
  };

  const selectedCount = pendingData.filter(item => item.selected).length;

  useEffect(() => {
    if (typeof window === "undefined") return;
    let raw = localStorage.getItem("productApprovalUpdates");
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
      byId.set(u.productId, u);
    });

    setPendingData(prevPending => {
      let newPending = [...prevPending];
      let movedToApproved = [];

      newPending = newPending.filter(item => {
        const upd = byId.get(item.productId);
        if (!upd) return true;
        const isApproved = !!upd.isApproved;
        // persist published
        try {
          const rawMap = localStorage.getItem("productPublishedStates") || "{}";
          const map = JSON.parse(rawMap);
          map[item.productId] = !!upd.isPublished;
          localStorage.setItem("productPublishedStates", JSON.stringify(map));
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
        const upd = byId.get(item.productId);
        if (!upd) return true;
        const isApproved = !!upd.isApproved;
        // persist published
        try {
          const rawMap = localStorage.getItem("productPublishedStates") || "{}";
          const map = JSON.parse(rawMap);
          map[item.productId] = !!upd.isPublished;
          localStorage.setItem("productPublishedStates", JSON.stringify(map));
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
    localStorage.removeItem("productApprovalUpdates");
  }, []);

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Loan Product - Approval</h1>
      
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
                <TableHead className={styles.th}>Category</TableHead>
                <TableHead className={styles.th}>Sub-Category</TableHead>
                <TableHead className={styles.th}>Interest</TableHead>
                <TableHead className={styles.th}>Tenure</TableHead>
                <TableHead className={styles.th}>Security Status</TableHead>
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
                  <TableCell className={styles.td}>{row.category}</TableCell>
                  <TableCell className={styles.td}>{row.subCategory}</TableCell>
                  <TableCell className={styles.td}>{row.interest}</TableCell>
                  <TableCell className={styles.td}>{row.tenure}</TableCell>
                  <TableCell className={styles.td}>{row.securityStatus}</TableCell>
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
                <TableHead className={styles.th}>Category</TableHead>
                <TableHead className={styles.th}>Sub-Category</TableHead>
                <TableHead className={styles.th}>Interest</TableHead>
                <TableHead className={styles.th}>Tenure</TableHead>
                <TableHead className={styles.th}>Security Status</TableHead>
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
                  <TableCell className={styles.td}>{row.category}</TableCell>
                  <TableCell className={styles.td}>{row.subCategory}</TableCell>
                  <TableCell className={styles.td}>{row.interest}</TableCell>
                  <TableCell className={styles.td}>{row.tenure}</TableCell>
                  <TableCell className={styles.td}>{row.securityStatus}</TableCell>
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