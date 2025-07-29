export default function SkeletonArticle() {
  return (
    <div className="animate-pulse flex items-start justify-between pb-5 border-b border-dashed border-[#2a2a2a] cursor-pointer">
      <div className="flex-1">
        {/* Title placeholder */}
        <div className="h-4 bg-gray-700 rounded w-2/3 mb-2" />
        {/* Description placeholder */}
        <div className="h-3 bg-gray-700 rounded w-5/6" />
      </div>

      {/* Date placeholder */}
      <div className="h-4 w-20 bg-gray-700 rounded ml-4" />
    </div>
  );
}
