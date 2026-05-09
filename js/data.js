// ========================================
// VISITA SEGURA - DADOS MOCKADOS
// ========================================

const MOCK_DATA = {
    corretores: [
        {
            id: 1,
            nome: "Ana Carolina Mendes",
            creci: "123456-SP",
            empresa: "Alpha Imóveis Premium",
            telefone: "(11) 98765-4321",
            email: "ana.mendes@alphaimoveis.com.br",
            avatar: "https://ui-avatars.com/api/?name=Ana+Carolina+Mendes&background=d4af37&color=0a192f&size=256&font-size=0.4&bold=true",
            visitasRealizadas: 47,
            avaliacao: 4.9
        },
        {
            id: 2,
            nome: "Bruno Oliveira Santos",
            creci: "234567-SP",
            empresa: "Oliveira Imóveis",
            telefone: "(11) 97654-3210",
            email: "bruno@oliveiraimoveis.com.br",
            avatar: "https://ui-avatars.com/api/?name=Bruno+Oliveira+Santos&background=00b0ff&color=fff&size=256&font-size=0.35&bold=true",
            visitasRealizadas: 32,
            avaliacao: 4.7
        },
        {
            id: 3,
            nome: "Carla Dias Ferreira",
            creci: "345678-SP",
            empresa: "Premium Brokers",
            telefone: "(11) 96543-2109",
            email: "carla@premiumbrokers.com.br",
            avatar: "https://ui-avatars.com/api/?name=Carla+Dias+Ferreira&background=00c853&color=fff&size=256&font-size=0.35&bold=true",
            visitasRealizadas: 58,
            avaliacao: 5.0
        },
        {
            id: 4,
            nome: "Ricardo Almeida Costa",
            creci: "456789-SP",
            empresa: "Costa Consultoria Imobiliária",
            telefone: "(11) 95432-1098",
            email: "ricardo@costaimoveis.com.br",
            avatar: "https://ui-avatars.com/api/?name=Ricardo+Almeida+Costa&background=ff9100&color=fff&size=256&font-size=0.35&bold=true",
            visitasRealizadas: 21,
            avaliacao: 4.5
        }
    ],

    predios: [
        {
            id: 1,
            nome: "Edifício Solaris",
            endereco: "Av. Paulista, 1000",
            bairro: "Bela Vista",
            cidade: "São Paulo",
            cep: "01310-100",
            sindico: "Dr. Roberto Lima",
            telefone: "(11) 3456-7890",
            blocos: [
                {
                    nome: "Torre A",
                    horarios: [
                        { dias: "Seg. a Sex.", diasNum: [1,2,3,4,5], abertura: "07:00", fechamento: "19:00" },
                        { dias: "Sábado",      diasNum: [6],          abertura: "08:00", fechamento: "14:00" }
                    ]
                },
                {
                    nome: "Torre B",
                    horarios: [
                        { dias: "Seg. a Sex.", diasNum: [1,2,3,4,5], abertura: "08:00", fechamento: "18:00" },
                        { dias: "Sábado",      diasNum: [6],          abertura: "09:00", fechamento: "12:00" }
                    ]
                },
                {
                    nome: "Torre C",
                    horarios: [
                        { dias: "Seg. a Sex.", diasNum: [1,2,3,4,5], abertura: "09:00", fechamento: "18:00" }
                    ]
                }
            ]
        },
        {
            id: 2,
            nome: "Condomínio Verde Vita",
            endereco: "Rua Augusta, 500",
            bairro: "Consolação",
            cidade: "São Paulo",
            cep: "01305-000",
            sindico: "Dra. Fernanda Souza",
            telefone: "(11) 3456-7891",
            blocos: [
                {
                    nome: "Bloco 1",
                    horarios: [
                        { dias: "Seg. a Sex.", diasNum: [1,2,3,4,5], abertura: "08:00", fechamento: "17:00" }
                    ]
                },
                {
                    nome: "Bloco 2",
                    horarios: [
                        { dias: "Seg. a Sex.", diasNum: [1,2,3,4,5], abertura: "09:00", fechamento: "18:00" },
                        { dias: "Sábado",      diasNum: [6],          abertura: "10:00", fechamento: "14:00" }
                    ]
                },
                {
                    nome: "Bloco 3",
                    horarios: [
                        { dias: "Seg. a Sex.", diasNum: [1,2,3,4,5], abertura: "08:00", fechamento: "18:00" }
                    ]
                },
                {
                    nome: "Bloco 4",
                    horarios: [
                        { dias: "Seg. a Sex.", diasNum: [1,2,3,4,5], abertura: "09:00", fechamento: "17:00" },
                        { dias: "Sábado",      diasNum: [6],          abertura: "09:00", fechamento: "17:00" }
                    ]
                }
            ]
        },
        {
            id: 3,
            nome: "Torres do Parque",
            endereco: "Rua Oscar Freire, 200",
            bairro: "Jardins",
            cidade: "São Paulo",
            cep: "01426-000",
            sindico: "Eng. Marcos Tavares",
            telefone: "(11) 3456-7892",
            blocos: [
                {
                    nome: "Torre Parque",
                    horarios: [
                        { dias: "Seg. a Sex.", diasNum: [1,2,3,4,5], abertura: "08:00", fechamento: "18:00" },
                        { dias: "Sábado",      diasNum: [6],          abertura: "09:00", fechamento: "13:00" }
                    ]
                },
                {
                    nome: "Torre Jardim",
                    horarios: [
                        { dias: "Seg. a Sex.", diasNum: [1,2,3,4,5], abertura: "08:00", fechamento: "20:00" },
                        { dias: "Sábado",      diasNum: [6],          abertura: "09:00", fechamento: "15:00" },
                        { dias: "Domingo",     diasNum: [0],          abertura: "10:00", fechamento: "13:00" }
                    ]
                },
                {
                    nome: "Torre Vista",
                    horarios: [
                        { dias: "Seg. a Sex.", diasNum: [1,2,3,4,5], abertura: "09:00", fechamento: "17:00" }
                    ]
                }
            ]
        },
        {
            id: 4,
            nome: "Residencial Plaza Mayor",
            endereco: "Alameda Santos, 1200",
            bairro: "Jardim Paulista",
            cidade: "São Paulo",
            cep: "01419-002",
            sindico: "Sra. Helena Braga",
            telefone: "(11) 3456-7893",
            blocos: [
                {
                    nome: "Bloco A",
                    horarios: [
                        { dias: "Seg. a Sex.", diasNum: [1,2,3,4,5], abertura: "08:00", fechamento: "18:00" },
                        { dias: "Sábado",      diasNum: [6],          abertura: "09:00", fechamento: "13:00" }
                    ]
                },
                {
                    nome: "Bloco B",
                    horarios: [
                        { dias: "Seg. a Sex.", diasNum: [1,2,3,4,5], abertura: "07:30", fechamento: "19:00" }
                    ]
                }
            ]
        }
    ],

    porteiros: [
        {
            id: 1,
            nome: "João da Silva",
            email: "joao.silva@solaris.com.br",
            predioId: 1,
            predioNome: "Edifício Solaris",
            turno: "Manhã",
            avatar: "https://ui-avatars.com/api/?name=Joao+Silva&background=0a192f&color=d4af37&size=256&font-size=0.4&bold=true"
        },
        {
            id: 2,
            nome: "Pedro Costa",
            email: "pedro.costa@solaris.com.br",
            predioId: 1,
            predioNome: "Edifício Solaris",
            turno: "Noite",
            avatar: "https://ui-avatars.com/api/?name=Pedro+Costa&background=112240&color=00b0ff&size=256&font-size=0.4&bold=true"
        },
        {
            id: 3,
            nome: "Maria Souza",
            email: "maria.souza@verdevita.com.br",
            predioId: 2,
            predioNome: "Condomínio Verde Vita",
            turno: "Manhã",
            avatar: "https://ui-avatars.com/api/?name=Maria+Souza&background=233554&color=00c853&size=256&font-size=0.4&bold=true"
        },
        {
            id: 4,
            nome: "Antônio Pereira",
            email: "antonio.pereira@torresparque.com.br",
            predioId: 3,
            predioNome: "Torres do Parque",
            turno: "Tarde",
            avatar: "https://ui-avatars.com/api/?name=Antonio+Pereira&background=1a2d4d&color=ff9100&size=256&font-size=0.4&bold=true"
        },
        {
            id: 5,
            nome: "Luciana Oliveira",
            email: "luciana.oliveira@plazamayor.com.br",
            predioId: 4,
            predioNome: "Residencial Plaza Mayor",
            turno: "Noite",
            avatar: "https://ui-avatars.com/api/?name=Luciana+Oliveira&background=0d2137&color=d4af37&size=256&font-size=0.4&bold=true"
        }
    ],

    visitas: [
        {
            id: 101,
            corretorId: 1,
            corretorNome: "Ana Carolina Mendes",
            corretorAvatar: "https://ui-avatars.com/api/?name=Ana+Carolina+Mendes&background=d4af37&color=0a192f&size=256&font-size=0.4&bold=true",
            corretorCreci: "123456-SP",
            corretorEmpresa: "Alpha Imóveis Premium",
            corretorTelefone: "(11) 98765-4321",
            predioId: 1,
            predioNome: "Edifício Solaris",
            predioEndereco: "Av. Paulista, 1000",
            data: new Date().toISOString().split('T')[0],
            hora: "14:00",
            codigo: "847291",
            status: "agendada",
            createdAt: "2026-04-22T10:00:00Z"
        },
        {
            id: 102,
            corretorId: 2,
            corretorNome: "Bruno Oliveira Santos",
            corretorAvatar: "https://ui-avatars.com/api/?name=Bruno+Oliveira+Santos&background=00b0ff&color=fff&size=256&font-size=0.35&bold=true",
            corretorCreci: "234567-SP",
            corretorEmpresa: "Oliveira Imóveis",
            corretorTelefone: "(11) 97654-3210",
            predioId: 2,
            predioNome: "Condomínio Verde Vita",
            predioEndereco: "Rua Augusta, 500",
            data: new Date().toISOString().split('T')[0],
            hora: "10:30",
            codigo: "952847",
            status: "concluida",
            createdAt: "2026-04-22T08:00:00Z",
            validadoPor: "Maria Souza",
            validadoAt: "2026-04-22T10:35:00Z"
        },
        {
            id: 103,
            corretorId: 3,
            corretorNome: "Carla Dias Ferreira",
            corretorAvatar: "https://ui-avatars.com/api/?name=Carla+Dias+Ferreira&background=00c853&color=fff&size=256&font-size=0.35&bold=true",
            corretorCreci: "345678-SP",
            corretorEmpresa: "Premium Brokers",
            corretorTelefone: "(11) 96543-2109",
            predioId: 3,
            predioNome: "Torres do Parque",
            predioEndereco: "Rua Oscar Freire, 200",
            data: new Date(Date.now() + 86400000).toISOString().split('T')[0],
            hora: "16:00",
            codigo: "615384",
            status: "agendada",
            createdAt: "2026-04-23T09:00:00Z"
        },
        {
            id: 104,
            corretorId: 1,
            corretorNome: "Ana Carolina Mendes",
            corretorAvatar: "https://ui-avatars.com/api/?name=Ana+Carolina+Mendes&background=d4af37&color=0a192f&size=256&font-size=0.4&bold=true",
            corretorCreci: "123456-SP",
            corretorEmpresa: "Alpha Imóveis Premium",
            corretorTelefone: "(11) 98765-4321",
            predioId: 4,
            predioNome: "Residencial Plaza Mayor",
            predioEndereco: "Alameda Santos, 1200",
            data: new Date(Date.now() - 86400000).toISOString().split('T')[0],
            hora: "09:00",
            codigo: "738462",
            status: "concluida",
            createdAt: "2026-04-21T14:00:00Z",
            validadoPor: "Luciana Oliveira",
            validadoAt: "2026-04-21T09:05:00Z"
        },
        {
            id: 105,
            corretorId: 4,
            corretorNome: "Ricardo Almeida Costa",
            corretorAvatar: "https://ui-avatars.com/api/?name=Ricardo+Almeida+Costa&background=ff9100&color=fff&size=256&font-size=0.35&bold=true",
            corretorCreci: "456789-SP",
            corretorEmpresa: "Costa Consultoria Imobiliária",
            corretorTelefone: "(11) 95432-1098",
            predioId: 1,
            predioNome: "Edifício Solaris",
            predioEndereco: "Av. Paulista, 1000",
            data: new Date().toISOString().split('T')[0],
            hora: "11:00",
            codigo: "294857",
            status: "andamento",
            createdAt: "2026-04-23T08:00:00Z",
            validadoPor: "João da Silva",
            validadoAt: "2026-04-23T11:05:00Z"
        },
        {
            id: 106,
            corretorId: 1,
            corretorNome: "Ana Carolina Mendes",
            corretorAvatar: "https://ui-avatars.com/api/?name=Ana+Carolina+Mendes&background=d4af37&color=0a192f&size=256&font-size=0.4&bold=true",
            corretorCreci: "123456-SP",
            corretorEmpresa: "Alpha Imóveis Premium",
            corretorTelefone: "(11) 98765-4321",
            predioId: 2,
            predioNome: "Condomínio Verde Vita",
            predioEndereco: "Rua Augusta, 500",
            data: new Date().toISOString().split('T')[0],
            hora: "08:30",
            codigo: "391047",
            status: "concluida",
            createdAt: new Date().toISOString(),
            validadoPor: "Maria Souza",
            validadoAt: new Date().toISOString()
        },
        {
            id: 107,
            corretorId: 1,
            corretorNome: "Ana Carolina Mendes",
            corretorAvatar: "https://ui-avatars.com/api/?name=Ana+Carolina+Mendes&background=d4af37&color=0a192f&size=256&font-size=0.4&bold=true",
            corretorCreci: "123456-SP",
            corretorEmpresa: "Alpha Imóveis Premium",
            corretorTelefone: "(11) 98765-4321",
            predioId: 3,
            predioNome: "Torres do Parque",
            predioEndereco: "Rua Oscar Freire, 200",
            data: new Date().toISOString().split('T')[0],
            hora: "10:00",
            codigo: "562830",
            status: "agendada",
            createdAt: new Date().toISOString()
        },
        {
            id: 108,
            corretorId: 1,
            corretorNome: "Ana Carolina Mendes",
            corretorAvatar: "https://ui-avatars.com/api/?name=Ana+Carolina+Mendes&background=d4af37&color=0a192f&size=256&font-size=0.4&bold=true",
            corretorCreci: "123456-SP",
            corretorEmpresa: "Alpha Imóveis Premium",
            corretorTelefone: "(11) 98765-4321",
            predioId: 4,
            predioNome: "Residencial Plaza Mayor",
            predioEndereco: "Alameda Santos, 1200",
            data: new Date().toISOString().split('T')[0],
            hora: "12:00",
            codigo: "748193",
            status: "cancelada",
            createdAt: new Date().toISOString()
        },
        {
            id: 109,
            corretorId: 1,
            corretorNome: "Ana Carolina Mendes",
            corretorAvatar: "https://ui-avatars.com/api/?name=Ana+Carolina+Mendes&background=d4af37&color=0a192f&size=256&font-size=0.4&bold=true",
            corretorCreci: "123456-SP",
            corretorEmpresa: "Alpha Imóveis Premium",
            corretorTelefone: "(11) 98765-4321",
            predioId: 1,
            predioNome: "Edifício Solaris",
            predioEndereco: "Av. Paulista, 1000",
            data: new Date().toISOString().split('T')[0],
            hora: "15:30",
            codigo: "604712",
            status: "agendada",
            createdAt: new Date().toISOString()
        },
        {
            id: 110,
            corretorId: 1,
            corretorNome: "Ana Carolina Mendes",
            corretorAvatar: "https://ui-avatars.com/api/?name=Ana+Carolina+Mendes&background=d4af37&color=0a192f&size=256&font-size=0.4&bold=true",
            corretorCreci: "123456-SP",
            corretorEmpresa: "Alpha Imóveis Premium",
            corretorTelefone: "(11) 98765-4321",
            predioId: 2,
            predioNome: "Condomínio Verde Vita",
            predioEndereco: "Rua Augusta, 500",
            data: new Date().toISOString().split('T')[0],
            hora: "16:45",
            codigo: "831956",
            status: "recusada",
            createdAt: new Date().toISOString()
        },
        {
            id: 111,
            corretorId: 1,
            corretorNome: "Ana Carolina Mendes",
            corretorAvatar: "https://ui-avatars.com/api/?name=Ana+Carolina+Mendes&background=d4af37&color=0a192f&size=256&font-size=0.4&bold=true",
            corretorCreci: "123456-SP",
            corretorEmpresa: "Alpha Imóveis Premium",
            corretorTelefone: "(11) 98765-4321",
            predioId: 3,
            predioNome: "Torres do Parque",
            predioEndereco: "Rua Oscar Freire, 200",
            data: new Date().toISOString().split('T')[0],
            hora: "18:00",
            codigo: "275641",
            status: "agendada",
            createdAt: new Date().toISOString()
        },

        // predioId 1 (Edifício Solaris) — cancelada, recusada, concluida
        {
            id: 112,
            corretorId: 2,
            corretorNome: "Bruno Oliveira Santos",
            corretorAvatar: "https://ui-avatars.com/api/?name=Bruno+Oliveira+Santos&background=00b0ff&color=fff&size=256&font-size=0.35&bold=true",
            corretorCreci: "234567-SP",
            corretorEmpresa: "Oliveira Imóveis",
            corretorTelefone: "(11) 97654-3210",
            predioId: 1,
            predioNome: "Edifício Solaris",
            predioEndereco: "Av. Paulista, 1000",
            data: new Date().toISOString().split('T')[0],
            hora: "09:30",
            codigo: "112001",
            status: "cancelada",
            createdAt: new Date().toISOString()
        },
        {
            id: 113,
            corretorId: 3,
            corretorNome: "Carla Dias Ferreira",
            corretorAvatar: "https://ui-avatars.com/api/?name=Carla+Dias+Ferreira&background=00c853&color=fff&size=256&font-size=0.35&bold=true",
            corretorCreci: "345678-SP",
            corretorEmpresa: "Premium Brokers",
            corretorTelefone: "(11) 96543-2109",
            predioId: 1,
            predioNome: "Edifício Solaris",
            predioEndereco: "Av. Paulista, 1000",
            data: new Date().toISOString().split('T')[0],
            hora: "10:15",
            codigo: "113002",
            status: "recusada",
            createdAt: new Date().toISOString(),
            validadoPor: "João da Silva",
            validadoEmail: "joao.silva@solaris.com.br",
            validadoAt: new Date().toISOString()
        },
        {
            id: 114,
            corretorId: 4,
            corretorNome: "Ricardo Almeida Costa",
            corretorAvatar: "https://ui-avatars.com/api/?name=Ricardo+Almeida+Costa&background=ff9100&color=fff&size=256&font-size=0.35&bold=true",
            corretorCreci: "456789-SP",
            corretorEmpresa: "Costa Consultoria Imobiliária",
            corretorTelefone: "(11) 95432-1098",
            predioId: 1,
            predioNome: "Edifício Solaris",
            predioEndereco: "Av. Paulista, 1000",
            data: new Date().toISOString().split('T')[0],
            hora: "08:00",
            codigo: "114003",
            status: "concluida",
            createdAt: new Date().toISOString(),
            validadoPor: "João da Silva",
            validadoEmail: "joao.silva@solaris.com.br",
            validadoAt: new Date().toISOString()
        },

        // predioId 2 (Condomínio Verde Vita) — agendada hoje, andamento, cancelada
        {
            id: 115,
            corretorId: 4,
            corretorNome: "Ricardo Almeida Costa",
            corretorAvatar: "https://ui-avatars.com/api/?name=Ricardo+Almeida+Costa&background=ff9100&color=fff&size=256&font-size=0.35&bold=true",
            corretorCreci: "456789-SP",
            corretorEmpresa: "Costa Consultoria Imobiliária",
            corretorTelefone: "(11) 95432-1098",
            predioId: 2,
            predioNome: "Condomínio Verde Vita",
            predioEndereco: "Rua Augusta, 500",
            data: new Date().toISOString().split('T')[0],
            hora: "14:30",
            codigo: "115004",
            status: "agendada",
            createdAt: new Date().toISOString()
        },
        {
            id: 116,
            corretorId: 2,
            corretorNome: "Bruno Oliveira Santos",
            corretorAvatar: "https://ui-avatars.com/api/?name=Bruno+Oliveira+Santos&background=00b0ff&color=fff&size=256&font-size=0.35&bold=true",
            corretorCreci: "234567-SP",
            corretorEmpresa: "Oliveira Imóveis",
            corretorTelefone: "(11) 97654-3210",
            predioId: 2,
            predioNome: "Condomínio Verde Vita",
            predioEndereco: "Rua Augusta, 500",
            data: new Date().toISOString().split('T')[0],
            hora: "11:45",
            codigo: "116005",
            status: "andamento",
            createdAt: new Date().toISOString(),
            validadoPor: "Maria Souza",
            validadoEmail: "maria.souza@verdevita.com.br",
            validadoAt: new Date().toISOString()
        },
        {
            id: 117,
            corretorId: 3,
            corretorNome: "Carla Dias Ferreira",
            corretorAvatar: "https://ui-avatars.com/api/?name=Carla+Dias+Ferreira&background=00c853&color=fff&size=256&font-size=0.35&bold=true",
            corretorCreci: "345678-SP",
            corretorEmpresa: "Premium Brokers",
            corretorTelefone: "(11) 96543-2109",
            predioId: 2,
            predioNome: "Condomínio Verde Vita",
            predioEndereco: "Rua Augusta, 500",
            data: new Date().toISOString().split('T')[0],
            hora: "09:00",
            codigo: "117006",
            status: "cancelada",
            createdAt: new Date().toISOString()
        },

        // predioId 3 (Torres do Parque) — andamento, cancelada, recusada, concluida
        {
            id: 118,
            corretorId: 2,
            corretorNome: "Bruno Oliveira Santos",
            corretorAvatar: "https://ui-avatars.com/api/?name=Bruno+Oliveira+Santos&background=00b0ff&color=fff&size=256&font-size=0.35&bold=true",
            corretorCreci: "234567-SP",
            corretorEmpresa: "Oliveira Imóveis",
            corretorTelefone: "(11) 97654-3210",
            predioId: 3,
            predioNome: "Torres do Parque",
            predioEndereco: "Rua Oscar Freire, 200",
            data: new Date().toISOString().split('T')[0],
            hora: "09:30",
            codigo: "118007",
            status: "andamento",
            createdAt: new Date().toISOString(),
            validadoPor: "Antônio Pereira",
            validadoEmail: "antonio.pereira@torresparque.com.br",
            validadoAt: new Date().toISOString()
        },
        {
            id: 119,
            corretorId: 4,
            corretorNome: "Ricardo Almeida Costa",
            corretorAvatar: "https://ui-avatars.com/api/?name=Ricardo+Almeida+Costa&background=ff9100&color=fff&size=256&font-size=0.35&bold=true",
            corretorCreci: "456789-SP",
            corretorEmpresa: "Costa Consultoria Imobiliária",
            corretorTelefone: "(11) 95432-1098",
            predioId: 3,
            predioNome: "Torres do Parque",
            predioEndereco: "Rua Oscar Freire, 200",
            data: new Date().toISOString().split('T')[0],
            hora: "13:00",
            codigo: "119008",
            status: "cancelada",
            createdAt: new Date().toISOString()
        },
        {
            id: 120,
            corretorId: 1,
            corretorNome: "Ana Carolina Mendes",
            corretorAvatar: "https://ui-avatars.com/api/?name=Ana+Carolina+Mendes&background=d4af37&color=0a192f&size=256&font-size=0.4&bold=true",
            corretorCreci: "123456-SP",
            corretorEmpresa: "Alpha Imóveis Premium",
            corretorTelefone: "(11) 98765-4321",
            predioId: 3,
            predioNome: "Torres do Parque",
            predioEndereco: "Rua Oscar Freire, 200",
            data: new Date().toISOString().split('T')[0],
            hora: "11:30",
            codigo: "120009",
            status: "recusada",
            createdAt: new Date().toISOString(),
            validadoPor: "Antônio Pereira",
            validadoEmail: "antonio.pereira@torresparque.com.br",
            validadoAt: new Date().toISOString()
        },
        {
            id: 121,
            corretorId: 3,
            corretorNome: "Carla Dias Ferreira",
            corretorAvatar: "https://ui-avatars.com/api/?name=Carla+Dias+Ferreira&background=00c853&color=fff&size=256&font-size=0.35&bold=true",
            corretorCreci: "345678-SP",
            corretorEmpresa: "Premium Brokers",
            corretorTelefone: "(11) 96543-2109",
            predioId: 3,
            predioNome: "Torres do Parque",
            predioEndereco: "Rua Oscar Freire, 200",
            data: new Date().toISOString().split('T')[0],
            hora: "08:30",
            codigo: "121010",
            status: "concluida",
            createdAt: new Date().toISOString(),
            validadoPor: "Antônio Pereira",
            validadoEmail: "antonio.pereira@torresparque.com.br",
            validadoAt: new Date().toISOString()
        },

        // predioId 4 (Residencial Plaza Mayor) — agendada hoje, andamento, recusada
        {
            id: 122,
            corretorId: 3,
            corretorNome: "Carla Dias Ferreira",
            corretorAvatar: "https://ui-avatars.com/api/?name=Carla+Dias+Ferreira&background=00c853&color=fff&size=256&font-size=0.35&bold=true",
            corretorCreci: "345678-SP",
            corretorEmpresa: "Premium Brokers",
            corretorTelefone: "(11) 96543-2109",
            predioId: 4,
            predioNome: "Residencial Plaza Mayor",
            predioEndereco: "Alameda Santos, 1200",
            data: new Date().toISOString().split('T')[0],
            hora: "15:00",
            codigo: "122011",
            status: "agendada",
            createdAt: new Date().toISOString()
        },
        {
            id: 123,
            corretorId: 2,
            corretorNome: "Bruno Oliveira Santos",
            corretorAvatar: "https://ui-avatars.com/api/?name=Bruno+Oliveira+Santos&background=00b0ff&color=fff&size=256&font-size=0.35&bold=true",
            corretorCreci: "234567-SP",
            corretorEmpresa: "Oliveira Imóveis",
            corretorTelefone: "(11) 97654-3210",
            predioId: 4,
            predioNome: "Residencial Plaza Mayor",
            predioEndereco: "Alameda Santos, 1200",
            data: new Date().toISOString().split('T')[0],
            hora: "10:00",
            codigo: "123012",
            status: "andamento",
            createdAt: new Date().toISOString(),
            validadoPor: "Luciana Oliveira",
            validadoEmail: "luciana.oliveira@plazamayor.com.br",
            validadoAt: new Date().toISOString()
        },
        {
            id: 124,
            corretorId: 1,
            corretorNome: "Ana Carolina Mendes",
            corretorAvatar: "https://ui-avatars.com/api/?name=Ana+Carolina+Mendes&background=d4af37&color=0a192f&size=256&font-size=0.4&bold=true",
            corretorCreci: "123456-SP",
            corretorEmpresa: "Alpha Imóveis Premium",
            corretorTelefone: "(11) 98765-4321",
            predioId: 4,
            predioNome: "Residencial Plaza Mayor",
            predioEndereco: "Alameda Santos, 1200",
            data: new Date().toISOString().split('T')[0],
            hora: "08:45",
            codigo: "124013",
            status: "recusada",
            createdAt: new Date().toISOString(),
            validadoPor: "Luciana Oliveira",
            validadoEmail: "luciana.oliveira@plazamayor.com.br",
            validadoAt: new Date().toISOString()
        },
        {
            id: 125,
            corretorId: 1,
            corretorNome: "Ana Carolina Mendes",
            corretorAvatar: "https://ui-avatars.com/api/?name=Ana+Carolina+Mendes&background=d4af37&color=0a192f&size=256&font-size=0.4&bold=true",
            corretorCreci: "123456-SP",
            corretorEmpresa: "Alpha Imóveis Premium",
            corretorTelefone: "(11) 98765-4321",
            predioId: 1,
            predioNome: "Edifício Solaris",
            predioEndereco: "Av. Paulista, 1000",
            data: new Date().toISOString().split('T')[0],
            hora: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
            codigo: "539274",
            status: "andamento",
            createdAt: new Date().toISOString(),
            validadoPor: "Carlos Porteiro",
            validadoAt: new Date().toISOString()
        }
    ]
};

// Helper para formatar data
function formatDate(dateStr) {
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
}

function formatDateRelative(dateStr) {
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    
    if (dateStr === today) return 'Hoje';
    if (dateStr === tomorrow) return 'Amanhã';
    if (dateStr === yesterday) return 'Ontem';
    return formatDate(dateStr);
}

function formatTime(timeStr) {
    return timeStr;
}

function getStatusLabel(status) {
    const labels = {
        'agendada': 'Agendada',
        'andamento': 'Em Andamento',
        'concluida': 'Concluída',
        'cancelada': 'Cancelada',
        'recusada': 'Recusada'
    };
    return labels[status] || status;
}

function getStatusIcon(status) {
    const icons = {
        'agendada': 'fa-calendar-check',
        'andamento': 'fa-person-walking',
        'concluida': 'fa-circle-check',
        'cancelada': 'fa-circle-xmark',
        'recusada': 'fa-ban'
    };
    return icons[status] || 'fa-circle';
}
