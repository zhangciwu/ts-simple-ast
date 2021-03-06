import { ts } from "../../typescript";
import { ReferenceFindableNode, RenameableNode } from "../base";
import { PrimaryExpression } from "../expression/PrimaryExpression";
import { DefinitionInfo, ImplementationLocation } from "../tools";
import { Node } from "./Node";

export const IdentifierBase = ReferenceFindableNode(RenameableNode(PrimaryExpression));
export class Identifier extends IdentifierBase<ts.Identifier> {
    /**
     * Gets the text for the identifier.
     */
    getText() {
        return this.compilerNode.text;
    }

    /**
     * Gets the definition nodes of the identifier.
     * @remarks This is similar to "go to definition" and `.getDefinitions()`, but only returns the nodes.
     */
    getDefinitionNodes(): Node[] {
        return this.getDefinitions().map(d => d.getDeclarationNode()).filter(d => d != null) as Node[];
    }

    /**
     * Gets the definitions of the identifier.
     * @remarks This is similar to "go to definition." Use `.getDefinitionNodes()` if you only care about the nodes.
     */
    getDefinitions(): DefinitionInfo[] {
        return this.global.languageService.getDefinitions(this);
    }

    /**
     * Gets the implementations of the identifier.
     *
     * This is similar to "go to implementation."
     */
    getImplementations(): ImplementationLocation[] {
        return this.global.languageService.getImplementations(this);
    }
}
