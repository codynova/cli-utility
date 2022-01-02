import { spawnSync } from 'child_process'

export const installDependenciesYarn = () => {
	const { status } = spawnSync('yarn', [], {
		shell: true,
		cwd: process.cwd(),
		stdio: 'inherit',
	})

	if (status !== 0) throw Error('Failed to install dependencies with yarn')
}
