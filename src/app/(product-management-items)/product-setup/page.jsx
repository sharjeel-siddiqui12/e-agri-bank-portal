"use client";
import { useState } from "react";
import styles from "./ProductSetup.module.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, X } from "lucide-react";

const categoryOptions = [
  { value: "Agriculture", label: "Agriculture" },
  { value: "Livestock", label: "Livestock" },
  { value: "Fisheries", label: "Fisheries" }
];

const subCategoryOptions = [
  { value: "Agri Input Loan", label: "Agri Input Loan" },
  { value: "Crop Loan", label: "Crop Loan" },
  { value: "Equipment Loan", label: "Equipment Loan" },
  { value: "Development Loan", label: "Development Loan" }
];

const agriInputsOptions = [
  { value: "Fertilizer", label: "Fertilizer" },
  { value: "Seeds", label: "Seeds" },
  { value: "Pesticides", label: "Pesticides" },
  { value: "Water", label: "Water" },
  { value: "Labor", label: "Labor" }
];

const cropsOptions = [
  { value: "Wheat", label: "Wheat" },
  { value: "Maize", label: "Maize" },
  { value: "Rice", label: "Rice" },
  { value: "Cotton", label: "Cotton" },
  { value: "Sugarcane", label: "Sugarcane" }
];

const locationOptions = [
  { value: "Punjab", label: "Punjab" },
  { value: "Sindh", label: "Sindh" },
  { value: "KPK", label: "KPK" },
  { value: "Balochistan", label: "Balochistan" }
];

const loanTermOptions = [
  { value: "3 Months", label: "3 Months" },
  { value: "6 Months", label: "6 Months" },
  { value: "12 Months", label: "12 Months" },
  { value: "24 Months", label: "24 Months" }
];

const interestModeOptions = [
  { value: "Flat Interest", label: "Flat Interest" },
  { value: "Reducing Balance", label: "Reducing Balance" },
  { value: "Simple Interest", label: "Simple Interest" }
];

const interestTenureOptions = [
  { value: "Crop Cycle", label: "Crop Cycle" },
  { value: "Monthly", label: "Monthly" },
  { value: "Quarterly", label: "Quarterly" }
];

const securityStatusOptions = [
  { value: "No Collateral", label: "No Collateral" },
  { value: "Collateral Required", label: "Collateral Required" },
  { value: "Guarantor Required", label: "Guarantor Required" }
];

const chargeOptions = [
  { value: "1st charge on underlying crops", label: "1st charge on underlying crops" },
  { value: "2nd charge on underlying crops", label: "2nd charge on underlying crops" },
  { value: "No charge", label: "No charge" }
];

const repaymentCycleOptions = [
  { value: "Once", label: "Once" },
  { value: "Monthly", label: "Monthly" },
  { value: "Quarterly", label: "Quarterly" }
];

const documentsOptions = [
  { value: "CNIC Front", label: "CNIC Front" },
  { value: "CNIC Back", label: "CNIC Back" },
  { value: "Zarai Passbook", label: "Zarai Passbook" },
  { value: "Fard Intiqaal", label: "Fard Intiqaal" },
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
    createdDate: "9-05-2025 12:45:00",
    lastModifiedDate: "15-05-2025 12:45:00",
    approvedBy: "@Shahzad",
    status: "Approved"
  }
];

export default function ProductSetupPage() {
  const [tableData, setTableData] = useState(initialTableData);
  const [selectedAgriInputs, setSelectedAgriInputs] = useState(['Fertilizer', 'Seeds', 'Pesticides']);
  const [selectedCrops, setSelectedCrops] = useState(['Wheat', 'Maize', 'Pesticides']);
  const [selectedLocations, setSelectedLocations] = useState(['Punjab', 'Sindh']);
  const [selectedDocuments, setSelectedDocuments] = useState(['CNIC Front', 'CNIC Back', 'Zarai Passbook', 'Fard Intiqaal', 'Khasra Girdawari', 'Tenancy Agreement', 'Aks Shajra']);
  
  const [formData, setFormData] = useState({
    bankCode: "Mobilink Micro Finance Bank",
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
    charge: "1st charge on underlying crops",
    repaymentCycle: "Once",
    bankProcessingFee: "2",
    offerValidDate: "Dec 25, 2025"
  });

  const handleAgriInputSelect = (value) => {
    if (!selectedAgriInputs.includes(value)) {
      setSelectedAgriInputs([...selectedAgriInputs, value]);
    }
  };

  const removeAgriInput = (inputToRemove) => {
    setSelectedAgriInputs(selectedAgriInputs.filter(input => input !== inputToRemove));
  };

  const handleCropSelect = (value) => {
    if (!selectedCrops.includes(value)) {
      setSelectedCrops([...selectedCrops, value]);
    }
  };

  const removeCrop = (cropToRemove) => {
    setSelectedCrops(selectedCrops.filter(crop => crop !== cropToRemove));
  };

  const handleLocationSelect = (value) => {
    if (!selectedLocations.includes(value)) {
      setSelectedLocations([...selectedLocations, value]);
    }
  };

  const removeLocation = (locationToRemove) => {
    setSelectedLocations(selectedLocations.filter(location => location !== locationToRemove));
  };

  const handleDocumentSelect = (value) => {
    if (!selectedDocuments.includes(value)) {
      setSelectedDocuments([...selectedDocuments, value]);
    }
  };

  const removeDocument = (docToRemove) => {
    setSelectedDocuments(selectedDocuments.filter(doc => doc !== docToRemove));
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Get current timestamp
    const currentDate = new Date();
    const timestamp = `${String(currentDate.getDate()).padStart(2, '0')}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${currentDate.getFullYear()} ${String(currentDate.getHours()).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')}:${String(currentDate.getSeconds()).padStart(2, '0')}`;
    
    const newEntry = {
      id: tableData.length + 1,
      productId: `10-01-01-${String(tableData.length + 1).padStart(2, '0')}`,
      category: formData.category,
      subCategory: formData.subCategory,
      interest: formData.interestRate + "%",
      tenure: formData.interestTenure,
      securityStatus: formData.securityStatus,
      createdDate: timestamp,
      lastModifiedDate: timestamp,
      approvedBy: "@CurrentUser",
      status: "Pending"
    };
    
    setTableData([...tableData, newEntry]);
    
    // Reset form but keep some default values
    handleCancel();
  };

  const handleCancel = () => {
    setFormData({
      bankCode: "Mobilink Micro Finance Bank",
      productName: "",
      category: "",
      subCategory: "",
      loanTerm: "",
      minValue: "",
      maxValue: "",
      interestMode: "",
      interestRate: "",
      interestTenure: "",
      securityStatus: "",
      charge: "",
      repaymentCycle: "",
      bankProcessingFee: "",
      offerValidDate: ""
    });
    setSelectedAgriInputs([]);
    setSelectedCrops([]);
    setSelectedLocations([]);
    setSelectedDocuments([]);
  };

  const handleEdit = (id) => {
    console.log("Edit product with ID:", id);
    // Add edit functionality here if needed
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Loan Product Setup</h1>
      
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.grid}>
          <div className={styles.formRow}>
            <Label className={styles.label}>Bank Code and Name</Label>
            <Input 
              className={`${styles.input} ${styles.inputDisabled}`}
              value={formData.bankCode}
              disabled 
              readOnly
            />
          </div>
          
          <div className={styles.formRow}>
            <Label className={styles.label}>Product Name</Label>
            <Input 
              className={styles.input}
              value={formData.productName}
              onChange={(e) => handleChange("productName", e.target.value)}
              placeholder="Product Name"
            />
          </div>
          
          <div className={styles.formRow}>
            <Label className={styles.label}>Category</Label>
            <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
              <SelectTrigger className={styles.input}>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categoryOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className={styles.formRow}>
            <Label className={styles.label}>Sub-Category</Label>
            <Select value={formData.subCategory} onValueChange={(value) => handleChange("subCategory", value)}>
              <SelectTrigger className={styles.input}>
                <SelectValue placeholder="Select sub-category" />
              </SelectTrigger>
              <SelectContent>
                {subCategoryOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className={styles.formRow}>
            <Label className={styles.label}>Eligible Agri Inputs</Label>
            <div className={styles.multiSelectContainer}>
              <Select onValueChange={handleAgriInputSelect}>
                <SelectTrigger className={styles.input}>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {agriInputsOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className={styles.tagsContainer}>
                {selectedAgriInputs.map(input => (
                  <div key={input} className={styles.tag}>
                    {input}
                    <button
                      type="button"
                      className={styles.removeTagBtn}
                      onClick={() => removeAgriInput(input)}
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className={styles.formRow}>
            <Label className={styles.label}>Eligible Crops</Label>
            <div className={styles.multiSelectContainer}>
              <Select onValueChange={handleCropSelect}>
                <SelectTrigger className={styles.input}>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {cropsOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className={styles.tagsContainer}>
                {selectedCrops.map(crop => (
                  <div key={crop} className={styles.tag}>
                    {crop}
                    <button
                      type="button"
                      className={styles.removeTagBtn}
                      onClick={() => removeCrop(crop)}
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className={styles.formRow}>
            <Label className={styles.label}>Geolocation</Label>
            <div className={styles.multiSelectContainer}>
              <Select onValueChange={handleLocationSelect}>
                <SelectTrigger className={styles.input}>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {locationOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className={styles.tagsContainer}>
                {selectedLocations.map(location => (
                  <div key={location} className={styles.tag}>
                    {location}
                    <button
                      type="button"
                      className={styles.removeTagBtn}
                      onClick={() => removeLocation(location)}
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className={styles.formRow}>
            <Label className={styles.label}>Loan Term</Label>
            <Select value={formData.loanTerm} onValueChange={(value) => handleChange("loanTerm", value)}>
              <SelectTrigger className={styles.input}>
                <SelectValue placeholder="Select loan term" />
              </SelectTrigger>
              <SelectContent>
                {loanTermOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className={styles.formRow}>
            <Label className={styles.label}>Loan Minimum Value</Label>
            <div className={styles.amountRow}>
              <Input 
                className={`${styles.input} ${styles.amountInput}`}
                value={formData.minValue}
                onChange={(e) => handleChange("minValue", e.target.value)}
                placeholder="100,000"
              />
              <div className={styles.currencyLabel}>PKR</div>
            </div>
          </div>
          
          <div className={styles.formRow}>
            <Label className={styles.label}>Loan Maximum Value</Label>
            <div className={styles.amountRow}>
              <Input 
                className={`${styles.input} ${styles.amountInput}`}
                value={formData.maxValue}
                onChange={(e) => handleChange("maxValue", e.target.value)}
                placeholder="1,000,000"
              />
              <div className={styles.currencyLabel}>PKR</div>
            </div>
          </div>
          
          <div className={styles.formRow}>
            <Label className={styles.label}>Interest Mode</Label>
            <Select value={formData.interestMode} onValueChange={(value) => handleChange("interestMode", value)}>
              <SelectTrigger className={styles.input}>
                <SelectValue placeholder="Select interest mode" />
              </SelectTrigger>
              <SelectContent>
                {interestModeOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className={styles.formRow}>
            <Label className={styles.label}>Interest Rate</Label>
            <div className={styles.percentRow}>
              <Input 
                className={`${styles.input} ${styles.percentInput}`}
                value={formData.interestRate}
                onChange={(e) => handleChange("interestRate", e.target.value)}
                placeholder="8"
                type="number"
              />
              <div className={styles.percentLabel}>%</div>
            </div>
          </div>
          
          <div className={styles.formRow}>
            <Label className={styles.label}>Interest Tenure</Label>
            <Select value={formData.interestTenure} onValueChange={(value) => handleChange("interestTenure", value)}>
              <SelectTrigger className={styles.input}>
                <SelectValue placeholder="Select interest tenure" />
              </SelectTrigger>
              <SelectContent>
                {interestTenureOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className={styles.formRow}>
            <Label className={styles.label}>Security Status</Label>
            <Select value={formData.securityStatus} onValueChange={(value) => handleChange("securityStatus", value)}>
              <SelectTrigger className={styles.input}>
                <SelectValue placeholder="Select security status" />
              </SelectTrigger>
              <SelectContent>
                {securityStatusOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className={styles.formRow}>
            <Label className={styles.label}>Charge</Label>
            <Select value={formData.charge} onValueChange={(value) => handleChange("charge", value)}>
              <SelectTrigger className={styles.input}>
                <SelectValue placeholder="Select charge" />
              </SelectTrigger>
              <SelectContent>
                {chargeOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className={styles.formRow}>
            <Label className={styles.label}>Repayment Cycle</Label>
            <Select value={formData.repaymentCycle} onValueChange={(value) => handleChange("repaymentCycle", value)}>
              <SelectTrigger className={styles.input}>
                <SelectValue placeholder="Select repayment cycle" />
              </SelectTrigger>
              <SelectContent>
                {repaymentCycleOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className={styles.formRow}>
            <Label className={styles.label}>Bank Processing Fee</Label>
            <div className={styles.percentRow}>
              <Input 
                className={`${styles.input} ${styles.percentInput}`}
                value={formData.bankProcessingFee}
                onChange={(e) => handleChange("bankProcessingFee", e.target.value)}
                placeholder="2"
                type="number"
              />
              <div className={styles.percentLabel}>%</div>
            </div>
          </div>
          
          <div className={styles.formRow}>
            <Label className={styles.label}>Offer Valid Date:</Label>
            <Input 
              className={styles.input}
              value={formData.offerValidDate}
              onChange={(e) => handleChange("offerValidDate", e.target.value)}
              placeholder="Dec 25, 2025"
              type="date"
            />
          </div>
          
          <div className={styles.formRowFull}>
            <Label className={styles.label}>Documents Required</Label>
            <div className={styles.multiSelectContainer}>
              <Select onValueChange={handleDocumentSelect}>
                <SelectTrigger className={styles.input}>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {documentsOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className={styles.tagsContainer}>
                {selectedDocuments.map(doc => (
                  <div key={doc} className={styles.tag}>
                    {doc}
                    <button
                      type="button"
                      className={styles.removeTagBtn}
                      onClick={() => removeDocument(doc)}
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
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
                  <button 
                    className={styles.editBtn} 
                    onClick={() => handleEdit(row.id)}
                    title="Edit"
                  >
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
