import { spawnSync } from 'child_process'
import semver from 'semver'

export const checkPackageVersion = (packageName: string) => {
	const childProcess1 = spawnSync(
		'npm',
		`view ${packageName}@latest version`.split(' '),
		{ shell: true, cwd: process.cwd() }
	)

	const latestVersion: string = childProcess1.stdout.toString().slice(0, -1)

	if (childProcess1.status !== 0 || !semver.valid(latestVersion))
		throw Error(
			`Failed to determine latest version of package "${packageName}"`
		)

	const childProcess2 = spawnSync(
		'npm',
		`list ${packageName} --depth=0`.split(' '),
		{
			shell: true,
			cwd: process.cwd(),
		}
	)

	const npmListStr = childProcess2.stdout.toString()
	const isInstalled = !npmListStr.includes('(empty)')
	const pkgNameIndex = npmListStr.indexOf(packageName)
	const installedVersion = isInstalled
		? npmListStr.slice(pkgNameIndex + packageName.length + 1, -2)
		: null

	if (isInstalled && !semver.valid(installedVersion))
		throw Error(
			`Failed to determine installed version of package "${packageName}"`
		)

	const versionDiff = semver.rcompare(
		installedVersion || '0.0.0',
		latestVersion
	)

	return {
		installedVersion,
		latestVersion,
		isInstalled,
		isLatest: versionDiff === 0,
		isOutdated: versionDiff === 1,
		isExperimental: versionDiff === -1,
	}
}
