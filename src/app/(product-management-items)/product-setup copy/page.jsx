"use client";

import { useMemo, useState } from "react";
import styles from "./ProductSetup.module.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, X } from "lucide-react";

const categoryOptions = [
  { value: "Agriculture", label: "Agriculture" },
  { value: "Livestock", label: "Livestock" }
];

const subCategoryOptions = [
  { value: "Agri Input Loan", label: "Agri Input Loan" },
  { value: "Development Loan", label: "Development Loan" }
];

const loanTermOptions = [
  { value: "3 Months", label: "3 Months" },
  { value: "6 Months", label: "6 Months" },
  { value: "12 Months", label: "12 Months" }
];

const interestModeOptions = [
  { value: "Flat Interest", label: "Flat Interest" },
  { value: "Markup", label: "Markup" }
];

const interestTenureOptions = [
  { value: "Crop Cycle", label: "Crop Cycle" },
  { value: "Monthly", label: "Monthly" }
];

const securityStatusOptions = [
  { value: "No Collateral", label: "No Collateral" },
  { value: "Collateral", label: "Collateral" }
];

const repaymentCycleOptions = [
  { value: "Once", label: "Once" },
  { value: "Monthly", label: "Monthly" },
  { value: "Quarterly", label: "Quarterly" }
];

const chargeOptions = [
  { value: "1st charge on underlying crops", label: "1st charge on underlying crops" },
  { value: "2nd charge on underlying crops", label: "2nd charge on underlying crops" }
];

const agriInputOptions = [
  { value: "Fertilizer", label: "Fertilizer" },
  { value: "Seeds", label: "Seeds" },
  { value: "Pesticides", label: "Pesticides" }
];

const cropOptions = [
  { value: "Wheat", label: "Wheat" },
  { value: "Maize", label: "Maize" },
  { value: "Cotton", label: "Cotton" },
  { value: "Pesticides", label: "Pesticides" }
];

const provinceOptions = [
  { value: "Punjab", label: "Punjab" },
  { value: "Sindh", label: "Sindh" },
  { value: "KPK", label: "KPK" },
  { value: "Balochistan", label: "Balochistan" }
];

const documentOptions = [
  { value: "CNIC Front", label: "CNIC Front" },
  { value: "CNIC Back", label: "CNIC Back" },
  { value: "Zarai Passbook", label: "Zarai Passbook" },
  { value: "Fard Inteqal", label: "Fard Inteqal" },
  { value: "Khasra Girdawari", label: "Khasra Girdawari" },
  { value: "Tenancy Agreement", label: "Tenancy Agreement" },
  { value: "Aks Shajra", label: "Aks Shajra" }
];

const initialTableData = [
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
    status: "Pending"
  },
  {
    id: 2,
    productId: "10-01-01-02",
    category: "Agriculture",
    subCategory: "Development Loan",
    interest: "10%",
    tenure: "Crop Cycle",
    securityStatus: "No Collateral",
    createdDate: "09-05-2025 12:45:00",
    lastModifiedDate: "15-05-2025 12:45:00",
    approvedBy: "@Shahzad",
    status: "Approved"
  }
];

export default function ProductSetupPage() {
  const [tableData, setTableData] = useState(initialTableData);
  const [eligibleInputs, setEligibleInputs] = useState(["Fertilizer", "Seeds", "Pesticides"]);
  const [eligibleCrops, setEligibleCrops] = useState(["Wheat", "Maize", "Pesticides"]);
  const [geoLocations, setGeoLocations] = useState(["Punjab", "Sindh"]);
  const [documents, setDocuments] = useState(["CNIC Front", "CNIC Back", "Zarai Passbook", "Fard Inteqal", "Khasra Girdawari", "Tenancy Agreement", "Aks Shajra"]);

  const [formData, setFormData] = useState({
    bank: "Mobilink Micro Finance Bank",
    productName: "Khush-haal Kisaan",
    category: "Agriculture",
    subCategory: "Agri Input Loan",
    loanTerm: "6 Months",
    minValue: "100,000",
    maxValue: "1,000,000",
    interestMode: "Flat Interest",
    interestRate: "8",
    interestTenure: "Crop Cycle",
    securityStatus: "No Collateral",
    repaymentCycle: "Once",
    charge: "1st charge on underlying crops",
    bankProcessingFee: "2",
    offerValidDate: "2025-12-25"
  });

  const nextProductId = useMemo(() => {
    const last = tableData[tableData.length - 1]?.productId || "10-01-01-00";
    const prefix = last.slice(0, last.lastIndexOf("-") + 1);
    const num = parseInt(last.split("-").pop() || "0", 10) + 1;
    return `${prefix}${String(num).padStart(2, "0")}`;
  }, [tableData]);

  const handleTagSelect = (setter, current, value) => {
    if (!current.includes(value)) setter([...current, value]);
  };

  const handleTagRemove = (setter, current, value) => {
    setter(current.filter(v => v !== value));
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const now = new Date();
    const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const timeStr = now.toLocaleTimeString('en-GB', { hour12: false });

    const newRow = {
      id: tableData.length + 1,
      productId: nextProductId,
      category: formData.category,
      subCategory: formData.subCategory,
      interest: `${formData.interestRate}%`,
      tenure: formData.interestTenure,
      securityStatus: formData.securityStatus,
      createdDate: `${dateStr} ${timeStr}`,
      lastModifiedDate: `${dateStr} ${timeStr}`,
      approvedBy: "@Shahzad",
      status: "Pending"
    };

    setTableData(prev => [...prev, newRow]);
    handleCancel();
  };

  const handleCancel = () => {
    setFormData({
      bank: "Mobilink Micro Finance Bank",
      productName: "",
      category: "Agriculture",
      subCategory: "Agri Input Loan",
      loanTerm: "6 Months",
      minValue: "",
      maxValue: "",
      interestMode: "Flat Interest",
      interestRate: "8",
      interestTenure: "Crop Cycle",
      securityStatus: "No Collateral",
      repaymentCycle: "Once",
      charge: "1st charge on underlying crops",
      bankProcessingFee: "2",
      offerValidDate: "2025-12-25"
    });
    setEligibleInputs([]);
    setEligibleCrops([]);
    setGeoLocations([]);
    setDocuments([]);
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Loan Product Setup</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.grid}>
          {/* Left column */}
          <div className={styles.col}>
            <div className={styles.formRow}>
              <Label className={styles.label}>Bank Code and Name</Label>
              <Input className={`${styles.input} ${styles.inputDisabled}`} value={formData.bank} readOnly disabled />
            </div>

            <div className={styles.formRow}>
              <Label className={styles.label}>Category</Label>
              <Select value={formData.category} onValueChange={(v)=>handleChange('category', v)}>
                <SelectTrigger className={styles.input}>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map(o=> (
                    <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className={styles.formRow}>
              <Label className={styles.label}>Eligible Agri Inputs</Label>
              <div className={styles.tagSelectWrap}>
                <Select onValueChange={(v)=>handleTagSelect(setEligibleInputs, eligibleInputs, v)}>
                  <SelectTrigger className={styles.input}>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {agriInputOptions.map(o=> (
                      <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {eligibleInputs.length>0 && (
                  <div className={styles.tags}>
                    {eligibleInputs.map(tag=> (
                      <div className={styles.tag} key={tag}>
                        <span>{tag}</span>
                        <button type="button" className={styles.removeTagBtn} onClick={()=>handleTagRemove(setEligibleInputs, eligibleInputs, tag)}>
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className={styles.formRow}>
              <Label className={styles.label}>Geolocation</Label>
              <div className={styles.tagSelectWrap}>
                <Select onValueChange={(v)=>handleTagSelect(setGeoLocations, geoLocations, v)}>
                  <SelectTrigger className={styles.input}>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {provinceOptions.map(o=> (
                      <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {geoLocations.length>0 && (
                  <div className={styles.tags}>
                    {geoLocations.map(tag=> (
                      <div className={styles.tag} key={tag}>
                        <span>{tag}</span>
                        <button type="button" className={styles.removeTagBtn} onClick={()=>handleTagRemove(setGeoLocations, geoLocations, tag)}>
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className={styles.formRow}>
              <Label className={styles.label}>Loan Minimum Value</Label>
              <div className={styles.inputWithSuffix}>
                <Input className={styles.input} value={formData.minValue} onChange={(e)=>handleChange('minValue', e.target.value)} placeholder="100,000" />
                <span className={styles.suffix}>PKR</span>
              </div>
            </div>

            <div className={styles.formRow}>
              <Label className={styles.label}>Interest Mode</Label>
              <Select value={formData.interestMode} onValueChange={(v)=>handleChange('interestMode', v)}>
                <SelectTrigger className={styles.input}>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {interestModeOptions.map(o=> (
                    <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className={styles.formRow}>
              <Label className={styles.label}>Interest Tenure</Label>
              <Select value={formData.interestTenure} onValueChange={(v)=>handleChange('interestTenure', v)}>
                <SelectTrigger className={styles.input}>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {interestTenureOptions.map(o=> (
                    <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className={styles.formRow}>
              <Label className={styles.label}>Charge</Label>
              <Select value={formData.charge} onValueChange={(v)=>handleChange('charge', v)}>
                <SelectTrigger className={styles.input}>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {chargeOptions.map(o=> (
                    <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className={styles.formRow}>
              <Label className={styles.label}>Bank Processing Fee</Label>
              <div className={styles.inputWithSuffix}>
                <Input className={styles.input} value={formData.bankProcessingFee} onChange={(e)=>handleChange('bankProcessingFee', e.target.value)} placeholder="0" type="number" />
                <span className={styles.suffix}>%</span>
              </div>
            </div>

            <div className={styles.formRow}>
              <Label className={styles.label}>Documents Required</Label>
              <div className={styles.tagSelectWrap}>
                <Select onValueChange={(v)=>handleTagSelect(setDocuments, documents, v)}>
                  <SelectTrigger className={styles.input}>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {documentOptions.map(o=> (
                      <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {documents.length>0 && (
                  <div className={styles.tags}>
                    {documents.map(tag=> (
                      <div className={styles.tag} key={tag}>
                        <span>{tag}</span>
                        <button type="button" className={styles.removeTagBtn} onClick={()=>handleTagRemove(setDocuments, documents, tag)}>
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className={styles.col}>
            <div className={styles.formRow}>
              <Label className={styles.label}>Product Name</Label>
              <Input className={styles.input} value={formData.productName} onChange={(e)=>handleChange('productName', e.target.value)} placeholder="Enter product name" />
            </div>

            <div className={styles.formRow}>
              <Label className={styles.label}>Sub-Category</Label>
              <Select value={formData.subCategory} onValueChange={(v)=>handleChange('subCategory', v)}>
                <SelectTrigger className={styles.input}>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {subCategoryOptions.map(o=> (
                    <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className={styles.formRow}>
              <Label className={styles.label}>Eligible Crops</Label>
              <div className={styles.tagSelectWrap}>
                <Select onValueChange={(v)=>handleTagSelect(setEligibleCrops, eligibleCrops, v)}>
                  <SelectTrigger className={styles.input}>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {cropOptions.map(o=> (
                      <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {eligibleCrops.length>0 && (
                  <div className={styles.tags}>
                    {eligibleCrops.map(tag=> (
                      <div className={styles.tag} key={tag}>
                        <span>{tag}</span>
                        <button type="button" className={styles.removeTagBtn} onClick={()=>handleTagRemove(setEligibleCrops, eligibleCrops, tag)}>
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className={styles.formRow}>
              <Label className={styles.label}>Loan Term</Label>
              <Select value={formData.loanTerm} onValueChange={(v)=>handleChange('loanTerm', v)}>
                <SelectTrigger className={styles.input}>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {loanTermOptions.map(o=> (
                    <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className={styles.formRow}>
              <Label className={styles.label}>Loan Maximum Value</Label>
              <div className={styles.inputWithSuffix}>
                <Input className={styles.input} value={formData.maxValue} onChange={(e)=>handleChange('maxValue', e.target.value)} placeholder="1,000,000" />
                <span className={styles.suffix}>PKR</span>
              </div>
            </div>

            <div className={styles.formRow}>
              <Label className={styles.label}>Interest Rate</Label>
              <div className={styles.inputWithSuffix}>
                <Input className={styles.input} value={formData.interestRate} onChange={(e)=>handleChange('interestRate', e.target.value)} placeholder="0" type="number" />
                <span className={styles.suffix}>%</span>
              </div>
            </div>

            <div className={styles.formRow}>
              <Label className={styles.label}>Security Status</Label>
              <Select value={formData.securityStatus} onValueChange={(v)=>handleChange('securityStatus', v)}>
                <SelectTrigger className={styles.input}>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {securityStatusOptions.map(o=> (
                    <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className={styles.formRow}>
              <Label className={styles.label}>Repayment Cycle</Label>
              <Select value={formData.repaymentCycle} onValueChange={(v)=>handleChange('repaymentCycle', v)}>
                <SelectTrigger className={styles.input}>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {repaymentCycleOptions.map(o=> (
                    <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className={styles.formRow}>
              <Label className={styles.label}>Offer Valid Date:</Label>
              <Input className={styles.input} value={formData.offerValidDate} onChange={(e)=>handleChange('offerValidDate', e.target.value)} type="date" />
            </div>
          </div>
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
            {tableData.map(row => (
              <TableRow key={row.id} className={styles.tr}>
                <TableCell className={`${styles.td} ${styles.actionTd}`}>
                  <button className={styles.editBtn} title="Edit">
                    <Pencil size={16} />
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
                  <span className={`${styles.statusBadge} ${row.status === "Approved" ? styles.approved : styles.pending}`}>{row.status}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}


