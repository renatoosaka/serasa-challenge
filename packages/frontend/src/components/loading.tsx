export function Loading() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-6 h-6 border-4 border-blue-500 rounded-full border-3 border-l-gray-300 animate-spin " />
      <span>Carregando...</span>
    </div>
  );
}
