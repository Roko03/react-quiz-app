import styles from "./QuizResultComponent.module.scss";

interface QuizResultComponentProps {
  result: QuizResults;
}

const QuizResultComponent: React.FC<QuizResultComponentProps> = ({
  result,
}) => {
  return (
    <div className={styles.result}>
      <p>{result.question}</p>
      <ul className={styles.result__answers}>
        {result.answers.map((answer, index) => {
          return (
            <li
              key={index}
              className={`${
                answer.isCorrect && answer.title == result.target_answer
                  ? styles.correct_answer
                  : !answer.isCorrect && answer.title == result.target_answer
                  ? styles.wrong_answer
                  : answer.isCorrect && answer.title != result.target_answer
                  ? styles.correct_answer
                  : ""
              }`}
            >
              {answer.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default QuizResultComponent;
