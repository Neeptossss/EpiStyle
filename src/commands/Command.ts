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
			log("Command execution: successufly");
			updateStatusBar(undefined);
        }
    }

    public getCommand() {
		return this.command;
	}

    abstract executeCommand(): Promise<void |string>;
}

export class ShowDiagnostic extends Command {

    public title = "Show Diagnostic";
    public command = "epistyle.showDiagnostic";

    public async executeCommand(): Promise<string | void> {
        vscode.window.showInformationMessage('Show coding style');
    }
}
