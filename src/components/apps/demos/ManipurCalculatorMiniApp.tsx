import React, { useState, useMemo } from 'react';
import { 
  ArrowLeftRight, 
  Calculator, 
  ArrowUpDown, 
  ChevronDown, 
  ExternalLink, 
  Lock, 
  Home, 
  Wrench, 
  User, 
  CheckCircle2, 
  Coins
} from 'lucide-react';
import { projects } from '../../../content/projects';
import { getAssetUrl } from '../../../utils/assetUrl';

export interface ManipurCalculatorMiniAppProps {
  onBack: () => void;
  onHome: () => void;
}

// Exact Land Conversion Ratios from Banishwor's Android app (CalculationUtils.kt)
// 1 Point = 435.6191 sq ft = 40.470339 m²
const POINT_TO_SQFT = 435.6191;
const POINT_TO_SQM = 40.470339;
const HECTARE_TO_SQM = 10000;
const HECTARE_TO_POINTS = HECTARE_TO_SQM / POINT_TO_SQM; // ~247.105

export type LandUnit = 
  | 'PARI' 
  | 'LOURAK' 
  | 'SANGAM' 
  | 'LOUKHAI' 
  | 'LOUSHAL' 
  | 'TONG' 
  | 'POINT' 
  | 'SQFT' 
  | 'SQM' 
  | 'HECTARE';

const landUnitLabels: Record<LandUnit, string> = {
  POINT: 'Point',
  SQFT: 'Sq Ft',
  SQM: 'Sq Metre',
  PARI: 'Pari',
  LOURAK: 'Lourak',
  SANGAM: 'Sangam',
  LOUKHAI: 'Loukhai',
  LOUSHAL: 'Loushal',
  TONG: 'Tong',
  HECTARE: 'Hectare'
};

const landUnitHelpers: Record<LandUnit, string> = {
  POINT: '0.01 Acre · 435.6 ft²',
  PARI: '250 Points · 4 Sangam',
  LOURAK: '125 Points · 2 Sangam',
  SANGAM: '62.5 Points',
  LOUKHAI: '31.25 Points',
  LOUSHAL: '15.625 Points',
  TONG: '7.8125 Points',
  SQFT: 'Square Feet',
  SQM: 'Square Metres',
  HECTARE: '2.471 Acres'
};

const convertToPoints = (value: number, unit: LandUnit): number => {
  switch (unit) {
    case 'PARI': return value * 250;
    case 'LOURAK': return value * 125;
    case 'SANGAM': return value * 62.5;
    case 'LOUKHAI': return value * 31.25;
    case 'LOUSHAL': return value * 15.625;
    case 'TONG': return value * 7.8125;
    case 'POINT': return value;
    case 'SQFT': return value / POINT_TO_SQFT;
    case 'SQM': return value / POINT_TO_SQM;
    case 'HECTARE': return value * HECTARE_TO_POINTS;
  }
};

const convertFromPoints = (points: number, unit: LandUnit): number => {
  switch (unit) {
    case 'PARI': return points / 250;
    case 'LOURAK': return points / 125;
    case 'SANGAM': return points / 62.5;
    case 'LOUKHAI': return points / 31.25;
    case 'LOUSHAL': return points / 15.625;
    case 'TONG': return points / 7.8125;
    case 'POINT': return points;
    case 'SQFT': return points * POINT_TO_SQFT;
    case 'SQM': return points * POINT_TO_SQM;
    case 'HECTARE': return points / HECTARE_TO_POINTS;
  }
};

type AppBottomTab = 'home' | 'land' | 'gold' | 'tools' | 'profile' | 'calc';

export const ManipurCalculatorMiniApp: React.FC<ManipurCalculatorMiniAppProps> = ({
  onBack,
  onHome
}) => {
  // Bottom Navigation tabs: 'home' | 'land' | 'gold' | 'tools' | 'profile' | 'calc'
  const [activeTab, setActiveTab] = useState<AppBottomTab>('home');

  // Sub-tabs inside Land screen: 0 = Unit Converter, 1 = Rate Calculator
  const [selectedLandSubTab, setSelectedLandSubTab] = useState<0 | 1>(0);

  // Conversion inputs
  const [inputValue, setInputValue] = useState<string>('1');
  const [sourceUnit, setSourceUnit] = useState<LandUnit>('POINT');
  const [targetUnit, setTargetUnit] = useState<LandUnit>('SQFT');
  const [isFromDropdownOpen, setIsFromDropdownOpen] = useState<boolean>(false);
  const [isToDropdownOpen, setIsToDropdownOpen] = useState<boolean>(false);

  // Project details from projects.ts for the Home tab
  const projectData = useMemo(() => {
    return projects.find(p => p.id === 'manipur-calculator') || projects[0];
  }, []);

  // Compute conversion
  const parsedInput = parseFloat(inputValue);
  const isValidNumber = !isNaN(parsedInput) && parsedInput >= 0;

  const convertedResult = useMemo(() => {
    if (!isValidNumber) return '0';
    const points = convertToPoints(parsedInput, sourceUnit);
    const converted = convertFromPoints(points, targetUnit);
    return Number(converted.toFixed(4)).toString();
  }, [parsedInput, sourceUnit, targetUnit, isValidNumber]);

  // Swap units handler
  const handleSwap = () => {
    const temp = sourceUnit;
    setSourceUnit(targetUnit);
    setTargetUnit(temp);
  };

  const keyUnits: LandUnit[] = ['POINT', 'SQFT', 'PARI', 'LOURAK', 'SANGAM', 'SQM'];

  // Handle system back navigation
  const handleSystemBack = () => {
    if (activeTab !== 'home') {
      setActiveTab('home');
    } else {
      onBack();
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: '#FAFAFA',
      color: '#212121',
      fontFamily: 'Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      position: 'absolute',
      inset: 0,
      zIndex: 500,
      overflow: 'hidden'
    }}>
      {/* ================= 1. NATIVE BLUE HEADER ("Land Tools") ================= */}
      <div style={{
        background: '#1565C0', // Exact PrimaryDarkBlue from Android source
        color: '#FFFFFF',
        padding: '10px 16px 16px',
        borderRadius: '0 0 22px 22px',
        boxShadow: '0 4px 14px rgba(21, 101, 192, 0.28)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Triangle Ruler (Set Square) App Icon */}
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '13px',
            background: 'rgba(255, 255, 255, 0.22)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#FFFFFF">
              <path d="M21 21H3V3l18 18zM7 17h6.5L7 10.5V17z" />
            </svg>
          </div>

          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: '#FFFFFF', lineHeight: 1.2 }}>
              {activeTab === 'home' && 'Manipur Calculator'}
              {activeTab === 'land' && 'Land Tools'}
              {activeTab === 'gold' && 'Gold Tools'}
              {activeTab === 'tools' && 'Valuation Tools'}
              {activeTab === 'profile' && 'Developer Profile'}
              {activeTab === 'calc' && 'Financial Calc'}
            </h3>
            <p style={{ fontSize: '11px', margin: '2px 0 0', color: 'rgba(255, 255, 255, 0.88)', letterSpacing: '0.2px' }}>
              {activeTab === 'home' && 'Indigenous Unit Engine & Financial Math'}
              {activeTab === 'land' && 'Pari • Lourak • Sangam • Point • Sq Ft'}
              {activeTab === 'gold' && 'San • Rati • Ana • Bullion Rates'}
              {activeTab === 'tools' && 'Area Survey & Plot Valuation'}
              {activeTab === 'profile' && 'Banishwor Athokpam (MCA)'}
              {activeTab === 'calc' && 'Loan EMI & Compound Interest'}
            </p>
          </div>
        </div>

        {/* Crimson Red "LOCAL SPECIAL" Badge */}
        <div style={{
          background: '#E53935',
          borderRadius: '8px',
          padding: '4px 9px',
          color: '#FFFFFF',
          fontSize: '9px',
          fontWeight: 800,
          letterSpacing: '0.4px',
          boxShadow: '0 2px 6px rgba(229, 57, 53, 0.3)'
        }}>
          LOCAL SPECIAL
        </div>
      </div>

      {/* ================= 3. SCROLLABLE BODY CANVAS ================= */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '12px 16px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px'
      }}>
        {/* ================= TAB 1: HOME (PROJECT DETAILS & DASHBOARD) ================= */}
        {activeTab === 'home' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* App Hero Card */}
            <div style={{
              background: '#FFFFFF',
              borderRadius: '18px',
              padding: '18px',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.04)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <img 
                  src={getAssetUrl('projects/manipur-calculator.png')} 
                  alt="Manipur Calculator" 
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '16px',
                    boxShadow: '0 4px 12px rgba(21, 101, 192, 0.25)'
                  }} 
                />
                <div>
                  <h4 style={{ fontSize: '17px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                    Manipur Calculator
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                    <span style={{
                      background: '#ECFDF5',
                      color: '#059669',
                      border: '1px solid rgba(5, 150, 105, 0.25)',
                      padding: '2px 7px',
                      borderRadius: '6px',
                      fontSize: '9.5px',
                      fontWeight: 800
                    }}>
                      PRODUCTION ACTIVE
                    </span>
                    <span style={{
                      background: '#EFF6FF',
                      color: '#2563EB',
                      padding: '2px 7px',
                      borderRadius: '6px',
                      fontSize: '9.5px',
                      fontWeight: 700
                    }}>
                      GOOGLE PLAY
                    </span>
                  </div>
                </div>
              </div>

              <p style={{ fontSize: '12.5px', color: '#334155', lineHeight: 1.55, margin: 0 }}>
                {projectData.summary}
              </p>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                <button
                  onClick={() => setActiveTab('land')}
                  className="pressable"
                  style={{
                    flex: 1,
                    background: '#1565C0',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '10px 14px',
                    fontSize: '12px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(21, 101, 192, 0.25)'
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="#FFFFFF">
                    <path d="M21 21H3V3l18 18zM7 17h6.5L7 10.5V17z" />
                  </svg>
                  <span>Open Land Converter</span>
                </button>

                <a
                  href="https://play.google.com/store/apps/details?id=com.manipurcalculator.app&hl=en"
                  target="_blank"
                  rel="noreferrer"
                  className="pressable"
                  style={{
                    flex: 1,
                    background: '#0F172A',
                    color: '#FFFFFF',
                    borderRadius: '12px',
                    padding: '10px 14px',
                    fontSize: '12px',
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    boxShadow: '0 2px 8px rgba(15, 23, 42, 0.2)'
                  }}
                >
                  <span>Google Play</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>

            {/* Target Audience */}
            <div style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              padding: '14px 16px',
              border: '1px solid rgba(0, 0, 0, 0.06)'
            }}>
              <h5 style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', margin: '0 0 6px' }}>
                Target Users
              </h5>
              <p style={{ fontSize: '12px', color: '#334155', margin: 0, lineHeight: 1.5 }}>
                {projectData.targetAudience}
              </p>
            </div>

            {/* Capabilities */}
            <div style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              padding: '16px',
              border: '1px solid rgba(0, 0, 0, 0.06)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <h5 style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', margin: 0 }}>
                Key Capabilities
              </h5>
              {projectData.capabilities.map((cap, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <CheckCircle2 size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '12px', color: '#334155', lineHeight: 1.45 }}>{cap}</span>
                </div>
              ))}
            </div>

            {/* Tech Stack Chips */}
            <div style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              padding: '16px',
              border: '1px solid rgba(0, 0, 0, 0.06)'
            }}>
              <h5 style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', margin: '0 0 8px' }}>
                Architecture & Tech Stack
              </h5>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {projectData.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    style={{
                      background: '#F1F5F9',
                      border: '1px solid rgba(15, 23, 42, 0.08)',
                      borderRadius: '8px',
                      padding: '4px 9px',
                      fontSize: '11px',
                      fontWeight: 600,
                      color: '#475569'
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: LAND (AUTHENTIC CONVERTER FROM SCREENSHOT) ================= */}
        {activeTab === 'land' && (
          <>
            {/* Top Sub-Tabs (Unit Converter / Rate Calculator) */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.05)',
              borderRadius: '14px',
              padding: '4px',
              display: 'flex',
              gap: '4px',
              border: '1px solid rgba(0, 0, 0, 0.06)'
            }}>
              {/* Tab 0: Unit Converter */}
              <button
                onClick={() => setSelectedLandSubTab(0)}
                style={{
                  flex: 1,
                  padding: '9px 14px',
                  borderRadius: '10px',
                  border: 'none',
                  background: selectedLandSubTab === 0 ? '#FFFFFF' : 'transparent',
                  boxShadow: selectedLandSubTab === 0 ? '0 2px 6px rgba(0, 0, 0, 0.08)' : 'none',
                  color: selectedLandSubTab === 0 ? '#212121' : 'rgba(0, 0, 0, 0.65)',
                  fontWeight: selectedLandSubTab === 0 ? 700 : 500,
                  fontSize: '13px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: 'pointer'
                }}
              >
                <ArrowLeftRight size={16} color={selectedLandSubTab === 0 ? '#E53935' : 'rgba(0, 0, 0, 0.55)'} />
                <span>Unit Converter</span>
              </button>

              {/* Tab 1: Rate Calculator */}
              <button
                onClick={() => setSelectedLandSubTab(1)}
                style={{
                  flex: 1,
                  padding: '9px 14px',
                  borderRadius: '10px',
                  border: 'none',
                  background: selectedLandSubTab === 1 ? '#FFFFFF' : 'transparent',
                  boxShadow: selectedLandSubTab === 1 ? '0 2px 6px rgba(0, 0, 0, 0.08)' : 'none',
                  color: selectedLandSubTab === 1 ? '#212121' : 'rgba(0, 0, 0, 0.65)',
                  fontWeight: selectedLandSubTab === 1 ? 700 : 500,
                  fontSize: '13px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: 'pointer'
                }}
              >
                <Calculator size={16} color={selectedLandSubTab === 1 ? '#E53935' : 'rgba(0, 0, 0, 0.55)'} />
                <span>Rate Calculator</span>
              </button>
            </div>

            {selectedLandSubTab === 0 ? (
              <>
                {/* Authentic Unit Conversion Card (Matching Screenshot) */}
                <div style={{
                  background: '#F8FAFC',
                  borderRadius: '20px',
                  padding: '18px 16px',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px'
                }}>
                  {/* Card Header: ⇄ Unit Conversion */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ArrowLeftRight size={17} color="#E53935" />
                    <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#1E293B', margin: 0 }}>
                      Unit Conversion
                    </h4>
                  </div>

                  {/* Input Row: Land Value (left) + From Dropdown (right) */}
                  <div style={{ display: 'flex', gap: '10px' }}>
                    {/* Land Value Outlined Field */}
                    <div style={{ flex: 1 }}>
                      <input
                        type="number"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Land Value"
                        style={{
                          width: '100%',
                          height: '48px',
                          padding: '10px 14px',
                          borderRadius: '8px',
                          border: '1px solid #94A3B8',
                          fontSize: '15px',
                          fontWeight: 700,
                          color: '#0F172A',
                          background: '#FFFFFF',
                          boxSizing: 'border-box',
                          outline: 'none'
                        }}
                      />
                    </div>

                    {/* "From" Dropdown with Notched Label */}
                    <div style={{ width: '135px', position: 'relative' }}>
                      <span style={{
                        position: 'absolute',
                        top: '-7px',
                        left: '10px',
                        background: '#F8FAFC',
                        padding: '0 4px',
                        fontSize: '10px',
                        color: '#64748B',
                        fontWeight: 600,
                        zIndex: 1
                      }}>
                        From
                      </span>

                      <button
                        onClick={() => {
                          setIsFromDropdownOpen(!isFromDropdownOpen);
                          setIsToDropdownOpen(false);
                        }}
                        style={{
                          width: '100%',
                          height: '48px',
                          padding: '10px 12px',
                          borderRadius: '8px',
                          border: '1px solid #94A3B8',
                          background: '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          cursor: 'pointer',
                          boxSizing: 'border-box'
                        }}
                      >
                        <span style={{ fontSize: '13.5px', fontWeight: 700, color: '#1E293B' }}>
                          {landUnitLabels[sourceUnit]}
                        </span>
                        <ChevronDown size={16} color="#64748B" />
                      </button>

                      {/* Dropdown Menu */}
                      {isFromDropdownOpen && (
                        <div style={{
                          position: 'absolute',
                          top: '100%',
                          left: 0,
                          right: 0,
                          marginTop: '4px',
                          background: '#FFFFFF',
                          borderRadius: '10px',
                          border: '1px solid #CBD5E1',
                          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                          zIndex: 100,
                          maxHeight: '200px',
                          overflowY: 'auto'
                        }}>
                          {Object.keys(landUnitLabels).map((unitKey) => {
                            const u = unitKey as LandUnit;
                            return (
                              <div
                                key={u}
                                onClick={() => {
                                  setSourceUnit(u);
                                  setIsFromDropdownOpen(false);
                                }}
                                style={{
                                  padding: '8px 12px',
                                  fontSize: '12px',
                                  fontWeight: sourceUnit === u ? 700 : 500,
                                  color: sourceUnit === u ? '#1565C0' : '#1E293B',
                                  background: sourceUnit === u ? '#E3F2FD' : 'transparent',
                                  cursor: 'pointer',
                                  borderBottom: '1px solid rgba(0,0,0,0.04)'
                                }}
                              >
                                {landUnitLabels[u]}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Swap Divider with Pill Button: [ ⇅ Swap ] */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    margin: '2px 0'
                  }}>
                    <div style={{ height: '1px', background: '#E2E8F0', width: '100%' }} />
                    <button
                      onClick={handleSwap}
                      className="pressable"
                      title="Swap Units"
                      style={{
                        position: 'absolute',
                        background: '#EDE9FE', // Lavender / light purple pill from screenshot
                        color: '#4F46E5',
                        border: 'none',
                        borderRadius: '999px',
                        padding: '4px 16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        fontSize: '11.5px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        boxShadow: '0 1px 4px rgba(79, 70, 229, 0.15)'
                      }}
                    >
                      <ArrowUpDown size={13} color="#4F46E5" />
                      <span>Swap</span>
                    </button>
                  </div>

                  {/* Convert To (Target Unit) Full-Width Outlined Field */}
                  <div style={{ position: 'relative' }}>
                    <span style={{
                      position: 'absolute',
                      top: '-7px',
                      left: '10px',
                      background: '#F8FAFC',
                      padding: '0 4px',
                      fontSize: '10px',
                      color: '#64748B',
                      fontWeight: 600,
                      zIndex: 1
                    }}>
                      Convert To (Target Unit)
                    </span>

                    <button
                      onClick={() => {
                        setIsToDropdownOpen(!isToDropdownOpen);
                        setIsFromDropdownOpen(false);
                      }}
                      style={{
                        width: '100%',
                        height: '48px',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        border: '1px solid #94A3B8',
                        background: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        boxSizing: 'border-box'
                      }}
                    >
                      <span style={{ fontSize: '14px', fontWeight: 700, color: '#1E293B' }}>
                        {landUnitLabels[targetUnit]}
                      </span>
                      <ChevronDown size={16} color="#64748B" />
                    </button>

                    {/* Target Unit Dropdown Menu */}
                    {isToDropdownOpen && (
                      <div style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        marginTop: '4px',
                        background: '#FFFFFF',
                        borderRadius: '10px',
                        border: '1px solid #CBD5E1',
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                        zIndex: 100,
                        maxHeight: '200px',
                        overflowY: 'auto'
                      }}>
                        {Object.keys(landUnitLabels).map((unitKey) => {
                          const u = unitKey as LandUnit;
                          return (
                            <div
                              key={u}
                              onClick={() => {
                                setTargetUnit(u);
                                setIsToDropdownOpen(false);
                              }}
                              style={{
                                padding: '8px 12px',
                                fontSize: '12px',
                                fontWeight: targetUnit === u ? 700 : 500,
                                color: targetUnit === u ? '#1565C0' : '#1E293B',
                                background: targetUnit === u ? '#E3F2FD' : 'transparent',
                                cursor: 'pointer',
                                borderBottom: '1px solid rgba(0,0,0,0.04)'
                              }}
                            >
                              {landUnitLabels[u]}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {/* Primary Computed Result Card */}
                <div style={{
                  background: 'linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)',
                  borderRadius: '16px',
                  padding: '14px 16px',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0 4px 12px rgba(21, 101, 192, 0.25)'
                }}>
                  <div>
                    <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.4px', opacity: 0.85, fontWeight: 700 }}>
                      Calculated Equivalent
                    </span>
                    <div style={{ fontSize: '20px', fontWeight: 800, marginTop: '2px', wordBreak: 'break-all' }}>
                      {convertedResult} <span style={{ fontSize: '14px', fontWeight: 600 }}>{landUnitLabels[targetUnit]}</span>
                    </div>
                  </div>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '10px',
                    padding: '5px 10px',
                    fontSize: '11px',
                    fontWeight: 700
                  }}>
                    {inputValue || 0} {landUnitLabels[sourceUnit]}
                  </div>
                </div>

                {/* Bento Grid: Complete Multi-Unit Breakdown */}
                <div>
                  <h4 style={{ fontSize: '11.5px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.4px', margin: '0 0 8px' }}>
                    Multi-Unit Equivalent Breakdown
                  </h4>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '8px'
                  }}>
                    {keyUnits.map((unit) => {
                      const points = convertToPoints(isValidNumber ? parsedInput : 0, sourceUnit);
                      const val = convertFromPoints(points, unit);
                      const formatted = Number(val.toFixed(3)).toString();
                      const isHighlighted = unit === targetUnit;

                      return (
                        <div
                          key={unit}
                          style={{
                            background: isHighlighted ? '#EDE9FE' : '#FFFFFF',
                            border: isHighlighted ? '1.5px solid #4F46E5' : '1px solid #E2E8F0',
                            borderRadius: '12px',
                            padding: '10px 12px',
                            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)'
                          }}
                        >
                          <div style={{ fontSize: '10px', fontWeight: 700, color: isHighlighted ? '#4F46E5' : '#64748B', textTransform: 'uppercase' }}>
                            {landUnitLabels[unit]}
                          </div>
                          <div style={{ fontSize: '15px', fontWeight: 800, color: isHighlighted ? '#3730A3' : '#0F172A', marginTop: '2px', wordBreak: 'break-all' }}>
                            {formatted}
                          </div>
                          <div style={{ fontSize: '9.5px', color: '#94A3B8', marginTop: '2px' }}>
                            {landUnitHelpers[unit]}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            ) : (
              /* Rate Calculator Screen - Download Prompt */
              <div style={{
                background: '#FFFFFF',
                borderRadius: '18px',
                padding: '24px 18px',
                border: '1px solid #E2E8F0',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                marginTop: '4px'
              }}>
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '16px',
                  background: 'rgba(229, 57, 53, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Lock size={24} color="#E53935" />
                </div>

                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#212121', margin: 0 }}>
                    Rate Calculator & Land Valuation
                  </h4>
                  <p style={{ fontSize: '12px', color: '#757575', marginTop: '6px', lineHeight: 1.5, maxWidth: '280px' }}>
                    Calculate transaction costs per Point, Pari, and Sq Ft with instant PDF billing on the full Android app.
                  </p>
                </div>

                <div style={{
                  background: '#FFF3E0',
                  border: '1px solid #FFE082',
                  borderRadius: '10px',
                  padding: '5px 12px',
                  color: '#E65100',
                  fontSize: '11px',
                  fontWeight: 700
                }}>
                  AVAILABLE ON GOOGLE PLAY
                </div>

                <a
                  href="https://play.google.com/store/apps/details?id=com.manipurcalculator.app&hl=en"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    marginTop: '4px',
                    background: '#0F172A',
                    color: '#FFFFFF',
                    borderRadius: '12px',
                    padding: '10px 18px',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 12px rgba(15, 23, 42, 0.2)'
                  }}
                >
                  <span>Download Full App on Play Store</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            )}
          </>
        )}

        {/* ================= TAB 3: GOLD (LOCKED -> ASK TO DOWNLOAD) ================= */}
        {activeTab === 'gold' && (
          <div style={{
            background: '#FFFFFF',
            borderRadius: '18px',
            padding: '28px 18px',
            border: '1px solid #E2E8F0',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '14px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.04)',
            marginTop: '4px'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: '#FEF3C7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(217, 119, 6, 0.15)'
            }}>
              <Coins size={28} color="#D97706" />
            </div>

            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                background: '#FEF3C7',
                border: '1px solid rgba(217, 119, 6, 0.25)',
                borderRadius: '8px',
                padding: '3px 8px',
                color: '#B45309',
                fontSize: '10px',
                fontWeight: 800,
                marginBottom: '8px'
              }}>
                <Lock size={12} />
                <span>FULL APP FEATURE</span>
              </div>
              <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#212121', margin: 0 }}>
                Traditional Gold & Jewellery Suite
              </h4>
              <p style={{ fontSize: '12px', color: '#64748B', marginTop: '6px', lineHeight: 1.5, maxWidth: '290px' }}>
                Converts traditional Manipuri gold units (<strong>San</strong>, <strong>Rati</strong>, <strong>Ana</strong>) with live bullion rates and making charge calculations.
              </p>
            </div>

            {/* Feature Highlights */}
            <div style={{
              width: '100%',
              background: '#FAFAFA',
              borderRadius: '12px',
              padding: '12px',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              fontSize: '11.5px',
              color: '#334155'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={13} color="#10B981" />
                <span>1 San = 10 Rati = 40 Ana authentic formulas</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={13} color="#10B981" />
                <span>Live 22K & 24K bullion price mapping</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={13} color="#10B981" />
                <span>Goldsmith wastage & making charges breakdown</span>
              </div>
            </div>

            <a
              href="https://play.google.com/store/apps/details?id=com.manipurcalculator.app&hl=en"
              target="_blank"
              rel="noreferrer"
              className="pressable"
              style={{
                marginTop: '4px',
                background: '#0F172A',
                color: '#FFFFFF',
                borderRadius: '12px',
                padding: '11px 20px',
                fontSize: '12.5px',
                fontWeight: 700,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(15, 23, 42, 0.25)'
              }}
            >
              <span>Download on Google Play for Full Access</span>
              <ExternalLink size={14} />
            </a>
          </div>
        )}

        {/* ================= TAB 4: TOOLS (LOCKED -> ASK TO DOWNLOAD) ================= */}
        {activeTab === 'tools' && (
          <div style={{
            background: '#FFFFFF',
            borderRadius: '18px',
            padding: '28px 18px',
            border: '1px solid #E2E8F0',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '14px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.04)',
            marginTop: '4px'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: '#F1F5F9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(100, 116, 139, 0.15)'
            }}>
              <Wrench size={26} color="#475569" />
            </div>

            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                background: '#F1F5F9',
                border: '1px solid rgba(100, 116, 139, 0.25)',
                borderRadius: '8px',
                padding: '3px 8px',
                color: '#334155',
                fontSize: '10px',
                fontWeight: 800,
                marginBottom: '8px'
              }}>
                <Lock size={12} />
                <span>FULL APP FEATURE</span>
              </div>
              <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#212121', margin: 0 }}>
                Land Valuation & Survey Tools
              </h4>
              <p style={{ fontSize: '12px', color: '#64748B', marginTop: '6px', lineHeight: 1.5, maxWidth: '290px' }}>
                Advanced land survey utilities, multi-plot boundary area calculators, and stamp duty estimator for Manipur.
              </p>
            </div>

            {/* Feature Highlights */}
            <div style={{
              width: '100%',
              background: '#FAFAFA',
              borderRadius: '12px',
              padding: '12px',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              fontSize: '11.5px',
              color: '#334155'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={13} color="#10B981" />
                <span>Irregular quadrilateral plot area solver</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={13} color="#10B981" />
                <span>Government guideline rate & stamp duty lookup</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={13} color="#10B981" />
                <span>Export deed valuation report as PDF</span>
              </div>
            </div>

            <a
              href="https://play.google.com/store/apps/details?id=com.manipurcalculator.app&hl=en"
              target="_blank"
              rel="noreferrer"
              className="pressable"
              style={{
                marginTop: '4px',
                background: '#0F172A',
                color: '#FFFFFF',
                borderRadius: '12px',
                padding: '11px 20px',
                fontSize: '12.5px',
                fontWeight: 700,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(15, 23, 42, 0.25)'
              }}
            >
              <span>Download on Google Play for Full Access</span>
              <ExternalLink size={14} />
            </a>
          </div>
        )}

        {/* ================= TAB 5: PROFILE (DEVELOPER PROFILE) ================= */}
        {activeTab === 'profile' && (
          <div style={{
            background: '#FFFFFF',
            borderRadius: '18px',
            padding: '24px 18px',
            border: '1px solid #E2E8F0',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '14px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.04)',
            marginTop: '4px'
          }}>
            <img
              src={getAssetUrl('profile-pic.jpg')}
              alt="Banishwor Athokpam"
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid #1565C0',
                boxShadow: '0 4px 14px rgba(21, 101, 192, 0.25)'
              }}
            />

            <div>
              <h4 style={{ fontSize: '17px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                Banishwor Athokpam
              </h4>
              <p style={{ fontSize: '12px', color: '#1565C0', fontWeight: 700, margin: '2px 0 0' }}>
                MCA Graduate (7th Rank) · Software Developer
              </p>
              <p style={{ fontSize: '11.5px', color: '#64748B', marginTop: '6px', lineHeight: 1.5, maxWidth: '280px' }}>
                Creator of Manipur Calculator, Manipuri Calendar, and Khutsuman. Specializing in offline-first Android and cultural tech.
              </p>
            </div>

            {/* Quick Links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
              <a
                href="https://play.google.com/store/apps/dev?id=7874987747805177435"
                target="_blank"
                rel="noreferrer"
                className="pressable"
                style={{
                  background: '#0F172A',
                  color: '#FFFFFF',
                  borderRadius: '12px',
                  padding: '10px',
                  fontSize: '12px',
                  fontWeight: 700,
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <span>Google Play Developer Page</span>
                <ExternalLink size={13} />
              </a>

              <a
                href="https://github.com/banishwor"
                target="_blank"
                rel="noreferrer"
                className="pressable"
                style={{
                  background: '#F1F5F9',
                  color: '#1E293B',
                  borderRadius: '12px',
                  padding: '10px',
                  fontSize: '12px',
                  fontWeight: 700,
                  textDecoration: 'none',
                  border: '1px solid #CBD5E1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <span>GitHub Profile</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        )}

        {/* ================= TAB 6: CALC (FINANCE & LOAN CALCULATOR) ================= */}
        {activeTab === 'calc' && (
          <div style={{
            background: '#FFFFFF',
            borderRadius: '18px',
            padding: '28px 18px',
            border: '1px solid #E2E8F0',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '14px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.04)',
            marginTop: '4px'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: '#EFF6FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.15)'
            }}>
              <Calculator size={26} color="#2563EB" />
            </div>

            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                background: '#EFF6FF',
                border: '1px solid rgba(37, 99, 235, 0.25)',
                borderRadius: '8px',
                padding: '3px 8px',
                color: '#1D4ED8',
                fontSize: '10px',
                fontWeight: 800,
                marginBottom: '8px'
              }}>
                <Lock size={12} />
                <span>FULL APP FEATURE</span>
              </div>
              <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#212121', margin: 0 }}>
                Financial Loan & EMI Calculator
              </h4>
              <p style={{ fontSize: '12px', color: '#64748B', marginTop: '6px', lineHeight: 1.5, maxWidth: '290px' }}>
                Calculate bank loan EMIs, simple interest for local lending, and multi-year compound growth with full repayment schedules.
              </p>
            </div>

            {/* Feature Highlights */}
            <div style={{
              width: '100%',
              background: '#FAFAFA',
              borderRadius: '12px',
              padding: '12px',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              fontSize: '11.5px',
              color: '#334155'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={13} color="#10B981" />
                <span>Bank loan EMI with monthly amortization breakdown</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={13} color="#10B981" />
                <span>Traditional gold pawn loan interest formulas</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={13} color="#10B981" />
                <span>Full on-device privacy with encrypted SQLite</span>
              </div>
            </div>

            <a
              href="https://play.google.com/store/apps/details?id=com.manipurcalculator.app&hl=en"
              target="_blank"
              rel="noreferrer"
              className="pressable"
              style={{
                marginTop: '4px',
                background: '#0F172A',
                color: '#FFFFFF',
                borderRadius: '12px',
                padding: '11px 20px',
                fontSize: '12.5px',
                fontWeight: 700,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(15, 23, 42, 0.25)'
              }}
            >
              <span>Download on Google Play for Full Access</span>
              <ExternalLink size={14} />
            </a>
          </div>
        )}
      </div>

      {/* ================= 4. AUTHENTIC 6-TAB BOTTOM NAVIGATION BAR ================= */}
      <div style={{
        height: '56px',
        background: '#FFFFFF',
        borderTop: '1px solid rgba(0, 0, 0, 0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '0 4px',
        flexShrink: 0,
        boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.03)'
      }}>
        {/* 1. Home */}
        <button
          onClick={() => setActiveTab('home')}
          className="pressable"
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2px',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            padding: '4px 0'
          }}
        >
          <div style={{
            background: activeTab === 'home' ? '#EDE9FE' : 'transparent',
            borderRadius: '16px',
            padding: '3px 12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Home size={17} color={activeTab === 'home' ? '#1E293B' : '#64748B'} />
          </div>
          <span style={{
            fontSize: '9.5px',
            fontWeight: activeTab === 'home' ? 800 : 500,
            color: activeTab === 'home' ? '#1E293B' : '#64748B'
          }}>
            Home
          </span>
        </button>

        {/* 2. Land (Active by Default with Ruler Icon) */}
        <button
          onClick={() => setActiveTab('land')}
          className="pressable"
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2px',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            padding: '4px 0'
          }}
        >
          <div style={{
            background: activeTab === 'land' ? '#EDE9FE' : 'transparent', // Exact lavender pill from screenshot
            borderRadius: '16px',
            padding: '3px 12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill={activeTab === 'land' ? '#1E293B' : '#64748B'}>
              <path d="M21 21H3V3l18 18zM7 17h6.5L7 10.5V17z" />
            </svg>
          </div>
          <span style={{
            fontSize: '9.5px',
            fontWeight: activeTab === 'land' ? 800 : 500,
            color: activeTab === 'land' ? '#1E293B' : '#64748B'
          }}>
            Land
          </span>
        </button>

        {/* 3. Gold ($ Circle Icon) */}
        <button
          onClick={() => setActiveTab('gold')}
          className="pressable"
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2px',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            padding: '4px 0'
          }}
        >
          <div style={{
            background: activeTab === 'gold' ? '#EDE9FE' : 'transparent',
            borderRadius: '16px',
            padding: '3px 12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              width: '17px',
              height: '17px',
              borderRadius: '50%',
              background: activeTab === 'gold' ? '#1E293B' : '#64748B',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '11px',
              fontWeight: 800
            }}>
              $
            </div>
          </div>
          <span style={{
            fontSize: '9.5px',
            fontWeight: activeTab === 'gold' ? 800 : 500,
            color: activeTab === 'gold' ? '#1E293B' : '#64748B'
          }}>
            Gold
          </span>
        </button>

        {/* 4. Tools (Wrench Icon) */}
        <button
          onClick={() => setActiveTab('tools')}
          className="pressable"
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2px',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            padding: '4px 0'
          }}
        >
          <div style={{
            background: activeTab === 'tools' ? '#EDE9FE' : 'transparent',
            borderRadius: '16px',
            padding: '3px 12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Wrench size={17} color={activeTab === 'tools' ? '#1E293B' : '#64748B'} />
          </div>
          <span style={{
            fontSize: '9.5px',
            fontWeight: activeTab === 'tools' ? 800 : 500,
            color: activeTab === 'tools' ? '#1E293B' : '#64748B'
          }}>
            Tools
          </span>
        </button>

        {/* 5. Profile (Person Avatar Icon) */}
        <button
          onClick={() => setActiveTab('profile')}
          className="pressable"
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2px',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            padding: '4px 0'
          }}
        >
          <div style={{
            background: activeTab === 'profile' ? '#EDE9FE' : 'transparent',
            borderRadius: '16px',
            padding: '3px 12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <User size={17} color={activeTab === 'profile' ? '#1E293B' : '#64748B'} />
          </div>
          <span style={{
            fontSize: '9.5px',
            fontWeight: activeTab === 'profile' ? 800 : 500,
            color: activeTab === 'profile' ? '#1E293B' : '#64748B'
          }}>
            Profile
          </span>
        </button>

        {/* 6. Calc (Calculator Icon) */}
        <button
          onClick={() => setActiveTab('calc')}
          className="pressable"
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2px',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            padding: '4px 0'
          }}
        >
          <div style={{
            background: activeTab === 'calc' ? '#EDE9FE' : 'transparent',
            borderRadius: '16px',
            padding: '3px 12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Calculator size={17} color={activeTab === 'calc' ? '#1E293B' : '#64748B'} />
          </div>
          <span style={{
            fontSize: '9.5px',
            fontWeight: activeTab === 'calc' ? 800 : 500,
            color: activeTab === 'calc' ? '#1E293B' : '#64748B'
          }}>
            Calc
          </span>
        </button>
      </div>

      {/* ================= 5. ANDROID GESTURE & 3-BUTTON SYSTEM BAR ================= */}
      <div style={{
        height: '38px',
        background: '#FAFAFA',
        borderTop: '1px solid rgba(0, 0, 0, 0.04)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        flexShrink: 0,
        userSelect: 'none'
      }}>
        {/* Back Button (Triangle ◀) */}
        <button
          onClick={handleSystemBack}
          className="pressable"
          title="Back"
          aria-label="Back"
          style={{
            border: 'none',
            background: 'transparent',
            color: '#475569',
            cursor: 'pointer',
            padding: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </button>

        {/* Centered Android Gesture Pill Bar (from screenshot) */}
        <div 
          onClick={onHome}
          className="pressable"
          title="Swipe up for Home"
          style={{
            width: '96px',
            height: '4px',
            background: '#CBD5E1',
            borderRadius: '999px',
            cursor: 'pointer'
          }}
        />

        {/* Recents Button (Square ■) */}
        <button
          onClick={onBack}
          className="pressable"
          title="App Drawer"
          aria-label="App Drawer"
          style={{
            border: 'none',
            background: 'transparent',
            color: '#475569',
            cursor: 'pointer',
            padding: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '2px',
            border: '2px solid #475569'
          }} />
        </button>
      </div>
    </div>
  );
};
