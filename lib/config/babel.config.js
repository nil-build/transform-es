module.exports = function ({ plugins, presets, ...reset }) {
	presets = [
		[
			require.resolve("babel-preset-packez"),
			{
				...reset,
			},
		],
		...presets,
	].filter(Boolean);

	return {
		configFile: false,
		babelrc: false,
		compact: false,
		presets: presets,
		plugins: [...plugins].filter(Boolean),
	};
};
