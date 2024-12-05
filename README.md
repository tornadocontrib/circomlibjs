# Fork

This is a fork of the version of circomlibjs that is used in the Tornado Classic UI.  The changes here only seek to remove as many dependencies as possible, and make the project bundlable with a simple bundler like `esbuild`.  A Dockerfile is included to facilitate deterministic builds of the generated `build/bundle.mjs` file.  You can generate and extract the bundle file by doing:
```
docker image build --tag temp_image .
docker container create --tag temp_container temp_image
docker container temp_container:/workspace/build/bundle.mjs bundle.mjs
docker container rm temp_container
docker image rm temp_image
```

The full set of changes between what Tornado Classic UI uses and this can be seen at https://github.com/iden3/circomlibjs/compare/v0.1.2...MicahZoltu:circomlibjs:main, and details about each change can be seen in the commit messages.  Note: This was forked off of a more recent version of circomlibjs, if you want to see only the changes between the latest version of circomlibjs and this then see https://github.com/iden3/circomlibjs/compare/bfa4ce13661e747e82ed74d1114659e354c1b60b...MicahZoltu:circomlibjs:main

Everything below in this Readme is from the original repository.


# circomlibjs

`circomlibjs` is a Javascript library that provides programs to compute the witness of several circuits of `circomlib`.
This library is used to make tests of circomlib circuits.

In the `src` directory the package includes these programs.

In the `test` directory includes its own tests and.

In the `tools` directory includes programs to precompute some needed parameters.

You can install `circomlibjs` with the following command:

```text
npm install -g circomlibjs
```