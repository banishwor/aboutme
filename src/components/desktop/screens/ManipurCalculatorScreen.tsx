import React, { useState } from 'react';
import { 
  Calculator, 
  ExternalLink,
  ArrowUpDown
} from 'lucide-react';

export type LandUnit = 
  | 'PARI' 
  | 'LOURAK' 
  | 'SANGAM' 
  | 'LOUKHAI' 
  | 'LOUSHAL' 
  | 'TONG' 
  | 'POINT' 
  | 'SQFT' 
  | 'HECTARE';

const POINT_TO_SQFT = 435.6191;
const POINT_TO_SQM = 40.470339;
const HECTARE_TO_POINTS = 10000 / POINT_TO_SQM;

const landUnitLabels: Record<LandUnit, string> = {
  PARI: 'Pari (ꯄꯔꯤ)',
  LOURAK: 'Lourak (ꯂꯧꯔꯛ)',
  SANGAM: 'Sangam (ꯁꯪꯒꯝ)',
  LOUKHAI: 'Loukhai (ꯂꯧꯈꯥꯏ)',
  LOUSHAL: 'Loushal (ꯂꯧꯁꯜ)',
  TONG: 'Tong (ꯇꯣꯡ)',
  POINT: 'Point (ꯄꯣꯏꯟꯠ)',
  SQFT: 'Square Feet (ft²)',
  HECTARE: 'Hectare (ha)'
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
    case 'HECTARE': return points / HECTARE_TO_POINTS;
  }
};

export const ManipurCalculatorScreen: React.FC = () => {
  const [inputValue, setInputValue] = useState<number>(1);
  const [fromUnit, setFromUnit] = useState<LandUnit>('PARI');
  const [toUnit, setToUnit] = useState<LandUnit>('SQFT');

  // Instant calculation
  const totalPoints = convertToPoints(inputValue || 0, fromUnit);
  const resultValue = convertFromPoints(totalPoints, toUnit);

  const handleSwap = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      width: '100%',
      background: '#F8FAFC',
      color: '#1E293B',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      overflow: 'hidden',
      userSelect: 'none'
    }}>
      {/* 1. App Top Header */}
      <div style={{
        background: '#2563EB',
        color: '#FFFFFF',
        padding: '8px 12px 10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
        boxShadow: '0 2px 8px rgba(37, 99, 235, 0.25)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Calculator size={15} color="#FFFFFF" />
          <div>
            <div style={{ fontSize: '13px', fontWeight: 800, lineHeight: 1.2 }}>
              Manipur Calculator
            </div>
            <div style={{ fontSize: '9.5px', color: 'rgba(255, 255, 255, 0.85)', fontWeight: 600 }}>
              Land Converter (ꯂꯧ-ꯄꯔꯤ ꯄꯨꯡꯂꯣꯟ)
            </div>
          </div>
        </div>

        <span style={{
          fontSize: '9.5px',
          fontWeight: 800,
          background: 'rgba(255, 255, 255, 0.2)',
          padding: '2px 7px',
          borderRadius: '999px',
          color: '#FFFFFF'
        }}>
          Accurate Engine
        </span>
      </div>

      {/* 2. Scrollable Body */}
      <div style={{
        flex: 1,
        minHeight: 0,
        overflowY: 'auto',
        overflowX: 'hidden',
        padding: '10px 10px 12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        {/* Input & Unit Configuration Card */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: '12px',
          padding: '10px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          {/* Numeric Input */}
          <div>
            <label style={{ fontSize: '10px', fontWeight: 800, color: '#475569', display: 'block', marginBottom: '3px' }}>
              LAND QUANTITY
            </label>
            <div style={{ display: 'flex', gap: '6px' }}>
              <input
                type="number"
                min="0"
                step="any"
                value={inputValue === 0 ? '' : inputValue}
                onChange={(e) => setInputValue(parseFloat(e.target.value) || 0)}
                style={{
                  flex: 1,
                  padding: '6px 10px',
                  borderRadius: '8px',
                  border: '1.5px solid #CBD5E1',
                  fontSize: '14px',
                  fontWeight: 800,
                  color: '#0F172A',
                  background: '#F8FAFC',
                  outline: 'none'
                }}
              />
              <div style={{ display: 'flex', gap: '3px' }}>
                {[1, 2, 4, 10].map(val => (
                  <button
                    key={val}
                    onClick={() => setInputValue(val)}
                    style={{
                      padding: '4px 6px',
                      borderRadius: '6px',
                      border: '1px solid #E2E8F0',
                      background: inputValue === val ? '#EFF6FF' : '#F1F5F9',
                      color: inputValue === val ? '#2563EB' : '#475569',
                      fontSize: '9.5px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Unit Conversion Selectors */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '9px', fontWeight: 800, color: '#64748B', display: 'block', marginBottom: '2px' }}>
                FROM
              </label>
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value as LandUnit)}
                style={{
                  width: '100%',
                  padding: '5px 6px',
                  borderRadius: '7px',
                  border: '1px solid #CBD5E1',
                  fontSize: '10.5px',
                  fontWeight: 700,
                  color: '#0F172A',
                  background: '#FFFFFF',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                {Object.keys(landUnitLabels).map(u => (
                  <option key={u} value={u}>{landUnitLabels[u as LandUnit]}</option>
                ))}
              </select>
            </div>

            <button
              onClick={handleSwap}
              title="Swap units"
              style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                background: '#EFF6FF',
                border: '1px solid #BFDBFE',
                color: '#2563EB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                marginTop: '12px',
                flexShrink: 0
              }}
            >
              <ArrowUpDown size={12} />
            </button>

            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '9px', fontWeight: 800, color: '#64748B', display: 'block', marginBottom: '2px' }}>
                TO
              </label>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value as LandUnit)}
                style={{
                  width: '100%',
                  padding: '5px 6px',
                  borderRadius: '7px',
                  border: '1px solid #CBD5E1',
                  fontSize: '10.5px',
                  fontWeight: 700,
                  color: '#0F172A',
                  background: '#FFFFFF',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                {Object.keys(landUnitLabels).map(u => (
                  <option key={u} value={u}>{landUnitLabels[u as LandUnit]}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Live Converted Result Display Card */}
        <div style={{
          background: 'linear-gradient(135deg, #1E40AF 0%, #1D4ED8 100%)',
          borderRadius: '12px',
          padding: '12px 10px',
          color: '#FFFFFF',
          boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '3px'
        }}>
          <span style={{ fontSize: '9.5px', fontWeight: 700, color: '#BFDBFE', letterSpacing: '0.04em' }}>
            CONVERTED MEASUREMENT
          </span>

          <div style={{
            fontSize: '20px',
            fontWeight: 800,
            lineHeight: 1.1,
            wordBreak: 'break-all'
          }}>
            {resultValue.toLocaleString('en-IN', { maximumFractionDigits: 4 })}
          </div>

          <span style={{ fontSize: '11px', fontWeight: 700, color: '#E0E7FF' }}>
            {landUnitLabels[toUnit]}
          </span>

          <div style={{
            marginTop: '4px',
            fontSize: '9px',
            background: 'rgba(255, 255, 255, 0.15)',
            padding: '2px 8px',
            borderRadius: '999px',
            color: '#FFFFFF'
          }}>
            = {totalPoints.toLocaleString('en-IN', { maximumFractionDigits: 2 })} Points (ꯄꯣꯏꯟꯠ)
          </div>
        </div>

        {/* Traditional Hierarchy Quick Reference */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: '12px',
          padding: '8px 10px',
          border: '1px solid #E2E8F0'
        }}>
          <span style={{ fontSize: '9px', fontWeight: 800, color: '#64748B', display: 'block', marginBottom: '5px' }}>
            TRADITIONAL MANIPURI LAND EQUIVALENTS
          </span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '4px', fontSize: '9.5px' }}>
            <div style={{ background: '#F8FAFC', padding: '4px 6px', borderRadius: '6px' }}>
              <strong>1 Pari:</strong> 4 Sangam · 250 Pts
            </div>
            <div style={{ background: '#F8FAFC', padding: '4px 6px', borderRadius: '6px' }}>
              <strong>1 Sangam:</strong> 4 Loushal · 62.5 Pts
            </div>
            <div style={{ background: '#F8FAFC', padding: '4px 6px', borderRadius: '6px' }}>
              <strong>1 Loushal:</strong> 2 Tong · 15.625 Pts
            </div>
            <div style={{ background: '#F8FAFC', padding: '4px 6px', borderRadius: '6px' }}>
              <strong>1 Point:</strong> 435.619 ft² (0.01 Acre)
            </div>
          </div>
        </div>

        {/* Bottom Download Banner */}
        <div style={{
          marginTop: 'auto',
          padding: '8px 10px',
          borderRadius: '10px',
          background: 'rgba(37, 99, 235, 0.05)',
          border: '1px dashed rgba(37, 99, 235, 0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px'
        }}>
          <div style={{ fontSize: '9.5px', color: '#1D4ED8', lineHeight: 1.3 }}>
            <strong>Full App:</strong> Gold San/Mahu math, land partition, and revenue record calculator.
          </div>
          <a
            href="https://github.com/banishwor"
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '9.5px',
              fontWeight: 800,
              color: '#FFFFFF',
              background: '#2563EB',
              padding: '4px 8px',
              borderRadius: '6px',
              textDecoration: 'none',
              flexShrink: 0
            }}
          >
            <span>Get App</span>
            <ExternalLink size={9} />
          </a>
        </div>
      </div>
    </div>
  );
};
