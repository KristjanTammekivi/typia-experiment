import type * as ts from 'typescript';
import type { TransformerExtras, PluginConfig } from 'ts-patch';

export default function (program: ts.Program, pluginConfig: PluginConfig, { ts }: TransformerExtras) {
    return (ctx: ts.TransformationContext) => {
        const { factory } = ctx;
        return (sourceFile: ts.SourceFile) => {
            let foundNode = false;
            const visitor = (node: ts.Node): ts.VisitResult<ts.Node> => {
                if (ts.isExpressionStatement(node)) {
                    const { expression } = node as any;
                    if (ts.isCallExpression(expression) && expression.expression.getText() === 'testType') {
                        foundNode = true;
                        const { typeArguments, arguments: args } = expression;
                        const _typia = factory.createIdentifier('typia');
                        const typia = factory.createVariableStatement(
                            undefined,
                            factory.createVariableDeclarationList(
                                [
                                    factory.createVariableDeclaration(
                                        _typia,
                                        undefined,
                                        factory.createImportTypeNode(
                                            factory.createLiteralTypeNode(factory.createStringLiteral('typia')),
                                            undefined,
                                            undefined,
                                            undefined,
                                            true
                                        ),
                                        factory.createCallExpression(factory.createIdentifier('require'), undefined, [
                                            factory.createStringLiteral('typia')
                                        ])
                                    )
                                ],
                                ts.NodeFlags.Const
                            )
                        );
                        const _testType = factory.createIdentifier('testType');
                        const testType = factory.createVariableStatement(
                            undefined,
                            factory.createVariableDeclarationList(
                                [
                                    factory.createVariableDeclaration(
                                        _testType,
                                        undefined,
                                        factory.createImportTypeNode(
                                            factory.createLiteralTypeNode(factory.createStringLiteral('typia-typetest')),
                                            undefined,
                                            undefined,
                                            undefined,
                                            true
                                        ),
                                        factory.createCallExpression(factory.createIdentifier('require'), undefined, [
                                            factory.createStringLiteral('typia-typetest')
                                        ])
                                    )
                                ],
                                ts.NodeFlags.Const
                            )
                        );
                        const validateEquals = factory.createIdentifier('validateEquals');
                        const result = factory.createIdentifier('result');
                        const success = factory.createIdentifier('success');
                        const typeValidationError = factory.createIdentifier('TypeValidationError');
                        const throwStatement = factory.createThrowStatement(
                            factory.createNewExpression(factory.createPropertyAccessExpression(_testType, typeValidationError), undefined, [
                                result
                            ])
                        );
                        const ifStatement = factory.createIfStatement(
                            factory.createLogicalNot(factory.createPropertyAccessExpression(result, success)),
                            throwStatement
                        );
                        const validateEqualsCall = factory.createCallExpression(
                            factory.createPropertyAccessExpression(_typia, validateEquals),
                            typeArguments,
                            args
                        );
                        const variableStatement = factory.createVariableStatement(
                            undefined,
                            factory.createVariableDeclarationList(
                                [factory.createVariableDeclaration(result, undefined, undefined, validateEqualsCall)],
                                ts.NodeFlags.Const
                            )
                        );
                        const importStatement = factory.createImportDeclaration(
                            // import * as typia from 'typia';
                            undefined,
                            factory.createImportClause(false, undefined, factory.createNamespaceImport(_typia)),
                            factory.createStringLiteral('typia')
                        );
                        const block = factory.createBlock([testType, variableStatement, ifStatement]);
                        return [importStatement, block];
                    }
                }

                return ts.visitEachChild(node, visitor, ctx);
            };

            const newSource = ts.visitNode(sourceFile, visitor);
            if (foundNode) {
                console.log(ts.createPrinter().printNode(ts.EmitHint.Unspecified, newSource, sourceFile));
            }
            return newSource;
        };
    };
}
