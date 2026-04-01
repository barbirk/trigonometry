import TriangleExplorer from '../components/TriangleExplorer';

export default function ExplorerPage() {
  return (
    <div className="min-h-full p-4 md:p-8">
      <div className="mb-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-display font-bold text-white mb-2">Laboratoire de Trigonométrie</h1>
        <p className="text-text-secondary text-lg">Modifiez les dimensions du triangle pour voir l'impact sur les rapports trigonométriques en temps réel.</p>
      </div>
      <TriangleExplorer />
    </div>
  );
}
