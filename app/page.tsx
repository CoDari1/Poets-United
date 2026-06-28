"use client";

import React, { useEffect, useState } from "react";
import Card from "./components/card";
import Form from "./components/form";
import type { Poem } from "./lib/poems";

export default function Home() {
    const [poems, setPoems] = useState<Poem[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    async function fetchPoems() {
        try {
            setLoading(true);

            const response = await fetch("/api/poems", {
                cache: "no-store",
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error(errorText);
                throw new Error("Failed to fetch poems");
            }

            const data: Poem[] = await response.json();
            setPoems(data);
        } catch (error) {
            console.error(error);
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

    return (
        <main className="poetry-page min-h-screen text-foreground">
            <header className="border-b border-line">
                <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-5 px-5 py-5 sm:px-8 lg:px-10">
                    <p className="text-2xl font-black text-deep">
                        Poets United
                    </p>

                    <button
                        onClick={() => setShowForm(true)}
                        className="rounded-xl border border-line bg-background/25 px-5 py-2.5 text-base font-semibold text-deep transition hover:bg-paper"
                    >
                        Upload a poem
                    </button>
                </div>
            </header>

            <div className="mx-auto flex w-full max-w-6xl flex-col px-5 sm:px-8 lg:px-10">
                <section className="grid gap-10 border-b border-line py-12 md:grid-cols-[minmax(0,1fr)_18rem] md:items-start">
                    <div>
                        <h1 className="max-w-3xl text-5xl font-semibold leading-[1.08] text-primary sm:text-6xl">
                            A quiet room for the poems people carry.
                        </h1>

                        <p className="mt-6 max-w-2xl text-lg leading-8 text-accent">
                            Share finished pieces, tender drafts, and small truths
                        </p>
                    </div>

                    <aside className="border-l border-line pl-7 text-base leading-7 text-muted">
                        <p className="text-2xl font-black leading-7 text-primary">
                            Write it plainly. Let it breathe.
                        </p>
                        <p className="mt-3">
                            Simple poem publishing today, richer poet tools tomorrow.
                        </p>
                    </aside>
                </section>

                {showForm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-deep/70 px-4 backdrop-blur-sm">

                        <div className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-md border border-secondary/60 bg-paper shadow-2xl">

                            <button
                                onClick={() => setShowForm(false)}
                                className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-line bg-background text-xl leading-none text-primary transition hover:border-secondary hover:text-accent"
                                aria-label="Close poem form"
                            >
                                x
                            </button>

                            <div className="overflow-y-auto p-6">
                                <Form
                                    onPoemAdded={async () => {
                                        await fetchPoems();
                                        setShowForm(false);
                                    }}
                                />
                            </div>

                        </div>
                    </div>
                )}

                <section className="w-full py-8">
                    {loading ? (
                        <div className="py-20 text-center text-primary">
                            Loading poems...
                        </div>
                    ) : (
                        <Card poems={poems} />
                    )}
                </section>

            </div>
        </main>
    );
}
