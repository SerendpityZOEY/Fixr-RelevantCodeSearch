# protips
Output pro-tips for your dev tool

Every time the tool runs it will print to the console a pro tip, to increase users' awareness of bits of functionality they may have missed

## Usage

Create a `PROTIPS.md` file in the root of your module, which should contain
- A h1 at the begining, normally containing the module name
- Markdown for each tip, each separated by a `<hr>` (`* * *` or `- - -`). Acceptable markdown includes paragraphs, both levels of emphasis and code (inline or block) and line breaks

* For now there is no validation that the markdown file is of the correct structure *

Then:

`require('protips')('/path/to/markdown/file1.md')`

or

`require('protips')('/path/to/markdown/file1.md', '/path/to/markdown/file2.md')`

(When specifying paths to markdown files in other modules it's best to use `require.resolve()` to construct a robust path to it)

## Testing output

`require('protips').all('/path/to/markdown/file1.md')` will output all pro tips