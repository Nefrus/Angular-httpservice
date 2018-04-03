import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable()
export class HttpService {

  /*头部*/
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  /*根目录*/
  private rootPath = '';

  constructor(private httpClient: HttpClient) {
  }

  /**
   * get请求
   * @param url 接口地址
   * @param params 参数
   * @returns {Promise<R>|Promise<U>}
   */
  public get(url: string): any {
    return this.httpClient.get(this.rootPath + url, {headers: this.headers, observe: 'response'}).toPromise()
      .then(this.handleSuccess)
      .catch(res => this.handleError(res));
  }

  /**
   * post请求
   * @param url 接口地址
   * @param params 参数
   * @returns {Promise<R>|Promise<U>}
   */
  public post(url: string, params: any): any {
    return this.httpClient.post(this.rootPath + url, params, {headers: this.headers, observe: 'response'})
      .toPromise().then(this.handleSuccess).catch(res => this.handleError(res));
  }

  /**
   * 处理请求成功
   * @param res
   * @returns {{data: (string|null|((node:any)=>any)
 */
  private handleSuccess(res: any) {
    const _body = res['body'];
    if (_body) {
      return {
        data: res.body.returnObject,
        page: res.body.page,
        statusText: res.body.statusText,
        status: res.body.status,
        token: res.headers.get('token'),
        success: true
      };
    } else {
      return {
        data: {},
        statusText: res.body.statusText,
        status: res.body.status,
        success: true
      };
    }
  }

  /**
   * 处理请求错误
   * @param error
   * @returns {void|Promise<string>|Promise<T>|any}
   */
  private handleError(error) {
    console.log(error);
    const msg = '请求失败';
    if (error.status === 400) {
      console.log('请求参数正确');
    }
    if (error.status === 404) {
      console.error('请检查路径是否正确');
    }
    if (error.status === 500) {
      console.error('请求的服务器错误');
    }
    console.log(error);
    return {
      success: false,
      msg: msg
    };
  }
}
