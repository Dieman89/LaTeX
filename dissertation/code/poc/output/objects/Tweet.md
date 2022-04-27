--- id:
Tweet
title:
Tweet
hide_title: true --- #Tweet

  This is a Tweet type
```
type Tweet {
  """Description of id."""
  id: ID!
  """Description of body."""
  body: String
  """Description of date."""
  date: Date
  """Description of Author."""
  Author: User
  """Description of Stats."""
  Stats: Stat
}
```
  ## Fields
    `id`([`ID!`](/references/scalars/id))
    `body`([`String`](/references/scalars/string))
    `date`([`Date`](/references/scalars/date))
    `Author`([`User`](/references/objects/user))
    `Stats`([`Stat`](/references/objects/stat))
