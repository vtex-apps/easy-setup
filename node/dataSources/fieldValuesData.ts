const FieldValuesData = (fieldId: number) => {
  return [
    {
      CategoryId: 9281, // Apparel
      FieldValues: [
        {
          FieldId: fieldId, // Clothes Size
          Name: 'S',
          Text: 'S',
          IsActive: true,
          Position: 1,
        },
        {
          FieldId: fieldId, // Clothes Size
          Name: 'M',
          Text: 'M',
          IsActive: true,
          Position: 2,
        },
        {
          FieldId: fieldId, // Clothes Size
          Name: 'L',
          Text: 'L',
          IsActive: true,
          Position: 3,
        },
        {
          FieldId: fieldId, // Clothes Size
          Name: 'XL',
          Text: 'XL',
          IsActive: true,
          Position: 4,
        },
      ],
    },
    {
      CategoryId: 9283, // Sporting
      FieldValues: [
        {
          FieldId: fieldId, // Shoes Size
          Name: '8',
          Text: '8',
          IsActive: true,
          Position: 1,
        },
        {
          FieldId: fieldId, // Shoes Size
          Name: '9',
          Text: '9',
          IsActive: true,
          Position: 2,
        },
        {
          FieldId: fieldId, // Shoes Size
          Name: '10',
          Text: '10',
          IsActive: true,
          Position: 3,
        },
        {
          FieldId: fieldId, // Shoes Size
          Name: '11',
          Text: '11',
          IsActive: true,
          Position: 4,
        },
        {
          FieldId: fieldId, // Shoes Size
          Name: '12',
          Text: '12',
          IsActive: true,
          Position: 5,
        },
      ],
    },
  ]
}

export interface SpecificationFieldValue {
  FieldId: number
  Name: string
  Text: string
  IsActive: boolean
  Position: number
}

export { FieldValuesData }
