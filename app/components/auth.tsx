import styles from "./auth.module.scss";
import { IconButton } from "./button";

import { useNavigate } from "react-router-dom";
import { Path } from "../constant";
import { useAccessStore } from "../store";
import Locale from "../locales";

import BotIcon from "../icons/bot.svg";

export function AuthPage() {
  const navigate = useNavigate();
  const access = useAccessStore();

  const goHome = () => navigate(Path.Home);

  const handleConfirmClick = () => {
    const accountValue = document.getElementById('account').value;
    const passwordValue = document.getElementById('password').value;
    access.updateAccount(accountValue);
    access.updatePassword(passwordValue);
    goHome();
  }

  return (
    <div className={styles["auth-page"]}>
      <div className={`no-dark ${styles["auth-logo"]}`}>
        <BotIcon />
      </div>

      <div className={styles["auth-title"]}>{Locale.Auth.Title}</div>
      <div className={styles["auth-tips"]}>{Locale.Auth.Tips}</div>

      <input
        id="account"
        className={styles["auth-input"]}
        type="text"
        placeholder={Locale.Auth.Account}
      />

      <input
        id="password"
        className={styles["auth-input"]}
        type="text"
        placeholder={Locale.Auth.Password}
      />

      <div className={styles["auth-actions"]}>
        <IconButton
          text={Locale.Auth.Confirm}
          type="primary"
          onClick={handleConfirmClick}
        />
        <IconButton text={Locale.Auth.Later} onClick={goHome} />
      </div>
    </div>
  );
}
