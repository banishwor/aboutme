import React, { useState, useMemo } from 'react';
import { 
  Briefcase, 
  ExternalLink,
  MapPin,
  Clock
} from 'lucide-react';
import { 
  SAMPLE_JOB_SITES, 
  INITIAL_WORKERS, 
  ATTENDANCE_OPTIONS, 
  AttendanceType 
} from '../../../content/khutsumanData';

export const KhutsumanScreen: React.FC = () => {
  // Attendance state for workers: workerId -> AttendanceType
  const [attendanceState, setAttendanceState] = useState<Record<string, AttendanceType>>({
    'w-1': 'full',     // Ibomcha: ₹800
    'w-2': 'half',     // Tomba: ₹375
    'w-3': 'full',     // Chaoba: ₹500
    'w-4': 'overtime'  // Biren: ₹1,050
  });

  const activeSite = SAMPLE_JOB_SITES[0];

  const handleToggleAttendance = (workerId: string, type: AttendanceType) => {
    setAttendanceState(prev => ({
      ...prev,
      [workerId]: type
    }));
  };

  // Real-time calculation of today's wages
  const todaySummary = useMemo(() => {
    let totalEquivalentDays = 0;
    let totalWagesToday = 0;

    INITIAL_WORKERS.forEach(w => {
      const status = attendanceState[w.id] || 'full';
      const opt = ATTENDANCE_OPTIONS[status];
      const fraction = opt.fraction;
      const earned = w.dailyRate * fraction;

      totalEquivalentDays += fraction;
      totalWagesToday += earned;
    });

    return {
      totalEquivalentDays,
      totalWagesToday,
      totalWorkers: INITIAL_WORKERS.length
    };
  }, [attendanceState]);

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
        background: '#4338CA',
        color: '#FFFFFF',
        padding: '8px 12px 10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
        boxShadow: '0 2px 8px rgba(67, 56, 202, 0.25)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Briefcase size={15} color="#FFFFFF" />
          <div>
            <div style={{ fontSize: '13px', fontWeight: 800, lineHeight: 1.2 }}>
              Khutsuman Ledger
            </div>
            <div style={{ fontSize: '9.5px', color: 'rgba(255, 255, 255, 0.85)', fontWeight: 600 }}>
              Daily Wage Manager (ꯈꯨꯠꯁꯨꯃꯥꯟ)
            </div>
          </div>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          background: 'rgba(255, 255, 255, 0.2)',
          padding: '2px 7px',
          borderRadius: '999px',
          fontSize: '9px',
          fontWeight: 700
        }}>
          <MapPin size={9} />
          <span>{activeSite.location}</span>
        </div>
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
        {/* Today's Total Wages Metric Card */}
        <div style={{
          background: 'linear-gradient(135deg, #3730A3 0%, #4F46E5 100%)',
          borderRadius: '12px',
          padding: '10px 12px',
          color: '#FFFFFF',
          boxShadow: '0 3px 10px rgba(79, 70, 229, 0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ fontSize: '9.5px', fontWeight: 700, color: '#C7D2FE', letterSpacing: '0.04em' }}>
              TODAY'S WAGE ROLL
            </div>
            <div style={{ fontSize: '19px', fontWeight: 800, marginTop: '2px' }}>
              ₹{todaySummary.totalWagesToday.toLocaleString('en-IN')}
            </div>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '2px'
          }}>
            <span style={{
              fontSize: '10px',
              fontWeight: 800,
              background: 'rgba(255, 255, 255, 0.18)',
              padding: '2px 8px',
              borderRadius: '999px'
            }}>
              {todaySummary.totalEquivalentDays} Man-Days
            </span>
            <span style={{ fontSize: '8.5px', color: '#E0E7FF' }}>
              {todaySummary.totalWorkers} Workers On Site
            </span>
          </div>
        </div>

        {/* Worker Attendance Roll Title */}
        <div style={{
          fontSize: '9.5px',
          fontWeight: 800,
          color: '#64748B',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          padding: '0 2px'
        }}>
          <Clock size={11} color="#4338CA" />
          <span>DAILY ATTENDANCE & SHIFT LOG</span>
        </div>

        {/* Worker Cards List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {INITIAL_WORKERS.map(worker => {
            const currentAttendance = attendanceState[worker.id] || 'full';
            const opt = ATTENDANCE_OPTIONS[currentAttendance];
            const earnedToday = worker.dailyRate * opt.fraction;

            return (
              <div
                key={worker.id}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '10px',
                  padding: '8px 10px',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 1px 4px rgba(0, 0, 0, 0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}
              >
                {/* Worker Header Info */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: worker.avatarColor,
                      color: '#FFFFFF',
                      fontSize: '10px',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {worker.name[0]}
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', fontWeight: 800, color: '#0F172A', lineHeight: 1.1 }}>
                        {worker.name}
                      </div>
                      <div style={{ fontSize: '8.5px', color: '#64748B' }}>
                        {worker.role} · ₹{worker.dailyRate}/day
                      </div>
                    </div>
                  </div>

                  {/* Calculated wage for this worker */}
                  <div style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    color: earnedToday > 0 ? '#15803D' : '#94A3B8'
                  }}>
                    ₹{earnedToday}
                  </div>
                </div>

                {/* 1-Tap Attendance Pills */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px' }}>
                  {(['full', 'half', 'overtime', 'absent'] as AttendanceType[]).map(type => {
                    const isSelected = currentAttendance === type;
                    const optionMeta = ATTENDANCE_OPTIONS[type];
                    return (
                      <button
                        key={type}
                        onClick={() => handleToggleAttendance(worker.id, type)}
                        style={{
                          padding: '3px 0',
                          borderRadius: '6px',
                          border: isSelected ? '1px solid transparent' : '1px solid #E2E8F0',
                          background: isSelected ? optionMeta.bgActive : '#F8FAFC',
                          color: isSelected ? '#FFFFFF' : '#64748B',
                          fontSize: '8.5px',
                          fontWeight: isSelected ? 800 : 600,
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        {optionMeta.label.split(' ')[0]}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Download Banner */}
        <div style={{
          marginTop: 'auto',
          padding: '8px 10px',
          borderRadius: '10px',
          background: 'rgba(67, 56, 202, 0.05)',
          border: '1px dashed rgba(67, 56, 202, 0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px'
        }}>
          <div style={{ fontSize: '9.5px', color: '#4338CA', lineHeight: 1.3 }}>
            <strong>Full App:</strong> Multi-site management, WhatsApp Hisab share & PDF wage receipts.
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
              background: '#4338CA',
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
