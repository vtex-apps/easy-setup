import type { CreateSchemaInput } from '../../clients/MasterdataClient'
import { john, steven } from '../UsersMiddleware/data/users'

export async function OrganizationsMiddleware(
  ctx: PopulateContext,
  next: () => Promise<any>
) {
  const {
    vtex: { account },
    clients: { masterdataClient: md },
    state: { resources },
    response: { body },
  } = ctx

  try {
    if (!resources.includes('empty') && !resources.includes('organizations')) {
      throw new Error('resource not set')
    }

    const permissionSchema: CreateSchemaInput = {
      dataEntity: 'BusinessPermission',
      schemaName: 'business-permission-schema-v1',
      schemaBody: {
        properties: {
          name: {
            type: 'string',
          },
          label: {
            type: 'string',
          },
        },
        'v-default-fields': ['name', 'label', 'id'],
        required: ['name'],
        'v-indexed': ['name'],
        'v-security': {
          allowGetAll: true,
          publicRead: ['name', 'label', 'id'],
          publicWrite: ['name', 'label'],
          publicFilter: ['name', 'id'],
        },
      },
    }

    const roleSchema: CreateSchemaInput = {
      dataEntity: 'BusinessRole',
      schemaName: 'business-role-schema-v1',
      schemaBody: {
        properties: {
          name: {
            type: 'string',
          },
          label: {
            type: 'string',
          },
          permissions: {
            type: 'string',
          },
        },
        'v-default-fields': ['name', 'label', 'id', 'permissions'],
        required: ['name'],
        'v-indexed': ['name'],
        'v-security': {
          allowGetAll: true,
          publicRead: ['name', 'label', 'permissions', 'id'],
          publicWrite: ['name', 'label', 'permissions'],
          publicFilter: ['name', 'id'],
        },
      },
    }

    const organizationSchema: CreateSchemaInput = {
      dataEntity: 'BusinessOrganization',
      schemaName: 'business-organization-schema-v1',
      schemaBody: {
        properties: {
          name: {
            type: 'string',
          },
          telephone: {
            type: 'string',
          },
          address: {
            type: 'string',
          },
          email: {
            type: 'string',
          },
        },
        'v-default-fields': ['name', 'telephone', 'id', 'address', 'email'],
        required: ['name', 'telephone'],
        'v-indexed': ['name', 'telephone', 'email'],
        'v-security': {
          allowGetAll: true,
          publicRead: ['name', 'telephone', 'id', 'address', 'email'],
          publicWrite: ['name', 'telephone', 'address', 'email'],
          publicFilter: ['name', 'telephone', 'id', 'email'],
        },
      },
    }

    const userOrganizationSchema: CreateSchemaInput = {
      dataEntity: 'UserOrganization',
      schemaName: 'user-organization-schema-v1',
      schemaBody: {
        properties: {
          email: {
            type: 'string',
          },
          businessOrganizationId: {
            type: 'string',
            link: `http://api.vtex.com/${account}/dataentities/BusinessOrganization/schemas/business-organization-schema-v1`,
          },
          roleId: {
            type: 'string',
            link: `http://api.vtex.com/${account}/dataentities/BusinessRole/schemas/business-role-schema-v1`,
          },
          status: {
            type: 'string',
          },
        },
        'v-default-fields': [
          'email',
          'id',
          'businessOrganizationId',
          'roleId',
          'status',
        ],
        required: ['email', 'businessOrganizationId', 'roleId', 'status'],
        'v-indexed': ['email', 'businessOrganizationId', 'roleId', 'status'],
        'v-security': {
          allowGetAll: true,
          publicRead: [
            'email',
            'id',
            'businessOrganizationId',
            'businessOrganizationId_linked',
            'roleId',
            'roleId_linked',
            'status',
          ],
          publicWrite: [
            'id',
            'email',
            'businessOrganizationId',
            'roleId',
            'status',
          ],
          publicFilter: [
            'email',
            'id',
            'businessOrganizationId',
            'roleId',
            'status',
          ],
        },
        'v-triggers': [
          {
            name: 'organization-assignment-accept-email',
            active: true,
            condition: 'status=APPROVED',
            action: {
              type: 'email',
              provider: 'default',
              subject: 'Organization Assignment Acceptance',
              to: ['{!email}'],
              replyTo: 'noreply@company.com',
              body:
                'You have been assigned to {!businessOrganizationId_linked.name}.',
            },
          },
          {
            name: 'organization-assignment-decline-email',
            active: true,
            condition: 'status=DECLINED',
            action: {
              type: 'email',
              provider: 'default',
              subject: 'Organization Assignment Decline',
              to: ['{!email}'],
              replyTo: 'noreply@company.com',
              body:
                'You have left the organization {!businessOrganizationId_linked.name}.',
            },
          },
        ],
      },
    }

    const schemas = [
      permissionSchema,
      roleSchema,
      organizationSchema,
      userOrganizationSchema,
    ]

    const results = await Promise.all(schemas.map(md.createSchema))

    const viewPricesPermissionId = await md.create({
      dataEntity: permissionSchema.dataEntity,
      schema: permissionSchema.schemaName,
      fields: {
        id: 'f43a0146-6299-43b4-af46-310ee19b0284',
        name: 'view_prices',
        label: 'View Prices',
      },
    })

    const roleId = await md.create({
      dataEntity: roleSchema.dataEntity,
      schema: roleSchema.schemaName,
      fields: {
        id: 'c7a03457-ae36-46d2-bc7e-9c24ae37fe9e',
        name: 'sales_manager',
        label: 'Sales Manager',
        permissions: JSON.stringify([viewPricesPermissionId]),
      },
    })

    const businessOrganizationId = await md.create({
      dataEntity: organizationSchema.dataEntity,
      schema: organizationSchema.schemaName,
      fields: {
        id: 'bf6297a1-99be-4459-8e5e-c1f28b270684',
        name: 'abCorp',
        telephone: '11999876543',
        address: 'Av. Faria Lima 1440',
        email: 'abcorp@example.com',
      },
    })

    await md.create({
      dataEntity: userOrganizationSchema.dataEntity,
      schema: userOrganizationSchema.schemaName,
      fields: {
        id: '3d6a3c0c-8a62-4623-8f71-9f144814a7eb',
        email: john.email,
        businessOrganizationId,
        roleId,
        status: 'APPROVED',
      },
    })

    await md.create({
      dataEntity: userOrganizationSchema.dataEntity,
      schema: userOrganizationSchema.schemaName,
      fields: {
        id: '404a97d2-7f91-42c7-9d8b-51be848acaeb',
        email: steven.email,
        businessOrganizationId,
        roleId,
        status: 'APPROVED',
      },
    })

    ctx.response.body = {
      ...body,
      Organizations: {
        results,
        status: 'OK',
      },
    }
  } catch (error) {
    ctx.response.body = {
      ...body,
      Organizations: {
        error: error.message,
        status: 'ERROR',
      },
    }
  }

  await next()
}
