import { LmSmsEntityBase } from '../LmSmsEntityBase';
import type { LmSmsSDK } from '../LmSmsSDK';
import type { Control } from '../types';
import type { SendMessage, SendMessageCreateData } from '../LmSmsTypes';
declare class SendMessageEntity extends LmSmsEntityBase<SendMessage> {
    constructor(client: LmSmsSDK, entopts: any);
    make(this: SendMessageEntity): SendMessageEntity;
    create(this: any, reqdata?: SendMessageCreateData, ctrl?: Control): Promise<SendMessage>;
}
export { SendMessageEntity };
