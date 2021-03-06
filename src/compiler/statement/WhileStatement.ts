import { ts } from "../../typescript";
import { Expression } from "../expression";
import { IterationStatement } from "./IterationStatement";

export const WhileStatementBase = IterationStatement;
export class WhileStatement extends WhileStatementBase<ts.WhileStatement> {
    /**
     * Gets this while statement's expression.
     */
    getExpression(): Expression {
        return this.getNodeFromCompilerNode(this.compilerNode.expression);
    }
}
