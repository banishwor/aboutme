import React from 'react';
import { ManipuriCalendarScreen } from './screens/ManipuriCalendarScreen';
import { YekSalaiScreen } from './screens/YekSalaiScreen';
import { ManipurCalculatorScreen } from './screens/ManipurCalculatorScreen';
import { KhutsumanScreen } from './screens/KhutsumanScreen';

export type AppId = 'manipuri-calendar' | 'yek-salai' | 'manipur-calculator' | 'khutsuman';

interface DeviceAppShowcaseProps {
  appId: AppId;
  onHome: () => void;
  onOpenRecents?: () => void;
}

export const DeviceAppShowcase: React.FC<DeviceAppShowcaseProps> = ({
  appId
}) => {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      background: '#FFFFFF',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* 1. MANIPURI CALENDAR SINGLE SCREEN */}
      {appId === 'manipuri-calendar' && <ManipuriCalendarScreen />}

      {/* 2. YEK-SALAI MEITEI CLAN SINGLE SCREEN */}
      {appId === 'yek-salai' && <YekSalaiScreen />}

      {/* 3. MANIPUR CALCULATOR SINGLE SCREEN */}
      {appId === 'manipur-calculator' && <ManipurCalculatorScreen />}

      {/* 4. KHUTSUMAN DAILY WAGE SINGLE SCREEN */}
      {appId === 'khutsuman' && <KhutsumanScreen />}
    </div>
  );
};
