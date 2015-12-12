export default function ({types: t, template}) {
  const buildRequire = template(`var IMPORT_NAME = require(SOURCE);`);
  var changed = false;
  return {
    visitor: {
      VariableDeclaration(path, plugins) {
        if (changed || path.parent.type !== 'Program') return;
        Object.keys(plugins.file.scope.globals).forEach(function(i){
          path.insertBefore(buildRequire({
            IMPORT_NAME: t.identifier(i),
            SOURCE: t.stringLiteral(i)
          }));
        });
        changed = true;
      },
    }
  };
}
