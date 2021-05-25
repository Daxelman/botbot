require('dotenv').config();

import container from './inversify.config';
import {TYPES} from './types';
import {Bot} from './bot';

let bot = container.get<Bot>(TYPES.Bot);
bot.listen().then(() => {
    console.log("Logged In");
}).catch((error) => {
    console.log(error);
});