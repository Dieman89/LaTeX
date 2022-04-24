--- id:
CustomerAccountRelationship
title:
CustomerAccountRelationship
hide_title: true --- #CustomerAccountRelationship

```
type CustomerAccountRelationship {
  account: Account!
  customerProfile: CustomerProfile!
  isPrimaryCustomer: Boolean!
  isFinanciallyLiable: Boolean!
}
```
  ## Fields
    `account`([`Account!`](/references/objects/account))
    `customerProfile`([`CustomerProfile!`](/references/objects/customerprofile))
    `isPrimaryCustomer`([`Boolean!`](/references/scalars/boolean))
    `isFinanciallyLiable`([`Boolean!`](/references/scalars/boolean))
