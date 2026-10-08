"use client";
import styles from "./home.module.css";
import { Button } from "../ui/Button/Button.jsx";
import { ContentSection } from "../ui/ContentSection.jsx";
import { FormField } from "../ui/form/FormField.jsx";
import { useState, type SubmitEvent } from "react";
import { Form } from "../ui/form/Form.jsx";
import { ComponentData } from "../ui/form/ComponentData.jsx";
import "../../app/home.css";
import {arrayForm } from "../pageData.js";
import { sendContactForm } from "@/lib/contact";
import { PopUp } from "../ui/modal/PopUp.jsx";

export const QuestionSection = () => {
    const [popupMessage, setPopupMessage] = useState<string | null>(null);
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
    return(
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
        {popupMessage && (
        <PopUp message={popupMessage} onClose={() => setPopupMessage(null)} />
      )}
      </section>
    );
}