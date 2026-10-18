export type ServiceCategory = 'locksmith' | 'automotive_ecu' | 'electronics_pc';

export interface ServiceItem {
  id: string;
  category: ServiceCategory;
  title: string;
  tagline: {
    pt: string;
    en: string;
  };
  description: {
    pt: string;
    en: string;
  };
  metrics: {
    value: string;
    label: {
      pt: string;
      en: string;
    };
  }[];
  techStack: string[];
  deliverables: {
    pt: string[];
    en: string[];
  };
  featured?: boolean;
}

export const portfolioServices: ServiceItem[] = [
  {
    id: 'codificacao-chaves',
    category: 'locksmith',
    title: 'Codificação e Confecção de Chaves Veiculares',
    featured: true,
    tagline: {
      pt: 'Confecção completa do zero quando todas as chaves foram perdidas ou danificadas',
      en: 'Complete key cutting and programming from scratch when all keys are lost',
    },
    description: {
      pt: 'Serviço especializado de corte e codificação de chaves automotivas para todas as marcas nacionais e importadas. Realizamos leitura do segredo mecânico da ignição/fechadura, corte pantográfico computadorizado de alta precisão e programação eletrônica do transponder (chip) no sistema imobilizador do veículo.',
      en: 'Specialized vehicle key cutting and electronic coding for all domestic and imported car brands. Includes mechanical lock decoding, computerized high-precision laser/pantographic milling, and transponder chip pairing directly to the vehicle immobilizer.',
    },
    metrics: [
      { value: '100%', label: { pt: 'Compatibilidade com Montadoras', en: 'OEM Compatibility' } },
      { value: 'Rápido', label: { pt: 'Atendimento Ágil', en: 'Fast Turnaround' } },
      { value: 'Garantido', label: { pt: 'Funcionamento Perfeito', en: '100% Tested' } },
    ],
    techStack: [
      'Máquinas de Corte Pantográfico',
      'Scanners Automotivos Avançados',
      'Gravadores de Transponder',
      'Chaves Canivete & Presença',
    ],
    deliverables: {
      pt: [
        'Confecção de chaves mesmo em caso de perda total de todas as vias',
        'Corte pantográfico computadorizado milimétrico idêntico ao original',
        'Codificação de transponder criptografado e sincronização com imobilizador',
        'Programação do alarme e controle remoto no padrão original de fábrica'
      ],
      en: [
        'All-keys-lost key creation and emergency on-site decoding',
        'Laser pantographic cutting matching exact factory tolerances',
        'Encrypted transponder programming and pairing with immobilizer module',
        'Remote lock/unlock pairing following original manufacturer specs'
      ]
    }
  },
  {
    id: 'copia-chaves',
    category: 'locksmith',
    title: 'Cópia de Chaves Veiculares',
    featured: true,
    tagline: {
      pt: 'Duplicação rápida de chaves codificadas, telecomandos e chaves de presença Smart Key',
      en: 'Fast duplication of transponder keys, remote fobs, and proximity Smart Keys',
    },
    description: {
      pt: 'Cópia de reserva para veículos de passeio e utilitários. Não espere perder a única chave: fazemos a duplicação imediata com lâmina fresada com perfeição, clone ou emparelhamento de chip transponder e teste completo na presença do cliente.',
      en: 'Spare key duplication for passenger cars and light commercial vehicles. Protect yourself from losing your only key with immediate precision duplication, chip cloning or programming, and live vehicle testing.',
    },
    metrics: [
      { value: 'Na Hora', label: { pt: 'Execução Rápida', en: 'Same-day Service' } },
      { value: 'Smart Key', label: { pt: 'Chaves de Presença & Start-Stop', en: 'Proximity Fobs' } },
      { value: 'Garantia', label: { pt: 'Corte e Chip Validados', en: 'Tested & Verified' } },
    ],
    techStack: [
      'Clonadoras de Chip',
      'Testadores de Frequência RF',
      'Programadoras OBD2',
      'Lâminas e Carcaças Originais',
    ],
    deliverables: {
      pt: [
        'Cópia de chaves simples com chip transponder',
        'Cópia e montagem de chaves canivete com acabamento reforçado',
        'Duplicação de chaves de presença (Start/Stop e Push-to-Start)',
        'Troca de carcaça gasta ou com botões danificados'
      ],
      en: [
        'Standard transponder chip key duplication',
        'Flip/switchblade key conversion with high-durability housing',
        'Smart Key proximity key duplication (Keyless / Push-to-Start)',
        'Worn housing, shell, and broken button replacement'
      ]
    }
  },
  {
    id: 'reparo-central-bsi',
    category: 'automotive_ecu',
    title: 'Reparo em Central de Injeção Eletrônica e BSI',
    featured: true,
    tagline: {
      pt: 'Linha leve: Diagnóstico em bancada, reparo de módulos ECU e centrais de conforto BSI',
      en: 'Light vehicle line: Bench diagnostic, ECU engine computer and BSI comfort module repair',
    },
    description: {
      pt: 'Serviço avançado de eletrônica automotiva para veículos da linha leve. Recuperação de centrais de injeção eletrônica (ECU) queimadas, sem pulso nos bicos/bobinas, problemas de comunicação em rede CAN, e reparo em centrais de carroceria e conforto BSI (Peugeot, Citroën, Fiat, GM, VW, Ford, etc.). Realizamos clonagem de módulos e casamento de imobilizador.',
      en: 'Advanced automotive electronics repair for passenger vehicles. Restoration of faulty engine control units (ECUs), missing injector/ignition pulses, CAN bus communication failures, and body computer/BSI module repair. Complete bench diagnosis, micro-soldering, module cloning, and immobilizer syncing.',
    },
    metrics: [
      { value: 'Linha Leve', label: { pt: 'Especialista Automotivo', en: 'Light Vehicles' } },
      { value: 'Em Bancada', label: { pt: 'Simulador Eletrônico Real', en: 'Full Bench Sim' } },
      { value: 'Economia', label: { pt: 'Evita Troca de Módulos Caros', en: 'Cost-Effective' } },
    ],
    techStack: [
      'Simuladores de Bancada',
      'Osciloscópio Digital',
      'Gravadores de EPROM / Flash',
      'Micro-Soldagem SMD/BGA',
      'Analise de Rede CAN'
    ],
    deliverables: {
      pt: [
        'Reparo de centrais de injeção com falta de centelha, bomba ou pulso de bicos',
        'Conserto de centrais BSI / BCM com falhas elétricas (faróis, travas, vidros)',
        'Clonagem completa de ECU e BSI (troca de arquivos sem perda de dados)',
        'Dessincronismo e casamento do sistema de imobilizador',
        'Substituição de drivers de potência, transistores e capacitores'
      ],
      en: [
        'ECU repair for missing spark, fuel pump cutouts, or injector signal loss',
        'BSI / BCM body control module repair for lights, locks, and windows',
        'Full ECU and BSI software cloning without data loss',
        'Immobilizer synchronization and reset',
        'Power driver IC, transistor, and electrolytic capacitor replacement'
      ]
    }
  },
  {
    id: 'conserto-placas-pc-notebook',
    category: 'electronics_pc',
    title: 'Conserto de Placas de PCs e Notebooks',
    featured: true,
    tagline: {
      pt: 'Eletrônica de precisão: Reparo de placas-mãe de desktops, notebooks e fontes',
      en: 'Precision electronics: Motherboard repairs for desktop PCs, laptops, and power stages',
    },
    description: {
      pt: 'Manutenção eletrônica de alto nível para placas-mãe de computadores e notebooks que não ligam, não geram vídeo, sofreram curto-circuito ou danos por umidade/derramamento de líquidos. Diagnóstico minucioso das linhas primárias e secundárias de tensão (19V, 5V, 3.3V, VCORE) e reparos em nível de componente.',
      en: 'High-level precision electronics repair for desktop and laptop motherboards presenting no-power, no-video, short-circuit, or liquid damage symptoms. Meticulous schematic analysis of primary and secondary power rails (19V, 5V, 3.3V, VCORE) and component-level micro-soldering.',
    },
    metrics: [
      { value: 'Nível SMD', label: { pt: 'Reparo em Componentes', en: 'SMD Level' } },
      { value: 'Testes', label: { pt: 'Carga e Estresse', en: 'Stress Tested' } },
      { value: 'Garantia', label: { pt: 'Serviço Qualificado', en: 'Warranty Backed' } },
    ],
    techStack: [
      'Estação de Retrabalho SMD',
      'Fonte de Bancada Assimétrica',
      'Microscópio Óptico Trinocular',
      'Gravador de BIOS SPI',
      'Câmera Térmica para Detecção de Curto'
    ],
    deliverables: {
      pt: [
        'Eliminação de curtos em linhas de alimentação primárias e secundárias',
        'Troca de Mosfets de alta/baixa, capacitores cerâmicos e CI regulador de carga (PWM)',
        'Regravação e reprogramação de chip de BIOS SPI',
        'Desoxidação por cuba ultrassônica e reconstrução de trilhas rompidas',
        'Reparo de conectores de carga (DC Jack), portas USB e circuitos de carga'
      ],
      en: [
        'Short-circuit isolation and elimination across power stages',
        'Replacement of blown MOSFETs, SMD capacitors, and PWM charge controllers',
        'SPI flash BIOS chip reprogramming and clear-ME updates',
        'Ultrasonic bath desoxidation and broken PCB trace reconstruction',
        'DC Jack charging port, USB connector, and power circuit repairs'
      ]
    }
  }
];
