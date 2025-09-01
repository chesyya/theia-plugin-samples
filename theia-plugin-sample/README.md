# Theia Plugin Sample

This sample demonstrates how to create a VS Code extension that is compatible with both VS Code and Theia environments.

## Features

- **Environment Detection**: Automatically detects whether the extension is running in VS Code or Theia
- **Cross-platform Commands**: Commands that work in both environments
- **Environment-specific Adaptations**: Shows how to adapt behavior based on the runtime environment

## Commands

This sample contributes the following commands:

- `Theia: Hello World` - Display a hello world message with environment detection
- `Theia: Show Environment Info` - Display detailed information about the runtime environment

## Key Concepts Demonstrated

### 1. Environment Detection

The extension shows several methods to detect if it's running in Theia vs VS Code:

```typescript
function detectTheiaEnvironment(): boolean {
    // Check for Theia-specific global variables
    if (typeof (globalThis as any).theia !== 'undefined') {
        return true;
    }
    
    // Check user agent for web-based detection
    if (typeof navigator !== 'undefined' && navigator.userAgent.includes('Theia')) {
        return true;
    }
    
    return false;
}
```

### 2. Adaptive Behavior

The extension adapts its behavior based on the detected environment:

```typescript
const environmentName = isTheia ? 'Theia' : 'VS Code';
vscode.window.showInformationMessage(`Hello World from ${environmentName}!`);
```

### 3. Environment Information

The extension provides detailed environment information useful for debugging and development:

- Runtime environment (Theia vs VS Code)
- VS Code API version
- Platform and architecture details
- Node.js version

## Running the Sample

1. Open this sample in VS Code or Theia
2. Press `F5` to open a new Extension Development Host window
3. In the new window, open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`)
4. Type "Theia" to see the available commands
5. Try both commands to see environment-specific behavior

## Theia Compatibility Notes

### What Works

- Most VS Code APIs work identically in Theia
- Commands and menus function the same way
- Basic extension lifecycle (activate/deactivate) is identical

### Differences to Consider

- Some VS Code-specific UI elements may render differently
- Certain advanced APIs might have different behavior
- Theia may have additional APIs not available in VS Code
- Web-based Theia deployments have different constraints than desktop VS Code

### Best Practices

1. **Test in both environments** during development
2. **Use feature detection** rather than environment detection when possible
3. **Provide graceful fallbacks** for environment-specific features
4. **Document compatibility** clearly in your extension's README

## Development

```bash
# Install dependencies
npm install

# Compile the extension
npm run compile

# Watch for changes
npm run watch

# Lint the code
npm run lint
```

## Resources

- [VS Code Extension API](https://code.visualstudio.com/api)
- [Theia Extension Development](https://theia-ide.org/docs/)
- [Theia vs VS Code Compatibility](https://github.com/eclipse-theia/theia/wiki/VSCode-Extension-Compatibility)