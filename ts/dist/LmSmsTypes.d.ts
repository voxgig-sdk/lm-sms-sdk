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
    id?: string;
    messageId?: string;
    recipient?: string;
    scheduledAtDate?: string;
    sendAtDate?: string;
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
    id: string;
    messageId?: string;
    recipient?: string;
    scheduledAtDate?: string;
    sendAtDate?: string;
    tag?: string;
}
export interface SendMessage {
}
export interface SendMessageCreateData {
}
