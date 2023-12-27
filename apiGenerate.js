const { writeFile, readFileSync, readdirSync, lstatSync } = require('fs');
const { join, resolve } = require('path');
const yamljs = require('yamljs');
const json2yaml = require('json2yaml');

const dirEndpointsName = join(__dirname, 'reference/endpoints');
const dirModelsName = join(__dirname, 'reference/models');

const apiYamlTargetFile = resolve('./reference/api.yaml');

require('dotenv').config();
const API_URL = process.env.VITE_APP_API_URL;

const api = {
  openapi: '3.1.0',
  'x-stoplight': {
    id: '63aiu5gx0sbnl',
  },
  info: {
    title: 'portal-dit-api',
    version: '1.0',
    summary: 'vcDitAPI',
    description: 'API документация ВЦ ДИТ',
    contact: {
      name: 'Ruslan Timurziyev',
      email: 'Ruslan.Timurziev@innostage-group.ru',
    },
  },
  servers: [
    {
      url: API_URL,
    },
  ],
  paths: {},
  components: {
    schemas: {},
    parameters: {},
    securitySchemes: {
      login: {
        type: 'http',
        scheme: 'basic',
        description: 'Базовая авторизация через битрикс. Нужна специальная доработка.',
      },
    },
    requestBodies: {},
    security: [
      {
        login: [],
      },
    ],
  },
};

let endpoints = readdirSync(dirEndpointsName);
let models = readdirSync(dirModelsName);

let pathsToReplace = [];
const schemasPath = '#/components/schemas/';

const buildComponentSchemas = () => {
  const stack = models.map((model) => ({ name: dirModelsName, file: model }));

  while (stack.length) {
    const file = stack.pop();

    if (lstatSync(file.name).isDirectory()) {
      pathsToReplace.push(file.name);
      stack.push(...readdirSync(file.name).map((model) => ({ name: file.name + '\\' + model, file: model })));
    } else {
      const data = readFileSync(file.name, 'utf8');
      const field = file.file.replace('.yaml', '');
      api.components.schemas[field] = JSON.parse(JSON.stringify(yamljs.parse(data)));
    }
  }
};
buildComponentSchemas();

const replaceNestedModelLinks = (objStr) => {
  pathsToReplace.forEach((path) => {
    path = path.replace(dirModelsName + '\\', schemasPath) + '/';
    objStr = objStr.replaceAll(path, schemasPath);
  });
  return objStr;
};

endpoints.forEach((file) => {
  let data = yamljs.parse(readFileSync(dirEndpointsName + '\\' + file, 'utf8'));
  for (let item in data.paths) {
    api.paths[item] = data.paths[item];
  }
});

api.paths = JSON.parse(
  replaceNestedModelLinks(JSON.stringify(api.paths).replaceAll('../models/', schemasPath).replaceAll('.yaml', ''))
);

let preparedApi = json2yaml.stringify(api);

[
  200, 201, 202, 203, 204, 205, 206, 300, 301, 302, 303, 304, 305, 307, 308, 400, 401, 402, 403, 404, 405, 406, 407,
  408, 409, 410, 411, 412, 413, 414, 415, 422, 428, 429, 431, 444, 451, 500, 501, 502, 503, 504, 505, 510,
].forEach((status) => {
  preparedApi = preparedApi
    .replaceAll(` ${status}:`, ` "${status}":`)
    .replaceAll('$ref: "./', `$ref: "${schemasPath}`)
    .replaceAll('.yaml', '');
});

writeFile(apiYamlTargetFile, preparedApi, (error) => {
  // eslint-disable-next-line no-console
  console.info(`Файл с API готов!`);
  // eslint-disable-next-line no-console
  console.info(`Расположение: ${apiYamlTargetFile}`);
  if (error) {
    throw error;
  }
});
