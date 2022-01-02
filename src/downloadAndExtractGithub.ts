import { Stream } from 'stream'
import { promisify } from 'util'
import got from 'got'
import tar from 'tar'
import path from 'path'
import { URL } from 'url'

export const downloadAndExtractGithub = (url: string) => {
	const [, username, repo, tree, branch, ...paths] = new URL(
		url
	).pathname.split('/')
	const filePath =
		paths.length === 0 || (paths.length === 1 && paths[0] === '')
			? ''
			: path.join(...paths)

	return promisify(Stream.pipeline)(
		got.stream(
			`https://codeload.github.com/${username}/${repo}/tar.gz/${branch}`
		),
		tar.extract({ strip: filePath ? filePath.split('/').length : 1 }, [
			`${repo}-${branch}${filePath ? `/${filePath}` : ''}`,
		])
	)
}
