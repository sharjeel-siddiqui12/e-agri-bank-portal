"use client";

import { useState } from "react";
import Image from "next/image";
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




export default function DashboardPage() {
  const [selectedArea, setSelectedArea] = useState("All");

  return (
    <div className={styles.container}>
      {/* Top KPIs */}
      <div className={styles.statsGrid}>
        <Card className={styles.statCard}>
          <div className={styles.statContent}>
            <div className={styles.iconWrapper}>
             <Image src="dashboard-images/total-crop-loans.svg" alt="Crop Loan Icon" width={44} height={36} />
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
              <Image src="dashboard-images/total-outstanding-amount.svg" alt="Crop Loan Icon" width={44} height={36} />
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
             <Image src="dashboard-images/active-borrowers.svg" alt="Crop Loan Icon" width={44} height={36} />
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
             <Image src="dashboard-images/overdue-accounts.svg" alt="Crop Loan Icon" width={44} height={36} />
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
             <Image src="dashboard-images/settled-loans.svg" alt="Crop Loan Icon" width={44} height={36} />
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
             <Image src="dashboard-images/npl.svg" alt="Crop Loan Icon" width={44} height={36} />
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