// eslint-disable-next-line @typescript-eslint/naming-convention
export enum CRM_PLATFORM_OPTIONS {
  amo = 'AMO',
  bitrix24 = 'Bitrix24',
}

export interface TsdDashboardItem {
  id: number
  platform_crm: CRM_PLATFORM_OPTIONS
  statistics: string
  status: boolean
  subdomain: string
  webhook?: string
  client_id?: string
  client_secret?: string
}

export interface ApiCreateDashboardArguments {
  subdomain: string,
  platform_crm:  string,
  client_id:  string,
  client_secret:  string,
  webhook:  string,
  status: boolean
}

export interface TsdTableItem {
  id: number;
  title: string;
  people: string;
  status?: boolean
}

export interface ApiCreateTableArguments {
  title: string,
  people: string,
  status: string,
}


export interface TsdColumnItem {
  created_at: string;
  data_type: string;
  display_type: string;
  id: number;
  status: boolean;
  table_id: number;
  title: string;
  updated_at: string;
  value_limit: number;
}

export interface ApiCreateColumnArguments {
  title: string,
  display_type: string,
  data_type: string,
  value_limit: number,
  status: false
}

