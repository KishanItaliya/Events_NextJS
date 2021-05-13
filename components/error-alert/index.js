import styles from "../../styles/error-alert.module.css";

function ErrorAlert(props) {
  return <div className={styles.alert}>{props.children}</div>;
}

export default ErrorAlert;
