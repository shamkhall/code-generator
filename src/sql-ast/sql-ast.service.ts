import { Statement, parse } from "pgsql-ast-parser";

export class SqlAstService {
    createAST (sql: string): Statement[] | boolean {
        try {
            const ast: Statement[] = parse(sql);
            return ast;
        }
        catch {
            return false
        }
    }
}
