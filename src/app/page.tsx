"use client"; 
export default function Home() {
  const run = (): void => {
    console.log("lol", process.env.NEXT_PUBLIC_GEMINI_API_KEY);
  };
  return (
    <div className="text-red-500" onClick={run}>
      lets start
    </div>
  );
}
