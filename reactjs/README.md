# Hodfords ENV React Devtools

<p align="center">
  <a href="http://opensource.hodfords.uk" target="blank"><img src="https://opensource.hodfords.uk/img/logo.svg" width="320" alt="Hodfords Logo" /></a>
</p>

<p align="center"> <b>env-react-devtools</b> help for developers change ENV config DEV Enviroment for debug any issues.</p>

## Installation 🤖

* Install [PNPM](https://pnpm.io/) latest version
* Install Nodejs >= 20 ( Should be use [NVM](https://github.com/nvm-sh/nvm) for install NodeJS )

* With NPM:
```
npm install @hodfords/env-react-devtools --save
```

* with PNPM:
```
pnpm install @hodfords/env-react-devtools
```

## Usage 🚀

* First step, config project env and routes for project you want.

```
import EnvProvider from '@hodfords/env-react-devtools';

<EnvProvider
  env={import.meta.env}
  routes={routes}
/>
```
- `env`: Env data input form handle change for project
- `routes`: Current routes of your project config merge with route devtools

* Currently, you don't need to use RouterProvider because in this library are using, just need config router paths for EnvProvider.
* For first time, when you save env configs it's will save to localStorage with name `envVars`. So you can sync env configs via localStorage for your project.
* Access route path `/devtools` in your project after install package and finish setup.

## License 📝

This project is licensed under the MIT License
