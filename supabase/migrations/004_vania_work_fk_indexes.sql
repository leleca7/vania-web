create index if not exists earnings_opportunity_idx
  on public.earnings(opportunity_id)
  where opportunity_id is not null;

create index if not exists ai_events_user_idx
  on public.ai_events(user_id);

create index if not exists ai_events_opportunity_idx
  on public.ai_events(opportunity_id)
  where opportunity_id is not null;
