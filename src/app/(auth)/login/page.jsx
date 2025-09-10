"use client";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button-submit";
import { useState } from "react";
import { useAuth } from "@/providers/auth-provider";
import styles from "./login.module.css";
import { Mail, Eye, EyeOff, Lock } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("sharjeel@gmail.com");
  const [password, setPassword] = useState("password");
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Credentials can be anything as per requirement
    login();
  };

  return (
    <div
      className={styles.pageWrapper}
    >
      <div className={styles.logoWrapper}>
        <Image
          src="/logo.svg"
          width={158}
          height={60}
          alt="e-Agri Logo"
          className={styles.logo}
          priority
        />
      </div>
      <div className={styles.card}>
        <h2 className={styles.heading}>Log Into Admin&apos;s Portal</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div>
            <label className={styles.label}>Email Address</label>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIconLeft}>
                <Mail size={20} color="currentColor" strokeWidth={2} />
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
                <Lock size={20} color="currentColor" strokeWidth={2} />
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
                {showPassword ? (
                  <EyeOff size={20} color="currentColor" strokeWidth={2} />
                ) : (
                  <Eye size={20} color="currentColor" strokeWidth={2} />
                )}
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
