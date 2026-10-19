/**
 * Sayfanın en üstünde, okundukça dolan ince ilerleme çubuğu.
 * JS yok: CSS scroll-driven animation (globals.css → .reading-progress).
 * Desteklemeyen tarayıcılarda çubuk hiç gösterilmez.
 */
export function ReadingProgress() {
  return (
    <div
      aria-hidden="true"
      className="reading-progress fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-primary"
    />
  );
}
