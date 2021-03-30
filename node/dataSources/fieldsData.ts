const FieldsData = (groupId: number): SpecificationField[] => [
  {
    Name: 'Clothes Size',
    CategoryId: 9281, // Apparel
    IsActive: true,
    IsRequired: true,
    FieldTypeId: 6,
    FieldValueId: null,
    Description: 'clothes size',
    IsStockKeepingUnit: true,
    IsFilter: true,
    IsOnProductDetails: false,
    Position: 1,
    IsWizard: false,
    IsTopMenuLinkActive: false,
    IsSideMenuLinkActive: false,
    DefaultValue: null,
    FieldGroupId: groupId, // Specifications
    FieldGroupName: 'Specifications',
  },
  {
    Name: 'Shoes Size',
    CategoryId: 9283, // Sporting
    IsActive: true,
    IsRequired: true,
    FieldTypeId: 6,
    FieldValueId: null,
    Description: 'shoes size',
    IsStockKeepingUnit: true,
    IsFilter: true,
    IsOnProductDetails: false,
    Position: 1,
    IsWizard: false,
    IsTopMenuLinkActive: false,
    IsSideMenuLinkActive: false,
    DefaultValue: null,
    FieldGroupId: groupId, // Specifications
    FieldGroupName: 'Specifications',
  },
]

export interface SpecificationField {
  Name: string
  CategoryId: number
  IsActive: boolean
  IsRequired: boolean
  FieldTypeId: number
  FieldValueId: string | null
  Description: string
  IsStockKeepingUnit: boolean
  IsFilter: boolean
  IsOnProductDetails: boolean
  Position: number
  IsWizard: boolean
  IsTopMenuLinkActive: boolean
  IsSideMenuLinkActive: boolean
  DefaultValue: any
  FieldGroupId: number
  FieldGroupName: 'Specifications'
}

export interface IFieldResponse {
  CategoryId: any
  FieldId: number
  Name: string
  IsStockKeepingUnit: boolean
  IsActive: boolean
}

export { FieldsData }
