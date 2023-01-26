import * as vscode from 'vscode';

export let context: vscode.ExtensionContext;
export let extensionPath: string;
export let workspaceRoot: string;

export function setContext(ctx: vscode.ExtensionContext) {
    context = ctx;
    extensionPath = ctx.extensionPath;
    workspaceRoot = vscode.window.activeTextEditor!.document.uri.fsPath;
}
