import { spawnSync } from 'child_process'

export const installDependenciesNpm = () => {
	const { status } = spawnSync('npm', ['install'], {
		shell: true,
		cwd: process.cwd(),
		stdio: 'inherit',
	})

	if (status !== 0) throw Error('Failed to install dependencies with npm')
}
