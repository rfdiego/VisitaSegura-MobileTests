# Visita Segura

Aplicação web de gerenciamento de visitas a imóveis voltada para o mercado imobiliário paulista (CRECISP). Permite que **corretores** agendem visitas com códigos de acesso únicos e que **porteiros** validem esses códigos na entrada dos condomínios — tudo com rastreabilidade completa de cada etapa da visita.

---

## Funcionalidades principais

- **Dual-role:** Duas interfaces distintas — Corretor e Porteiro — acessadas após seleção de perfil no login.
- **Agendamento de visitas:** O corretor preenche um formulário passo a passo com data, hora e imóvel desejado.
- **Código de acesso:** Cada visita gera um código numérico de 6 dígitos (+ QR Code) que o porteiro usa para validar a entrada.
- **Fluxo de status:** A visita percorre um ciclo de vida controlado com 5 status distintos (veja a seção abaixo).
- **Histórico e auditoria:** Toda transição de status é registrada com usuário, data e hora.
- **Dashboard por perfil:** Cada role possui cards de resumo com contagens por status e listas filtráveis.
- **Persistência local:** Os dados são salvos no `localStorage` do navegador (sem backend).

---

## Perfis (roles)

| Perfil | Responsabilidades |
|---|---|
| **Corretor** | Agenda visitas, acompanha o status, cancela visitas agendadas, visualiza o código de acesso. |
| **Porteiro** | Valida códigos na entrada, aprova ou nega o acesso, conclui visitas em andamento, consulta o histórico. |

---

## Status de visita

Cada visita possui um ciclo de vida com **5 status** possíveis. A tabela abaixo descreve o que cada status representa, quem pode atuá-lo e quais ações ficam disponíveis na tela.

| Status | Significado | Quem define | O que é exibido | Ações disponíveis |
|---|---|---|---|---|
| **Agendada** | Visita criada pelo corretor, aguardando validação na portaria. | Corretor (ao criar) | Data, hora, imóvel, código de acesso. | Corretor: cancelar visita. Porteiro: validar código (aprovar ou negar entrada). |
| **Em Andamento** | Porteiro aprovou a entrada — visita está acontecendo no momento. | Porteiro (ao aprovar) | Nome do porteiro que validou, horário da validação. | Porteiro: concluir visita ou cancelar. Corretor: visualização apenas. |
| **Concluída** | Visita encerrada com sucesso pelo porteiro. | Porteiro (ao concluir) | Nome do porteiro, horário de conclusão. | Nenhuma — status terminal. |
| **Cancelada** | Visita cancelada antes ou durante a realização. | Corretor (se agendada) ou Porteiro (se agendada ou em andamento) | Motivo do cancelamento, responsável, data/hora do registro. | Nenhuma — status terminal. |
| **Recusada** | Porteiro negou a entrada ao corretor. | Porteiro (ao negar acesso) | Motivo da recusa, responsável, data/hora do registro. | Nenhuma — status terminal. |

### Diagrama de transições

```
                  [CORRETOR cria]
                        │
                        ▼
                   ┌─────────┐
                   │Agendada │
                   └─────────┘
                  /     │     \
                 /      │      \
                ▼       ▼       ▼
          Cancelada  Em Andamento  Recusada
          (corretor    (porteiro    (porteiro
           ou porteiro) aprova)      nega)
                        │
               ┌────────┴────────┐
               ▼                 ▼
          Concluída          Cancelada
          (porteiro)         (porteiro)
```

> **Regras importantes:**
> - Um corretor só pode cancelar visitas com status **Agendada**.
> - O porteiro não pode alterar visitas já nos estados terminais (Concluída, Cancelada ou Recusada).
> - Ao aprovar, negar ou concluir uma visita, o sistema registra automaticamente o nome do porteiro, e-mail e timestamp.

---

## Estrutura do projeto

```
visitasegura/
├── index.html       # Shell da SPA — telas e modais em HTML com controle via JS
├── css/
│   └── style.css    # Estilos completos, mobile-first, com variáveis CSS por status
└── js/
    ├── app.js       # Controller principal: navegação, estado, eventos, renderização
    └── data.js      # Dados mock, helpers de formatação e funções de status
```

O projeto é uma SPA (Single-Page Application) em **JavaScript puro**, sem frameworks ou dependências externas além do [Font Awesome](https://fontawesome.com/) para ícones.

---

## Como executar

Por ser um projeto client-side sem build steps, basta abrir o arquivo diretamente:

```bash
# Opção 1 — abrir direto no navegador
start index.html

# Opção 2 — servir localmente (recomendado para evitar restrições de CORS)
npx serve .
# ou
python -m http.server 8080
```

Acesse `http://localhost:8080` (ou a porta configurada) e selecione um perfil para começar.

---

## Dados de teste

O arquivo `js/data.js` já contém dados mock prontos para uso:

- **4 prédios:** Solaris, Verde Vita, Torres do Parque, Plaza Mayor
- **4 corretores** e **5 porteiros** de teste
- **20+ visitas** cobrindo todos os status possíveis

Os dados são persistidos no `localStorage` na chave versionada `visitasegura_v7`. Para resetar, limpe o localStorage do navegador.

---

## Tecnologias

| Camada | Tecnologia |
|---|---|
| Linguagem | JavaScript (ES2020+, vanilla) |
| Markup | HTML5 |
| Estilo | CSS3 com variáveis customizadas |
| Ícones | Font Awesome 6 |
| Persistência | localStorage (sem backend) |
| Internacionalização | pt-BR nativo |
