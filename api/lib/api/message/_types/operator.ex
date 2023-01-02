import EctoEnum

alias Api.Message.Auth
alias Api.Message.User

defenum(
  Api.Message.Types.Operator,
  [
    # user commands and casts: 0..63
    {User.GetInfo, 1},
    {User.Search, 2},

    # room commands and casts: 64..127

    # chat commands and casts: 128..191

    # auth and maintenance commands 192..254
    {Auth.Request, 193},
    # etc 255 - 317
    {BrothTest.MessageTest.TestOperator, 255}
  ]
)
