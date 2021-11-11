import { Next, ParameterizedContext } from 'koa';
import { Controller, RequestMapping } from '@/common/decorators';
import { Success } from '@/common/restful';
import { SocketClient, SocketCtx } from '@/common/socket';
import IndexServer from '@/servers';

const indexServer = new IndexServer();

@Controller('/index')
class Index {
  @RequestMapping()
  async home(ctx: ParameterizedContext, next: Next) {
    ctx.body = Success('ok');
    indexServer.test();
    await next();
  }

  @RequestMapping({
    protocol: 'SOCKET'
  })
  async test2(client: SocketClient, ctx: SocketCtx) {
    console.log('socket test');
    client.send({
      key: 'socket-home',
      value: 'socket test'
    });
  }
}
