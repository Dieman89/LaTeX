--- id:
Account
title:
Account
hide_title: true --- #Account

```
type Account {
  id: ID!
  
  startFrom: AWSUnion
  customerAccountRelationships(first: Int, after: String): CustomerAccountRelationshipConnection!
}
```
  ## Fields
    `id`([`ID!`](/references/scalars/id))
    `startFrom`([`AWSUnion`](/references/unions/awsunion))
    `customerAccountRelationships`([`CustomerAccountRelationshipConnection!`](/references/objects/customeraccountrelationshipconnection))
