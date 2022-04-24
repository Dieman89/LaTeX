--- id:
CustomerProfile
title:
CustomerProfile
hide_title: true --- #CustomerProfile

```
type CustomerProfile {
  id: ID!
  emailAddress: AWSEmail
  givenName: String! @deprecated
  familyName: String!
  birthdate: AWSDate
  phoneNumbers: [String]!
  address: Address
  enabled: Boolean!
  marketingPreferences: [MarketingPreference]!
  specialCommPreferences: [String]
  customerAccountRelationships(first: Int, after: String): CustomerAccountRelationshipConnection!
}
```
  ## Fields
    `id`([`ID!`](/references/scalars/id))
    `emailAddress`([`AWSEmail`](/references/scalars/awsemail))
    `givenName`([`String!`](/references/scalars/string))
    `familyName`([`String!`](/references/scalars/string))
    `birthdate`([`AWSDate`](/references/scalars/awsdate))
    `phoneNumbers`([`[String]!`](/references/scalars/string))
    `address`([`Address`](/references/objects/address))
    `enabled`([`Boolean!`](/references/scalars/boolean))
    `marketingPreferences`([`[MarketingPreference]!`](/references/enums/marketingpreference))
    `specialCommPreferences`([`[String]`](/references/scalars/string))
    `customerAccountRelationships`([`CustomerAccountRelationshipConnection!`](/references/objects/customeraccountrelationshipconnection))
