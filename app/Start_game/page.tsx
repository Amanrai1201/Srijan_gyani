
import Category from './_components/category';

export default function StartGame() {
  return (
    <main className="min-h-screen bg-[#dfd7f5] flex items-center justify-center py-16">
      <div className="w-[75%] bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg">
        <Category />
      </div>
    </main>
  );
}
