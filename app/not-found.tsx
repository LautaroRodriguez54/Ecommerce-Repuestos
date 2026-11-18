import { RedirectPage } from "@/components/errors/RedirectPage";
import { Button } from "@/components/ui/Button/Button";
export default function NotFound() {
  return (
    <RedirectPage status={404}>
       <Button
        buttonText="Volver al inicio"
        linkHref="/"
        isButton={false}
      />
    </RedirectPage>
  );
}