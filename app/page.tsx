"use client";

import React, { useState, useEffect } from "react";

import Card from "./components/card";
import type { Poem } from "./lib/poems";

export default function Home() {
  const [poems, setPoems] = useState<Poem[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchPoems() {
    try {
      const response = await fetch("/api/poems");
      if (!response.ok) {
        throw new Error("Failed to fetch poems");
      }
      const data = await response.json();
      setPoems(data);
    } catch (error) {
      console.error("Error fetching poems:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      void fetchPoems();
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  async function addPoem() {
    const title = prompt("Enter the title of the poem")?.trim();
    const content = prompt("Enter the content of the poem")?.trim();

    if (!title || !content) {
      return;
    }

    try {
      const response = await fetch("/api/poems", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        throw new Error("Failed to add poem");
      }

      await fetchPoems();
    } catch (error) {
      console.error("Error adding poem:", error);
      alert("Failed to add poem. Please try again.");
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center gap-8 p-24">
      <h1>Welcome to Poetry United!</h1>
      <div
        className="rounded-2xl w-40 h-10 bg-amber-50 text-black flex justify-center items-center cursor-pointer"
        onClick={addPoem}
      >
        Upload a Poem
      </div>
      {loading ? <p>Loading poems...</p> : <Card poems={poems} />}
    </div>
  );
}
