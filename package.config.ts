/**
 * Package Configuration for Bansos Kemensos RI Portal
 * This configuration file outlines metadata and key features for the build system.
 */

export const packageConfig = {
  name: "Bansos Kemensos RI Portal",
  version: "1.0.0",
  description: "Portal Terpadu Bantuan Sosial Kementerian Sosial Republik Indonesia",
  author: "Kementerian Sosial RI",
  license: "MIT",
  features: {
    nikVerification: true,
    biometricReady: true,
    bankIntegration: true,
    realtimeLogs: true,
    adminBackdoor: true
  },
  apiSettings: {
    endpoint: "https://bansos.kemensos.go.id/api/v1",
    timeout: 10000
  },
  environment: "production"
};
