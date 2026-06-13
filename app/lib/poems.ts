export type Poem = {
  id: number;
  created_at: string;
  poet_id: number;
  content: string | null;
  title: string | null;
  published: boolean | null;
};

export const initialPoems = [
  {
    title: "The Road Not Taken",
    content: "The road not taken is the path to nowhere",
  },
  {
    title: "Ozymandias",
    content: "The king of kings",
  },
  {
    title: "The Great Gatsby",
    content: "All the world's a stage, and all the men and women merely players",
  },
];

