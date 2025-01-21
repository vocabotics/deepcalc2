import { ThemeProvider } from './components/theme-provider';
import { Calculator } from './components/calculator';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Calculator />
      </div>
    </ThemeProvider>
  );
}

export default App;
