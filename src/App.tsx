import { useRef } from 'react';
import SetupPanel from './components/SetupPanel';
import SimulatorPanel from './components/SimulatorPanel';
import BehindArtifactPanel from './components/BehindArtifactPanel';

function App() {
  const simulatorRef = useRef<HTMLElement>(null);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Sticky nav bar */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center">
              <span className="text-white text-xs font-bold">S</span>
            </span>
            <span className="text-sm font-semibold text-gray-900">Spark AI Assistant</span>
            <span className="hidden sm:inline text-xs text-gray-400 ml-1">· Demo by Sam Lee</span>
          </div>
          <button
            onClick={() => simulatorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            Run Simulation →
          </button>
        </div>
      </nav>

      {/* Panel 1: Setup */}
      <SetupPanel simulatorRef={simulatorRef} />

      {/* Panel 2: Simulator */}
      <section ref={simulatorRef as React.RefObject<HTMLElement>}>
        <SimulatorPanel />
      </section>

      {/* Panel 3: Behind the artifact */}
      <BehindArtifactPanel />
    </div>
  );
}

export default App;
