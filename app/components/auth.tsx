"use client";

import styles from "./auth.module.scss";
import { IconButton } from "./button";

import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { Path } from "../constant";
import { useAccessStore } from "../store";
import Locale from "../locales";

import BotIcon from "../icons/bot.svg";

export function AuthPage() {
  const navigate = useNavigate();
  const access = useAccessStore();
  const [isRegister, setIsRegister] = useState(false);
  const accountRef = useRef(null);
  const passwordRef = useRef(null);

  const goHome = () => navigate(Path.Home);

  const handleLoginClick = () => {
    access.updateAccount(accountRef.current.value);
    access.updatePassword(passwordRef.current.value);
    goHome();
  };

  const handleRegisterClick = () => {};

  return (
    <div className={styles["auth-page"]}>
      <div className={`no-dark ${styles["auth-logo"]}`}>
        <BotIcon />
      </div>

      {isRegister ? (
        <div className={styles["auth-title"]}>{Locale.Auth.Register}</div>
      ) : (
        <div className={styles["auth-title"]}>{Locale.Auth.Title}</div>
      )}

      <div className={styles["auth-tips"]}>{Locale.Auth.Tips}</div>

      <input
        id="account"
        className={styles["auth-input"]}
        type="text"
        ref={accountRef}
        placeholder={Locale.Auth.Account}
      />

      <input
        id="password"
        className={styles["auth-input"]}
        type="text"
        ref={passwordRef}
        placeholder={Locale.Auth.Password}
      />

      {isRegister ? (
        <div className={styles["auth-actions"]}>
          <IconButton
            text={Locale.Auth.Confirm}
            type="primary"
            onClick={handleRegisterClick}
          />
          <IconButton
            text={Locale.Auth.Title}
            onClick={() => setIsRegister(false)}
          />
        </div>
      ) : (
        <div className={styles["auth-actions"]}>
          <IconButton
            text={Locale.Auth.Confirm}
            type="primary"
            onClick={handleLoginClick}
          />
          <IconButton
            text={Locale.Auth.Register}
            onClick={() => setIsRegister(true)}
          />
        </div>
      )}
    </div>
  );
}
