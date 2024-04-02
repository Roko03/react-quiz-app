import styles from "./QuizPageSection.module.scss";
import { useSearchParams } from "react-router-dom";
import getQuizData from "../../../lib/getQuizData";
import { useEffect, useState } from "react";
import CircularProgressBar from "../../circular-progress/CircularProgressBar";
import QuizQuestionComponent from "../quiz-question/QuizQuestionComponent";
import QuizResultsSection from "../quiz-results/QuizResultsSection";

const QuizPageSection = () => {
  const [searchParams] = useSearchParams();

  const level = searchParams.get("level") as string;
  const categoryId = searchParams.get("category") as string;

  const [quizData, setQuizData] = useState<QuizQuestion[]>([]);

  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [question, setQuestion] = useState<QuizQuestion>();

  const [points, setPoints] = useState<number>(0);
  const [quizResults, setQuizResults] = useState<QuizResults[]>([]);

  const fetchQuizData = async () => {
    const response = await getQuizData(categoryId, level);

    if (response.response_code === 0) {
      setQuizData(response.results);
      setQuestion(response.results[questionIndex]);
      return;
    }

    console.log("Error");
  };

  const nextQuestion = (answer: string, answers: Answer[]) => {
    if (question?.correct_answer == answer) {
      setPoints((prev) => prev + 1);
    }

    if (question) {
      let result: QuizResults = {
        question: question.question,
        answers: answers,
        target_answer: answer,
      };
      setQuizResults((prev) => [...prev, result]);
    }

    let index: number = questionIndex + 1;

    setQuestion(quizData[index]);
    setQuestionIndex(index);
  };

  useEffect(() => {
    fetchQuizData();
  }, []);

  if (quizData.length === 0) return <CircularProgressBar />;

  if (quizData.length <= questionIndex)
    return <QuizResultsSection quizResults={quizResults} points={points} />;

  return (
    <>
      <section className={styles.quiz_section}>
        {question && (
          <QuizQuestionComponent
            question={question}
            nextQuestion={(answer: string, answers: Answer[]) =>
              nextQuestion(answer, answers)
            }
            currQuestion={questionIndex + 1}
            numbOfQuestions={quizData.length}
          />
        )}
      </section>
    </>
  );
};

export default QuizPageSection;
