import { Link } from "react-router-dom";
import styles from "./QuizResultsSection.module.scss";
import QuizResultComponent from "./quiz-result/QuizResultComponent";

interface QuizResultsSectionProps {
  quizResults: QuizResults[];
  points: number;
}

const QuizResultsSection: React.FC<QuizResultsSectionProps> = ({
  quizResults,
  points,
}) => {
  return (
    <section className={styles.results_section}>
      <h2>Broj osvojenih poena: {points}</h2>
      <Link to={"/"} className={styles.link}>
        Vrati se na početnu stranicu
      </Link>
      <h1>Rezultati sa pitanjima i odgovorima</h1>
      <div className={styles.question_list}>
        {quizResults.map((result, index) => {
          return <QuizResultComponent result={result} key={index} />;
        })}
      </div>
    </section>
  );
};

export default QuizResultsSection;
