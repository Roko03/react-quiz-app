import { useSearchParams } from "react-router-dom";
import styles from "./QuizPageSection,module.scss";
import getQuizData from "../../lib/getQuizData";
import { useEffect, useState } from "react";

const QuizPageSection = () => {
  const [searchParams] = useSearchParams();

  const level = searchParams.get("level") as string;
  const categoryId = searchParams.get("category") as string;

  const [quizData, setQuizData] = useState([]);

  const fetchQuizData = async () => {
    const response = await getQuizData(categoryId, level);

    if (response.response_code === 0) {
      setQuizData(response.results);
      return;
    }

    console.log("Error");
  };

  useEffect(() => {
    fetchQuizData();
  }, []);

  console.log(quizData);

  return (
    <div>
      <h1>Ej</h1>
    </div>
  );
};

export default QuizPageSection;
