"use client";

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import styles from './page.module.css';
import { useState } from "react";

export default function GeneralRulesPage() {
  const [formValues, setFormValues] = useState({
    defaultMarkup: "8.5",
    gracePeriod: "30 days",
    insuranceMandatory: true,
    maxActiveLoans: "150,000 PKR",
    earlyRepaymentAllowed: true
  });

  const handleInputChange = (field, value) => {
    setFormValues({
      ...formValues,
      [field]: value
    });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.sectionTitle}>General Lending Rules</h2>
      <p className={styles.description}>You can define bank-wide defaults here.</p>
      
      <div className={styles.form}>
        <div className={styles.formGroup}>
          <Label htmlFor="defaultMarkup" className={styles.label}>Default Markup%</Label>
          <div className={styles.percentInputWrapper}>
            <Input
              id="defaultMarkup"
              className={styles.input}
              value={formValues.defaultMarkup}
              onChange={(e) => handleInputChange("defaultMarkup", e.target.value)}
            />
            <span className={styles.percentSymbol}>%</span>
          </div>
        </div>

        <div className={styles.formGroup}>
          <Label htmlFor="gracePeriod" className={styles.label}>Grace Period</Label>
          <Select 
            value={formValues.gracePeriod} 
            onValueChange={(value) => handleInputChange("gracePeriod", value)}
          >
            <SelectTrigger id="gracePeriod" className={styles.select}>
              <SelectValue placeholder="Select grace period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15 days">15 days</SelectItem>
              <SelectItem value="30 days">30 days</SelectItem>
              <SelectItem value="45 days">45 days</SelectItem>
              <SelectItem value="60 days">60 days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.switchGroup}>
            <Label htmlFor="insuranceMandatory" className={styles.label}>Insurance Mandatory</Label>
            <Switch
              id="insuranceMandatory"
              checked={formValues.insuranceMandatory}
              onCheckedChange={(checked) => handleInputChange("insuranceMandatory", checked)}
              className={styles.switch}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <Label htmlFor="maxActiveLoans" className={styles.label}>Max Active Loans per Farmer Value</Label>
          <Input
            id="maxActiveLoans"
            className={styles.input}
            value={formValues.maxActiveLoans}
            onChange={(e) => handleInputChange("maxActiveLoans", e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <div className={styles.switchGroup}>
            <Label htmlFor="earlyRepaymentAllowed" className={styles.label}>Early Repayment Allowed</Label>
            <Switch
              id="earlyRepaymentAllowed"
              checked={formValues.earlyRepaymentAllowed}
              onCheckedChange={(checked) => handleInputChange("earlyRepaymentAllowed", checked)}
              className={styles.switch}
            />
          </div>
        </div>
      </div>
    </div>
  );
}