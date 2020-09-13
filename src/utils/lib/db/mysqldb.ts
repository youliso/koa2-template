import {createPool, Pool, escape} from 'mysql2';

export default class Mysqldb {
    dbClient: Pool;

    constructor(db: object) {
        this.dbClient = createPool(db);
    }

    //返回一个对象
    first(sql: string, params: object) {
        return new Promise((resolve, reject) => {
            this.dbClient.getConnection(async (err, conn) => {
                if (err) {
                    reject(err);
                    return;
                }
                conn.promise().query(sql, params)
                    .then(res => {
                        resolve(res[0] || null);
                        this.dbClient.releaseConnection(conn);
                    })
                    .catch(e => {
                        reject(e);
                        this.dbClient.releaseConnection(conn);
                    });
            });
        });
    }

    //返回单个查询结果
    single(sql: string, params: object) {
        return new Promise((resolve, reject) => {
            this.dbClient.getConnection(async (err, conn) => {
                if (err) {
                    reject(err);
                    return;
                }
                conn.promise().query(sql, params)
                    .then(res => {
                        for (let i in res[0]) {
                            resolve(res[0][i] || null);
                            this.dbClient.releaseConnection(conn);
                            return;
                        }
                        resolve(null);
                        this.dbClient.releaseConnection(conn);
                    })
                    .catch(err => {
                        reject(err);
                        this.dbClient.releaseConnection(conn);
                    });
            });
        });
    }

    //执行代码，返回执行结果
    query(sql: string, params: object) {
        return new Promise((resolve, reject) => {
            this.dbClient.getConnection(async (err, conn) => {
                if (err) {
                    reject(err);
                    return;
                }
                conn.promise().query(sql, params)
                    .then(res => {
                        resolve(res);
                        this.dbClient.releaseConnection(conn);
                    })
                    .catch(err => {
                        reject(err);
                        this.dbClient.releaseConnection(conn);
                    });
            });
        });
    }

    //执行代码，返回执行结果
    execute(sql: string, params: object) {
        return new Promise((resolve, reject) => {
            this.dbClient.getConnection(async (err, conn) => {
                if (err) {
                    reject(err);
                    return;
                }
                conn.promise().execute(sql, params)
                    .then(res => {
                        resolve(res);
                        this.dbClient.releaseConnection(conn);
                    })
                    .catch(err => {
                        reject(err);
                        this.dbClient.releaseConnection(conn);
                    });
            });
        });
    }

    /**
     * 防止注入
     * @param {*} c
     **/
    escape(c: unknown) {
        return escape(c);
    }

}