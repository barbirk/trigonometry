interface LessonDiagramProps {
  type: string;
}

export default function LessonDiagram({ type }: LessonDiagramProps) {
  switch (type) {
    case 'tree-shadow':
      return (
        <svg viewBox="0 0 200 150" className="w-full max-w-xs">
          {/* Ground */}
          <line x1="10" y1="130" x2="190" y2="130" stroke="#4DFFA4" strokeWidth="2" />
          {/* Tree */}
          <line x1="40" y1="130" x2="40" y2="30" stroke="#4DFFA4" strokeWidth="3" />
          {/* Sun rays */}
          <line x1="160" y1="20" x2="40" y2="30" stroke="#FFD166" strokeWidth="2" strokeDasharray="4" />
          {/* Shadow */}
          <line x1="40" y1="130" x2="140" y2="130" stroke="#F0F4FF" strokeWidth="4" />
          {/* Angle arc */}
          <path d="M 40 110 A 20 20 0 0 1 52 102" fill="none" stroke="#FFD166" strokeWidth="2" />
          {/* Labels */}
          <text x="25" y="80" fill="#F0F4FF" fontSize="12" fontFamily="JetBrains Mono">12m</text>
          <text x="85" y="145" fill="#F0F4FF" fontSize="12" fontFamily="JetBrains Mono">15m</text>
          <text x="55" y="95" fill="#FFD166" fontSize="10" fontFamily="JetBrains Mono">θ</text>
          <text x="165" y="15" fill="#FFD166" fontSize="10" fontFamily="JetBrains Mono">☀</text>
        </svg>
      );

    case 'law-of-sines':
      return (
        <svg viewBox="0 0 200 150" className="w-full max-w-xs">
          {/* Triangle */}
          <polygon points="30,120 170,120 100,30" fill="none" stroke="#4DFFA4" strokeWidth="2" />
          {/* Vertex labels */}
          <text x="100" y="20" fill="#F0F4FF" fontSize="12" fontFamily="JetBrains Mono">A</text>
          <text x="15" y="135" fill="#F0F4FF" fontSize="12" fontFamily="JetBrains Mono">B</text>
          <text x="175" y="135" fill="#F0F4FF" fontSize="12" fontFamily="JetBrains Mono">C</text>
          {/* Side labels */}
          <text x="135" y="70" fill="#FFD166" fontSize="11" fontFamily="JetBrains Mono">a</text>
          <text x="55" y="70" fill="#FFD166" fontSize="11" fontFamily="JetBrains Mono">b</text>
          <text x="100" y="138" fill="#FFD166" fontSize="11" fontFamily="JetBrains Mono">c</text>
          {/* Angle arcs */}
          <path d="M 100 45 A 15 15 0 0 1 112 42" fill="none" stroke="#FFD166" strokeWidth="1.5" />
          <path d="M 42 108 A 15 15 0 0 0 38 120" fill="none" stroke="#FFD166" strokeWidth="1.5" />
          <path d="M 158 120 A 15 15 0 0 0 162 108" fill="none" stroke="#FFD166" strokeWidth="1.5" />
          {/* Formula */}
          <text x="100" y="165" fill="#4DFFA4" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">a/sin(A) = b/sin(B) = c/sin(C)</text>
        </svg>
      );

    case 'aas-asa-cases':
      return (
        <svg viewBox="0 0 200 120" className="w-full max-w-sm">
          {/* AAS Case */}
          <text x="10" y="15" fill="#F0F4FF" fontSize="10" fontFamily="JetBrains Mono">AAS</text>
          <polygon points="10,40 70,40 30,10" fill="none" stroke="#4DFFA4" strokeWidth="1.5" />
          <text x="5" y="55" fill="#FFD166" fontSize="8">A</text>
          <text x="65" y="55" fill="#FFD166" fontSize="8">B</text>
          <text x="25" y="8" fill="#FFD166" fontSize="8">C</text>
          <line x1="12" y1="42" x2="28" y2="12" stroke="#FFD166" strokeWidth="2" />
          <path d="M 15 38 A 8 8 0 0 1 20 32" fill="none" stroke="#FFD166" strokeWidth="1" />
          <path d="M 60 38 A 8 8 0 0 1 65 32" fill="none" stroke="#FFD166" strokeWidth="1" />

          {/* ASA Case */}
          <text x="85" y="15" fill="#F0F4FF" fontSize="10" fontFamily="JetBrains Mono">ASA</text>
          <polygon points="85,40 145,40 115,10" fill="none" stroke="#4DFFA4" strokeWidth="1.5" />
          <text x="80" y="55" fill="#FFD166" fontSize="8">A</text>
          <text x="140" y="55" fill="#FFD166" fontSize="8">B</text>
          <text x="110" y="8" fill="#FFD166" fontSize="8">C</text>
          <line x1="87" y1="42" x2="143" y2="42" stroke="#FFD166" strokeWidth="2" />
          <path d="M 90 38 A 8 8 0 0 1 95 32" fill="none" stroke="#FFD166" strokeWidth="1" />
          <path d="M 130 38 A 8 8 0 0 1 135 32" fill="none" stroke="#FFD166" strokeWidth="1" />
        </svg>
      );

    default:
      return null;
  }
}
