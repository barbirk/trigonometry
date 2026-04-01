import { Outlet, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Settings, Map, LayoutDashboard, TriangleRight } from 'lucide-react';

function App() {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'fr' ? 'en' : 'fr');
  };

  return (
    <div className="flex bg-surface min-h-screen font-body text-text-primary selection:bg-primary/20">
      
      {/* Sidebar Navigation */}
      <nav className="w-24 md:w-64 bg-surface-container border-r border-border-subtle p-4 flex flex-col justify-between hidden sm:flex">
        <div>
          <h1 className="text-primary font-display font-bold text-2xl tracking-tighter mb-12 flex items-center gap-3">
             <TriangleRight className="w-8 h-8 shrink-0 text-primary" />
             <span className="hidden md:block">{t('app.title')}</span>
          </h1>

          <ul className="space-y-4 font-display">
            <li>
              <Link 
                to="/" 
                className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === '/' 
                  ? 'bg-primary/10 text-primary group' 
                  : 'text-text-secondary hover:bg-surface hover:text-text-primary'
                }`}
              >
                <LayoutDashboard className="w-6 h-6" />
                <span className="hidden md:block">{t('dashboard.journeyMap')}</span>
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
                <span className="hidden md:block">Playground</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="border-t border-border-subtle pt-6">
           <button 
             onClick={toggleLanguage}
             className="w-full flex items-center justify-center md:justify-start gap-4 px-4 py-3 text-text-secondary hover:text-text-primary transition-colors font-display"
           >
             <Settings className="w-6 h-6" />
             <span className="hidden md:block uppercase tracking-widest text-xs font-bold">{i18n.language === 'fr' ? 'FR → EN' : 'EN → FR'}</span>
           </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <header className="p-6 md:p-8 flex justify-between items-center lg:hidden">
          <h1 className="text-primary font-display font-bold text-xl flex items-center gap-2">
            <TriangleRight className="w-6 h-6" />
            {t('app.title')}
          </h1>
          <button onClick={toggleLanguage} className="font-display font-bold uppercase text-text-secondary">
             {i18n.language}
          </button>
        </header>
        
        <Outlet />
      </main>

    </div>
  );
}

export default App;
