import { useEffect, useState } from "react";
import styles from "./FormComponent.module.scss";
import getCategories from "../../lib/getCategories";
import { useNavigate } from "react-router-dom";

const FormComponent = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [level, setLevel] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const getCategoriesFunction = async () => {
    const response = await getCategories();

    if (response.trivia_categories) {
      setCategories(response.trivia_categories);
      return;
    }
  };

  const startQuit = () => {
    navigate(`/quiz?level=${level}&category=${category}`);
  };

  useEffect(() => {
    getCategoriesFunction();
  }, []);

  return (
    <form className={styles.form}>
      {categories.length > 0 && (
        <>
          <select
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setLevel(e.target.value)
            }
          >
            <option value={""}>Odaberi težinu</option>
            <option value={"easy"}>Easy</option>
            <option value={"medium"}>Medium</option>
            <option value={"hard"}>Hard</option>
          </select>
          <select
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setCategory(e.target.value)
            }
          >
            <option value={""}>Odaberi kategoriju</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <button
            onClick={startQuit}
            disabled={!level || !category}
            className={styles.form__button}
          >
            Pokreni kviz
          </button>
        </>
      )}
    </form>
  );
};

export default FormComponent;
