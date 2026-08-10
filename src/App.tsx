import { useState } from 'react';
import { PetalFall } from './components/PetalFall';
import { MusicPlayer } from './components/MusicPlayer';
import { HeroWelcome } from './components/HeroWelcome';
import { InvitationCard } from './components/InvitationCard';
import { FestivitiesTimeline } from './components/FestivitiesTimeline';
import { PickYourSide } from './components/PickYourSide';
import { CountdownTimer } from './components/CountdownTimer';
import { LoveStoryGallery } from './components/LoveStoryGallery';
import { VenueMap } from './components/VenueMap';
import { RSVPSection } from './components/RSVPSection';
import { Footer } from './components/Footer';

export function App() {
  const [selectedTeam, setSelectedTeam] = useState<'bride' | 'groom' | null>(null);

  return (
    <div className="min-h-screen bg-[#fcf8f2] text-[#4a3528] relative selection:bg-[#d4af37]/30 selection:text-[#5c0617] overflow-x-hidden">
      {/* Falling Rose & Marigold Petals Particle Canvas */}
      <PetalFall />

      {/* Floating Animated Music Player */}
      <MusicPlayer />

      {/* Main Website Flow */}
      <main className="relative z-10">
        {/* 1. Hero & Auspicious Welcome Screen */}
        <HeroWelcome />

        {/* 2. Parchment Save The Date Invitation Card */}
        <InvitationCard />

        {/* 3. Four Days of Celebrations & Interactive Ceremonies */}
        <FestivitiesTimeline />

        {/* 4. A Little Friendly Rivalry — Pick Your Side */}
        <PickYourSide
          selectedTeam={selectedTeam}
          onSelectTeam={setSelectedTeam}
        />

        {/* 5. Live Countdown to the Muhurtham */}
        <CountdownTimer />

        {/* 6. Our Story & Photo Gallery */}
        <LoveStoryGallery />

        {/* 7. Venue & Directions (Rama Function Hall, Bhadrachalam) */}
        <VenueMap />

        {/* 8. WhatsApp RSVP Section */}
        <RSVPSection selectedTeam={selectedTeam} />

        {/* 9. Royal Footer */}
        <Footer />
      </main>
    </div>
  );
}

export default App;
