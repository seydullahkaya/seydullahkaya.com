/** Sabit uzay arka planı: nebula bulutları ve parlayan yıldızlar (saf CSS). */
export function SpaceBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden [contain:strict] [will-change:transform]"
    >
      <div className="space-nebula absolute inset-0" />
      <div className="space-stars-sm absolute inset-0" />
      <div className="space-stars-md absolute inset-0" />
      <div className="space-stars-lg absolute inset-0" />
    </div>
  );
}
