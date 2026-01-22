export default function ImageSkeleton({ className = '', aspectRatio = 'aspect-square' }: { className?: string; aspectRatio?: string }) {
  return (
    <div
      className={`${aspectRatio} bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg overflow-hidden ${className}`}
      role="status"
      aria-label="Loading image"
    >
      <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer" />
    </div>
  )
}
