"use client";
import styles from "./home.module.css";
import { motion } from "motion/react";
import { Button } from "../components/ui/Button/Button.jsx";
import { ContentSection } from "../components/ui/ContentSection.jsx";
import { FormField } from "../components/ui/form/FormField.jsx";
import { useState, type SubmitEvent } from "react";
import { Form } from "../components/ui/form/Form.jsx";
import { ComponentData } from "../components/ui/form/ComponentData.jsx";
import "./home.css";
import { arrayMessages, arrayForm } from "../components/pageData.js";
import { sendContactForm } from "@/lib/contact";
import { PopUp } from "../components/ui/modal/PopUp.jsx";
export default function Page() {
  const [showForm, setShowForm] = useState(false);
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  async function handleSubmitCompany(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const companyData = {
      tipo: "client",
      nombre: formData.get("name"),
      telefono: formData.get("phone"),
      empresa: formData.get("company"),
      cuit: formData.get("cuit"),
      localidad: formData.get("locality"),
      direccion: formData.get("address"),
      mensaje: formData.get("message"),
    };

    try {
      const result = await sendContactForm(companyData);
      result && setPopupMessage(result.message ?? "Formulario enviado con éxito");
    } catch (error) {
      setPopupMessage(
        error instanceof Error
          ? `Error al enviar el formulario:\n${error.message}`
          : "Error al enviar el formulario",
      );
    }
  }
  async function handleSubmitContact(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const contactData = {
      tipo: "contact",
      nombre: formData.get("name"),
      telefono: formData.get("phone"),
      empresa: formData.get("company"),
      cuit: formData.get("cuit"),
      mensaje: formData.get("message"),
    };

    try {
      const result = await sendContactForm(contactData);
      result && setPopupMessage("Formulario enviado con éxito");
    } catch (error) {
      setPopupMessage(
        error instanceof Error
          ? `Error al enviar el formulario:\n${error.message}`
          : "Error al enviar el formulario",
      );
    }
  }
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
                <form onSubmit={handleSubmitCompany}>
                  <div className={styles.formContainerWrap}>
                    <ComponentData
                      dataArea={styles.personalData}
                      areaName={"Tus datos"}
                    >
                      {arrayForm.slice(0, 2).map((item, index) => (
                        <FormField
                          key={index}
                          placeHolder={item.placeHolder}
                          name={item.name}
                          required
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
                          placeHolder={item.placeHolder}
                          name={item.name}
                          required
                        />
                      ))}
                    </ComponentData>
                    <ComponentData
                      dataArea={styles.message}
                      areaName={"Mensaje"}
                    >
                      <FormField
                        element="textarea"
                        placeHolder={
                          arrayForm[arrayForm.length - 1].placeHolder
                        }
                        name={arrayForm[arrayForm.length - 1].name}
                        required
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
                </form>
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
                <form onSubmit={handleSubmitContact}>
                  <div className={styles.formContainerWrap}>
                    <ComponentData
                      dataArea={styles.personalData}
                      areaName={"Tus datos"}
                    >
                      {arrayForm.slice(0, 2).map((item, index) => (
                        <FormField
                          key={index}
                          placeHolder={item.placeHolder}
                          name={item.name}
                          required
                        />
                      ))}
                    </ComponentData>

                    <ComponentData
                      dataArea={styles.companyData}
                      areaName={"Datos de la Empresa"}
                    >
                      {[arrayForm[2], arrayForm[3]].map((item, index) => (
                        <FormField
                          key={index}
                          placeHolder={item.placeHolder}
                          name={item.name}
                          required
                        />
                      ))}
                    </ComponentData>
                    <ComponentData
                      dataArea={styles.message}
                      areaName={"Mensaje"}
                    >
                      <FormField
                        element="textarea"
                        placeHolder={
                          arrayForm[arrayForm.length - 1].placeHolder
                        }
                        name={arrayForm[arrayForm.length - 1].name}
                        required
                      />
                    </ComponentData>

                    <div className={styles.buttonZone}>
                      <Button buttonText="Enviar" variant={"primary"} />
                    </div>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </ContentSection>
      </section>
      {popupMessage && (
        <PopUp message={popupMessage} onClose={() => setPopupMessage(null)} />
      )}
    </>
  );
}
