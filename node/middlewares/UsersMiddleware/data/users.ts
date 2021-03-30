export interface User extends Record<string, unknown> {
  id: string
  email: string
  document: string
  firstName: string
  lastName: string
  priceTables: string
  isOrgAdmin: boolean
  organizationId?: string
}

export const john: User = {
  id: '461dde1b-2dbd-4ddb-8eba-f33a4f2b000b',
  email: 'john@email.com',
  document: '00000000191',
  firstName: 'John',
  lastName: 'Doe',
  priceTables: 'platinum',
  isOrgAdmin: true,
  organizationId: 'bf6297a1-99be-4459-8e5e-c1f28b270684',
}

export const steven: User = {
  id: 'aea191a3-e63f-48c6-87f3-cf63044d15c7',
  email: 'steven@email.com',
  document: '90750680008',
  firstName: 'Steven',
  lastName: 'Doe',
  priceTables: 'gold',
  isOrgAdmin: false,
  organizationId: 'bf6297a1-99be-4459-8e5e-c1f28b270684',
}

export const chris: User = {
  id: 'f5767052-b6b1-4652-87fc-7ccccfe53d71',
  email: 'chris@email.com',
  document: '45854060000',
  firstName: 'Chris',
  lastName: 'Doe',
  priceTables: 'silver',
  isOrgAdmin: false,
}

export const Users = [john, steven, chris]
