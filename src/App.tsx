import React, { useState } from 'react';
import { SpaceId } from './content/apps';
import { DesktopWrapper } from './components/DesktopWrapper';
import { BootSequence } from './components/BootSequence';
import { Wallpaper } from './components/Wallpaper';
import { TopBar } from './components/TopBar';
import { HomeLauncher } from './components/HomeLauncher';
import { BottomNavigation } from './components/BottomNavigation';
import { DimensionsDeck } from './components/DimensionsDeck';
import { AppWindow } from './components/AppWindow';

export const App: React.FC = () => {
  const [booted, setBooted] = useState<boolean>(() => {
    return !!sessionStorage.getItem('bani_os_booted');
  });
  const [currentSpace, setCurrentSpace] = useState<SpaceId>('HOME');
  const [isSkillsOpen, setIsSkillsOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [activeAppId, setActiveAppId] = useState<string | null>(null);

  return (
    <DesktopWrapper>
      {/* Boot Sequence Overlay (First visit only, skippable) */}
      {!booted && (
        <BootSequence onComplete={() => setBooted(true)} />
      )}

      {/* Main OS Viewport Canvas */}
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Real Vibrant Phone Wallpaper */}
        <Wallpaper />

        {/* Minimalist Top Space Header */}
        <TopBar 
          currentSpace={currentSpace} 
          onOpenSkills={() => setIsSkillsOpen(true)} 
        />

        {/* Home Spaces Carousel & Launcher with Connected Morphing Search */}
        <HomeLauncher
          currentSpace={currentSpace}
          onSelectSpace={setCurrentSpace}
          onLaunchApp={(appId) => setActiveAppId(appId)}
          onOpenSkills={() => setIsSkillsOpen(true)}
          isSearchOpen={isSearchOpen}
          onOpenSearch={() => setIsSearchOpen(true)}
          onCloseSearch={() => setIsSearchOpen(false)}
        />

        {/* Space Indicator & Skills Swipe Hint */}
        <BottomNavigation
          currentSpace={currentSpace}
          onSelectSpace={setCurrentSpace}
          onOpenSkills={() => setIsSkillsOpen(true)}
        />

        {/* Signature Swipe-Up Dimensions Deck Layer */}
        <DimensionsDeck
          isOpen={isSkillsOpen}
          onClose={() => setIsSkillsOpen(false)}
          onLaunchApp={(appId) => setActiveAppId(appId)}
        />

        {/* Interactive App Window Sheet */}
        <AppWindow
          appId={activeAppId}
          onClose={() => setActiveAppId(null)}
        />
      </div>
    </DesktopWrapper>
  );
};

export default App;
