const { describe, it } = require('node:test');
const assert = require('node:assert');
const { execSync } = require('child_process');
const path = require('path');

const CLI_PATH = path.join(__dirname, '..', 'src', 'index.js');

describe('GitHub Copilot CLI', () => {
  describe('--version', () => {
    it('should display version information', () => {
      const output = execSync(`node ${CLI_PATH} --version`, { encoding: 'utf8' });
      assert.match(output, /GitHub Copilot CLI v\d+\.\d+\.\d+/);
    });
  });

  describe('--help', () => {
    it('should display help information', () => {
      const output = execSync(`node ${CLI_PATH} --help`, { encoding: 'utf8' });
      assert.ok(output.includes('Usage: copilot [options] [command]'));
      assert.ok(output.includes('--help'));
      assert.ok(output.includes('--version'));
    });
  });

  describe('-v shorthand', () => {
    it('should display version with -v flag', () => {
      const output = execSync(`node ${CLI_PATH} -v`, { encoding: 'utf8' });
      assert.match(output, /GitHub Copilot CLI v\d+\.\d+\.\d+/);
    });
  });

  describe('-h shorthand', () => {
    it('should display help with -h flag', () => {
      const output = execSync(`node ${CLI_PATH} -h`, { encoding: 'utf8' });
      assert.ok(output.includes('Usage: copilot [options] [command]'));
    });
  });

  describe('--banner', () => {
    it('should display banner when --banner flag is used', () => {
      const output = execSync(`node ${CLI_PATH} --banner`, { encoding: 'utf8' });
      assert.ok(output.includes('GitHub Copilot CLI'));
      assert.ok(output.includes('AI-powered coding assistance'));
    });

    it('should not display help when only --banner flag is used', () => {
      const output = execSync(`node ${CLI_PATH} --banner`, { encoding: 'utf8' });
      assert.ok(!output.includes('Usage: copilot [options] [command]'));
    });
  });

  describe('no arguments', () => {
    it('should display help when no arguments are provided', () => {
      const output = execSync(`node ${CLI_PATH}`, { encoding: 'utf8' });
      assert.ok(output.includes('Usage: copilot [options] [command]'));
    });
  });
});
