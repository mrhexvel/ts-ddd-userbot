type EventType = "message_new" | "message_edit";

export interface Event {
  type: EventType;
  text: string | undefined;
  messageId: number;
  peerId: number;
  [key: string]: any;
}
