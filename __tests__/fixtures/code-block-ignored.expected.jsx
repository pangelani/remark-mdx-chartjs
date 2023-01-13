/*@jsxRuntime automatic @jsxImportSource react*/
function _createMdxContent(props) {
  const _components = Object.assign({
    h1: "h1",
    pre: "pre",
    code: "code"
  }, props.components);
  return <><_components.h1>{"chartjs code block without options"}</_components.h1>{"\n"}<_components.pre><_components.code className="language-somethingelse">{"type: bar\ndata:\n  labels: [\"January\", \"February\", \"March\", \"April\", \"May\", \"June\", \"July\"]\n  datasets:\n    - label: \"Dataset 1\"\n      data: [0,2,6,1,7,13,2]\n      backgroundColor: \"rgba(255, 99, 132, 0.5)\"\n\n    - label: \"Dataset 2\"\n      data: [4,2,11,8,6,1,4]\n      backgroundColor: \"rgba(53, 162, 235, 0.5)\"\n"}</_components.code></_components.pre></>;
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? <MDXLayout {...props}><_createMdxContent {...props} /></MDXLayout> : _createMdxContent(props);
}
export default MDXContent;
