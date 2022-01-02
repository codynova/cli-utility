#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const chalk = require('chalk')
const { program } = require('commander')

const pkg = require('../package.json')

const {
	checkPackageVersion,
	downloadAndExtractGithub,
	installDependenciesYarn,
	installDependenciesNpm,
} = require('@novas/cli-utility')

const { inquireTemplateName } = require('./autocompletePrompt')

console.log(chalk.cyan(`${pkg.name}@${pkg.version}`))

program
	.name('npx @novas/cli-utility-example')
	.argument('<project-name>', 'New project name')
	.option('-t, --template <name>', 'Template name to use')
	.parse(process.argv)

const projectName = program.args[0]
const projectPath = path.join(process.cwd(), projectName)

const options = program.opts()
let templateName = options.template

const main = async () => {
	// Prompt to select template name with autocomplete if necessary
	if (!templateName) {
		templateName = (await inquireTemplateName()).templateName
	}

	// Validate create-next-app installed and latest package versions
	const packageVersionResults = checkPackageVersion('create-next-app')

	if (packageVersionResults.isInstalled) {
		console.log('create-next-app is installed')
	}

	// Download and extract github repo into new folder "test"
	const testPath = path.join(process.cwd(), 'test')
	fs.mkdirSync(testPath)
	process.chdir(testPath)
	downloadAndExtractGithub(
		'https://github.com/codynova/eslint-config/tree/master'
	)

	// Install dependencies in cwd
	try {
		installDependenciesYarn()
	} catch (error) {
		try {
			console.log(
				'Failed to install dependencies with Yarn, falling back to NPM'
			)
			installDependenciesNpm()
		} catch (error) {
			console.log('Failed to install dependencies with NPM')
		}
	}
}

main()
