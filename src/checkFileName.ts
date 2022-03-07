const path = require('path')
const chalk = require('chalk')

export const checkFileName = (fileName: string) => {
	if (!fileName) {
		console.log(chalk.red(`ERROR: Must provide a file name`))
		process.exit(1)
	}

	if (fileName !== path.basename(fileName)) {
		console.log(
			chalk.red(
				`ERROR: File name cannot be a path, it must be a path.basename`
			)
		)
		process.exit(1)
	}
}
