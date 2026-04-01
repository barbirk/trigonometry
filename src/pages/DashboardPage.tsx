import { useTranslation } from 'react-i18next';
import { useProgressStore, BADGES } from '../store/progressStore';
import { Link } from 'react-router-dom';
import { Flame, Star, BrainCircuit, ArrowRight, PlayCircle, Clock, Trophy, Target, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import modulesFR from '../data/modules/fr.json';
import modulesEN from '../data/modules/en.json';

export default function DashboardPage() {
  const { t, i18n } = useTranslation();
  
  const streak = useProgressStore(state => state.streak);
  const xp = useProgressStore(state => state.xp);
  const completedLessons = useProgressStore(state => state.completedLessons);
  const completedModules = useProgressStore(state => state.completedModules);
  const sm2Deck = useProgressStore(state => state.sm2Deck);
  const badges = useProgressStore(state => state.badges);
  const totalTimeMinutes = useProgressStore(state => state.totalTimeMinutes);
  const conceptMastery = useProgressStore(state => state.conceptMastery);

  const modulesData = i18n.language === 'en' ? modulesEN : modulesFR;

  const dueCards = Object.values(sm2Deck).filter((card: any) => 
    new Date(card.nextReviewDate) <= new Date()
  ).length;

  // Calculate stats
  const masteryCount = Object.values(conceptMastery).filter(c => c.confidenceLevel === 'mastered').length;
  const totalConcepts = Object.keys(conceptMastery).length;
  const masteryRate = totalConcepts > 0 ? Math.round((masteryCount / totalConcepts) * 100) : 0;

  // Get unlocked badge details
  const unlockedBadges = badges.map(b => BADGES.find(bg => bg.id === b.id)).filter(Boolean);

  return (
    <div className="min-h-full p-4 md:p-8 max-w-6xl mx-auto space-y-8">
      
      {/* Header & Stats */}
      <div className="flex flex-col md:flex-row gap-6 md:items-end justify-between">
        <div>
           <h1 className="text-3xl font-display font-bold text-white mb-2">{t('dashboard.journeyMap')}</h1>
           <p className="text-text-secondary text-lg">{t('dashboard.continueLearning')}</p>
        </div>

        <div className="flex gap-3 flex-wrap">
           {/* Streak */}
           <motion.div 
             whileHover={{ scale: 1.02 }}
             className="bg-surface-container border border-border-subtle rounded-2xl px-5 py-3 flex items-center gap-3"
           >
             <div className={`p-2.5 rounded-full ${streak > 0 ? 'bg-error/20 text-error' : 'bg-surface text-text-secondary'}`}>
               <Flame className="w-5 h-5" />
             </div>
             <div>
               <div className="text-xs font-display font-bold uppercase tracking-wider text-text-secondary">{t('dashboard.streak')}</div>
               <div className="text-xl font-display font-bold text-white">{streak}</div>
             </div>
           </motion.div>

           {/* XP */}
           <motion.div 
             whileHover={{ scale: 1.02 }}
             className="bg-surface-container border border-border-subtle rounded-2xl px-5 py-3 flex items-center gap-3"
           >
             <div className="p-2.5 rounded-full bg-primary/20 text-primary">
               <Star className="w-5 h-5" />
             </div>
             <div>
               <div className="text-xs font-display font-bold uppercase tracking-wider text-text-secondary">XP</div>
               <div className="text-xl font-display font-bold text-white">{xp}</div>
             </div>
           </motion.div>

           {/* Time */}
           <motion.div 
             whileHover={{ scale: 1.02 }}
             className="bg-surface-container border border-border-subtle rounded-2xl px-5 py-3 flex items-center gap-3 hidden sm:flex"
           >
             <div className="p-2.5 rounded-full bg-hint/20 text-hint">
               <Clock className="w-5 h-5" />
             </div>
             <div>
               <div className="text-xs font-display font-bold uppercase tracking-wider text-text-secondary">{t('dashboard.time')}</div>
               <div className="text-xl font-display font-bold text-white">{Math.floor(totalTimeMinutes / 60)}h</div>
             </div>
           </motion.div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-surface-container border border-border-subtle rounded-xl p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Target className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-text-secondary text-xs uppercase tracking-wider">{t('dashboard.modulesCompleted')}</p>
            <p className="text-2xl font-display font-bold text-white">{completedModules.length} / 6</p>
          </div>
        </div>
        
        <div className="bg-surface-container border border-border-subtle rounded-xl p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-hint/10 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-hint" />
          </div>
          <div>
            <p className="text-text-secondary text-xs uppercase tracking-wider">{t('dashboard.masteryRate')}</p>
            <p className="text-2xl font-display font-bold text-white">{masteryRate}%</p>
          </div>
        </div>

        <div className="bg-surface-container border border-border-subtle rounded-xl p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-error/10 flex items-center justify-center">
            <Trophy className="w-6 h-6 text-error" />
          </div>
          <div>
            <p className="text-text-secondary text-xs uppercase tracking-wider">{t('dashboard.badges')}</p>
            <p className="text-2xl font-display font-bold text-white">{unlockedBadges.length} / {BADGES.length}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Journey */}
        <div className="lg:col-span-2 space-y-6">
          {modulesData.map((mod: any, index: number) => {
             const isCompleted = completedModules.includes(mod.moduleId);
             const previousModuleComplete = index === 0 || completedModules.includes(modulesData[index - 1].moduleId);
             const unlocked = index === 0 || previousModuleComplete;
             const moduleProgress = mod.lessons.filter((l: any) => completedLessons.includes(l.lessonId)).length;
             const progressPercent = (moduleProgress / mod.lessons.length) * 100;
             
             return (
               <motion.div 
                 key={mod.moduleId} 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: index * 0.1 }}
                 className={`bg-surface-container border ${unlocked ? 'border-border-subtle' : 'border-border-subtle/30 opacity-60'} rounded-3xl p-6 md:p-8 transition-all hover:border-text-secondary/30`}
               >
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-xs font-display font-bold tracking-widest uppercase text-primary">Module {mod.moduleId}</h2>
                        {isCompleted && (
                          <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full font-display">
                            {t('dashboard.completed')}
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-display font-bold text-white">{mod.title}</h3>
                    </div>
                    {unlocked && !isCompleted && (
                      <div className="text-right">
                        <span className="text-2xl font-display font-bold text-primary">{Math.round(progressPercent)}%</span>
                      </div>
                    )}
                  </div>

                  {/* Progress Bar */}
                  {unlocked && !isCompleted && (
                    <div className="h-1.5 bg-surface rounded-full overflow-hidden mb-6">
                      <div 
                        className="h-full bg-primary transition-all"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  )}

                  <div className="bg-surface border border-border-subtle rounded-xl p-4 md:p-6 flex flex-col sm:flex-row gap-6 mb-6">
                     <div className="h-32 sm:w-48 shrink-0 bg-[#151822] rounded-lg border border-border-subtle overflow-hidden">
                       <img src={mod.hook.imageUrl?.startsWith('./') ? mod.hook.imageUrl.replace('./', '/trigonometry/') : mod.hook.imageUrl} alt="Module Hook" className="w-full h-full object-cover mix-blend-luminosity opacity-50" onError={(e) => (e.currentTarget.style.display='none')} />
                     </div>
                     <div className="flex-1">
                        <p className="text-text-secondary font-body italic">"{mod.hook.question}"</p>
                     </div>
                  </div>

                  <div className="space-y-3">
                    {mod.lessons.map((lesson: any) => {
                      const complete = completedLessons.includes(lesson.lessonId);
                      const isLocked = !unlocked;
                      return (
                        <Link 
                          key={lesson.lessonId}
                          to={unlocked ? `/lesson/${lesson.lessonId}` : '#'}
                          className={`group flex items-center justify-between p-4 rounded-xl border transition-all ${
                            isLocked
                            ? 'bg-surface/30 border-border-subtle/30 cursor-not-allowed hidden'
                            : complete
                            ? 'bg-primary/5 border-primary/20'
                            : 'bg-surface border-border-subtle hover:border-text-secondary'
                          }`}
                        >
                          <div className="flex items-center gap-4">
                             <div className={`w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-sm transition-colors ${
                               complete ? 'bg-primary text-surface' : 'bg-surface-container border border-border-subtle text-text-secondary group-hover:text-white'
                             }`}>
                                {complete ? '✓' : lesson.lessonId.split('-')[1]}
                             </div>
                             <div>
                               <div className="font-display font-bold text-white">{lesson.title}</div>
                               <div className="text-sm font-body text-text-secondary capitalize">{lesson.type}</div>
                             </div>
                          </div>
                          {!isLocked && (
                            <PlayCircle className={`w-6 h-6 ${complete ? 'text-primary' : 'text-text-secondary group-hover:text-white'} transition-colors`} />
                          )}
                        </Link>
                      );
                    })}
                  </div>
               </motion.div>
             );
          })}
        </div>

        {/* Sidebar / Tools */}
        <div className="space-y-6">
           
           {/* Review Card */}
           <motion.div 
             whileHover={{ y: -2 }}
             className={`bg-gradient-to-br from-surface-container to-[#151822] border rounded-3xl p-6 ${dueCards > 0 ? 'border-primary shadow-lg shadow-primary/10' : 'border-border-subtle'}`}
           >
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl text-white mb-2">{t('dashboard.review')}</h3>
              <p className="text-text-secondary mb-6">{t('dashboard.reviewDescription')}</p>
              
              <Link to="/review" className={`w-full py-3 rounded-xl font-display font-bold flex items-center justify-center gap-2 transition-all active:scale-95 ${
                dueCards > 0 ? 'bg-primary text-surface hover:bg-primary-container shadow-lg shadow-primary/20' : 'bg-surface border border-border-subtle text-text-secondary cursor-not-allowed pointer-events-none'
              }`}>
                 {dueCards > 0 ? `${t('dashboard.reviewNow')} (${dueCards})` : t('dashboard.allCaughtUp')}
                 {dueCards > 0 && <ArrowRight className="w-5 h-5" />}
              </Link>
           </motion.div>

           {/* Badges Preview */}
           {unlockedBadges.length > 0 && (
             <div className="bg-surface-container border border-border-subtle rounded-3xl p-6">
               <div className="flex items-center justify-between mb-4">
                 <h3 className="font-display font-bold text-lg text-white">{t('dashboard.recentBadges')}</h3>
                 <Trophy className="w-5 h-5 text-hint" />
               </div>
               <div className="space-y-3">
                 {unlockedBadges.slice(-3).map((badge, i) => (
                   <div key={i} className="flex items-center gap-3 p-3 bg-surface rounded-xl">
                     <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                       <Star className="w-5 h-5 text-primary" />
                     </div>
                     <div>
                       <p className="font-display font-bold text-white text-sm">{badge?.name}</p>
                       <p className="text-text-secondary text-xs">{badge?.description}</p>
                     </div>
                   </div>
                 ))}
               </div>
             </div>
           )}

           {/* Mastery Heatmap Preview */}
           {totalConcepts > 0 && (
             <div className="bg-surface-container border border-border-subtle rounded-3xl p-6">
               <h3 className="font-display font-bold text-lg text-white mb-4">{t('dashboard.conceptMastery')}</h3>
               <div className="grid grid-cols-4 gap-2">
                 {Object.values(conceptMastery).slice(0, 12).map((concept, i) => (
                   <div
                     key={i}
                     className={`aspect-square rounded-lg ${
                       concept.confidenceLevel === 'mastered' ? 'bg-primary' :
                       concept.confidenceLevel === 'reviewing' ? 'bg-hint' :
                       concept.confidenceLevel === 'learning' ? 'bg-error/50' :
                       'bg-surface'
                     }`}
                     title={concept.label}
                   />
                 ))}
                 {Array.from({ length: Math.max(0, 12 - totalConcepts) }).map((_, i) => (
                   <div key={`empty-${i}`} className="aspect-square rounded-lg bg-surface/50" />
                 ))}
               </div>
               <div className="flex items-center justify-between mt-4 text-xs text-text-secondary">
                 <span>{t('dashboard.mastered')}: {masteryCount}</span>
                 <span>{t('dashboard.learning')}: {totalConcepts - masteryCount}</span>
               </div>
             </div>
           )}
           
        </div>

      </div>
    </div>
  );
}
