export type LevelSummary = {
  id: string;
  title: string;
  chapter: string;
  knowledgePoint: string;
  difficulty: string;
  description: string;
};

export type LevelExplanation = {
  concept: string;
  syntax: string;
  executionSteps: string[];
  commonMistakes: string[];
  referenceSolution: string;
  extraPractice: string[];
};

export type LevelDetail = LevelSummary & {
  inputFormat: string;
  outputFormat: string;
  sampleInput: string;
  sampleOutput: string;
  starterCode: string;
  hints: string[];
  tests: Array<{
    name: string;
    input: string;
    expectedOutput: string;
    hidden?: boolean;
  }>;
  animationRules: Array<{
    output: string;
    action: string;
  }>;
  explanation?: LevelExplanation;
};
