import * as vscode from 'vscode';

import { context } from '../context';
import { updateStatusBar } from '../service/statusBar';
import { log, displayLog } from '../service/logger';

export abstract class Command implements vscode.Command {
    title = "";
    command = "";
    
    async execute(): Promise<void|string> {
        log(`execute command: ${this.title}`);

        try {
            return await this.executeCommand();
        } catch(error: any) {
            log(`Setup stopped: ${error.message}`);

            if (error.name === "Error") {
                displayLog();
                vscode.window.showErrorMessage(`Setup stopped:\n${error.message}\n\n`, { modal: true});
            }
            if (error.name === 'CancelProcess') {
				vscode.window.showErrorMessage(`Setup interrupted by the user:\n${error.message} \n\n`);
			}

		} finally {
			log("Command execution: finally");
			updateStatusBar(undefined);
        }
    }

    public getCommand() {
		return this.command;
	}

    abstract executeCommand(): Promise<void |string>;
}

export class HelloWorld extends Command {

    public title = "Hello World";
    public command = "epistyle.helloWorld";

    public async executeCommand(): Promise<string | void> {
        vscode.window.showInformationMessage('Hello World from epistyle!');
    }
}