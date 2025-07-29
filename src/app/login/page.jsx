"use client";

import Image from "next/image";
import { Input } from "@/components/ui/input-login";
import { Button } from "@/components/ui/button-submit";
import { useState } from "react";
import styles from "./page.module.css";
import MailIcon from "@/components/svg/MailIcon";
import EyeIcon from "@/components/svg/EyeIcon";
import EyeOffIcon from "@/components/svg/EyeOffIcon";
import LockIcon from "@/components/svg/LockIcon";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div
      className={styles.pageWrapper}
    >
      <div className={styles.logoWrapper}>
        <Image
          src="/Frame.svg"
          width={158}
          height={60}
          alt="e-Agri Logo"
          className={styles.logo}
          priority
        />
      </div>
      <div className={styles.card}>
        <h2 className={styles.heading}>Log Into Bank&apos;s Portal</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div>
            <label className={styles.label}>Email Address</label>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIconLeft}>
                <MailIcon />
              </span>
              <Input
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className={styles.input}
              />
            </div>
          </div>
          <div>
            <label className={styles.label}>Password</label>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIconLeft}>
                <LockIcon />
              </span>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className={styles.input}
              />
              <button
                type="button"
                className={styles.inputIconRight}
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>
          <Button type="submit" className={styles.submitBtn}>
            Log In
          </Button>
        </form>
      </div>
    </div>
  );
}
