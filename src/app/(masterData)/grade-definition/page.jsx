"use client";
import React, { useState } from "react";
import { Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import styles from "./GradeDefination.module.css";

const initialTableData = [
  {
    id: 1,
    gradeId: "1",
    gradeCode: "A",
    gradeName: "Grade A",
    rank: "1",
    active: "Yes",
    createdDate: "01-01-2025 12:00:00",
    lastModifiedDate: "01-01-2025 12:00:00",
    approvedBy: "@Shahzad",
    status: "Approved"
  }
];

export default function GradeDefinitionPage() {
  const [tableData, setTableData] = useState(initialTableData);
  const [formData, setFormData] = useState({
    gradeId: "1",
    gradeCode: "A",
    gradeName: "Grade A",
    rank: "1",
    active: "Yes"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }) + ' ' + currentDate.toLocaleTimeString('en-GB', { hour12: false });
    const nextId = Math.max(...tableData.map(item => item.id)) + 1;
    const newEntry = {
      id: nextId,
      gradeId: formData.gradeId,
      gradeCode: formData.gradeCode,
      gradeName: formData.gradeName,
      rank: formData.rank,
      active: formData.active,
      createdDate: formattedDate,
      lastModifiedDate: formattedDate,
      approvedBy: "@Shahzad",
      status: "Approved"
    };
    setTableData(prev => [...prev, newEntry]);
    setFormData({
      gradeId: (parseInt(formData.gradeId) + 1).toString(),
      gradeCode: "",
      gradeName: "",
      rank: "1",
      active: "Yes"
    });
  };

  const handleCancel = () => {
    setFormData({
      gradeId: (parseInt(formData.gradeId) + 1).toString(),
      gradeCode: "",
      gradeName: "",
      rank: "1",
      active: "Yes"
    });
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Grade Definition</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formRow}>
          <Label className={styles.label}>Grade ID (Auto)</Label>
          <Input
            className={`${styles.input} ${styles.inputDisabled}`}
            value={formData.gradeId}
            disabled
            readOnly
          />
        </div>
        <div className={styles.formRow}>
          <Label className={styles.label}>Grade Code</Label>
          <Input
            className={styles.input}
            value={formData.gradeCode}
            onChange={e => setFormData(prev => ({ ...prev, gradeCode: e.target.value }))}
            placeholder="Enter grade code"
            required
          />
        </div>
        <div className={styles.formRow}>
          <Label className={styles.label}>Grade Name</Label>
          <Input
            className={styles.input}
            value={formData.gradeName}
            onChange={e => setFormData(prev => ({ ...prev, gradeName: e.target.value }))}
            placeholder="Enter grade name"
            required
          />
        </div>
        <div className={styles.formRow}>
          <Label className={styles.label}>Rank</Label>
          <Input
            className={styles.input}
            value={formData.rank}
            onChange={e => setFormData(prev => ({ ...prev, rank: e.target.value }))}
            placeholder="Enter rank"
            type="number"
            required
          />
        </div>
        <div className={styles.formRow}>
          <Label className={styles.label}>Is Active</Label>
          <RadioGroup
            value={formData.active}
            onValueChange={value => setFormData(prev => ({ ...prev, active: value }))}
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
          <Button type="submit" className={styles.saveBtn}>Save</Button>
          <Button type="button" variant="outline" className={styles.cancelBtn} onClick={handleCancel}>Cancel</Button>
        </div>
      </form>
      <div className={styles.tableWrap}>
        <Table className={styles.table}>
          <TableHeader>
            <TableRow>
              <TableHead className={styles.th}>Action</TableHead>
              <TableHead className={styles.th}>Grade ID</TableHead>
              <TableHead className={styles.th}>Grade Code</TableHead>
              <TableHead className={styles.th}>Grade Name</TableHead>
              <TableHead className={styles.th}>Rank</TableHead>
              <TableHead className={styles.th}>Active</TableHead>
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
                <TableCell className={styles.td}>{row.gradeId}</TableCell>
                <TableCell className={styles.td}>{row.gradeCode}</TableCell>
                <TableCell className={styles.td}>{row.gradeName}</TableCell>
                <TableCell className={styles.td}>{row.rank}</TableCell>
                <TableCell className={styles.td}>{row.active}</TableCell>
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
