import FormComponent from "../form/FormComponent";
import styles from "./LandingPageSection.module.scss";

const LandingPageSection = () => {
  return (
    <section className={styles.landing_section}>
      <div className={styles.landing_section__text}>
        <h1>Dobrodošli na kviz!</h1>
        <h3>
          Molimo odaberite težinu i kategoriju kviza kako bi pristupili kvizu
        </h3>
      </div>
      <FormComponent />
    </section>
  );
};

export default LandingPageSection;
