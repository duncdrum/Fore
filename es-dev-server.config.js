module.exports = {
    port: 8090,
    watch: true,
    nodeResolve: true,
    appIndex: 'demo/index.html',
    plugins: [
        {
            serve(context){
                // console.log('context path ', context);
                if (context.originalUrl == '/submission1'){
                    console.log('>>>> context ', context);
                    context.response.status = 200;
                    return {body:'<data></data>', type:'xml'};
                }
            }
        }
    ],
    moduleDirs: ['node_modules', 'web_modules'],
};