import * as vscode from 'vscode';

/**
 * This extension demonstrates creating a plugin that works in both VS Code and Theia.
 * It shows how to detect the environment and adapt behavior accordingly.
 */
export function activate(context: vscode.ExtensionContext) {
	console.log('Theia Plugin Sample is now active!');

	// Detect if we're running in Theia vs VS Code
	const isTheia = detectTheiaEnvironment();

	// Register Hello World command
	const helloWorldDisposable = vscode.commands.registerCommand('theiaPlugin.helloWorld', () => {
		const environmentName = isTheia ? 'Theia' : 'VS Code';
		vscode.window.showInformationMessage(`Hello World from ${environmentName}!`);
	});

	// Register environment info command  
	const showInfoDisposable = vscode.commands.registerCommand('theiaPlugin.showInfo', () => {
		showEnvironmentInfo(isTheia);
	});

	context.subscriptions.push(helloWorldDisposable);
	context.subscriptions.push(showInfoDisposable);

	// Show activation message
	const environmentName = isTheia ? 'Theia' : 'VS Code';
	vscode.window.showInformationMessage(`Theia Plugin Sample activated in ${environmentName}!`);
}

/**
 * Detect if we're running in Theia environment
 */
function detectTheiaEnvironment(): boolean {
	// Method 1: Check for Theia-specific global variables
	if (typeof (globalThis as unknown as { theia?: unknown }).theia !== 'undefined') {
		return true;
	}

	// Method 2: Check user agent (for web-based detection)
	if (typeof globalThis !== 'undefined' && 'navigator' in globalThis) {
		const nav = (globalThis as unknown as { navigator?: { userAgent?: string } }).navigator;
		if (nav && nav.userAgent && nav.userAgent.includes('Theia')) {
			return true;
		}
	}

	// Method 3: Check VS Code specific APIs that might not exist in Theia
	try {
		// Some VS Code specific APIs might not be available in Theia
		// This is environment-dependent and may need adjustment
		return false;
	} catch {
		// If VS Code specific API throws, we might be in Theia
		return true;
	}
}

/**
 * Show detailed environment information
 */
function showEnvironmentInfo(isTheia: boolean) {
	const environmentName = isTheia ? 'Theia' : 'VS Code';

	const info = [
		`Environment: ${environmentName}`,
		`VS Code API Version: ${vscode.version}`,
		`Extension Host: ${vscode.env.appHost}`,
		`Platform: ${process.platform}`,
		`Node Version: ${process.version}`,
		`Architecture: ${process.arch}`
	];

	// Create and show information in output channel
	const outputChannel = vscode.window.createOutputChannel('Theia Plugin Sample');
	outputChannel.clear();
	outputChannel.appendLine('='.repeat(50));
	outputChannel.appendLine('THEIA PLUGIN SAMPLE - ENVIRONMENT INFO');
	outputChannel.appendLine('='.repeat(50));

	info.forEach(line => {
		outputChannel.appendLine(line);
	});

	outputChannel.appendLine('='.repeat(50));
	outputChannel.show();

	// Also show as information message
	vscode.window.showInformationMessage(
		`Running in ${environmentName}. Check output panel for details.`,
		'Show Output'
	).then(selection => {
		if (selection === 'Show Output') {
			outputChannel.show();
		}
	});
}

/**
 * Example of Theia-specific functionality
 * This function is kept as a reference but unused to demonstrate
 * how you might implement environment-specific features.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function theiaSpecificFeature() {
	// This function demonstrates how you might implement
	// Theia-specific features that aren't available in VS Code

	vscode.window.showInformationMessage(
		'This feature is optimized for Theia environment!'
	);

	// Here you could implement Theia-specific APIs or behaviors
	// For example: custom widgets, different UI layouts, etc.
}

/**
 * Example of VS Code-specific functionality
 * This function is kept as a reference but unused to demonstrate
 * how you might implement environment-specific features.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars  
function vscodeSpecificFeature() {
	// This function demonstrates how you might implement
	// VS Code-specific features that might not work in Theia

	vscode.window.showInformationMessage(
		'This feature is optimized for VS Code environment!'
	);

	// Here you could implement VS Code-specific APIs or behaviors
	// that might not be available or work differently in Theia
}

export function deactivate() {
	console.log('Theia Plugin Sample is now deactivated');
}