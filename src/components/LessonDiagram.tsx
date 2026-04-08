interface LessonDiagramProps {
  type: string;
}

export default function LessonDiagram({ type }: LessonDiagramProps) {
  switch (type) {
    case 'tree-shadow':
      return (
        <svg viewBox="0 0 220 150" className="w-full max-w-xs">
          <line x1="10" y1="130" x2="210" y2="130" stroke="#4DFFA4" strokeWidth="2" />
          <line x1="50" y1="130" x2="50" y2="30" stroke="#4DFFA4" strokeWidth="3" />
          <line x1="50" y1="130" x2="170" y2="130" stroke="#F0F4FF" strokeWidth="4" />
          <line x1="50" y1="30" x2="170" y2="130" stroke="#FFD166" strokeWidth="2" strokeDasharray="5,3" />
          <circle cx="20" cy="10" r="10" fill="#FFD166" />
          <text x="13" y="15" fill="#0F1117" fontSize="12">☀</text>
          <line x1="20" y1="10" x2="50" y2="30" stroke="#FFD166" strokeWidth="2" strokeDasharray="3,3" />
          <circle cx="50" cy="30" r="3" fill="#4DFFA4" />
          <path d="M 155 130 A 15 15 0 0 1 163 118" fill="none" stroke="#FFD166" strokeWidth="2" />
          <text x="138" y="115" fill="#FFD166" fontSize="12" fontFamily="JetBrains Mono">θ</text>
          <path d="M 50 120 L 58 120 L 58 128" fill="none" stroke="#4DFFA4" strokeWidth="1.5" />
          <text x="32" y="85" fill="#F0F4FF" fontSize="12" fontFamily="JetBrains Mono" textAnchor="middle">12m</text>
          <text x="110" y="145" fill="#F0F4FF" fontSize="12" fontFamily="JetBrains Mono" textAnchor="middle">15m</text>
          <text x="35" y="75" fill="#4DFFA4" fontSize="9" fontFamily="JetBrains Mono">opposé</text>
          <text x="100" y="118" fill="#F0F4FF" fontSize="9" fontFamily="JetBrains Mono">adjacent</text>
        </svg>
      );

    case 'law-of-sines':
      return (
        <svg viewBox="0 0 200 150" className="w-full max-w-xs">
          <polygon points="30,120 170,120 100,30" fill="none" stroke="#4DFFA4" strokeWidth="2" />
          <text x="100" y="20" fill="#F0F4FF" fontSize="12" fontFamily="JetBrains Mono">A</text>
          <text x="15" y="135" fill="#F0F4FF" fontSize="12" fontFamily="JetBrains Mono">B</text>
          <text x="175" y="135" fill="#F0F4FF" fontSize="12" fontFamily="JetBrains Mono">C</text>
          <text x="135" y="70" fill="#FFD166" fontSize="11" fontFamily="JetBrains Mono">a</text>
          <text x="55" y="70" fill="#FFD166" fontSize="11" fontFamily="JetBrains Mono">b</text>
          <text x="100" y="138" fill="#FFD166" fontSize="11" fontFamily="JetBrains Mono">c</text>
          <path d="M 100 45 A 15 15 0 0 1 112 42" fill="none" stroke="#FFD166" strokeWidth="1.5" />
          <path d="M 42 108 A 15 15 0 0 0 38 120" fill="none" stroke="#FFD166" strokeWidth="1.5" />
          <path d="M 158 120 A 15 15 0 0 0 162 108" fill="none" stroke="#FFD166" strokeWidth="1.5" />
          <text x="100" y="165" fill="#4DFFA4" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">a/sin(A) = b/sin(B) = c/sin(C)</text>
        </svg>
      );

    case 'aas-asa-cases':
      return (
        <svg viewBox="0 0 200 120" className="w-full max-w-sm">
          <text x="10" y="15" fill="#F0F4FF" fontSize="10" fontFamily="JetBrains Mono">AAS</text>
          <polygon points="10,40 70,40 30,10" fill="none" stroke="#4DFFA4" strokeWidth="1.5" />
          <text x="5" y="55" fill="#FFD166" fontSize="8">A</text>
          <text x="65" y="55" fill="#FFD166" fontSize="8">B</text>
          <text x="25" y="8" fill="#FFD166" fontSize="8">C</text>
          <line x1="12" y1="42" x2="28" y2="12" stroke="#FFD166" strokeWidth="2" />
          <path d="M 15 38 A 8 8 0 0 1 20 32" fill="none" stroke="#FFD166" strokeWidth="1" />
          <path d="M 60 38 A 8 8 0 0 1 65 32" fill="none" stroke="#FFD166" strokeWidth="1" />

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

    case 'right-triangle-labels':
      return (
        <svg viewBox="0 0 200 150" className="w-full max-w-xs">
          <polygon points="30,130 170,130 30,30" fill="none" stroke="#4DFFA4" strokeWidth="2" />
          <rect x="30" y="118" width="12" height="12" fill="none" stroke="#4DFFA4" strokeWidth="1.5" />
          <path d="M 155 130 A 20 20 0 0 1 163 118" fill="none" stroke="#FFD166" strokeWidth="2" />
          <text x="138" y="115" fill="#FFD166" fontSize="12" fontFamily="JetBrains Mono">θ</text>
          <text x="20" y="85" fill="#F0F4FF" fontSize="11" fontFamily="JetBrains Mono" textAnchor="end">Opp</text>
          <text x="100" y="145" fill="#F0F4FF" fontSize="11" fontFamily="JetBrains Mono">Adj</text>
          <text x="120" y="70" fill="#FFD166" fontSize="11" fontFamily="JetBrains Mono">Hyp</text>
        </svg>
      );

    case 'soh-cah-toa':
      return (
        <svg viewBox="0 0 300 120" className="w-full max-w-lg">
          <text x="50" y="25" fill="#4DFFA4" fontSize="14" fontFamily="JetBrains Mono" fontWeight="bold">SOH</text>
          <text x="35" y="50" fill="#F0F4FF" fontSize="11" fontFamily="JetBrains Mono">sin(θ) =</text>
          <text x="30" y="75" fill="#FFD166" fontSize="10" fontFamily="JetBrains Mono">Opp</text>
          <line x1="30" y1="80" x2="55" y2="80" stroke="#F0F4FF" strokeWidth="1" />
          <text x="30" y="95" fill="#F0F4FF" fontSize="10" fontFamily="JetBrains Mono">Hyp</text>

          <text x="140" y="25" fill="#4DFFA4" fontSize="14" fontFamily="JetBrains Mono" fontWeight="bold">CAH</text>
          <text x="125" y="50" fill="#F0F4FF" fontSize="11" fontFamily="JetBrains Mono">cos(θ) =</text>
          <text x="120" y="75" fill="#FFD166" fontSize="10" fontFamily="JetBrains Mono">Adj</text>
          <line x1="120" y1="80" x2="145" y2="80" stroke="#F0F4FF" strokeWidth="1" />
          <text x="120" y="95" fill="#F0F4FF" fontSize="10" fontFamily="JetBrains Mono">Hyp</text>

          <text x="230" y="25" fill="#4DFFA4" fontSize="14" fontFamily="JetBrains Mono" fontWeight="bold">TOA</text>
          <text x="215" y="50" fill="#F0F4FF" fontSize="11" fontFamily="JetBrains Mono">tan(θ) =</text>
          <text x="210" y="75" fill="#FFD166" fontSize="10" fontFamily="JetBrains Mono">Opp</text>
          <line x1="210" y1="80" x2="235" y2="80" stroke="#F0F4FF" strokeWidth="1" />
          <text x="210" y="95" fill="#F0F4FF" fontSize="10" fontFamily="JetBrains Mono">Adj</text>
        </svg>
      );

    case 'inverse-trig':
      return (
        <svg viewBox="0 0 200 120" className="w-full max-w-xs">
          <text x="100" y="25" fill="#F0F4FF" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle">sin(30°) = 0.5</text>
          <text x="100" y="45" fill="#FFD166" fontSize="16" fontFamily="JetBrains Mono" textAnchor="middle">↓</text>
          <text x="100" y="70" fill="#4DFFA4" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle">sin⁻¹(0.5) = 30°</text>
          <text x="100" y="95" fill="#F0F4FF" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">(fonction inverse)</text>
        </svg>
      );

    case 'elevation-depression':
      return (
        <svg viewBox="0 0 240 140" className="w-full max-w-md">
          <line x1="20" y1="100" x2="220" y2="100" stroke="#4DFFA4" strokeWidth="2" />
          <text x="110" y="120" fill="#F0F4FF" fontSize="10" fontFamily="JetBrains Mono">horizontal</text>
          
          <circle cx="40" cy="70" r="5" fill="#FFD166" />
          <text x="35" y="60" fill="#FFD166" fontSize="10">👁</text>
          <line x1="40" y1="70" x2="120" y2="100" stroke="#FFD166" strokeWidth="2" strokeDasharray="4" />
          <path d="M 55 95 A 20 20 0 0 0 48 85" fill="none" stroke="#FFD166" strokeWidth="1.5" />
          <text x="60" y="82" fill="#FFD166" fontSize="10">↑ élévation</text>
          
          <circle cx="200" cy="40" r="5" fill="#FFD166" />
          <text x="195" y="30" fill="#FFD166" fontSize="10">👁</text>
          <line x1="200" y1="40" x2="120" y2="100" stroke="#FFD166" strokeWidth="2" strokeDasharray="4" />
          <path d="M 185 60 A 20 20 0 0 0 192 70" fill="none" stroke="#FFD166" strokeWidth="1.5" />
          <text x="145" y="55" fill="#FFD166" fontSize="10">↓ dépression</text>
        </svg>
      );

    case 'law-of-cosines':
      return (
        <svg viewBox="0 0 200 150" className="w-full max-w-xs">
          <polygon points="30,120 160,120 70,40" fill="none" stroke="#4DFFA4" strokeWidth="2" />
          <text x="65" y="35" fill="#F0F4FF" fontSize="12" fontFamily="JetBrains Mono">C</text>
          <text x="15" y="135" fill="#F0F4FF" fontSize="12" fontFamily="JetBrains Mono">A</text>
          <text x="165" y="135" fill="#F0F4FF" fontSize="12" fontFamily="JetBrains Mono">B</text>
          <text x="105" y="85" fill="#FFD166" fontSize="11" fontFamily="JetBrains Mono">c</text>
          <text x="40" y="85" fill="#FFD166" fontSize="11" fontFamily="JetBrains Mono">b</text>
          <text x="115" y="135" fill="#FFD166" fontSize="11" fontFamily="JetBrains Mono">a</text>
          <path d="M 70 55 A 15 15 0 0 1 80 50" fill="none" stroke="#FFD166" strokeWidth="1.5" />
          <text x="100" y="165" fill="#4DFFA4" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">c² = a² + b² - 2ab·cos(C)</text>
        </svg>
      );

    case 'sss-congruence':
      return (
        <svg viewBox="0 0 220 100" className="w-full max-w-md">
          <text x="10" y="20" fill="#F0F4FF" fontSize="10" fontFamily="JetBrains Mono">Triangle 1</text>
          <polygon points="10,40 70,40 40,15" fill="none" stroke="#4DFFA4" strokeWidth="2" />
          <text x="35" y="12" fill="#FFD166" fontSize="8">5</text>
          <text x="5" y="55" fill="#FFD166" fontSize="8">7</text>
          <text x="65" y="55" fill="#FFD166" fontSize="8">9</text>
          
          <text x="95" y="55" fill="#4DFFA4" fontSize="14">≅</text>
          
          <text x="130" y="20" fill="#F0F4FF" fontSize="10" fontFamily="JetBrains Mono">Triangle 2</text>
          <polygon points="130,40 190,40 160,15" fill="none" stroke="#4DFFA4" strokeWidth="2" />
          <text x="155" y="12" fill="#FFD166" fontSize="8">5</text>
          <text x="125" y="55" fill="#FFD166" fontSize="8">7</text>
          <text x="185" y="55" fill="#FFD166" fontSize="8">9</text>
        </svg>
      );

    case 'sas-congruence':
      return (
        <svg viewBox="0 0 220 100" className="w-full max-w-md">
          <text x="10" y="20" fill="#F0F4FF" fontSize="10" fontFamily="JetBrains Mono">Triangle 1</text>
          <polygon points="10,40 70,40 40,15" fill="none" stroke="#4DFFA4" strokeWidth="2" />
          <text x="35" y="12" fill="#FFD166" fontSize="8">60°</text>
          <line x1="12" y1="42" x2="38" y2="17" stroke="#FFD166" strokeWidth="2" />
          <line x1="42" y1="17" x2="68" y2="42" stroke="#FFD166" strokeWidth="2" />
          <path d="M 32 30 A 8 8 0 0 1 40 25" fill="none" stroke="#FFD166" strokeWidth="1" />
          
          <text x="95" y="55" fill="#4DFFA4" fontSize="14">≅</text>
          
          <text x="130" y="20" fill="#F0F4FF" fontSize="10" fontFamily="JetBrains Mono">Triangle 2</text>
          <polygon points="130,40 190,40 160,15" fill="none" stroke="#4DFFA4" strokeWidth="2" />
          <text x="155" y="12" fill="#FFD166" fontSize="8">60°</text>
          <line x1="132" y1="42" x2="158" y2="17" stroke="#FFD166" strokeWidth="2" />
          <line x1="162" y1="17" x2="188" y2="42" stroke="#FFD166" strokeWidth="2" />
          <path d="M 152 30 A 8 8 0 0 1 160 25" fill="none" stroke="#FFD166" strokeWidth="1" />
        </svg>
      );

    case 'asa-congruence':
      return (
        <svg viewBox="0 0 220 100" className="w-full max-w-md">
          <text x="10" y="20" fill="#F0F4FF" fontSize="10" fontFamily="JetBrains Mono">Triangle 1</text>
          <polygon points="10,40 70,40 40,15" fill="none" stroke="#4DFFA4" strokeWidth="2" />
          <line x1="12" y1="42" x2="68" y2="42" stroke="#FFD166" strokeWidth="2" />
          <path d="M 18 35 A 8 8 0 0 1 22 30" fill="none" stroke="#FFD166" strokeWidth="1" />
          <path d="M 52 30 A 8 8 0 0 1 56 35" fill="none" stroke="#FFD166" strokeWidth="1" />
          
          <text x="95" y="55" fill="#4DFFA4" fontSize="14">≅</text>
          
          <text x="130" y="20" fill="#F0F4FF" fontSize="10" fontFamily="JetBrains Mono">Triangle 2</text>
          <polygon points="130,40 190,40 160,15" fill="none" stroke="#4DFFA4" strokeWidth="2" />
          <line x1="132" y1="42" x2="188" y2="42" stroke="#FFD166" strokeWidth="2" />
          <path d="M 138 35 A 8 8 0 0 1 142 30" fill="none" stroke="#FFD166" strokeWidth="1" />
          <path d="M 172 30 A 8 8 0 0 1 176 35" fill="none" stroke="#FFD166" strokeWidth="1" />
        </svg>
      );

    case 'similar-triangles':
      return (
        <svg viewBox="0 0 220 140" className="w-full max-w-md">
          <text x="10" y="20" fill="#F0F4FF" fontSize="10" fontFamily="JetBrains Mono">Petit</text>
          <polygon points="30,110 90,110 50,50" fill="none" stroke="#4DFFA4" strokeWidth="2" />
          <text x="55" y="45" fill="#FFD166" fontSize="9">3</text>
          <text x="20" y="125" fill="#FFD166" fontSize="9">4</text>
          <text x="85" y="125" fill="#FFD166" fontSize="9">5</text>
          
          <text x="100" y="80" fill="#4DFFA4" fontSize="14">~</text>
          <text x="100" y="95" fill="#F0F4FF" fontSize="9">k=2</text>
          
          <text x="130" y="20" fill="#F0F4FF" fontSize="10" fontFamily="JetBrains Mono">Grand</text>
          <polygon points="130,130 190,130 150,10" fill="none" stroke="#4DFFA4" strokeWidth="2" />
          <text x="155" y="8" fill="#FFD166" fontSize="9">6</text>
          <text x="120" y="145" fill="#FFD166" fontSize="9">8</text>
          <text x="185" y="145" fill="#FFD166" fontSize="9">10</text>
        </svg>
      );

    case 'aa-similarity':
      return (
        <svg viewBox="0 0 220 100" className="w-full max-w-md">
          <text x="10" y="20" fill="#F0F4FF" fontSize="10" fontFamily="JetBrains Mono">Triangle 1</text>
          <polygon points="10,40 70,40 40,15" fill="none" stroke="#4DFFA4" strokeWidth="2" />
          <text x="15" y="35" fill="#FFD166" fontSize="9">40°</text>
          <text x="50" y="25" fill="#FFD166" fontSize="9">60°</text>
          
          <text x="95" y="55" fill="#4DFFA4" fontSize="14">~</text>
          
          <text x="130" y="20" fill="#F0F4FF" fontSize="10" fontFamily="JetBrains Mono">Triangle 2</text>
          <polygon points="130,40 190,40 160,15" fill="none" stroke="#4DFFA4" strokeWidth="2" />
          <text x="135" y="35" fill="#FFD166" fontSize="9">40°</text>
          <text x="170" y="25" fill="#FFD166" fontSize="9">60°</text>
        </svg>
      );

    case 'metric-relations':
      return (
        <svg viewBox="0 0 200 150" className="w-full max-w-xs">
          <polygon points="30,130 170,130 30,30" fill="none" stroke="#4DFFA4" strokeWidth="2" />
          <line x1="30" y1="30" x2="100" y2="80" stroke="#FFD166" strokeWidth="2" strokeDasharray="4" />
          <line x1="100" y1="80" x2="100" y2="130" stroke="#FFD166" strokeWidth="2" strokeDasharray="4" />
          <rect x="30" y="118" width="12" height="12" fill="none" stroke="#4DFFA4" strokeWidth="1.5" />
          <text x="10" y="85" fill="#F0F4FF" fontSize="10" fontFamily="JetBrains Mono">a</text>
          <text x="65" y="70" fill="#F0F4FF" fontSize="10" fontFamily="JetBrains Mono">b</text>
          <text x="100" y="145" fill="#F0F4FF" fontSize="10" fontFamily="JetBrains Mono">c</text>
          <text x="75" y="100" fill="#FFD166" fontSize="9" fontFamily="JetBrains Mono">h</text>
          <text x="85" y="125" fill="#FFD166" fontSize="8" fontFamily="JetBrains Mono">p</text>
          <text x="125" y="125" fill="#FFD166" fontSize="8" fontFamily="JetBrains Mono">q</text>
        </svg>
      );

    case 'pythagorean':
      return (
        <svg viewBox="0 0 200 150" className="w-full max-w-xs">
          <polygon points="30,130 130,130 30,50" fill="none" stroke="#4DFFA4" strokeWidth="2" />
          <rect x="30" y="118" width="12" height="12" fill="none" stroke="#4DFFA4" strokeWidth="1.5" />
          <text x="15" y="95" fill="#F0F4FF" fontSize="12" fontFamily="JetBrains Mono">3</text>
          <text x="80" y="145" fill="#F0F4FF" fontSize="12" fontFamily="JetBrains Mono">4</text>
          <text x="90" y="80" fill="#FFD166" fontSize="12" fontFamily="JetBrains Mono">5</text>
          <text x="100" y="165" fill="#4DFFA4" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle">3² + 4² = 5²</text>
        </svg>
      );

    default:
      return null;
  }
}
