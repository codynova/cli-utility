const inquirer = require('inquirer')
const autocomplete = require('inquirer-autocomplete-prompt')
const { Searcher } = require('fast-fuzzy')

inquirer.registerPrompt('autocomplete', autocomplete)

const exampleData = [
	{
		name: 'template1',
		description: 'The first template',
	},
	{
		name: 'template2',
		description: 'The second template',
	},
]

const exampleSearchData = exampleData.map((data) => ({
	...data,
	searchTerm: `${data.name} ${data.description}`,
}))

const fuzzySearch = new Searcher(exampleSearchData, {
	keySelector: (data) => data.searchTerm,
})

const search = (answers, input) => {
	input = input || ''
	const searchResults = input ? fuzzySearch.search(input) : exampleData
	return [
		new inquirer.Separator(' '),
		...searchResults.map(({ name, description }) => ({
			name: `${chalk.green(name)}\n  ${description}\n`,
			value: name,
		})),
	]
}

export const inquireTemplateName = () =>
	inquirer.prompt([
		{
			type: 'autocomplete',
			name: 'templateName',
			message: 'Which template do you want to use?',
			pageSize: 12,
			loop: false,
			prefix: ' ',
			emptyText: '\n  No results...',
			searchText: '\n ',
			source: search,
		},
	])
