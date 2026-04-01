import { useTranslation } from 'react-i18next';
import { useProgressStore } from '../store/progressStore';
import { Link } from 'react-router-dom';
import { Flame, Star, BrainCircuit, ArrowRight, PlayCircle } from 'lucide-react';
import modulesFR from '../data/modules/fr.json';
import modulesEN from '../data/modules/en.json';

export default function DashboardPage() {
  const { t, i18n } = useTranslation();
  
  const streak = useProgressStore(state => state.streak);
  const xp = useProgressStore(state => state.xp);
  const completedLessons = useProgressStore(state => state.completedLessons);
  const sm2Deck = useProgressStore(state => state.sm2Deck);

  const modulesData = i18n.language === 'en' ? modulesEN : modulesFR;

  const dueCards = Object.values(sm2Deck).filter((card: any) => 
    new Date(card.nextReviewDate) <= new Date()
  ).length;

  return (
    <div className="min-h-full p-4 md:p-8 max-w-6xl mx-auto space-y-8">
      
      {/* Header & Stats */}
      <div className="flex flex-col md:flex-row gap-6 md:items-end justify-between">
        <div>
           <h1 className="text-3xl font-display font-bold text-white mb-2">{t('dashboard.journeyMap')}</h1>
           <p className="text-text-secondary text-lg">Reprenez là où vous vous étiez arrêté.</p>
        </div>

        <div className="flex gap-4">
           {/* Streak */}
           <div className="bg-surface-container border border-border-subtle rounded-2xl px-6 py-4 flex items-center gap-4">
             <div className={`p-3 rounded-full ${streak > 0 ? 'bg-[#FF6B6B]/20 text-[#FF6B6B]' : 'bg-surface text-text-secondary'}`}>
               <Flame className="w-6 h-6" />
             </div>
             <div>
               <div className="text-xs font-display font-bold uppercase tracking-wider text-text-secondary">{t('dashboard.streak')}</div>
               <div className="text-2xl font-display font-bold text-white">{streak}</div>
             </div>
           </div>

           {/* XP */}
           <div className="bg-surface-container border border-border-subtle rounded-2xl px-6 py-4 flex items-center gap-4 hidden sm:flex">
             <div className="p-3 rounded-full bg-primary/20 text-primary">
               <Star className="w-6 h-6" />
             </div>
             <div>
               <div className="text-xs font-display font-bold uppercase tracking-wider text-text-secondary">XP</div>
               <div className="text-2xl font-display font-bold text-white">{xp}</div>
             </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Journey */}
        <div className="lg:col-span-2 space-y-6">
          {modulesData.map((mod: any, index: number) => {
             const unlocked = index === 0 || completedLessons.includes(modulesData[index - 1].lessons[modulesData[index - 1].lessons.length - 1].lessonId);
             
             return (
               <div key={mod.moduleId} className={`bg-surface-container border ${unlocked ? 'border-border-subtle hover:border-text-secondary/30' : 'border-border-subtle/30 opacity-60'} rounded-3xl p-6 md:p-8 transition-colors`}>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-xs font-display font-bold tracking-widest uppercase text-primary mb-2">Module {mod.moduleId}</h2>
                      <h3 className="text-xl font-display font-bold text-white">{mod.title}</h3>
                    </div>
                  </div>

                  <div className="bg-surface border border-border-subtle rounded-xl p-4 md:p-6 flex flex-col sm:flex-row gap-6 mb-6">
                     <div className="h-32 sm:w-48 shrink-0 bg-[#151822] rounded-lg border border-border-subtle overflow-hidden">
                       <img src={mod.hook.imageUrl} alt="Module Hook" className="w-full h-full object-cover mix-blend-luminosity opacity-50" onError={(e) => (e.currentTarget.style.display='none')} />
                     </div>
                     <div className="flex-1">
                        <p className="text-text-secondary font-body italic">"{mod.hook.question}"</p>
                     </div>
                  </div>

                  <div className="space-y-4">
                    {mod.lessons.map((lesson: any) => {
                      const complete = completedLessons.includes(lesson.lessonId);
                      return (
                        <Link 
                          key={lesson.lessonId}
                          to={unlocked ? `/lesson/${lesson.lessonId}` : '#'}
                          className={`group flex items-center justify-between p-4 rounded-xl border transition-all ${
                            unlocked 
                            ? 'bg-surface border-border-subtle hover:bg-surface-container hover:border-text-secondary cursor-pointer' 
                            : 'bg-surface/50 border-border-subtle/50 cursor-not-allowed hidden' // hide locked lessons to avoid clutter
                          }`}
                        >
                          <div className="flex items-center gap-4">
                             <div className={`w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-sm ${
                               complete ? 'bg-primary text-surface' : 'bg-surface-container border border-border-subtle text-text-secondary group-hover:text-white'
                             }`}>
                                {complete ? '✓' : lesson.lessonId}
                             </div>
                             <div>
                               <div className="font-display font-bold text-white">{lesson.title}</div>
                               <div className="text-sm font-body text-text-secondary capitalize">{lesson.type}</div>
                             </div>
                          </div>
                          {unlocked && (
                            <PlayCircle className={`w-6 h-6 ${complete ? 'text-primary' : 'text-text-secondary group-hover:text-white'}`} />
                          )}
                        </Link>
                      );
                    })}
                  </div>
               </div>
             );
          })}
        </div>

        {/* Sidebar / Tools */}
        <div className="space-y-6">
           
           <div className={`bg-gradient-to-br from-surface-container to-[#151822] border rounded-3xl p-6 ${dueCards > 0 ? 'border-primary' : 'border-border-subtle'}`}>
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl text-white mb-2">{t('dashboard.review')}</h3>
              <p className="text-text-secondary mb-6">L'algorithme de répétition espacée optimise la rétention à long terme des concepts.</p>
              
              <Link to="/review" className={`w-full py-3 rounded-xl font-display font-bold flex items-center justify-center gap-2 transition-transform active:scale-95 ${
                dueCards > 0 ? 'bg-primary text-surface hover:bg-primary-container' : 'bg-surface border border-border-subtle text-text-secondary cursor-not-allowed pointer-events-none'
              }`}>
                 {dueCards > 0 ? `Réviser (${dueCards})` : `A Jour`}
                 {dueCards > 0 && <ArrowRight className="w-5 h-5" />}
              </Link>
           </div>
           
        </div>

      </div>
    </div>
  );
}
