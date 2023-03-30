import EctoEnum

alias Api.Message.Auth
alias Api.Message.User
alias Api.Message.Feed

defenum(
  Api.Message.Types.Operator,
  [
    # user commands and casts: 0..63
    {User.GetInfo, 0},
    {User.Search, 1},
    {User.Follow, 2},
    {User.Unfollow, 3},
    {User.GetFollowers, 4},
    {User.GetFollowing, 5},

    # feed commands and casts: 64..127
    {Feed.GetProfiles, 64},
    {Feed.View, 65},

    # chat commands and casts: 128..191

    # auth and maintenance commands 192..254
    {Auth.Request, 193},
    # etc 255 - 317
    {BrothTest.MessageTest.TestOperator, 255}
  ]
)
