"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectTrigger, 
  SelectValue, 
  SelectContent, 
  SelectItem 
} from "@/components/ui/select";
import { InfoIcon, ArrowUpRight } from "lucide-react";
import PakistanMap from "@/components/PakistanMap";
import FunnelChart from "@/components/FunnelChart";
import LoanAgingChart from "@/components/LoanAgingChart";
import styles from "./page.module.css";

// Custom icons to match the image
const CropLoanIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="18" width="18" height="2" rx="1" fill="#4CAF50"/>
    <path d="M12 3L10 8H14L12 3Z" fill="#4CAF50"/>
    <path d="M12 8L11 12H13L12 8Z" fill="#4CAF50"/>
    <path d="M12 12L10.5 16H13.5L12 12Z" fill="#4CAF50"/>
    <circle cx="8" cy="16" r="1" fill="#66BB6A"/>
    <circle cx="16" cy="16" r="1" fill="#66BB6A"/>
  </svg>
);

const MoneyIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="7" width="20" height="10" rx="2" fill="#66BB6A"/>
    <circle cx="12" cy="12" r="3" fill="#FFFFFF"/>
    <text x="12" y="14" textAnchor="middle" fontSize="8" fill="#66BB6A">$</text>
    <rect x="6" y="9" width="2" height="1" fill="#4CAF50"/>
    <rect x="16" y="9" width="2" height="1" fill="#4CAF50"/>
    <rect x="6" y="14" width="2" height="1" fill="#4CAF50"/>
    <rect x="16" y="14" width="2" height="1" fill="#4CAF50"/>
  </svg>
);

const ActiveBorrowersIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="9" cy="7" r="3" fill="#5C6BC0"/>
    <circle cx="15" cy="7" r="3" fill="#5C6BC0"/>
    <path d="M9 14C6.79 14 5 15.79 5 18V20H13V18C13 15.79 11.21 14 9 14Z" fill="#5C6BC0"/>
    <path d="M15 14C12.79 14 11 15.79 11 18V20H19V18C19 15.79 17.21 14 15 14Z" fill="#7986CB"/>
  </svg>
);

const OverdueIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="16" rx="2" fill="#FFB74D"/>
    <rect x="3" y="4" width="18" height="4" rx="2" fill="#FF9800"/>
    <circle cx="7" cy="9" r="1" fill="#FF9800"/>
    <circle cx="12" cy="9" r="1" fill="#FF9800"/>
    <circle cx="17" cy="9" r="1" fill="#FF9800"/>
    <circle cx="7" cy="13" r="1" fill="#FF9800"/>
    <circle cx="12" cy="13" r="1" fill="#FF9800"/>
    <circle cx="17" cy="13" r="1" fill="#FF9800"/>
    <circle cx="7" cy="17" r="1" fill="#FF9800"/>
  </svg>
);

const SettledLoansIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill="#26A69A"/>
    <path d="M8 12L11 15L16 9" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const NPLIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="18" height="14" rx="2" fill="#EF5350"/>
    <rect x="4" y="6" width="4" height="8" fill="#FFFFFF"/>
    <rect x="10" y="8" width="4" height="6" fill="#FFFFFF"/>
    <rect x="16" y="4" width="4" height="10" fill="#FFFFFF"/>
  </svg>
);

export default function DashboardPage() {
  const [selectedArea, setSelectedArea] = useState("All");

  return (
    <div className={styles.container}>
      {/* Top KPIs */}
      <div className={styles.statsGrid}>
        <Card className={styles.statCard}>
          <div className={styles.statContent}>
            <div className={styles.iconWrapper}>
              <CropLoanIcon />
            </div>
            <div className={styles.statText}>
              <div className={styles.statLabel}>Total Crop Loans Disbursed</div>
              <div className={styles.statValue}>Rs. 127M</div>
            </div>
          </div>
        </Card>
        
        <Card className={styles.statCard}>
          <div className={styles.statContent}>
            <div className={styles.iconWrapper}>
              <MoneyIcon />
            </div>
            <div className={styles.statText}>
              <div className={styles.statLabel}>Total Outstanding Amount</div>
              <div className={styles.statValue}>Rs. 92M</div>
            </div>
          </div>
        </Card>
        
        <Card className={styles.statCard}>
          <div className={styles.statContent}>
            <div className={styles.iconWrapper}>
              <ActiveBorrowersIcon />
            </div>
            <div className={styles.statText}>
              <div className={styles.statLabel}>Active Borrowers</div>
              <div className={styles.statValue}>500</div>
            </div>
          </div>
        </Card>
        
        <Card className={styles.statCard}>
          <div className={styles.statContent}>
            <div className={styles.iconWrapper}>
              <OverdueIcon />
            </div>
            <div className={styles.statText}>
              <div className={styles.statLabel}>Overdue Accounts</div>
              <div className={styles.statValue}>186</div>
            </div>
          </div>
        </Card>
        
        <Card className={styles.statCard}>
          <div className={styles.statContent}>
            <div className={styles.iconWrapper}>
              <SettledLoansIcon />
            </div>
            <div className={styles.statText}>
              <div className={styles.statLabel}>Settled Loans</div>
              <div className={styles.statValue}>642 | 42M PKR</div>
            </div>
          </div>
        </Card>
        
        <Card className={styles.statCard}>
          <div className={styles.statContent}>
            <div className={styles.iconWrapper}>
              <NPLIcon />
            </div>
            <div className={styles.statText}>
              <div className={styles.statLabel}>NPL (Defaults) Rate</div>
              <div className={styles.statValue}>3.4%</div>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Main Content - Two Column Layout */}
      <div className={styles.mainContent}>
        {/* Left Column - Risk Heatmap */}
        <Card className={styles.mapCard}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Crop Risk & Loan Risk Heatmap</h2>
            <Select
              value={selectedArea}
              onValueChange={setSelectedArea}
            >
              <SelectTrigger className={styles.areaSelector}>
                <SelectValue placeholder="Select Area" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Punjab">Punjab</SelectItem>
                <SelectItem value="Sindh">Sindh</SelectItem>
                <SelectItem value="KPK">KPK</SelectItem>
                <SelectItem value="Balochistan">Balochistan</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className={styles.riskStats}>
            <div className={styles.riskAmount}>
              Rs. 76,000,000 PKR
              <span className={styles.growthLabel}>+12.0%</span>
            </div>
            <div className={styles.comparedLabel}>Compared to last month</div>
          </div>
          
          <div className={styles.mapContainer}>
            <div className={styles.mapLegend}>
              <div className={styles.legendItem}>
                <span className={`${styles.legendDot} ${styles.greenDot}`}></span>
                <span className={styles.legendLabel}>Performing Good</span>
                <span className={styles.legendValue}>500 ac</span>
              </div>
              <div className={styles.legendItem}>
                <span className={`${styles.legendDot} ${styles.yellowDot}`}></span>
                <span className={styles.legendLabel}>At Risk (Uninsured)</span>
                <span className={styles.legendValue}>120 ac</span>
              </div>
              <div className={styles.legendItem}>
                <span className={`${styles.legendDot} ${styles.redDot}`}></span>
                <span className={styles.legendLabel}>Lost/Burnt</span>
                <span className={styles.legendValue}>50 ac</span>
              </div>
            </div>
            
            <div className={styles.map}>
              <PakistanMap />
            </div>
          </div>
          
          <div className={styles.cardFooter}>
            <div className={styles.noteContainer}>
              <InfoIcon size={16} className={styles.infoIcon} />
              <span className={styles.noteText}>
                These loans are showing early signs of crop stress. Review satellite data or follow up with local branches.
              </span>
              <span className={styles.acreage}>500 ac</span>
            </div>
            
            <Button variant="ghost" className={styles.viewAllBtn}>
              View All Applications <ArrowUpRight size={16} className={styles.arrowIcon} />
            </Button>
          </div>
        </Card>
        
        {/* Right Column - Applications Funnel */}
        <Card className={styles.funnelCard}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Applications Funnel View</h2>
          </div>
          
          <div className={styles.funnelContainer}>
            <FunnelChart />
          </div>
          
          <div className={styles.cardFooter}>
            <Button variant="ghost" className={styles.viewAllBtn}>
              View All Applications <ArrowUpRight size={16} className={styles.arrowIcon} />
            </Button>
          </div>
        </Card>
      </div>
      
      {/* Bottom Chart - Loan Aging */}
      <Card className={styles.loanAgingCard}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>Loan Aging Chart (farmers)</h2>
        </div>
        
        <div className={styles.agingChartContainer}>
          <LoanAgingChart />
        </div>
      </Card>
    </div>
  );
}