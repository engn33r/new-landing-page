// Stub useYearn - returns empty vault data for standalone landing page
// biome-ignore lint/suspicious/noExplicitAny: stub for original complex type
export function useYearn(): { vaults: Record<string, any>; isLoadingVaultList: boolean } {
  return {
    vaults: {},
    isLoadingVaultList: false
  }
}
