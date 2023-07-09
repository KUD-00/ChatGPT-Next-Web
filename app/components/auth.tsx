"use client";

import styles from "./auth.module.scss";
import { IconButton } from "./button";

import { fetchEventSource } from "@fortaine/fetch-event-source";

import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Path } from "../constant";
import { useAccessStore } from "../store";
import Locale from "../locales";

import BotIcon from "../icons/bot.svg";

import Image from "next/image";

interface CaptchaData {
  captcha_id: string;
  captcha: string;
}

export function AuthPage() {
  const navigate = useNavigate();
  const access = useAccessStore();
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [captchaData, setCaptchaData] = useState<CaptchaData | null>(null);

  const accountRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const verifyRef = useRef<HTMLInputElement | null>(null);

  const goHome = () => navigate(Path.Home);

  const handleLoginClick = () => {
    if (accountRef.current && passwordRef.current) {
      access.updateAccount(accountRef.current.value);
      access.updatePassword(passwordRef.current.value);
    }
    goHome();
  };

  const handleRegisterClick = () => {};

  useEffect(() => {
    if (isRegister) {
      fetch("https://bot100.app:7001/api/v1/captcha", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setCaptchaData(data);
        })
        .catch((error) => {
          console.error(error);
        });
      /* fetchEventSource('https://bot100.app:7001/api/v1/captcha', {
       *   method: 'GET',
       *   headers: {
       *     'Access-Control-Allow-Origin': 'http://localhost:3000',
       *   },
       *   onmessage(ev) {
       *     console.log(ev.data);
       *   }
       * }) */
    }
  }, [isRegister]);

  return (
    <div className={styles["auth-page"]}>
      <div className={`no-dark ${styles["auth-logo"]}`}>
        <BotIcon />
      </div>

      {isRegister && captchaData ? (
        <>
          <div className={styles["auth-title"]}>{Locale.Auth.Register}</div>
          <Image src={captchaData.captcha} alt="verification-code" />

          <input
            id="verification"
            className={styles["auth-input"]}
            type="text"
            ref={verifyRef}
            placeholder={Locale.Auth.Account}
          />
        </>
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
