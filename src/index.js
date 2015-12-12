export default function ({types: t, template}) {
  const buildRequire = template(`var IMPORT_NAME = require(SOURCE);`);
  const buildExport = template(`module.exports = PACKAGE;`);
  //const buildClass = template(`class CLASSNAME extends PARENT { BODY }`);
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

        //var [{name:parent}, objectMethods, classMethods] = temp3.node.declarations[0].init.arguments;

        var className = path.node.declarations[0].id.name;
        path.insertAfter(buildExport({
          PACKAGE: t.identifier(className)
        }));
        
        //path.insertAfter(buildClass({
        //  CLASSNAME : t.identifier(className),
        //  PARENT : t.identifier(parent),
        //  BODY: t.identifier('s(){}')
        //}))

        changed = true;
      },
    }
  };
}
