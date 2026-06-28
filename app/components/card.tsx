import React from "react";
import Link from "next/link";
import type { Poem } from "../lib/poems";

type CardProps = {
  poems: Poem[];
};

const Card = ({ poems }: CardProps) => {
  if (poems.length === 0) {
    return (
      <div className="mx-auto max-w-xl rounded-md border border-dashed border-line bg-paper px-6 py-12 text-center">
        <p className="text-2xl font-black text-primary">No poems have been shared yet.</p>
        <p className="mt-3 text-sm leading-6 text-accent">
          The first page is still waiting for someone brave enough to begin.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {poems.map((poem) => (
        <Link
          key={`${poem.id}-${poem.poet_id}`}
          href={`/poems/${poem.id}`}
          className="relative min-h-72 overflow-hidden rounded border border-line bg-paper p-6 pl-12 transition hover:brightness-95"        >
          <div className="flex h-full flex-col">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              {new Date(poem.created_at).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>

            <h2 className="text-xl font-black leading-tight text-deep">
              {poem.title || "Untitled"}
            </h2>

            <p className="mt-4 line-clamp-4 whitespace-pre-wrap text-base leading-7 text-accent">
              {poem.content}
            </p>

            <p className="mt-auto pt-6 text-sm font-semibold text-muted">
              By {poem.poet?.trim() || "Anonymous"}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Card;
