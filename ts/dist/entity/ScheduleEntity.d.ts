import { LmSmsEntityBase } from '../LmSmsEntityBase';
import type { LmSmsSDK } from '../LmSmsSDK';
import type { Control } from '../types';
import type { Schedule, ScheduleLoadMatch, ScheduleListMatch, ScheduleUpdateData, ScheduleRemoveMatch } from '../LmSmsTypes';
declare class ScheduleEntity extends LmSmsEntityBase<Schedule> {
    constructor(client: LmSmsSDK, entopts: any);
    make(this: ScheduleEntity): ScheduleEntity;
    load(this: any, reqmatch?: ScheduleLoadMatch, ctrl?: Control): Promise<ScheduleEntity>;
    list(this: any, reqmatch?: ScheduleListMatch, ctrl?: Control): Promise<ScheduleEntity[]>;
    update(this: any, reqdata?: ScheduleUpdateData, ctrl?: Control): Promise<ScheduleEntity>;
    remove(this: any, reqmatch?: ScheduleRemoveMatch, ctrl?: Control): Promise<ScheduleEntity>;
}
export { ScheduleEntity };
