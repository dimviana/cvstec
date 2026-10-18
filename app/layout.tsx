import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'CVSTEC — Soluções Automotivas | Especialista em Eletrônica',
  description: 'Chaveiro veicular especializado e serviços avançados de eletrônica. Codificação e confecção de chaves veiculares, cópia de chaves, reparo em central de injeção eletrônica e BSI (linha leve), e conserto de placas de PCs e notebooks.',
  openGraph: {
    title: 'CVSTEC — Soluções Automotivas | Especialista em Eletrônica',
    description: 'Chaveiro veicular especializado e serviços avançados de eletrônica. Codificação de chaves, injeção ECU, BSI e conserto de placas.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CVSTEC — Soluções Automotivas | Especialista em Eletrônica',
    description: 'Chaveiro veicular especializado e serviços avançados de eletrônica.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
