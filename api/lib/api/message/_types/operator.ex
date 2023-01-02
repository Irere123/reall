import EctoEnum

defenum(
  Api.Message.Types.Operator,
  [
    # user commands and casts: 0..63

    # room commands and casts: 64..127

    # chat commands and casts: 128..191

    # auth and maintenance commands 192..254

    # etc 255 - 317
    {BrothTest.MessageTest.TestOperator, 255}
  ]
)
