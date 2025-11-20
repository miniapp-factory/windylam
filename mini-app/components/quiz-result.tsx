"use client";

import { Button } from "@/components/ui/button";
import { Share } from "@/components/share";
import { url } from "@/lib/metadata";

export default function QuizResult({
  animal,
  onRetake,
}: {
  animal: string;
  onRetake: () => void;
}) {
  const imageSrc = `/${animal}.png`;
  const animalNames: Record<string, string> = {
    cat: "Cat",
    dog: "Dog",
    fox: "Fox",
    hamster: "Hamster",
    horse: "Horse",
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl">{animalNames[animal]} Quiz Result</h2>
      <img
        src={imageSrc}
        alt={animal}
        width={512}
        height={512}
        className="rounded"
      />
      <Share text={`I am a ${animalNames[animal]}! ${url}`} />
      <Button onClick={onRetake}>Retake Quiz</Button>
    </div>
  );
}
