<h3 align="center">
  <br>
  <img width="400" src="https://cdn.rawgit.com/brandon93s/kmder/afbd26a6/media/logo.svg" alt="kmder" />
  <br>
    <br>
</h3>

# kmder [![Build Status](https://travis-ci.org/brandon93s/kmder.svg?branch=master)](https://travis-ci.org/brandon93s/kmder)

> Kmder is a CLI runner that aims to make writing, executing and distributing CLI commands a breeze. :palm_tree:

## Features

* ✏️ **Simple**, often declarative command definitions
* 📦 **Out of the box support** for HTTP, SQL, Elasticsearch and more
* 😍 **Build shareable commands** - easily distribute directly or in a repo
* 📡 **Built-in reporting** - log your CLI output as a table, pretty-json, etc

## Install

Install with yarn:

```shell
yarn global add kmder
```

or with npm:

```shell
npm install kmder --global
```

## CLI Usage
```shell
> kmd help
  <kmd> <..args>     Execute kmd
  ls                 List available kmd(s)
  help               Display help
  source             Manage kmd sources
  version            List kmd version
  reset              Reset sources and settings
```

## Examples

Browse [kmder-kmds](https://github.com/brandon93s/kmder-kmds) for additional command examples.

<details><summary>🌎 HTTP / API</summary>
<p>

The following defines the declarative `fx` command which retrieves current exchange rates for the given currencies:

```json
// fx.json
{
    "type": "http",
    "url": "https://api.fixer.io/latest?base={0}&symbols={1}",
    "jp": "$.rates.{1}"
}
```

```sh
> kmd fx USD GPB
0.73792
```

</p>
</details>
<br />
<details><summary>🐬 MySQL</summary>
<p>

```json
// user.json
{
  "type": "mysql",
  "connection": {
    "host": "db.example.com",
    "user": "kmdertest",
    "password": "kmder-test",
    "database": "kmdertest"
  },
  "query": "SELECT user_name, first, last FROM `users` WHERE `user_name` LIKE '%{0}%'"
}
```

```shell
> kmd user bsmith
----------------------------
user_name | first   | last |
----------------------------
bsmith    | Brandon | Smith
```

</p>
</details>
<br />
<details><summary>📐 Custom</summary>
<p>

The following defines the `max` command which returns the maximum value passed to the command. This example shows that a command can be custom, arbitrary JavaScript:

```js
// max.js
module.exports.run = (args) => {
  return Math.max(...args)
}
```

```sh
> kmd max -5 5 9 99 -99
99
```
</p>
</details>

## Documentation

Browse the [wiki](https://github.com/brandon93s/kmder/wiki) for full documentation:

- Managing command sources (folders, repositories, etc)
- Available strategies (http, mysql, mssql, es, etc) and their options
- Command definitions (method hooks, types, dependencies)
- Persistent data storage for commands
- And more!

## License

MIT © [Brandon Smith](https://github.com/brandon93s)
