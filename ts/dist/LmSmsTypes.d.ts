export interface Schedule {
    message_id?: string;
    recipient?: string;
    scheduled_at_date?: string;
    send_at_date?: string;
    tag?: string;
}
export interface ScheduleLoadMatch {
    id: string;
}
export interface ScheduleListMatch {
    message_id?: string;
    recipient?: string;
    scheduled_at_date?: string;
    send_at_date?: string;
    tag?: string;
}
export interface ScheduleUpdateData {
    id: string;
}
export interface ScheduleRemoveMatch {
    message_id?: string;
    recipient?: string;
    scheduled_at_date?: string;
    send_at_date?: string;
    tag?: string;
}
export interface SendMessage {
}
export interface SendMessageCreateData {
}
