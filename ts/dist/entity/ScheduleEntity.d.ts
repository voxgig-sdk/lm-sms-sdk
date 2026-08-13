import { LmSmsEntityBase } from '../LmSmsEntityBase';
import type { LmSmsSDK } from '../LmSmsSDK';
import type { Control } from '../types';
import type { Schedule, ScheduleLoadMatch, ScheduleListMatch, ScheduleUpdateData, ScheduleRemoveMatch } from '../LmSmsTypes';
declare class ScheduleEntity extends LmSmsEntityBase<Schedule> {
    constructor(client: LmSmsSDK, entopts: any);
    make(this: ScheduleEntity): ScheduleEntity;
    load(this: any, reqmatch?: ScheduleLoadMatch, ctrl?: Control): Promise<Schedule>;
    list(this: any, reqmatch?: ScheduleListMatch, ctrl?: Control): Promise<Schedule[]>;
    update(this: any, reqdata?: ScheduleUpdateData, ctrl?: Control): Promise<Schedule>;
    remove(this: any, reqmatch?: ScheduleRemoveMatch, ctrl?: Control): Promise<Schedule>;
}
export { ScheduleEntity };
