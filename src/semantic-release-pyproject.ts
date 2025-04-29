import fs from 'fs';
import path from 'path';
import * as toml from '@iarna/toml';

// Semantic Release plugin: verifyConditions step
export async function verifyConditions(
  pluginConfig: any,
  context: { logger: any }
) {
  const pyprojectPath = path.resolve(process.cwd(), 'pyproject.toml');
  if (!fs.existsSync(pyprojectPath)) {
    context.logger.error('pyproject.toml not found.');
    throw new Error('pyproject.toml not found.');
  }
  const content = fs.readFileSync(pyprojectPath, 'utf8');
  let data: any;
  try {
    data = toml.parse(content);
  } catch (err) {
    context.logger.error('Failed to parse pyproject.toml:', err);
    throw new Error('Failed to parse pyproject.toml');
  }
  if (!data.project) {
    context.logger.error('No [project] section in pyproject.toml');
    throw new Error('No [project] section in pyproject.toml');
  }
  context.logger.log('pyproject.toml and [project] section verified.');
}

// Semantic Release plugin: prepare step
export async function prepare(
  pluginConfig: any,
  context: { nextRelease: { version: string }; logger: any }
) {
  const pyprojectPath = path.resolve(process.cwd(), 'pyproject.toml');
  // Assume verifyConditions already checked file and [project] section
  const content = fs.readFileSync(pyprojectPath, 'utf8');
  const data: any = toml.parse(content);
  data.project.version = context.nextRelease.version;
  const newContent = toml.stringify(data);
  fs.writeFileSync(pyprojectPath, newContent);
  context.logger.log(`Updated pyproject.toml version to ${context.nextRelease.version}`);
}