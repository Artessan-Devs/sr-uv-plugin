import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import fs from 'fs';
import path from 'path';
import { prepare, verifyConditions } from '../src/semantic-release-pyproject';

const pyprojectPath = path.resolve(process.cwd(), 'pyproject.toml');

const sampleToml = `
[project]
name = "hello-world"
version = "0.1.0"
description = "Add your description here"
readme = "README.md"
dependencies = []
`;

describe('semantic-release-pyproject', () => {
  let logger: any;

  beforeEach(() => {
    logger = { log: vi.fn(), error: vi.fn() };
  });

  afterEach(() => {
    if (fs.existsSync(pyprojectPath)) fs.unlinkSync(pyprojectPath);
  });

  describe('verifyConditions', () => {
    it('verifies pyproject.toml and [project] section', async () => {
      fs.writeFileSync(pyprojectPath, sampleToml);
      await expect(verifyConditions({}, { logger })).resolves.toBeUndefined();
      expect(logger.log).toHaveBeenCalledWith(
        'pyproject.toml and [project] section verified.'
      );
    });

    it('throws if pyproject.toml does not exist', async () => {
      if (fs.existsSync(pyprojectPath)) fs.unlinkSync(pyprojectPath);
      await expect(verifyConditions({}, { logger })).rejects.toThrow('pyproject.toml not found.');
      expect(logger.error).toHaveBeenCalledWith('pyproject.toml not found.');
    });

    it('throws if [project] section is missing', async () => {
      fs.writeFileSync(pyprojectPath, 'name = "hello-world"\nversion = "0.1.0"');
      await expect(verifyConditions({}, { logger })).rejects.toThrow('No [project] section in pyproject.toml');
      expect(logger.error).toHaveBeenCalledWith('No [project] section in pyproject.toml');
    });
  });

  describe('prepare', () => {
    beforeEach(() => {
      fs.writeFileSync(pyprojectPath, sampleToml);
    });

    it('updates the version in pyproject.toml', async () => {
      await prepare({}, { nextRelease: { version: '1.2.3' }, logger });
      const updated = fs.readFileSync(pyprojectPath, 'utf8');
      expect(updated).toContain('version = "1.2.3"');
      expect(logger.log).toHaveBeenCalledWith(
        expect.stringContaining('Updated pyproject.toml version to 1.2.3')
      );
    });
  });
});
