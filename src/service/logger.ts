import * as vscode from 'vscode';
import { context } from '../context';


// Use to display log in the debug console 
let outputChannel: vscode.OutputChannel | undefined = undefined;
export function log(string: string, param?: any) {
	const displayName = context.extension.packageJSON.displayName;

	if (!outputChannel) {
		outputChannel = vscode.window.createOutputChannel(displayName);
	}
	outputChannel.appendLine(`${string}`);
	if (param) {
		outputChannel.appendLine(JSON.stringify(param));
		console.log(`${displayName}: ${string}`, param);
	} else {
		console.log(`${displayName}: ${string}`);
	}
}

export function displayLog() {
	if (outputChannel) {
		outputChannel.show();
	}
}
