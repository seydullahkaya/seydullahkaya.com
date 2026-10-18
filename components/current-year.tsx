import { cacheLife } from "next/cache";

/** Telif yılı. cacheComponents açıkken new Date() önbelleğe alınmalı. */
export async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
