import { useEffect, useState } from "react";
import styles from "./QuizQuestionComponent.module.scss";
import CircularProgressBar from "../../circular-progress/CircularProgressBar";

interface QuizQuestionComponentProps {
  question: QuizQuestion;
  nextQuestion: (value: string, answers: Answer[]) => void;
  currQuestion: number;
  numbOfQuestions: number;
}

const QuizQuestionComponent: React.FC<QuizQuestionComponentProps> = ({
  question,
  nextQuestion,
  currQuestion,
  numbOfQuestions,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const parser = new DOMParser();

  const generateAnswers = () => {
    const arr: Answer[] = [
      { title: question.correct_answer, isCorrect: true },
      ...question.incorrect_answers.map((ans) => ({
        title: ans,
        isCorrect: false,
      })),
    ];
    arr.sort(() => 0.5 - Math.random());
    setAnswers(arr);
  };

  const handleAnswerClick = (title: string) => {
    setSelectedAnswer(title);
    setIsLoading(true);
    setTimeout(() => {
      nextQuestion(title, answers);
      setSelectedAnswer(null);
      setIsLoading(false);
    }, 2000);
  };

  useEffect(() => {
    generateAnswers();
  }, [question]);

  return (
    <div className={styles.question}>
      <h2>
        Pitanje {currQuestion} od {numbOfQuestions}
      </h2>
      <p>
        {
          parser.parseFromString(
            `<!doctype html><body>${question.question}`,
            "text/html"
          ).body.textContent
        }
      </p>
      <ul
        className={styles.question__answers}
        style={{ pointerEvents: selectedAnswer ? "none" : "all" }}
      >
        {answers.map((answer, index) => {
          return (
            <li
              key={index}
              onClick={() => handleAnswerClick(answer.title)}
              className={
                selectedAnswer == answer.title
                  ? answer.isCorrect
                    ? styles.correct
                    : styles.wrong
                  : ""
              }
            >
              {
                parser.parseFromString(
                  `<!doctype html><body>${answer.title}`,
                  "text/html"
                ).body.textContent
              }
            </li>
          );
        })}
      </ul>
      {isLoading && <CircularProgressBar />}
    </div>
  );
};

export default QuizQuestionComponent;
