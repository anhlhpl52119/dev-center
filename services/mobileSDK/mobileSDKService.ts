/* eslint-disable no-useless-call */
export interface ObjectType {
    [key: string]: any;
}

export interface JSBridgeModel {
    invoke: (action: string, params: any, cb: any) => void;
    callback: (callbackId: string, error: any, data: any) => void;
}

export interface MobileSDKResultModel {
    key: string;
    value: {
        [key: string]: any;
    };
}

export interface MobileSDKServiceModel {
    initializeJSBridge: () => void;
    stoveJSBridge: JSBridgeModel;
    authenticateForMobileSdk: () => Promise<MobileSDKResultModel>;
}

/**
 * The function helps to create a bridge between seed core and mobile sdk
 */
export const MobileSDKService = (): MobileSDKServiceModel => {
  const _callbacks: ObjectType = {};

  /**
     * This function is used to call
     * @param {string} action
     * @param {any} params
     * @param {cb} any
     */
  const invoke = (action: string, params: any, cb: any) => {
    let callbackId;

    if (typeof params === 'function') {
      cb = params;
      params = null;
    }

    if (cb) {
      callbackId = generateId();
      _callbacks[callbackId] = cb;
    }

    if (window._StoveJSBridge) {
      window._StoveJSBridge.invoke(action, params, callbackId);
    } else if (window.webkit) {
      window.webkit.messageHandlers.StoveJS.postMessage({
        method: action,
        parameter: params,
        callbackId
      });
    }
  };

  /**
     * This function is used to receive return values
     * @param {string} action
     * @param {any} params
     * @param {cb} any
     */
  const callback = (callbackId: string, error: any, data: any): void => {
    const cb = _callbacks[callbackId];
    if (!cb) {
      throw new Error(`[ID: ${callbackId}] callback is not found`);
    }
    delete _callbacks[callbackId];
    cb.call(null, error, data);
  };

  /**
     * This function is used to call
     */
  const generateId = (): string => {
    const hexString = Math.floor(Math.random() * 16).toString(16);
    const date = Date.now();
    const id = `cb${hexString}${date}`;

    if (_callbacks[id]) {
      return generateId();
    }
    return id;
  };

  /**
     * This is bridge object
     */
  const stoveJSBridge: JSBridgeModel = {
    invoke,
    callback
  };

  /**
     * This function jsBridge initialize
     */
  const initializeJSBridge = async (): Promise<void> => {
    window.StoveJSBridge = stoveJSBridge;
  };

  /**
     * Function used to check authentication for mobile sdk
     */
  const authenticateForMobileSdk = (): Promise<MobileSDKResultModel> => {
    return new Promise(
      (resolve: (result: MobileSDKResultModel) => void, reject: (result: any) => void) => {
        window.StoveJSBridge.invoke('getStoveValue', 'access_token', (error: any, data: any) => {
          if (data) {
            const resultJSON = data ? JSON.parse(data) : ({} as MobileSDKResultModel);
            resolve(resultJSON);
          } else {
            console.error('getStoveValue get token fail...');
            reject(error);
          }
        });
      }
    );
  };

  return {
    stoveJSBridge,
    initializeJSBridge,
    authenticateForMobileSdk
  };
};
