import { ThemeProvider } from './components/theme-provider';
import { Calculator } from './components/calculator';
import { PacManGame } from '@/components/pacman-game';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

function App() {
  const [showGame, setShowGame] = useState(false);

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
        <Button
          onClick={() => setShowGame(!showGame)}
          variant="outline"
          className="mb-4"
        >
          {showGame ? 'Show Calculator' : 'Play Pac-Man'}
        </Button>
        {showGame ? <PacManGame /> : <Calculator />}
      </div>
    </ThemeProvider>
  );
}

export default App;