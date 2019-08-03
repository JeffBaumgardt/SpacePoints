module.exports = {
	extends: './node_modules/kcd-scripts/eslint.js',
	rules: {
		'import/extensions': [
			'error',
			{
				json: 'always',
				js: 'never',
				css: 'off',
				jpg: 'always',
				png: 'always',
				JPG: 'always',
			},
		],
		'react/prop-types': 'warn',
	},
}
