package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewScheduleEntityFunc func(client *LmSmsSDK, entopts map[string]any) LmSmsEntity

var NewSendMessageEntityFunc func(client *LmSmsSDK, entopts map[string]any) LmSmsEntity

