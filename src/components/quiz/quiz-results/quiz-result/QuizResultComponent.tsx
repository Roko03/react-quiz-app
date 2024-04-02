import styles from "./QuizResultComponent.module.scss";

interface QuizResultComponentProps {
  result: QuizResults;
}

const QuizResultComponent: React.FC<QuizResultComponentProps> = ({
  result,
}) => {
  const parser = new DOMParser();

  return (
    <div className={styles.result}>
      <p>
        {
          parser.parseFromString(
            `<!doctype html><body>${result.question}`,
            "text/html"
          ).body.textContent
        }
      </p>
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

export default QuizResultComponent;
