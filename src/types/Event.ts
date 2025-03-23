import type { ContextDefaultState, MessageContext } from "vk-io";

export type Event = MessageContext<ContextDefaultState> & object;
