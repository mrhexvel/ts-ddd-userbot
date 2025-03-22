export class MessageBrokerAdapter {
  sendMessage(message: string): void {}

  receiveMessage(callback: (message: string) => void): void {}
}
