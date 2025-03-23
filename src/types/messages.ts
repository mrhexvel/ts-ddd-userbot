export interface MessageData {
  items: Message[];
}

export interface Message {
  date: number;
  from_id: number;
  id: number;
  out: number;
  important: boolean;
  is_hidden: boolean;
  attachments: any[];
  conversation_message_id: number;
  fwd_messages: any[];
  text: string;
  peer_id: number;
  random_id: number;
}

export interface Update extends Array<any> {
  0: number;
  1: number;
}
