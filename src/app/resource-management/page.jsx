"use client";
import { useState } from "react";
import styles from "./page.module.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Eye, Lock } from "lucide-react";

function ResourceManagementPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [employees, setEmployees] = useState([
    { name: "Nouman Islam", email: "example@gmail.com", password: "******" },
    { name: "Fahad Khan", email: "", password: "" },
  ]);
  // Removed roles array

  const handleAddEmployee = () => {
    if (!name.trim() || !email.trim() || !password.trim()) return;
    setEmployees([...employees, { name, email, password }]);
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.heading}>You can define role with access rights here</h1>
        <p className={styles.subheading}>Please define the roles for your employees</p>

        <div className={styles.rolesCard}>
          <p className={styles.addedRoleText}>{`Employees (${employees.length}):`}</p>
          <div className={styles.rolesList}>
            {employees.map((emp, idx) => (
              <span key={idx} className={styles.roleItem}>{emp.name}</span>
            ))}
          </div>
        </div>

        <div className={styles.formSection}>
          <h2 className={styles.formHeading}>Add Employee Details here:</h2>
          
          <div className={styles.formGrid}>
            <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.label}>Name</label>
              <div className={styles.inputWrapper}>
                <Input
                  id="name"
                  value={name}
                  placeholder="Enter Name"
                  
                  onChange={(e) => setName(e.target.value)}
                  className={styles.input}
                />
               
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>Email</label>
              <div className={styles.inputWrapper}>
                <span className={styles.lockIcon}>
                  <Mail size={16} color="#999" />
                </span>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  placeholder="example@gmail.com"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                  style={{ paddingLeft: "2.5rem" }}
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>Password</label>
              <div className={styles.inputWrapper}>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                    placeholder="******"
                  onChange={(e) => setPassword(e.target.value)}
                  className={`${styles.input} ${styles.passwordInput}`}
                />
                <span className={styles.lockIcon}>
                  <Lock size={16} color="#999" />
                </span>
                <button 
                  type="button" 
                  className={styles.iconButton}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  <Eye size={18} color="#6F7682" />
                </button>
              </div>
            </div>
          </div>

          <div className={styles.buttonContainer}>
            <Button 
              className={styles.addButton}
              onClick={handleAddEmployee}
            >
              Add Employee
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResourceManagementPage;