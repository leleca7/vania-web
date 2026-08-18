# Vania Work

Painel pessoal da Vania para organizar oportunidades de renda remota, freelas, estudos e ganhos sem automatizar etapas que precisam ser humanas.

## Arquitetura v0.2

- **Frontend:** HTML/CSS/JS mobile-first.
- **Login e banco:** Supabase Auth + Postgres com RLS por usuário.
- **IA:** Vercel AI Gateway via AI SDK, executada somente no backend.
- **Monitor:** endpoint agendado a cada 12h; a preferência individual decide se cada ciclo roda em 12h ou 24h.
- **Segurança:** nenhuma chave secreta fica no navegador ou no GitHub.

## Dados salvos

`profiles`, `user_preferences`, `opportunities`, `earnings`, `monitor_runs`, `ai_events` e `platform_rules`.

## IA

A IA pode analisar e resumir oportunidades, estimar prioridade, preparar propostas e responder no assistente. Ela não responde screeners, pesquisas, testes humanos nem executa automações bloqueadas pelas regras das plataformas.

## Colocar em produção

1. Criar um projeto Supabase separado para o Vania Work.
2. Aplicar `supabase/migrations/001_vania_work_core.sql` no projeto.
3. Criar a conta da Vania no Supabase Auth. Se a conta já existir, a migration também cria o perfil e as preferências que faltarem.
4. Configurar na Vercel as variáveis descritas em `.env.example` para **Production**:
   - `SUPABASE_URL`
   - `SUPABASE_PUBLISHABLE_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `CRON_SECRET`
   - `AI_GATEWAY_API_KEY` quando o deploy não estiver autenticando o AI Gateway por OIDC
   - `AI_MODEL` é opcional; o padrão já está definido no código
5. Fazer um novo deploy de produção depois de salvar as variáveis.
6. Abrir `/api/health`. O retorno deve mostrar `ok: true` e `missing: []`.
7. Entrar no site com a conta criada no Supabase Auth e testar:
   - salvar preferências;
   - adicionar uma oportunidade;
   - executar a análise de IA;
   - registrar um ganho;
   - executar o monitor manual.

### Observação sobre Supabase Data API

Projetos Supabase recentes podem não expor tabelas novas ao Data API automaticamente. A migration deste repositório já contém os `GRANT`s necessários para `authenticated` e `service_role`, mantendo RLS habilitado para proteger os dados de cada usuário.

## Diagnóstico

`GET /api/health` não retorna segredos. Ele mostra somente se banco, acesso administrativo, IA e cron estão configurados e lista o nome das variáveis ausentes.

A aplicação mantém o modo demonstração quando o backend ainda não está configurado.
