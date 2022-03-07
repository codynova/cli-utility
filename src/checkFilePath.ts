const fs = require('fs')
const chalk = require('chalk')

export const checkFilePath = (filePath: string) => {
	if (!fs.existsSync(filePath)) return
	if (fs.lstatSync(filePath).isDirectory()) {
		const files = fs.readdirSync(filePath)
		if (!files.length) return
		console.log(
			chalk.red(
				`ERROR: Non-empty directory already exists at file path ${filePath}`
			)
		)
		process.exit(1)
	} else {
		console.log(
			chalk.red(`ERROR: File already exists at file path ${filePath}`)
		)
		process.exit(1)
	}
}
