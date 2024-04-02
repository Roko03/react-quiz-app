import styles from "./QuizQuestionComponent.module.scss";

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
  const answers: Answer[] = [
    { title: question.correct_answer, isCorrect: true },
  ];
  const parser = new DOMParser();

  question.incorrect_answers.forEach((ans) => {
    answers.push({ title: ans, isCorrect: false });
  });

  const randomAnswers = () => {
    answers.sort(function () {
      return 0.5 - Math.random();
    });
  };

  randomAnswers();

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
      <ul className={styles.question__answers}>
        {answers.map((answer, index) => {
          return (
            <li key={index} onClick={() => nextQuestion(answer.title, answers)}>
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
    </div>
  );
};

export default QuizQuestionComponent;
