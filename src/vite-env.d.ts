/// <reference types="vite/client" />

type Category = {
    id: string;
    name: string;
}

type QuizQuestion = {
    type: string;
    difficulty: string;
    category: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
};