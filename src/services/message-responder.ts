import {Message} from 'discord.js';
import {PingFinderTest} from './ping-finder-test';
import {inject, injectable} from 'inversify';
import {TYPES} from '../types';

@injectable()
export class MessageResponder {
    private pingFinder: PingFinderTest;

    constructor(
        @inject(TYPES.PingFinderTest) pingFinder: PingFinderTest
    ) {
        this.pingFinder = pingFinder;
    }

    handle = (message: Message) : Promise <Message | Message[]> => {
        return this.pingFinder.isPing(message.content) ? 
            message.reply('Pong!') : Promise.reject();
    }
}