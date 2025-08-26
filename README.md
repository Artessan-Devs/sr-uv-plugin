# semantic-release-pyproject

A [semantic-release](https://semantic-release.gitbook.io/semantic-release/) plugin to automatically update the version in your Python `pyproject.toml` file during release.

## Installation

Install the plugin from npm:

```bash
npm install --save-dev @artessan-devs/sr-uv-plugin
```

## Usage

1. **Add the plugin to your semantic-release configuration**

Update your `.releaserc.json` to include the plugin:

```json
{
  "branches": [
    "main",
    { "name": "dev", "prerelease": true }
  ],
  "plugins": [
    "@artessan-devs/sr-uv-plugin",
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/npm",
    [
      "@semantic-release/git",
      {
        "assets": ["pyproject.toml", "CHANGELOG.md"]
      }
    ]
  ]
}
```

2. **Commit the updated `pyproject.toml` file**

When the plugin updates the `pyproject.toml` file during the release process, it will automatically commit the changes to your repository. The `@semantic-release/git` plugin ensures that the updated `pyproject.toml` and other specified assets (e.g., `CHANGELOG.md`) are committed.

## What it does

- **verifyConditions**: Ensures `pyproject.toml` exists and contains a `[project]` section.
- **prepare**: Updates the `[project].version` field in `pyproject.toml` to match the release version.

## Development & Testing

- Tests are located in `test/semantic-release-pyproject.test.ts` and use [vitest](https://vitest.dev/).
- Run tests with:

```bash
npm test
```

## License

MIT
