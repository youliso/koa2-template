'use strict';
const _ = require('../utils/lib/original');

class home {
    index(client, ctx) {
        let data = {
            result:ctx.result,
            data:{test:'test'}
        }
        client.broadcast.send(_.success('测试',data));
    }
}

module.exports = new home();