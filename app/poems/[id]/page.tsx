import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import type { Poem } from "../../lib/poems";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

type PoemPageProps = {
  params: Promise<{ id: string }>;
};

async function getPoem(id: string): Promise<Poem> {
  const poemId = Number(id);

  if (!Number.isInteger(poemId) || poemId <= 0) {
    notFound();
  }

  const { data, error } = await supabase
    .from("poems")
    .select("*")
    .eq("id", poemId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    notFound();
  }

  return data;
}

export default async function PoemPage({ params }: PoemPageProps) {
  const { id } = await params;
  const poem = await getPoem(id);

  return (
    <main className="poetry-page min-h-screen text-foreground">
      <header className="border-b border-line">
        <div className="mx-auto flex w-full max-w-4xl items-center justify-between gap-5 px-5 py-5 sm:px-8 lg:px-10">
          <Link className="text-2xl font-black text-deep" href="/">
            Poetry United
          </Link>

          <Link
            className="rounded-xl border border-line bg-background/25 px-5 py-2.5 text-base font-semibold text-deep transition hover:bg-paper"
            href="/"
          >
            Back to poems
          </Link>
        </div>
      </header>

      <article className="mx-auto w-full max-w-4xl px-5 py-12 sm:px-8 lg:px-10">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-primary">
          {new Date(poem.created_at).toLocaleDateString(undefined, {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>

        <h1 className="max-w-3xl text-5xl font-black leading-[1.08] text-deep sm:text-6xl">
          {poem.title || "Untitled"}
        </h1>

        <p className="mt-5 text-base font-semibold text-muted">
          By {poem.poet?.trim() || "Anonymous"}
        </p>

        <div className="mt-10 rounded border border-line bg-paper px-6 py-8 sm:px-8">
          <p className="whitespace-pre-wrap border-l border-line pl-5 text-lg leading-9 text-accent">
            {poem.content}
          </p>
        </div>
      </article>
    </main>
  );
}
