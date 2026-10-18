import { notFound } from "next/navigation";

// Her zaman 404 döndüğü için instant navigasyon doğrulamasından muaf
export const instant = false;

// Tanımsız yollar dile özel 404 sayfasını göstersin
export default function CatchAll() {
  notFound();
}
