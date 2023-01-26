// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import { setContext } from './context';
import { log } from './service/logger';
import command from './commands/index';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	setContext(context);
	
	registerCommand(context);
	
	console.log('Congratulations, your extension "epistyle" is now active!');
}

function registerCommand(context: vscode.ExtensionContext) {
	command.forEach((command) => {
		console.log(`Register command: ${command.title}`);
		
		try {
			context.subscriptions.push(
				vscode.commands.registerCommand(command.getCommand(), command.execute, command)
			);
		} catch {
			console.log(`Fail to register the command: ${command.getCommand()}`);
		}
	});
}

// This method is called when your extension is deactivated
export function deactivate() {}
