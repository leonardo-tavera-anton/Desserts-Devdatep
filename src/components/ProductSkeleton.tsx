export function ProductSkeleton() {
  return (
    <article aria-hidden="true" className="flex animate-pulse flex-col gap-3">
      <div className="aspect-[4/3] w-full rounded-xl bg-rose-200" />
      <div className="mt-2 h-3 w-1/3 rounded bg-rose-200" />
      <div className="h-5 w-2/3 rounded bg-rose-200" />
      <div className="h-4 w-1/4 rounded bg-rose-200" />
    </article>
  );
}
