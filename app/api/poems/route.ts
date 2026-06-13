import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

// Default poet_id for anonymous poems (will be replaced with auth later)
const DEFAULT_POET_ID = 1;

export async function GET() {
  const { data, error } = await supabase
    .from("poems")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data || []);
}

export async function POST(request: NextRequest) {
  const { title, content } = await request.json();

  if (!title || !content) {
    return NextResponse.json(
      { error: "Missing required fields (title and content)" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("poems")
    .insert([{ title, content, poet_id: DEFAULT_POET_ID, published: false }])
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data?.[0], { status: 201 });
}


