"use client";
import styles from "../../app/home.module.css";
import { motion } from "motion/react";
import { Button } from "../ui/Button/Button.jsx";
import { FormField } from "../ui/form/FormField.jsx";
import { useState, type SubmitEvent } from "react";
import { Form } from "../ui/form/Form.jsx";
import { ComponentData } from "../ui/form/ComponentData.jsx";
import "../../app/home.css";
import {arrayForm } from "../pageData.js";
import { sendContactForm } from "@/lib/contact";
import { PopUp } from "../ui/modal/PopUp.jsx";

export const ClientSection = () => {
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
  return (
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
                  <ComponentData dataArea={styles.message} areaName={"Mensaje"}>
                    <FormField
                      element="textarea"
                      placeHolder={arrayForm[arrayForm.length - 1].placeHolder}
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
      {popupMessage && (
        <PopUp message={popupMessage} onClose={() => setPopupMessage(null)} />
      )}
    </section>
  );
};
