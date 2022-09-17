module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                'module:react-native-dotenv',
                {
                    moduleName: '@env',
                    path: '.env',
                },
            ],
            [
                'module-resolver',
                {
                    alias: {
                        data: './src/data',
                        ui: './src/ui',
                        pages: './src/pages',
                        '@assets': './assets',
                        '@partials': './src/ui/partials',
                        '@styles': './src/ui/styles',
                    },
                },
            ],
        ],
    };
};
