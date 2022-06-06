import Connection from "./Connection"
import pgp from 'pg-promise'

export default class PgProimiseConnectionAdapter implements Connection {
    pgp: any

    constructor () {
        this.pgp = pgp()('postgres://postgres:123456@localhost:5132/app')
    }
    query(statement: string, params: any): Promise<any> {
       return this.pgp.query(statement, params)
    }

}