# Vania Work

Painel pessoal da Vania para organizar oportunidades de renda remota, freelas, estudos e ganhos sem automatizar etapas que precisam ser humanas.

## Arquitetura v0.3

- **Frontend:** HTML/CSS/JS mobile-first.
- **Login e banco:** Supabase Auth + Postgres com RLS.
- **IA:** Vercel AI Gateway via AI SDK, executada somente no backend.
- **Monitor:** executado no login quando o ciclo estiver vencido e também manualmente pelo painel.
- **Segurança:** as APIs de IA aceitam somente a conta proprietária; nenhuma chave secreta fica no navegador ou no GitHub.

## Produção atual

A conta Supabase atingiu o limite de projetos gratuitos, então o Vania Work foi ativado no projeto Supabase já existente da organização CURIÓ, sem misturar os dados operacionais das duas aplicações.

O isolamento é feito assim:

- o Vania Work usa tabelas próprias: `user_preferences`, `opportunities`, `earnings`, `monitor_runs`, `ai_events` e `platform_rules`;
- a tabela já existente `profiles` recebeu apenas a coluna adicional `display_name`;
- as policies RLS das tabelas do Vania Work permitem acesso somente ao usuário proprietário do painel;
- as rotas backend também validam o ID do proprietário antes de chamar a IA;
- a URL e a publishable key do Supabase são configuração pública e possuem fallback no backend. A autorização real continua sendo feita por Auth + RLS.

A migration aplicada em produção é `supabase/migrations/002_vania_work_shared_backend.sql`.

> `001_vania_work_core.sql` permanece como referência para uma instalação futura em um projeto Supabase dedicado. Não aplique a migration 001 no Supabase compartilhado da CURIÓ.

## Dados salvos

`profiles.display_name`, `user_preferences`, `opportunities`, `earnings`, `monitor_runs`, `ai_events` e `platform_rules`.

## IA

A IA pode analisar e resumir oportunidades, estimar prioridade, preparar propostas e responder no assistente. Ela não responde screeners, pesquisas, testes humanos nem executa automações bloqueadas pelas regras das plataformas.

O deploy na Vercel usa o AI Gateway por OIDC quando disponível. `AI_GATEWAY_API_KEY` continua sendo um override opcional.

## Monitor

No modo atual o monitor é real, mas não usa cron público nem service role:

1. ao entrar no painel, ele verifica se o ciclo de 12h/24h venceu;
2. se venceu, analisa as oportunidades autenticadas da proprietária;
3. o botão do monitor também força uma execução manual;
4. cada execução é registrada em `monitor_runs` e os eventos de IA em `ai_events`.

Isso evita guardar uma service-role key na Vercel e mantém o backend compatível com o plano Hobby.

## Diagnóstico

`GET /api/health` não retorna segredos. Ele mostra se a conexão pública com o banco, a trava de proprietário e a IA estão disponíveis.

Fluxo de validação:

1. entrar com a conta proprietária já existente no Supabase;
2. salvar preferências;
3. adicionar uma oportunidade;
4. executar a análise de IA;
5. registrar um ganho;
6. executar o monitor manual;
7. sair e entrar novamente para validar persistência e monitor por ciclo.

## Variáveis opcionais

O projeto já possui fallback de produção para os valores públicos necessários ao Supabase. As variáveis abaixo servem apenas como override:

- `SUPABASE_URL`
- `SUPABASE_PUBLISHABLE_KEY`
- `VANIA_OWNER_ID`
- `AI_GATEWAY_API_KEY`
- `AI_MODEL`

Nenhuma `SUPABASE_SERVICE_ROLE_KEY` é necessária no modo atual.
