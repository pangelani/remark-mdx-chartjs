const path = require("path");
const fs = require("fs");
const toVFile = require("to-vfile");
const chartjs = require("../lib/");
const { sync } = require("@mdx-js/mdx");

const fixturesDir = path.join(__dirname, "/fixtures");

function testUseCase(useCase, options, expectCallback) {
  const srcFile = `${fixturesDir}/${useCase}.md`;
  const expectedFile = `${fixturesDir}/${useCase}.expected.jsx`;
  const vfile = toVFile.readSync(srcFile);
  const expectedResult = fs.readFileSync(expectedFile).toString();

  const result = sync(vfile, {
    remarkPlugins: [options ? [chartjs, options] : chartjs],
    jsx: true
  });

  expectCallback(result, expectedResult);

  return vfile;
}

describe("remark-chartjs", () => {
  it("can handle code blocks without options", () => {
    testUseCase(
      "code-block-without-options",
      undefined,
      function (result, expectedResult) {
        expect(result).toEqual(expectedResult);
      }
    );
  });

  it("can handle code blocks with options", () => {
    testUseCase(
      "code-block-with-options",
      {
        chartJs: {
          options: {
            plugins: { legend: { position: "top" } },
            responsive: false
          },
          updateMode: "none"
        }
      },
      function (result, expectedResult) {
        expect(result).toEqual(expectedResult);
      }
    );
  });

  it("can handle code blocks with options override", () => {
    testUseCase(
      "code-block-with-options-override",
      {
        chartJs: {
          options: {
            plugins: { legend: { position: "top" } },
            responsive: false
          },
          datasetIdKey: "key",
          redraw: false
        }
      },
      function (result, expectedResult) {
        expect(result).toEqual(expectedResult);
      }
    );
  });

  it("can handle code blocks with specific imports", () => {
    testUseCase(
      "code-block-with-imports",
      {
        imports: {
          BarController: true,
          CategoryScale: true,
          LinearScale: true,
          BarElement: true,
          Colors: true,
          Legend: true,
          Title: true
        }
      },
      function (result, expectedResult) {
        expect(result).toEqual(expectedResult);
      }
    );
  });
});
