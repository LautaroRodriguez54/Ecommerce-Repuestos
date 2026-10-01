"use client";
import styles from "./home.module.css";
import { motion } from "motion/react";
import { Button } from "../components/ui/Button/Button.jsx";
import { ModalContainer } from "../components/ui/modal/ModalContainer.jsx";
import { ContentSection } from "../components/ui/ContentSection.jsx";
import { FormField } from "../components/ui/form/FormField.jsx";
import { useState } from "react";
import { Form } from "../components/ui/form/Form.jsx";
import { ComponentData } from "../components/ui/form/ComponentData.jsx";
import "./home.css";
import { arrayMessages, arrayForm } from "../components/pageData.js";
export default function Page() {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <section className={styles.home}>
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
      <section id="cliente" className={`dotted ${styles.client}`}>
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
              buttonText="Quiero ser Cliente"
              variant={"accent"}
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
              <Form title={"Datos de la empresa"}>
                <div className={styles.formContainerWrap}>
                  <ComponentData
                    dataArea={styles.personalData}
                    areaName={"Tus datos"}
                  >
                    {arrayForm.slice(0, 2).map((item, index) => (
                      <FormField
                        key={index}
                        nameLabel={item.nameLabel}
                        placeHolder={item.placeHolder}
                      />
                    ))}
                  </ComponentData>

                  <ComponentData
                    dataArea={styles.companyData}
                    areaName={"Datos de la Empresa"}
                  >
                    {arrayForm.slice(2, 6).map((item, index) => (
                      <FormField
                        key={index}
                        nameLabel={item.nameLabel}
                        placeHolder={item.placeHolder}
                      />
                    ))}
                  </ComponentData>
                  <ComponentData dataArea={styles.message} areaName={"Mensaje"}>
                    <FormField
                      element="textarea"
                      nameLabel={arrayForm[arrayForm.length - 1].nameLabel}
                      placeHolder={arrayForm[arrayForm.length - 1].placeHolder}
                    />
                  </ComponentData>

                  <div className={styles.buttonZone}>
                    <Button
                      buttonText="Cancelar"
                      variant={"outline"}
                      onClic={() => setShowForm(false)}
                    />
                    <Button buttonText="Enviar" variant={"primary"} />
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </motion.div>
      </section>
      <section></section>
      <section className={`dotted ${styles.client}`}>
        <ContentSection title={"¿ALGUNA DUDA?"}>
          <div className={styles.formClient}>
            <div className={styles.modalWrap}>
              <Form title={"Envíanos un mensaje"}>
                <div className={styles.formContainerWrap}>
                  <ComponentData
                    dataArea={styles.personalData}
                    areaName={"Tus datos"}
                  >
                    {arrayForm.slice(0, 2).map((item, index) => (
                      <FormField
                        key={index}
                        nameLabel={item.nameLabel}
                        placeHolder={item.placeHolder}
                      />
                    ))}
                  </ComponentData>

                  <ComponentData
                    dataArea={styles.companyData}
                    areaName={"Datos de la Empresa"}
                  >
                    {[arrayForm[1], arrayForm[3]].map((item, index) => (
                      <FormField
                        key={index}
                        nameLabel={item.nameLabel}
                        placeHolder={item.placeHolder}
                      />
                    ))}
                  </ComponentData>
                  <ComponentData dataArea={styles.message} areaName={"Mensaje"}>
                    <FormField
                      element="textarea"
                      nameLabel={arrayForm[arrayForm.length - 1].nameLabel}
                      placeHolder={arrayForm[arrayForm.length - 1].placeHolder}
                    />
                  </ComponentData>

                  <div className={styles.buttonZone}>
                    <Button buttonText="Enviar" variant={"primary"} />
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </ContentSection>
      </section>
    </>
  );
}
