--- id:
User
title:
User
hide_title: true --- #User

  This is a User type
```
type User {
  """Description of id."""
  id: ID!
  """Description of username."""
  username: String
  """User First Name"""
  first_name: String
  """User Last Name"""
  last_name: String
  """User full name"""
  full_name: String
  """User name"""
  name: String @deprecated
  """User avatar url"""
  avatar_url: Url
}
```
  ## Fields
    `id`([`ID!`](/references/scalars/id))
    `username`([`String`](/references/scalars/string))
    `first_name`([`String`](/references/scalars/string))
    `last_name`([`String`](/references/scalars/string))
    `full_name`([`String`](/references/scalars/string))
    `name`([`String`](/references/scalars/string))
    `avatar_url`([`Url`](/references/scalars/url))
