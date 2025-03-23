export interface EditMessageParams {
  peer_id: number;
  message_id: number;
  message?: string;
  lat?: number;
  long?: number;
  attachment?: string;
  keep_forward_messages?: boolean;
  keep_snippets?: boolean;
  dont_parse_links?: boolean;
  template?: string;
  keyboard?: string;
}

export interface SendMessageParams {
  user_id?: number;
  peer_id?: number;
  domain?: string;
  chat_id?: number;
  message?: string;
  message_id?: number;
  lat?: number;
  long?: number;
  attachment?: string;
  reply_to?: number;
  forward_messages?: string;
  forward?: string;
  sticker_id?: number;
  group_id?: number;
  keyboard?: string;
  template?: string;
  payload?: string;
  content_source?: string;
  dont_parse_links?: boolean;
  disable_mentions?: boolean;
  intent?: string;
  subscribe_id?: number;
  random_id?: number;
}
