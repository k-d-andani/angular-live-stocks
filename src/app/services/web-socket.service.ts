import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { fromBinary } from "@bufbuild/protobuf";
import { yatickerSchema } from '../../assets/proto/gen/YPricingData_pb';
import { Buffer } from 'buffer';

/**
 * Web socket service
 */
@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private readonly _wssURL: string = 'wss://streamer.finance.yahoo.com';

  public webSocket$!: WebSocketSubject<any>;

  constructor() {}

  /**
   * Connect to WS api
   */
  public connect(): void {

    this.webSocket$ = webSocket({
      url: this._wssURL,
      deserializer: (responseData) => this.deserializeResponseData(responseData)
    });
  }

  /**
   * Deserialize data
   * @param responseData - Response data
   * @returns - Deserialized data
   */
  public deserializeResponseData(responseData: any): any {
    const bufferedData = Buffer.from(responseData.data, 'base64');
    
    return fromBinary(yatickerSchema, bufferedData);
  }
}
