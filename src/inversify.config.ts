import "reflect-metadata";
import {Container} from 'inversify';
import {TYPES} from "./types";
import {Bot} from "./bot";
import {Client} from "discord.js";
import { MessageResponder } from "./services/message-responder";
import { PingFinderTest } from "./services/ping-finder-test";

let container = new Container;

container.bind<Bot>(TYPES.Bot).to(Bot).inSingletonScope();
container.bind<Client>(TYPES.Client).toConstantValue(new Client());
container.bind<string>(TYPES.Token).toConstantValue(process.env.TOKEN);
container.bind<MessageResponder>(TYPES.MessageResponder).to(MessageResponder).inSingletonScope();
container.bind<PingFinderTest>(TYPES.PingFinderTest).to(PingFinderTest).inSingletonScope();

export default container;