import { Outlet, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Settings, Map, LayoutDashboard, TriangleRight, BrainCircuit, BookOpen } from 'lucide-react';
import { useProgressStore } from './store/progressStore';

function App() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const dueCards = useProgressStore(state => 
    Object.values(state.sm2Deck).filter((card: any) => 
      new Date(card.nextReviewDate) <= new Date()
    ).length
  );

  return (
    <div className="flex bg-surface min-h-screen font-body text-text-primary selection:bg-primary/20">
      
      {/* Sidebar Navigation */}
      <nav className="w-24 md:w-64 bg-surface-container border-r border-border-subtle p-4 flex flex-col justify-between hidden sm:flex">
        <div>
          <Link to="/" className="text-primary font-display font-bold text-2xl tracking-tighter mb-12 flex items-center gap-3">
             <TriangleRight className="w-8 h-8 shrink-0 text-primary" />
             <span className="hidden md:block">{t('app.title')}</span>
          </Link>

          <ul className="space-y-2 font-display">
            <li>
              <Link 
                to="/" 
                className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === '/' 
                  ? 'bg-primary/10 text-primary' 
                  : 'text-text-secondary hover:bg-surface hover:text-text-primary'
                }`}
              >
                <LayoutDashboard className="w-6 h-6" />
                <span className="hidden md:block">{t('nav.dashboard')}</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/review" 
                className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === '/review' 
                  ? 'bg-primary/10 text-primary' 
                  : 'text-text-secondary hover:bg-surface hover:text-text-primary'
                }`}
              >
                <div className="relative">
                  <BrainCircuit className="w-6 h-6" />
                  {dueCards > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-error rounded-full text-[10px] flex items-center justify-center text-white font-bold">
                      {dueCards}
                    </span>
                  )}
                </div>
                <span className="hidden md:block">{t('nav.review')}</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/explorer" 
                className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === '/explorer' 
                  ? 'bg-primary/10 text-primary' 
                  : 'text-text-secondary hover:bg-surface hover:text-text-primary'
                }`}
              >
                <Map className="w-6 h-6" />
                <span className="hidden md:block">{t('nav.playground')}</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/settings" 
                className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === '/settings' 
                  ? 'bg-primary/10 text-primary' 
                  : 'text-text-secondary hover:bg-surface hover:text-text-primary'
                }`}
              >
                <Settings className="w-6 h-6" />
                <span className="hidden md:block">{t('nav.settings')}</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="border-t border-border-subtle pt-6">
           <div className="hidden md:block px-4 mb-4">
             <p className="text-xs text-text-secondary uppercase tracking-wider">{t('app.language')}</p>
             <button 
               onClick={() => i18n.changeLanguage(i18n.language === 'fr' ? 'en' : 'fr')}
               className="mt-2 text-text-primary hover:text-primary transition-colors font-display font-bold"
             >
               {i18n.language === 'fr' ? 'Français → English' : 'English → Français'}
             </button>
           </div>
           <button 
             onClick={() => i18n.changeLanguage(i18n.language === 'fr' ? 'en' : 'fr')}
             className="md:hidden w-full flex items-center justify-center gap-4 px-4 py-3 text-text-secondary hover:text-text-primary transition-colors font-display"
           >
             <BookOpen className="w-6 h-6" />
             <span className="uppercase tracking-widest text-xs font-bold">{i18n.language}</span>
           </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <header className="p-6 md:p-8 flex justify-between items-center lg:hidden">
          <Link to="/" className="text-primary font-display font-bold text-xl flex items-center gap-2">
            <TriangleRight className="w-6 h-6" />
            {t('app.title')}
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/review" className="relative">
              <BrainCircuit className="w-6 h-6 text-text-secondary" />
              {dueCards > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-error rounded-full text-[10px] flex items-center justify-center text-white font-bold">
                  {dueCards}
                </span>
              )}
            </Link>
            <button onClick={() => i18n.changeLanguage(i18n.language === 'fr' ? 'en' : 'fr')} className="font-display font-bold uppercase text-text-secondary">
               {i18n.language}
            </button>
          </div>
        </header>
        
        <Outlet />
      </main>

    </div>
  );
}

export default App;
