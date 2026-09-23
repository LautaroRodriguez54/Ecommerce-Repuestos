"use client";
import styles from "./home.module.css";
import { motion } from "motion/react";
import {Button} from "../components/ui/Button/Button.jsx";
import {ModalContainer} from "../components/ui/modal/ModalContainer.jsx";
import { FormField } from "../components/ui/form/FormField.jsx";
import { useState } from "react";
import "./home.css";
import {arrayMessages, arrayForm} from '../components/pageData.js';
export default function Page() {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <section id="inicio" className={styles.home}>
        <div className={styles.banner}></div>
        <div className={styles.notice}>
          <motion.div
            className={styles.track}
            animate={{ x: "-50%" }}
            transition={{
              duration: 25,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {[1, 2].map((group) => (
              <div
                className={styles.group}
                aria-hidden={group === 2}
                key={group}
              >
                {[...arrayMessages, ...arrayMessages].map((message, index) => (
                  <p key={`${group}-${index}`}>{message}</p>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
        <div className={styles.new}></div>
      </section>
      <section id="servicios" className={`dotted ${styles.client}`}>
        <motion.div
          className={styles.clientSlider}
          animate={{
            x: showForm ? "-100vw" : "0vw",
          }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
        >
          <div className={styles.viewClient}>
            <h1>¿QUERÉS SER CLIENTE?</h1>
            <p>¡Contáctate con nosotros y accede a descuentos exclusivos!</p>
            <Button
              buttonText="Quiero ser Cliente" variant={"redButton"}
              onClic={() => setShowForm(true)}
            />
          </div>
          <div className={styles.formClient}>
            <p>
              En esta sección usted podrá ingresar sus datos para solicitar la
              visita de uno de nuestros vendedores. Recordá que es importante
              rellenar todos los campos antes de enviar tu solicitud.
            </p>
            <div className={styles.modalWrap}>
              <ModalContainer title={"Datos de la empresa"}>
                <div className={styles.formContainerWrap}>
                  <div className={styles.personalData}>
                    <p className={styles.areaName}>Tus datos</p>
                    <div className={styles.formFieldWrap}>
                      {arrayForm.slice(0, 2).map((item, index) => (
                        <FormField
                          key={index}
                          nameLabel={item.nameLabel}
                          placeHolder={item.placeHolder}
                        />
                      ))}
                    </div>
                  </div>
                  <div className={styles.companyData}>
                    <p className={styles.areaName}>Datos de la Empresa</p>
                    <div className={styles.formFieldWrap}>
                      {arrayForm.slice(2, 6).map((item, index) => (
                        <FormField
                          key={index}
                          nameLabel={item.nameLabel}
                          placeHolder={item.placeHolder}
                        />
                      ))}
                    </div>
                  </div>
                  <div className={styles.message}>
                    <p className={styles.areaName}>Mensaje</p>

                    <FormField
                      element="textarea"
                      nameLabel={arrayForm[arrayForm.length - 1].nameLabel}
                      placeHolder={arrayForm[arrayForm.length - 1].placeHolder}
                    />
                  </div>
                  <div className={styles.buttonZone}>
                    <Button
                      buttonText="Cancelar"
                      onClic={() => setShowForm(false)}
                    />
                    <Button buttonText="Enviar" variant={"whiteButton"} />
                  </div>
                </div>
              </ModalContainer>
            </div>
          </div>
        </motion.div>
      </section>
      <section id="nosotros" className={styles.question}>
        ...
      </section>
    </>
  );
}
