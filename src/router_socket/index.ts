import {restful, SocketMsgType} from '../utils/lib/tool';
import {SocketClient, SocketCtx} from "../utils/lib/socket";

const index = {};

index['home'] = (client: SocketClient, ctx: SocketCtx) => {
    let data = {
        key: ctx.key,
        data: {test: 'test'}
    }
    client.send(restful.socketMsg({key: SocketMsgType.SOCKET_SUCCESS, value: data}));
};

export default index;
