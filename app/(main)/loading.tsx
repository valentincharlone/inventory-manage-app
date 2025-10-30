"use client";

function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden bg-gray-200/50 rounded ${className}`}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
    </div>
  );
}

function MainContentSkeleton({}: { showSidebar?: boolean }) {
  return (
    <main>
      {/* Header skeleton */}
      <div className="mb-8">
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-4 w-96" />
      </div>

      {/* Key Metrics skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <Skeleton className="h-6 w-32 mb-6" />
          <div className="grid grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center">
                <Skeleton className="h-10 w-20 mx-auto mb-2" />
                <Skeleton className="h-4 w-24 mx-auto mb-2" />
                <div className="flex items-center justify-center gap-1">
                  <Skeleton className="h-3 w-10" />
                  <Skeleton className="h-3 w-3 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <Skeleton className="h-6 w-48" />
          </div>
          <Skeleton className="h-64 w-full rounded-lg" />
        </div>
      </div>

      {/* Bottom Row skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Stock levels skeleton */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <Skeleton className="h-6 w-32" />
          </div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-50/50"
              >
                <div className="flex items-center space-x-3">
                  <Skeleton className="w-3 h-3 rounded-full" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>
        </div>

        {/* Efficiency skeleton */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <Skeleton className="h-6 w-32" />
          </div>
          <div className="flex items-center justify-center py-8">
            <Skeleton className="w-48 h-48 rounded-full" />
          </div>
          <div className="mt-6 grid grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="w-3 h-3 rounded-full" />
                  <Skeleton className="h-3 w-16" />
                </div>
                <Skeleton className="h-4 w-12" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <style jsx global>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
      <MainContentSkeleton />
    </div>
  );
}
