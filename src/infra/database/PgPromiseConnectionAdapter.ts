import Connection from "./Connection"
import pgp from 'pg-promise'

export default class PgPromiseConnectionAdapter implements Connection {
    pgp: any

    constructor () {
        this.pgp = pgp()('postgres://postgres:admin@localhost:5432/curso-clean-arq')
    }
    query(statement: string, params: any): Promise<any> {
       return this.pgp.query(statement, params)
    }

    close(): Promise<void> {
		return this.pgp.$pool.end();
	}

}