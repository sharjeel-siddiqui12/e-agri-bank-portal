"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button-loan";
import { Eye, EyeOff, Lock } from "lucide-react";
import styles from "./ResourceOnboarding.module.css";

/* ------------------------------ Demo state ------------------------------ */
const initialEmployees = [
  { name: "Nouman Islam", role: "Loan Officer" },
  { name: "Fahad Khan", role: "Agri Head (Admin)" },
];

export default function EmployeeOnboardingPage() {
  const [employees, setEmployees] = useState(initialEmployees);

  const [name, setName] = useState("Nouman Islam");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // show/hide toggles to mirror the design (eyes on all three fields)
  const [showName, setShowName] = useState(true);
  const [showEmail, setShowEmail] = useState(true);
  const [showPass, setShowPass] = useState(false);

  const rolesAddedText = useMemo(() => {
    const n = employees.length;
    return `You've added ${n} role${n > 1 ? "s" : ""}:`;
  }, [employees.length]);

  function handleAddEmployee() {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || !trimmedEmail || !password) {
      alert("Please fill Name, Email and Password.");
      return;
    }
    // ultra-light email check
    const emailOk = /\S+@\S+\.\S+/.test(trimmedEmail);
    if (!emailOk) {
      alert("Please enter a valid email address.");
      return;
    }

    // For demo, default newly added role to Loan Officer
    setEmployees((prev) => [...prev, { name: trimmedName, role: "Loan Officer" }]);
    setName("");
    setEmail("");
    setPassword("");
  }

  return (
    <div className={styles.bg}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>You Can Manage and Onboard Your Resources here</h1>
        <p className={styles.subtitle}>Please define the roles for your employees</p>

        {/* Added Roles Strip */}
        <div className={styles.roleStrip}>
          <span className={styles.roleStripLead}>{rolesAddedText}</span>

          <div className={styles.chipsWrap}>
            {employees.map((e, i) => (
              <div key={e.name + i} className={styles.chipPair}>
                <span className={styles.chipName}>{e.name}</span>
                <span className={styles.chipRole}>{e.role}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.formIntro}>Add Employee Details here:</div>

        {/* Form */}
        <div className={styles.formGrid}>
          {/* Name */}
          <div className={styles.field}>
            <label className={styles.label}>Name</label>
            <div className={styles.inputWrap}>
              <Input
                className={styles.input}
                type={showName ? "text" : "password"}
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <button
                type="button"
                className={styles.iconBtn}
                onClick={() => setShowName((s) => !s)}
                aria-label={showName ? "Hide name" : "Show name"}
              >
                {showName ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
          </div>

          {/* Email */}
          <div className={styles.field}>
            <label className={styles.label}>Email</label>
            <div className={styles.inputWrap}>
              <Input
                className={styles.input}
                type={showEmail ? "text" : "password"}
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="button"
                className={styles.iconBtn}
                onClick={() => setShowEmail((s) => !s)}
                aria-label={showEmail ? "Hide email" : "Show email"}
              >
                {showEmail ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
          </div>

          {/* Password */}
          <div className={styles.field}>
            <label className={styles.label}>Password</label>
            <div className={`${styles.inputWrap} ${styles.withLeftIcon}`}>
              <span className={styles.leftIcon}>
                <Lock size={16} />
              </span>
              <Input
                className={`${styles.input} ${styles.inputWithLeftPad}`}
                type={showPass ? "text" : "password"}
                placeholder="•••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className={styles.iconBtn}
                onClick={() => setShowPass((s) => !s)}
                aria-label={showPass ? "Hide password" : "Show password"}
              >
                {showPass ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <Button className={styles.addBtn} onClick={handleAddEmployee}>
            Add Employee
          </Button>
        </div>
      </div>
    </div>
  );
}
