import {AxiosResponse, InternalAxiosRequestConfig} from 'axios';

export function printRequestLog(config: InternalAxiosRequestConfig) {
  console.log('\n=====');
  console.log('%cRequest', 'color: blue; font-weight: bold;');
  console.log('Header: ', config.headers);
  console.log('Method: ', config.method);
  console.log('URL: ', config.url);
  console.log('Params: ', config.params);
  console.log('[Request Body]');
  console.log(prettyPrintJson(config.data));
  console.log('=====\n');
}

export function printResponseLog(response: AxiosResponse) {
  console.log('\n=====');
  console.log('%cResponse', 'color: blue; font-weight: bold;');
  console.log('URL: ', response.config.url);
  console.log('Header: ', response.config.headers);
  console.log('Method: ', response.config.method);
  console.log('Code: ', response.status);
  console.log('[Response Body]');
  console.log(prettyPrintJson(response.data));
  console.log('=====\n');
}

const prettyPrintJson = (json: any) => JSON.stringify(json, null, 2);
