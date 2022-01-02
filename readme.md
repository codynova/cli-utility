# @novas/cli-utility

NodeJS utilities and boilerplate for creating CLIs

## Installation

```sh
yarn add @novas/cli-utility got tar semver commander fast-fuzzy inquirer inquirer-autocomplete-prompt
```

## Functions

Modules are exported as both ESM and CJS

-   `checkPackageVersion` - Takes a package name and returns an object with metadata about the currently installed and latest published versions of the package.

```js
const {
	installedVersion,
	latestVersion,
	isInstalled,
	isLatest,
	isOutdated,
	isExperimental,
} = checkPackageVersion('create-next-app')
```

-   `downloadAndExtractGithub` - Takes a Github tree or blob URL including branch name and downloads and extracts the .tar.gz file to the cwd.

```js
try {
	await downloadAndExtractGithub(
		'https://github.com/codynova/eslint-config/tree/master'
	)
	console.log('success!')
} catch (error) {
	console.log(error)
}
```

-   `installDependenciesNpm` and `installDependenciesYarn` - Attempts to install dependencies with NPM or Yarn in the cwd.

```js
try {
	installDependenciesYarn()
	console.log('success!')
} catch (error) {
	console.log(error)
}
```

## Prior Art

-   [create-next-app](https://github.com/vercel/next.js/tree/master/packages/create-next-app)
