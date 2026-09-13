export interface Schedule {
    id?: string;
    messageId?: string;
    recipient?: string;
    scheduledAtDate?: string;
    sendAtDate?: string;
    tag?: string;
}
export interface ScheduleLoadMatch {
    id: string;
}
export interface ScheduleListMatch {
    end?: string;
    page?: number;
    size?: number;
    sort?: any[];
    start?: string;
    tag?: string;
}
export interface ScheduleUpdateData {
    id: string;
    messageId?: string;
    recipient?: string;
    scheduledAtDate?: string;
    sendAtDate?: string;
    tag?: string;
}
export interface ScheduleRemoveMatch {
    message_id?: string;
    tag?: string;
}
export interface SendMessage {
}
export interface SendMessageCreateData {
}
