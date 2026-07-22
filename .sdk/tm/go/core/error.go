package core

type LmSmsError struct {
	IsLmSmsError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewLmSmsError(code string, msg string, ctx *Context) *LmSmsError {
	return &LmSmsError{
		IsLmSmsError: true,
		Sdk:              "LmSms",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *LmSmsError) Error() string {
	return e.Msg
}
