
"use client";
import { useState } from "react";
import styles from "./UserRoleAssign.module.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ChevronDown, Plus } from "lucide-react";

const allUsers = [
  "Muneeb Ahmed",
  "Ali Raza",
  "Ahmed Khan",
  "Hassan Javed",
  "Bilal Aslam",
  "Sana Ullah",
  "Usman Tariq",
  "Hammad Iqbal",
  "Zain Shah",
  "Fahad Mehmood",
];

const allRoles = [
  "Loan Officer",
  "Agri Head",
  "Branch Manager",
  "Credit Analyst",
  "Operations Manager",
  "KYC Reviewer",
  "Disbursement Officer",
];

const initialAssignments = [
  {
    user: "Muneeb Ahmed",
    role: "Loan Officer",
  },
];

export default function UserRoleAssignPage() {
  const [assignments, setAssignments] = useState(initialAssignments);
  const [selectedUser, setSelectedUser] = useState(allUsers[0]);
  const [selectedRole, setSelectedRole] = useState(allRoles[0]);

  function handleAssignRole() {
    if (selectedUser && selectedRole) {
      setAssignments([
        ...assignments,
        { user: selectedUser, role: selectedRole },
      ]);
    }
  }

  return (
    <div className={styles.pageBg}>
      <div className={styles.wrapper}>
        <h2 className={styles.heading}>You can Assign Roles here</h2>
        <p className={styles.subheading}>Please define the roles for your employees</p>

        <div className={styles.definedBox}>
          <div className={styles.definedRolesLabel}>{`You've Assigned ${assignments.length} roles:`}</div>
          {assignments.map((a, idx) => (
            <div key={idx} className={styles.roleRow}>
              <span className={styles.roleName}>{a.role}:</span>
              <span className={styles.roleAccessList}>
                <span className={styles.accessTag}>{a.user}</span>
              </span>
            </div>
          ))}
        </div>

        <div className={styles.formRow}>
          <div className={styles.inputCol}>
            <label className={styles.label}>Name of the role</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className={styles.dropdownBtn} type="button">
                  {selectedRole} <ChevronDown className={styles.chevronIcon} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className={styles.dropdownMenu}>
                {allRoles.map((role) => (
                  <DropdownMenuItem
                    key={role}
                    className={styles.dropdownMenuItem}
                    onClick={() => setSelectedRole(role)}
                  >
                    {role}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className={styles.inputCol}>
            <label className={styles.label}>User to assign</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className={styles.dropdownBtn} type="button">
                  {selectedUser} <ChevronDown className={styles.chevronIcon} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className={styles.dropdownMenu}>
                {allUsers.map((user) => (
                  <DropdownMenuItem
                    key={user}
                    className={styles.dropdownMenuItem}
                    onClick={() => setSelectedUser(user)}
                  >
                    {user}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className={styles.plusCol}>
            <button className={styles.plusBtn} type="button" onClick={handleAssignRole}>
              <Plus className={styles.plusIcon} stroke="#48602C" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}