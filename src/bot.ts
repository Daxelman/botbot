import {Client, Message} from "discord.js";
import {inject, injectable} from "inversify";
import {TYPES} from "./types";
import {MessageResponder} from "./services/message-responder";

@injectable()
export class Bot {
    private client: Client;
    private readonly token: string;
    private messageResponder: MessageResponder;
    
    constructor(
        @inject(TYPES.Client) client: Client,
        @inject(TYPES.Token) token: string,
        @inject(TYPES.MessageResponder) messageResponder: MessageResponder,
    ) {
        this.client = client;
        this.token = token;
        this.messageResponder = messageResponder;
    }

    listen = (): Promise<string> => {
        this.client.on('message', (message: Message) => {

            if(message.author.bot){
                console.log('Ignoring Bot Message');
                return;
            }

            console.log("Message Recieved! Contents: ", message.content);

            this.messageResponder.handle(message).then(() => {
                console.log("Response Sent");
            }).catch((error) => {
                // TODO: this returns an error whenver you don't type something with ping in it, need to handle better
                console.log(error)
            });
        });

        return this.client.login(this.token);
    }
}