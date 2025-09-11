"use client";
import { useState } from "react";
import styles from "./FarmerRegistrationRequest.module.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const genderOptions = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" }
];

const maritalStatusOptions = [
  { value: "Single", label: "Single" },
  { value: "Married", label: "Married" },
  { value: "Divorced", label: "Divorced" }
];

const provinceOptions = [
  { value: "Punjab", label: "Punjab" },
  { value: "Sindh", label: "Sindh" },
  { value: "KPK", label: "KPK" },
  { value: "Balochistan", label: "Balochistan" }
];

const tehsilOptions = [
  { value: "Lahore", label: "Lahore" },
  { value: "Karachi", label: "Karachi" },
  { value: "Peshawar", label: "Peshawar" },
  { value: "Quetta", label: "Quetta" }
];

export default function OnBoardFarmerPage() {
  const [formData, setFormData] = useState({
    firstName: "Muneeb",
    lastName: "Ahmed",
    gender: "Male",
    dob: "30-10-2000",
    maritalStatus: "Single",
    cnic: "******-********-*",
    contact: "03**-*******",
    address: "",
    province: "Punjab",
    tehsil: "Lahore"
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic here
  };

  const handleCancel = () => {
    setFormData({
      firstName: "Muneeb",
      lastName: "Ahmed",
      gender: "Male",
      dob: "30-10-2000",
      maritalStatus: "Single",
      cnic: "******-********-*",
      contact: "03**-*******",
      address: "",
      province: "Punjab",
      tehsil: "Lahore"
    });
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Onboard Farmer</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.grid}>
          <div className={styles.formRow}>
            <Label className={styles.label}>First Name</Label>
            <Input className={styles.input} value={formData.firstName} onChange={e => handleChange("firstName", e.target.value)} placeholder="First Name" />
          </div>
          <div className={styles.formRow}>
            <Label className={styles.label}>Last Name</Label>
            <Input className={styles.input} value={formData.lastName} onChange={e => handleChange("lastName", e.target.value)} placeholder="Last Name" />
          </div>
          <div className={styles.formRow}>
            <Label className={styles.label}>Gender</Label>
            <Select value={formData.gender} onValueChange={val => handleChange("gender", val)}>
              <SelectTrigger className={styles.input}>
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent>
                {genderOptions.map(opt => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className={styles.formRow}>
            <Label className={styles.label}>Date of Birth</Label>
            <Input className={styles.input} value={formData.dob} onChange={e => handleChange("dob", e.target.value)} placeholder="DD-MM-YYYY" />
          </div>
          <div className={styles.formRow}>
            <Label className={styles.label}>Marital Status</Label>
            <Select value={formData.maritalStatus} onValueChange={val => handleChange("maritalStatus", val)}>
              <SelectTrigger className={styles.input}>
                <SelectValue placeholder="Select Marital Status" />
              </SelectTrigger>
              <SelectContent>
                {maritalStatusOptions.map(opt => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className={styles.formRow}>
            <Label className={styles.label}>CNIC Number</Label>
            <Input className={styles.input} value={formData.cnic} onChange={e => handleChange("cnic", e.target.value)} placeholder="xxxxx-xxxxxxx-x" />
          </div>
          <div className={styles.formRow}>
            <Label className={styles.label}>Contact Number</Label>
            <Input className={styles.input} value={formData.contact} onChange={e => handleChange("contact", e.target.value)} placeholder="03xx-xxxxxxx" />
          </div>
          <div className={styles.formRow}>
            <Label className={styles.label}>Address</Label>
            <Input className={styles.input} value={formData.address} onChange={e => handleChange("address", e.target.value)} placeholder="Type here" />
          </div>
          <div className={styles.formRow}>
            <Label className={styles.label}>Province</Label>
            <Select value={formData.province} onValueChange={val => handleChange("province", val)}>
              <SelectTrigger className={styles.input}>
                <SelectValue placeholder="Select Province" />
              </SelectTrigger>
              <SelectContent>
                {provinceOptions.map(opt => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className={styles.formRow}>
            <Label className={styles.label}>Tehsil/District</Label>
            <Select value={formData.tehsil} onValueChange={val => handleChange("tehsil", val)}>
              <SelectTrigger className={styles.input}>
                <SelectValue placeholder="Select Tehsil/District" />
              </SelectTrigger>
              <SelectContent>
                {tehsilOptions.map(opt => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className={styles.buttonRow}>
          <Button type="submit" className={styles.saveBtn}>Save</Button>
          <Button type="button" variant="outline" className={styles.cancelBtn} onClick={handleCancel}>Cancel</Button>
        </div>
      </form>
    </div>
  );
}
