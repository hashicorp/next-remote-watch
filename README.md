# Next Remote Watch

This script replaces `next dev` with a version that adds a couple extra features:

- The ability to watch a folder that is not within your next.js project for file changes and reload when they are detected.
- It exposes a special route, `/__next_reload`, which will trigger a reload when you hit it with any request. You can also `POST` data to this route which will be displayed in the application logs in the terminal.

The best way to implement is is to use it as an alias for whatever npm script you used to run `next dev` before. For example, you might run it like this in your `package.json`:

```diff
// ...
"scripts": {
-  "start": "next dev"
+  "start": "next-remote-watch"
}
```

### Important Warnings and Caveats

This package utilizes undocumented APIs from next.js that are not subject to semantic versioning. This means that any version bump to next.js, major, minor, or patch, could cause it to break without warning. If you decide to adopt this package, _you should lock your next.js version to patch_, and be careful when upgrading.

It's also important to note that this package can only be used to replace the development server and should under no circumstances be used in production. There is no reason that its functionality would be necessary in production anyway 😀

### Why Would I Want This?

This script is very useful when you are loading data in `getStaticProps` or `getStaticPaths`, and you would like for your application to reload when that data changes.

For example, if you are pulling markdown content from a different repository, you can use this script to watch that repository for changes, then when you change your nextjs files, or any of the content files in the other repository, you get an automatic page reload.

As another example, if you are pulling content from a database of any sort, you could set up a script that triggers a reload when there are changes to your data, this way you can change your database and see an automatic page reload. You could also log any information about data changes to the terminal so it's clear what changed or why the reload was triggered.

It's a small, simple utility but offers a really nice developer experience when working with a nextjs app where the content is split out from the presentation, but you could have people working on either one -- with this script the app produces the same great local dev experience with hot reloads whether the code or the data has changed.

### Configuration

If you'd like to pass in a filepath to be watched, it can be passed directly to the command as such:

```js
// ...
"scripts": {
  "start": "next-remote-watch ../some-other-folder/foo"
}
```

You can [use globs](https://github.com/micromatch/picomatch), or pass in multiple, space-separated paths to be watched as well.

### Optional Flags

| Option      | Shorthand | Example                      | Description                                                                                                                                                                                                                                     | Default         |
| ----------- | --------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `--root`    | `-r`      | `--root ./src`               | Path to Nextjs project                                                                                                                                                                                                                          | `process.cwd()` |
| `--event`   | `-e`      | `--event add`                | Specific event to listen for (`add`, `addDir`, `change`, `unlink`, `unlinkDir`                                                                                                                                                                  | `change`        |
| `--script`  | `-s`      | `--script ./scripts/sync.js` | Node script to be called on `event`. The file should export a function that accepts two arguments (`path`, `event`).                                                                                                                            |
| `--polling` | `-p`      | `-p`                         | Whether to use `usePolling` option in chokidar, typically necessary to successfully watch files over a network; for details on performance impact and use cases see [chokidar documentation](https://github.com/paulmillr/chokidar#performance) | `false`         |

### The Magic Reload URL

If you want changes to be triggered by something other than filesystem events, just send any request to the `__next_reload` route and it will hot reload. If you `POST` json data to the route in the following format, it will reflect some information into the app logs that display in the terminal.

```js
{
  message: "Here's a test message!",
  color: "red / green / yellow / blue / magenta / cyan / gray / black / white" // optional
}
```

...that's it!
