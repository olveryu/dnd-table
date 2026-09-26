// TODO（二期）：战役日志——章节、NPC、任务、时间线
export interface CampaignLog {
  id: string;
  date: string;
  title: string;
  body: string;
}

export const CAMPAIGN_LOGS: CampaignLog[] = [];
