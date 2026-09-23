import styles from "./footer.module.css";
import Link from "next/link";
import { InfoBlock } from "./InfoBlock.jsx";
import {contactData, linksData, socialMedia} from '../pageData.js';

export const Footer=()=> {
  return (
    <div className={styles.footer}>
      <div className={styles.mainFooter}>
        <div className={styles.contactInfo}>
          <div className={styles.contact}>
            {contactData.map((item, index) => (
              <InfoBlock key={index} title={item.title} texts={item.texts} />
            ))}
          </div>

          <div className={styles.ubication}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d975.8724145489309!2d-58.416606080615516!3d-34.643830336922164!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccb0a12872831%3A0x1a45f24f1da0bcdc!2sComuna%204%2C%20Av.%20S%C3%A1enz%20351%2C%20C1437%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires%2C%20Argentina!5e0!3m2!1ses-419!2sus!4v1790086979859!5m2!1ses-419!2sus"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
        <div className={styles.footerLinks}>
          <div className={styles.navigation}>
            <div className={styles.links}>
              {linksData.map((item, index) => (
                <InfoBlock key={index} title={item.title} links={item.links} />
              ))}
            </div>
          </div>
          <div className={styles.socialMedia}>
            {socialMedia.map((social, index) => (
              <Link
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.icon}
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.legal}>
        <p>ALTAMIRA GROUP S.A. | TODOS LOS DERECHOS RESERVADOS.</p>
      </div>
    </div>
  );
}
