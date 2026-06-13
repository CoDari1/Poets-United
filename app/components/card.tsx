import React from "react";

import type { Poem } from "../lib/poems";

type CardProps = {
  poems: Poem[];
};

const Card = ({ poems }: CardProps) => {
  return (
    <div className="flex flex-wrap justify-center">
      {poems.length === 0 ? (
        <p className="text-sm text-gray-500">No poems yet.</p>
      ) : (
        poems.map((poem) => (
          <div
            key={`${poem.id}-${poem.poet_id}`}
            className="w-60 h-60 bg-slate-950 rounded-lg shadow-lg p-4 m-4 border-2 border-slate-800 text-white"
          >
            <h2 className="text-xl font-bold mb-2">{poem.title}</h2>
            <p className="text-xs text-gray-400 mb-4">
              {new Date(poem.created_at).toLocaleDateString()}
            </p>
            <p className="text-sm">{poem.content}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Card;