"use client";

import React, { useState } from "react";

type FormProps = {
    onPoemAdded: () => Promise<void>;
};

export default function Form({ onPoemAdded }: FormProps) {
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        poet: "",
        title: "",
        content: "",
    });

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    async function addPoem(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!formData.title.trim() || !formData.content.trim()) return;

        try {
            setSubmitting(true);

            const response = await fetch("/api/poems", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    poet: formData.poet.trim() || null,
                    title: formData.title.trim(),
                    content: formData.content.trim(),
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to upload poem.");
            }

            setFormData({
                poet: "",
                title: "",
                content: "",
            });

            await onPoemAdded();
        } catch (error) {
            console.error(error);
            alert("Something went wrong while uploading your poem.");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <form onSubmit={addPoem} className="w-full p-4 sm:p-6">
            <div className="border-b border-line pb-4 pr-10">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                    New poem
                </p>
                <h2 className="mt-3 font-serif text-4xl font-semibold leading-tight text-deep">
                    Share your poetry.
                </h2>
            </div>

            <div className="mt-6 space-y-5">
                <div>
                    <label
                        htmlFor="poet"
                        className="mb-2 block text-sm font-semibold text-primary"
                    >
                        Name <span className="font-normal text-muted">(optional)</span>
                    </label>

                    <input
                        id="poet"
                        name="poet"
                        type="text"
                        value={formData.poet}
                        onChange={handleChange}
                        placeholder="Leave blank to stay anonymous"
                        className="w-full rounded-md border border-line bg-background px-4 py-3 text-base text-foreground outline-none transition focus:border-secondary focus:ring-4 focus:ring-secondary/20"
                    />
                </div>

                <div>
                    <label
                        htmlFor="title"
                        className="mb-2 block text-sm font-semibold text-primary"
                    >
                        Title
                    </label>

                    <input
                        id="title"
                        name="title"
                        type="text"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="The Weight of Silence"
                        className="w-full rounded-md border border-line bg-background px-4 py-3 text-base text-foreground outline-none transition focus:border-secondary focus:ring-4 focus:ring-secondary/20"
                        required
                    />
                </div>

                <div>
                    <label
                        htmlFor="content"
                        className="mb-2 block text-sm font-semibold text-primary"
                    >
                        Your Poem
                    </label>

                    <textarea
                        id="content"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        rows={8}
                        placeholder="Write from the heart..."
                        className="w-full resize-none overflow-y-auto rounded-md border border-line bg-background px-4 py-4 text-base leading-8 text-foreground outline-none transition focus:border-secondary focus:ring-4 focus:ring-secondary/20"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={submitting}
                    className="mt-2 w-full rounded-full bg-deep py-3.5 text-base font-semibold text-paper transition duration-300 hover:-translate-y-0.5 hover:bg-primary hover:shadow-lg disabled:opacity-60"
                >
                    {submitting ? "Publishing..." : "Publish Poem"}
                </button>
            </div>
        </form>
    );
}
