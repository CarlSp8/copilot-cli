#!/usr/bin/env node

/**
 * GitHub Copilot CLI
 * Brings the power of GitHub Copilot coding agent directly to your terminal.
 */

const { version, description } = require('../package.json');

const HELP_TEXT = `
GitHub Copilot CLI - ${description}

Usage: copilot [options] [command]

Options:
  -h, --help        Show this help message
  -v, --version     Show version number
  --banner          Show the animated banner on launch
  --experimental    Enable experimental features

Commands:
  /login            Authenticate with GitHub
  /logout           Sign out of GitHub
  /model            Choose from available AI models
  /feedback         Submit feedback
  /lsp              View LSP server status
  /experimental     Toggle experimental mode

For more information, visit:
  https://docs.github.com/copilot/concepts/agents/about-copilot-cli
`;

/**
 * Parse command line arguments
 * @param {string[]} args - Command line arguments
 * @returns {Object} Parsed arguments
 */
function parseArgs(args) {
  const parsed = {
    help: false,
    version: false,
    banner: false,
    experimental: false,
    command: null
  };

  for (const arg of args) {
    switch (arg) {
      case '-h':
      case '--help':
        parsed.help = true;
        break;
      case '-v':
      case '--version':
        parsed.version = true;
        break;
      case '--banner':
        parsed.banner = true;
        break;
      case '--experimental':
        parsed.experimental = true;
        break;
      default:
        if (!arg.startsWith('-') && !parsed.command) {
          parsed.command = arg;
        }
        break;
    }
  }

  return parsed;
}

/**
 * Main entry point
 */
function main() {
  const args = process.argv.slice(2);
  const parsed = parseArgs(args);

  // Handle version flag first
  if (parsed.version) {
    console.log(`GitHub Copilot CLI v${version}`);
    process.exit(0);
  }

  // Handle explicit help flag
  if (parsed.help) {
    console.log(HELP_TEXT);
    process.exit(0);
  }

  // Handle banner option
  if (parsed.banner) {
    console.log(`
  ╔═══════════════════════════════════════════════╗
  ║                                               ║
  ║           GitHub Copilot CLI                  ║
  ║                                               ║
  ║    AI-powered coding assistance in your       ║
  ║    terminal                                   ║
  ║                                               ║
  ╚═══════════════════════════════════════════════╝
`);
  }

  if (parsed.experimental) {
    console.log('Experimental mode enabled.');
  }

  // If we have a command, display placeholder message
  if (parsed.command) {
    console.log(`Command "${parsed.command}" is not yet implemented.`);
    console.log('For full functionality, please install the complete GitHub Copilot CLI.');
    console.log('Run "copilot --help" for more information.');
    process.exit(1);
  }

  // Show help if no arguments provided and no flags were handled
  if (args.length === 0) {
    console.log(HELP_TEXT);
    process.exit(0);
  }
}

main();
