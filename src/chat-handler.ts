export default class ChatHandler {
    private static chatLog: ChatMessage[] = [];

    public static sendChat(username: string, chat: ColoredChatMessage): void {
        this.chatLog.push(new ChatMessage(username, chat));
    }

    public static getChatLog(count: number): ChatMessage[] {
        count = Math.round(count)
        return this.chatLog.splice(this.chatLog.length - count, count);
    }
}

class ChatMessage {
    constructor(public username: string, public message: ColoredChatMessage) {
    }
}

class ColoredChatMessage {
    constructor(public text: string, public color: string) {
    }
}




(function () {
    // Load chatmessages from database

}());