import Image from "next/image";

export default function LoadingPoem() {
  return (
    <main className="poetry-page min-h-screen text-foreground">
      <header className="border-b border-line">
        <div className="mx-auto w-full max-w-4xl px-5 py-5 sm:px-8 lg:px-10">
          <Image
            alt="Poets United"
            className="h-16 w-auto"
            height={941}
            priority
            src="/poets-united-logo.png"
            width={997}
          />
        </div>
      </header>

      <div className="mx-auto w-full max-w-4xl px-5 py-12 sm:px-8 lg:px-10">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">
          Loading poem
        </p>
        <div className="mt-8 rounded border border-line bg-paper px-6 py-10 text-accent">
          Opening the page...
        </div>
      </div>
    </main>
  );
}
