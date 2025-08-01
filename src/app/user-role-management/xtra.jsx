"use client";
import { useState } from "react";
import styles from "./page.module.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ChevronDown, Plus } from "lucide-react";

const allAccessOptions = [
  "User Management",
  "Employee Management",
  "KYC Review",
  "Loan Application Assessment",
  "Disbursed Funds Monitoring",
];

const initialRoles = [
  {
    name: "Loan Officer",
    access: ["KYC Review", "Loan Application Assessment", "Disbursed Funds Monitoring"],
  },
];

export default function RoleAccessPage() {
  const [roles, setRoles] = useState(initialRoles);
  const [roleName, setRoleName] = useState("Agri Head");
  const [accessOptions, setAccessOptions] = useState(["User Management", "Employee Management"]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  function handleSelectAccess(option) {
    if (!accessOptions.includes(option)) {
      setAccessOptions([...accessOptions, option]);
    }
    setDropdownOpen(false);
  }

  function handleRemoveAccess(option) {
    setAccessOptions(accessOptions.filter((o) => o !== option));
  }

  function handleAddRole() {
    if (roleName.trim() && accessOptions.length) {
      setRoles([...roles, { name: roleName, access: [...accessOptions] }]);
      setRoleName("");
      setAccessOptions([]);
    }
  }

  const [errorMsg, setErrorMsg] = useState("");

  function handleAddRole() {
    if (!roleName.trim()) {
      setErrorMsg("Role name cannot be empty.");
      return;
    }
    if (accessOptions.length === 0) {
      setErrorMsg("Please select at least one access right.");
      return;
    }
    setRoles([...roles, { name: roleName, access: [...accessOptions] }]);
    setRoleName("");
    setAccessOptions([]);
    setErrorMsg("");
  }

  return (
    <div className={styles.pageBg}>
      <div className={styles.wrapper}>
        <h2 className={styles.heading}>
          You can define role with access rights here
        </h2>
        <p className={styles.subheading}>
          Please define the roles for your employees
        </p>

        <div className={styles.definedBox}>
          <div className={styles.definedRolesLabel}>
            {"You've defined " + roles.length + " roles:"}
          </div>
          {roles.map((role, idx) => (
            <div key={idx} className={styles.roleRow}>
              <span className={styles.roleName}>{role.name}:</span>
              <span className={styles.roleAccessList}>
                {role.access.map((a, i) => (
                  <span key={i} className={styles.accessTag}>{a}</span>
                ))}
              </span>
            </div>
          ))}
        </div>

        <div className={styles.formRow}>
          <div className={styles.inputCol}>
            <label className={styles.label}>Name of the role</label>
            <Input
              className={styles.roleInput}
              value={roleName}
              placeholder="Enter Role Name"
              required={true}
              onChange={e => {
                setRoleName(e.target.value);
                setErrorMsg("");
              }}
            />
          </div>
          <div className={styles.inputCol}>
            <label className={styles.label}>Access of the role</label>
            <div style={{ position: 'relative' }}>
              <div className={styles.accessInputWrap}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      className={styles.dropdownBtn}
                      type="button"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      aria-haspopup="listbox"
                      aria-expanded={dropdownOpen}
                    >
                      Select Option <ChevronDown className={styles.chevronIcon} />
                    </Button>
                  </DropdownMenuTrigger>
                  {dropdownOpen && (
                    <DropdownMenuContent className={styles.dropdownMenu}>
                      {allAccessOptions.filter(opt => !accessOptions.includes(opt)).map((opt) => (
                        <DropdownMenuItem
                          key={opt}
                          className={styles.dropdownMenuItem}
                          onClick={() => {
                            handleSelectAccess(opt);
                            setErrorMsg("");
                          }}
                        >
                          {opt}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  )}
                </DropdownMenu>
                <div className={styles.selectedAccessTags}>
                  {accessOptions.map((opt) => (
                    <span key={opt} className={styles.accessTag}>
                      {opt}
                      <button className={styles.tagRemoveBtn} onClick={() => handleRemoveAccess(opt)} type="button" aria-label="Remove">
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.plusCol}>
            <button className={styles.plusBtn} type="button" onClick={handleAddRole}>
              <Plus className={styles.plusIcon} stroke="#48602C" />
            </button>
          </div>
        </div>
        {errorMsg && (
          <div className={styles.errorMsg}>
            {errorMsg}
          </div>
        )}
      </div>
    </div>
  );
}