// Stub - no-op analytics tracker for standalone landing page
// biome-ignore lint/suspicious/noExplicitAny: stub
export function usePlausible(): (..._args: any[]) => void {
  return () => {}
}
