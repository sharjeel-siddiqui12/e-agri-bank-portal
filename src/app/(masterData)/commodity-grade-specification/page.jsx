"use client";

import { useState } from "react";
import styles from "./CommodityGradeSpecification.module.css";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Pencil } from "lucide-react";

const commodityOptions = [
  { value: "Wheat", label: "Wheat" },
  { value: "Rice", label: "Rice" },
];
const gradeOptions = [
  { value: "A", label: "A" },
  { value: "B", label: "B" },
];
const gradingParameterOptions = [
  { value: "Moisture", label: "Moisture" },
  { value: "Broken Kernels", label: "Broken Kernels" },
];
const measurementOptions = [
  { value: "Percentage", label: "Percentage" },
  { value: "Count", label: "Count" },
];
const methodOptions = [
  { value: "Max", label: "Max" },
  { value: "Min", label: "Min" },
];

const initialTableData = [
  {
    id: 1,
    commodity: "Wheat",
    commodityGrade: "A",
    gradingParameter: "Moisture",
    value: "12",
    measurement: "Percentage",
    method: "Max",
    mandatory: "Yes",
    active: "Yes",
    createdDate: "01-01-2025 12:00:00",
    lastModifiedDate: "01-01-2025 12:00:00",
    approvedBy: "@Shahzad",
    status: "Pending",
  },
  {
    id: 2,
    commodity: "Wheat",
    commodityGrade: "A",
    gradingParameter: "Broken Kernels",
    value: "2",
    measurement: "Percentage",
    method: "Max",
    mandatory: "Yes",
    active: "Yes",
    createdDate: "01-01-2025 12:00:00",
    lastModifiedDate: "01-01-2025 12:00:00",
    approvedBy: "@Shahzad",
    status: "Pending",
  },
];

export default function CommodityGradeSpecificationPage() {
  const [tableData, setTableData] = useState(initialTableData);
  const [formData, setFormData] = useState({
    commodity: "Wheat",
    commodityGrade: "A",
    gradingParameter: "Moisture",
    value: "12",
    measurement: "Percentage",
    method: "Max",
    mandatory: "Yes",
    active: "Yes",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentDate = new Date();
    const formattedDate =
      currentDate.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }) +
      " " +
      currentDate.toLocaleTimeString("en-GB", { hour12: false });
    const nextId = Math.max(...tableData.map((item) => item.id)) + 1;
    const newEntry = {
      id: nextId,
      ...formData,
      createdDate: formattedDate,
      lastModifiedDate: formattedDate,
      approvedBy: "@Shahzad",
      status: "Pending",
    };
    setTableData((prev) => [...prev, newEntry]);
  };

  const handleCancel = () => {
    setFormData({
      commodity: "Wheat",
      commodityGrade: "A",
      gradingParameter: "Moisture",
      value: "12",
      measurement: "Percentage",
      method: "Max",
      mandatory: "Yes",
      active: "Yes",
    });
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Commodity Grade Specification</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Row 1 */}
        <div className={styles.gridRow}>
          <div>
            <div className={styles.formRow}>
              <Label className={styles.label}>Commodity</Label>
              <Select
                value={formData.commodity}
                onValueChange={(v) =>
                  setFormData((p) => ({ ...p, commodity: v }))
                }
              >
                <SelectTrigger className={styles.input}>
                  <SelectValue placeholder="Select commodity" />
                </SelectTrigger>
                <SelectContent>
                  {commodityOptions.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className={styles.formRow}>
              <Label className={styles.label}>Grading Parameter</Label>
              <Select
                value={formData.gradingParameter}
                onValueChange={(v) =>
                  setFormData((p) => ({ ...p, gradingParameter: v }))
                }
              >
                <SelectTrigger className={styles.input}>
                  <SelectValue placeholder="Select parameter" />
                </SelectTrigger>
                <SelectContent>
                  {gradingParameterOptions.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className={styles.formRow}>
              <Label className={styles.label}>Measurement</Label>
              <Select
                value={formData.measurement}
                onValueChange={(v) =>
                  setFormData((p) => ({ ...p, measurement: v }))
                }
              >
                <SelectTrigger className={styles.input}>
                  <SelectValue placeholder="Select measurement" />
                </SelectTrigger>
                <SelectContent>
                  {measurementOptions.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Radios stacked vertically in LEFT column */}
            <div className={styles.radioBlock}>
              <div className={styles.radioRow}>
                <Label className={styles.label}>Is Mandatory?</Label>
                <RadioGroup
                  value={formData.mandatory}
                  onValueChange={(v) =>
                    setFormData((p) => ({ ...p, mandatory: v }))
                  }
                  className={styles.radioGroup}
                >
                  <div className={styles.radioItem}>
                    <RadioGroupItem
                      value="Yes"
                      id="mandatory-yes"
                      className={styles.radioInput}
                    />
                    <Label
                      htmlFor="mandatory-yes"
                      className={styles.radioLabel}
                    >
                      Yes
                    </Label>
                  </div>
                  <div className={styles.radioItem}>
                    <RadioGroupItem
                      value="No"
                      id="mandatory-no"
                      className={styles.radioInput}
                    />
                    <Label htmlFor="mandatory-no" className={styles.radioLabel}>
                      No
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className={styles.radioRow}>
                <Label className={styles.label}>Is Active?</Label>
                <RadioGroup
                  value={formData.active}
                  onValueChange={(v) =>
                    setFormData((p) => ({ ...p, active: v }))
                  }
                  className={styles.radioGroup}
                >
                  <div className={styles.radioItem}>
                    <RadioGroupItem
                      value="Yes"
                      id="active-yes"
                      className={styles.radioInput}
                    />
                    <Label htmlFor="active-yes" className={styles.radioLabel}>
                      Yes
                    </Label>
                  </div>
                  <div className={styles.radioItem}>
                    <RadioGroupItem
                      value="No"
                      id="active-no"
                      className={styles.radioInput}
                    />
                    <Label htmlFor="active-no" className={styles.radioLabel}>
                      No
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>

          {/* RIGHT column */}
          <div>
            <div className={styles.formRow}>
              <Label className={styles.label}>Commodity Grade</Label>
              <Select
                value={formData.commodityGrade}
                onValueChange={(v) =>
                  setFormData((p) => ({ ...p, commodityGrade: v }))
                }
              >
                <SelectTrigger className={styles.input}>
                  <SelectValue placeholder="Select grade" />
                </SelectTrigger>
                <SelectContent>
                  {gradeOptions.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className={styles.formRow}>
              <Label className={styles.label}>Value</Label>
              <Input
                className={styles.input}
                value={formData.value}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, value: e.target.value }))
                }
                placeholder="Enter value"
                type="number"
                required
              />
            </div>

            <div className={styles.formRow}>
              <Label className={styles.label}>Method</Label>
              <Select
                value={formData.method}
                onValueChange={(v) => setFormData((p) => ({ ...p, method: v }))}
              >
                <SelectTrigger className={styles.input}>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  {methodOptions.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className={styles.buttonRow}>
          <Button type="submit" className={styles.saveBtn}>
            Save
          </Button>
          <Button
            type="button"
            variant="outline"
            className={styles.cancelBtn}
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </div>
      </form>
      <div className={styles.tableWrap}>
        <Table className={styles.table}>
          <TableHeader>
            <TableRow>
              <TableHead className={styles.th}>Action</TableHead>
              <TableHead className={styles.th}>Commodity</TableHead>
              <TableHead className={styles.th}>Commodity Grade</TableHead>
              <TableHead className={styles.th}>Grading Parameter</TableHead>
              <TableHead className={styles.th}>Value</TableHead>
              <TableHead className={styles.th}>Measurement</TableHead>
              <TableHead className={styles.th}>Method</TableHead>
              <TableHead className={styles.th}>Mandatory</TableHead>
              <TableHead className={styles.th}>Active</TableHead>
              <TableHead className={styles.th}>Created date</TableHead>
              <TableHead className={styles.th}>Last Modified date</TableHead>
              <TableHead className={styles.th}>Approved by</TableHead>
              <TableHead className={styles.th}>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((row) => (
              <TableRow key={row.id} className={styles.tr}>
                <TableCell className={`${styles.td} ${styles.actionTd}`}>
                  <button className={styles.editBtn} title="Edit">
                    <Pencil size={16} />
                  </button>
                </TableCell>
                <TableCell className={styles.td}>{row.commodity}</TableCell>
                <TableCell className={styles.td}>
                  {row.commodityGrade}
                </TableCell>
                <TableCell className={styles.td}>
                  {row.gradingParameter}
                </TableCell>
                <TableCell className={styles.td}>{row.value}</TableCell>
                <TableCell className={styles.td}>{row.measurement}</TableCell>
                <TableCell className={styles.td}>{row.method}</TableCell>
                <TableCell className={styles.td}>{row.mandatory}</TableCell>
                <TableCell className={styles.td}>{row.active}</TableCell>
                <TableCell className={styles.td}>{row.createdDate}</TableCell>
                <TableCell className={styles.td}>
                  {row.lastModifiedDate}
                </TableCell>
                <TableCell className={styles.td}>{row.approvedBy}</TableCell>
                <TableCell className={styles.td}>
                  <span
                    className={`${styles.statusBadge} ${
                      row.status === "Approved"
                        ? styles.approved
                        : styles.pending
                    }`}
                  >
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
