const Loading = () => {
  return (
    <main className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <div className="h-9 w-40 animate-pulse rounded-lg bg-gray-200" />

        <div className="mt-2 h-4 w-32 animate-pulse rounded bg-gray-100" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-gray-200 bg-white p-4"
          >
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 animate-pulse rounded-xl bg-gray-200" />

              <div className="flex-1">
                <div className="h-5 w-24 animate-pulse rounded bg-gray-200" />

                <div className="mt-2 h-3 w-16 animate-pulse rounded bg-gray-100" />
              </div>
            </div>

            <div className="mt-5 h-3 w-16 animate-pulse rounded bg-gray-100" />

            <div className="mt-2 h-7 w-28 animate-pulse rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </main>
  );
};

export default Loading;