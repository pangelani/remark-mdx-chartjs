/*@jsxRuntime automatic @jsxImportSource react*/
function _createMdxContent(props) {
  const _components = Object.assign({
    h1: "h1",
    pre: "pre",
    code: "code"
  }, props.components);
  return <><_components.h1>{"chartjs code block without options"}</_components.h1>{"\n"}<_components.pre><_components.code className="language-chartjs">{"type: bar\n"}</_components.code></_components.pre></>;
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? <MDXLayout {...props}><_createMdxContent {...props} /></MDXLayout> : _createMdxContent(props);
}
export default MDXContent;
